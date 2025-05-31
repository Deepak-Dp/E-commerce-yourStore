import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

function EditProduct({editProductData, editProductId, handlepenEditSection, fatchAdminData }) {

const [productData, setProductData] = useState({
  color: editProductData.color,
  brand: editProductData.brand,
     _id:editProductId,
    unit: editProductData.unit,
    stock: editProductData.stock,
    price: editProductData.price,
    discount: editProductData.discount,
    
   
  });

 
  

  
  

  const onChangeHandler = (e) =>{
    const {name, value} = e.target;

    setProductData((prev)=>{
        return{
            ...prev,
            [name]: value
        }
    })
  }


  const onSubmitHandler =async (e)=>{
    e.preventDefault()

    const response = await axios.put("http://localhost:5000/api/product/update-product",productData,{
        withCredentials: true,
    })

   if (response?.data?.success) {
       toast.success(response.data.message)
       fatchAdminData()
       handlepenEditSection()
   }
    


  }

  return (
    <section className=" fixed left-0 right-0 top-0 bottom-0 py-10 bg-slate-300 bg-opacity-70 z-50 flex justify-center items-center">
      <div className="w-[95%] lg:w-[50%] bg-white rounded-md p-4">
        <div className="flex justify-between ">
          <h1 className="font-serif font-bold text-lg">Edit Product</h1>
          <IoClose
            onClick={handlepenEditSection}
            size={25}
            className=" hover:text-orange-400 cursor-pointer"
          />
        </div>

        <p className="h-[2px] bg-slate-600 -mx-4"></p>

          <form onSubmit={onSubmitHandler} className="text-gray-800 ">

          <div className="flex flex-col w-full gap-2 mt-1">
                     <label htmlFor="" className="text-lg font-serif font-semibold">Product Brand:</label>
                     <input type="text"
                     name="brand"
                     value={productData.brand}
                     onChange={onChangeHandler}
                     placeholder="Edit product brand"
                     className="outline-none border-2 border-gray-600
                      focus-within:border-orange-400 text-lg rounded-md font-sans font-semibold bg-gray-100 py-1 px-3 " />
               </div>

               <div className="flex flex-col w-full gap-2 mt-1">
                     <label htmlFor="" className="text-lg font-serif font-semibold">Product color:</label>
                     <input type="text"
                     name="color"
                     value={productData.color}
                     onChange={onChangeHandler}
                     placeholder="Edit product color"
                     className="outline-none border-2 border-gray-600
                      focus-within:border-orange-400 text-lg rounded-md font-sans font-semibold bg-gray-100 py-1 px-3 " />
               </div>
               
               <div className="flex flex-col w-full gap-2 mt-1">
                     <label htmlFor="" className="text-lg font-serif font-semibold">Product Unit:</label>
                     <input type="text"
                     name="unit"
                     value={productData.unit}
                     onChange={onChangeHandler}
                     placeholder="Edit product units"
                     className="outline-none border-2 border-gray-600
                      focus-within:border-orange-400 text-lg rounded-md font-sans font-semibold bg-gray-100 py-1 px-3 " />
               </div>

               <div className="flex flex-col w-full gap-2 mt-1">
                     <label htmlFor="" className=" text-lg font-serif font-semibold">Product Stock:</label>
                     <input type="number"
                     name="stock"
                     value={productData.stock}
                     onChange={onChangeHandler}
                     placeholder="Edit product stock"
                     className="outline-none border-2 border-gray-600
                      focus-within:border-orange-400 text-lg rounded-md font-sans font-semibold bg-gray-100 py-1 px-3 " />
               </div>


               <div className="flex flex-col w-full gap-2 mt-1">
                     <label htmlFor="" className="text-lg font-serif font-semibold">Product Price:</label>
                     <input type="number"
                     name="price"
                     value={productData.price}
                     onChange={onChangeHandler}
                     placeholder="Edit product price"
                     className="outline-none border-2 border-gray-600
                      focus-within:border-orange-400 text-lg rounded-md font-sans font-semibold bg-gray-100 py-1 px-3 " />
               </div>


               <div className="flex flex-col w-full gap-2 mt-1">
                     <label htmlFor="" className="text-lg font-serif font-semibold">Product Discount:</label>
                     <input type="number"
                     name="discount"
                     value={productData.discount}
                     onChange={onChangeHandler}
                     placeholder="Edit product discount"
                     className="outline-none border-2 border-gray-600
                      focus-within:border-orange-400 text-lg rounded-md font-sans font-semibold bg-gray-100 py-1 px-3 " />
               </div>

               
              <button  className="w-full mt-2 py-1 hover:text-white border-2 rounded-md font-serif font-bold text-lg border-orange-400 hover:bg-orange-400 text-center ">Update Product</button>


          </form>

      </div>
    </section>
  );
}

export default EditProduct;
