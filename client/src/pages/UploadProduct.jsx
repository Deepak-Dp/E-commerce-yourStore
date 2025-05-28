import React, { useEffect, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import uploadImage from "../utils/uploadImage";
import Loader from "../components/Loader";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom'
import {setAllCategory} from '../store/product/productSlice'

function UploadProduct() {
  const [productData, setProductData] = useState({
    name: "",
    image: [],
    category: [],
    unit: "",
    stock: "",
    price: "",
    brand:"",
    color:"",
    discount: "",
    description: "",
    more_details: []
  });
  
  const navigate = useNavigate()

  const allCategory = useSelector((state) => state.product.allCategory);

  const [addfieldOpen, setAddFieldOpen] = useState(false);

  const openAddfieldHandler = () => {
    setAddFieldOpen(!addfieldOpen);
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const [imageLoading, setImageLoading] = useState(false);

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];

    setImageLoading(true);
    const image = await uploadImage(file);

    setProductData((prev) => {
      return {
        ...prev,
        image: [...prev.image, image],
      };
    });
    setImageLoading(false);
  };

  const handleRemoveImage = async (index) => {
    productData.image.splice(index, 1);
    setProductData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleRemoveCategory = (index) => {
    productData.category.splice(index, 1);

    setProductData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const [fieldName, setFieldName] = useState("");

  const handleAddFieldName = () => {
    setProductData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: "",
        },
      };
    });

    setFieldName("");
    setAddFieldOpen(false);
  };

  const dispatch = useDispatch()

  const [wait, setWait] = useState(false)
  
  const handleOnSubmit = async(e) =>{
    e.preventDefault()
   setWait(true)
    const response = await axios.post("http://localhost:5000/api/product/add",productData,{
      withCredentials: true
    })

   if(response?.data?.success){
    toast.success(response?.data?.message)
       setProductData({

        name: "",
    image: [],
    category: [],
    unit: "",
    brand:"",
    color:"",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: [],

       })

       navigate('/dashboard/admin-product')
   } else{
         toast.error(response?.data?.message)
   }

   setWait(false)
    
  }


  const fatchAdminCategory = async () => {
    
    const adminsCategory = await axios.get(
      "http://localhost:5000/api/category/fatch-AdminCategoorys",
      {
        withCredentials: true,
      }
    );
  
   
   dispatch(setAllCategory(adminsCategory.data.data))
   
    
  };

useEffect(()=>{
  fatchAdminCategory()
},[])




  return (
    <section className="h-full w-full ">
      <div className=" flex justify-between items-center shadow-md py-2 px-3">
        <h1 className="font-serif font-bold text-xl">Upload Product</h1>
      </div>

      <form  onSubmit={handleOnSubmit} >
        <div className="flex flex-col mt-2 px-3">
          <label htmlFor="name" className="font-serif font-semibold">
            Product Name :
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={productData.name}
            onChange={onChangeHandler}
            placeholder="Enter Product Name"
            className="outline-none mt-1 py-1 px-2 border-2 border-gray-700 focus-within:border-orange-400 font-semibold rounded-md bg-slate-200"
          />
        </div>

        <div className="flex flex-col mt-2 px-3">
          <label htmlFor="description" className="font-serif font-semibold">
            description :
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={productData.description}
            onChange={onChangeHandler}
            placeholder="Enter Product description"
            required
            className="outline-none mt-1 py-1 resize-none px-2 border-2 border-gray-700 focus-within:border-orange-400 font-semibold rounded-md bg-slate-200"
          />
        </div>

        <div className="flex flex-col mt-2 px-3">
          <label htmlFor="name" className="font-serif font-semibold">
            Brand :
          </label>
          <input
            type="text"
            id="name"
            name="brand"
            required
            value={productData.brand}
            onChange={onChangeHandler}
            placeholder="Enter Product brand"
            className="outline-none mt-1 py-1 px-2 border-2 border-gray-700 focus-within:border-orange-400 font-semibold rounded-md bg-slate-200"
          />
        </div>


        <div className="flex flex-col mt-2 px-3">
          <label htmlFor="name" className="font-serif font-semibold">
            Color :
          </label>
          <input
            type="text"
            id="name"
            name="color"
            required
            value={productData.color}
            onChange={onChangeHandler}
            placeholder="Enter Product color"
            className="outline-none mt-1 py-1 px-2 border-2 border-gray-700 focus-within:border-orange-400 font-semibold rounded-md bg-slate-200"
          />
        </div>

        <div className="mt-2 px-3">
          <p className="font-serif font-semibold">Image :</p>

          <div className=" flex justify-center">
            {imageLoading ? (
              <div className="h-[130px] mt-2 border-2 flex flex-col items-center justify-center border-gray-500 rounded-md hover:border-orange-400 cursor-pointer w-full bg-slate-200">
                <Loader />
              </div>
            ) : (
              <label
                htmlFor="productImage"
                className="h-[130px] mt-2 border-2 flex flex-col items-center justify-center border-gray-500 rounded-md hover:border-orange-400 cursor-pointer w-full bg-slate-200"
              >
                <MdOutlineCloudUpload size={150} className="text-gray-500" />
                <p className="mb-3 -mt-4 font-serif font-semibold">
                  Upload image
                </p>
              </label>
            )}

            <input
              type="file"
              id="productImage"
              onChange={uploadImageHandler}
              className="hidden"
            />
          </div>

          <div className=" flex flex-wrap gap-3 mt-2  ">
            {productData.image.map((img, index) => {
              return (
                <div
                  key={img + index}
                  className=" relative h-[100px] rounded-md w-[100px] border-2 border-orange-400 bg-slate-900 group"
                >
                  <img
                    src={img}
                    className="h-full w-full object-scale-down cursor-pointer rounded-md  "
                    alt=""
                  />
                  <div
                    onClick={() => handleRemoveImage(index)}
                    className="  absolute bottom-0 right-0 p-1 hover:bg-red-700 bg-red-500 lg:hidden group-hover:block rounded cursor-pointer"
                  >
                    <MdDelete />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className=" flex flex-col px-3 mt-2">
          <label className="font-serif font-semibold">Category</label>

          <select
            className="outline-none p-1 text-lg cursor-pointer font-serif font-semibold mt-1 rounded-md  border-2 border-gray-400
           focus-within:border-orange-400 bg-slate-100"
            onChange={(e) => {
              const value = e.target.value;
              const category = allCategory.find((el) => el._id === value);

              setProductData((prev) => {
                return {
                  ...prev,
                  category: [...prev.category, category],
                };
              });
            }}
          >
            <option value="">Select Category</option>

            {allCategory.map((cat, index) => {
              return (
                <option key={cat + index} value={cat?._id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex flex-wrap mt-2 px-3 gap-2">
          {productData.category.map((c, index) => {
            return (
              <div
                key={c + index}
                className="text-sm flex items-center gap-1 bg-blue-100 px-2 rounded-sm mt-1"
              >
                <p className="font-medium">{c.name}</p>
                <IoClose
                  size={17}
                  onClick={() => handleRemoveCategory(index)}
                  className="hover:text-red-700 mt-[1px] cursor-pointer"
                />
              </div>
            );
          })}
        </div>

        <div className="flex flex-col mt-2 px-3">
          <label htmlFor="unit" className="font-serif font-semibold">
            Unit :
          </label>
          <input
            type="text"
            id="unit"
            name="unit"
            required
            value={productData.unit}
            onChange={onChangeHandler}
            placeholder="Enter Product Unit"
            className="outline-none mt-1 py-1 px-2 border-2 border-gray-700 focus-within:border-orange-400 font-semibold rounded-md bg-slate-200"
          />
        </div>

        <div className="flex flex-col mt-2 px-3">
          <label htmlFor=" stock" className="font-serif font-semibold">
            Stock :
          </label>
          <input
            type="number"
            id=" stock"
            name="stock"
            required
            value={productData.stock}
            onChange={onChangeHandler}
            placeholder="Enter Product Stock"
            className="outline-none mt-1 py-1 px-2 border-2 border-gray-700 focus-within:border-orange-400 font-semibold rounded-md bg-slate-200"
          />
        </div>

        <div className="flex flex-col mt-2 px-3">
          <label htmlFor="price" className="font-serif font-semibold">
            Price :
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            value={productData.price}
            onChange={onChangeHandler}
            placeholder="Enter Product Price"
            className="outline-none mt-1 py-1 px-2 border-2 border-gray-700 focus-within:border-orange-400 font-semibold rounded-md bg-slate-200"
          />
        </div>

        <div className="flex flex-col mt-2 px-3">
          <label htmlFor="discount" className="font-serif font-semibold">
            Discount:
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            required
            value={productData.discount}
            onChange={onChangeHandler}
            placeholder="Enter Product Discount"
            className="outline-none mt-1 py-1 px-2 border-2 border-gray-700 focus-within:border-orange-400 font-semibold rounded-md bg-slate-200"
          />
        </div>

        {/* add more field */}

        {Object?.keys(productData?.more_details)?.map((k, index) => {
          return (
            <div className="flex flex-col mt-2 px-3">
              <label className="font-serif font-semibold" htmlFor={k}>{k}</label>
              <input
                type="text"
                id={k}
                value={productData?.more_details[k]}
                onChange={(e) => {
                  const value = e.target.value;

                  setProductData((prev) => {
                    return {
                      ...prev,
                      more_details: {
                        ...prev.more_details,
                        [k]: value,
                      },
                    };
                  });
                }}
                required
                className="outline-none mt-1 py-1 px-2 border-2 border-gray-700 focus-within:border-orange-400 font-semibold rounded-md bg-slate-200"
              />
            </div>
          );
        })}

        <div
          onClick={openAddfieldHandler}
          className=" px-3 py-1 cursor-pointer text-lg font-serif font-bold rounded-md w-[120px] mt-3 ml-3 border-2 border-orange-400 hover:bg-orange-400"
        >
          Add Field
        </div>

        <button  className="py-1 w-[90%] lg:w-[98%] mt-3 border-[3px] rounded-md hover:bg-orange-400 border-orange-400 ml-3 -mr-3 text-xl font-serif font-bold">Add Product</button>
      </form>

      {addfieldOpen && (
        <div className="fixed left-0 right-0 bottom-0 top-0 flex justify-center items-center bg-slate-400 bg-opacity-70 z-50">
          <div className="w-[95%] lg:w-[50%] bg-white rounded-md p-4">
            <div className="flex justify-between">
              <h1 className="text-lg font-serif font-bold">Add Field</h1>
              <IoClose
                size={26}
                onClick={openAddfieldHandler}
                className="hover:text-red-700 cursor-pointer"
              />
            </div>

            <input
              type="text"
              placeholder="Enter field name"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              className="outline-none w-full mt-1 py-1 px-2 border-2 border-gray-700 focus-within:border-orange-400 font-semibold rounded-md bg-slate-200"
            />

            <button
              onClick={handleAddFieldName}
              className=" px-3 py-1 text-lg font-serif font-bold rounded-md w-[120px] mt-3 ml-3 border-2 border-orange-400 hover:bg-orange-400"
            >
              Add field
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default UploadProduct;
