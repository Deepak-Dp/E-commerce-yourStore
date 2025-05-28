import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import emptyImage from "../assets/no-data-display.jpg";
import { IoSearchOutline } from "react-icons/io5";
import DeleteAdminProduct from "../components/DeleteAdminProduct";
import EditProduct from "../components/EditProduct";

function AdminProduct() {
  const [adminProducts, setAdminProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [removeProductId, setRemoveProductId] = useState('')
  const [confirmDetelBox, setConfirmDeleteBox] = useState(false)
  const [editSection, setEditSection] = useState(false)
  const [editProductId, setEditProductId] = useState('')

  const [editProductData, setEditProductData] = useState({
     brand:"",
     color:"",
      unit: "",
      stock: "",
      price: "",
      discount: ""
     
    });

  const [query, setQuery] = useState("");

  const fatchAdminData = async () => {
    setLoading(true);
    const response = await axios.get(
      "http://localhost:5000/api/product/get-AdminProducts",
      {
        withCredentials: true,
      }
    );
    setAdminProducts(response?.data?.data);
    setLoading(false);
  };

  const filter = adminProducts.filter((data) =>
    data.name.toLowerCase().includes(query) ||
    data.description.toLowerCase().includes(query)
  );

  

  useEffect(() => {
    fatchAdminData();
  }, []);

  const openConfirmBoxHandler =()=>{
    setConfirmDeleteBox(!confirmDetelBox)
  }

  const handlepenEditSection = () =>{
    setEditSection(!editSection)
  }

  
  

  return (
    <section className="h-full w-full ml-2">
      {loading && (
        <div className=" flex justify-center items-center mt-9 ">
          <Loader />
        </div>
      )}

      { !loading && (
        <>
          <div className="flex md:justify-between justify-center">
            <h1 className="font-serif font-bold hidden md:block lg:block text-xl lg:text-[28px]">
              Admin Products
            </h1>
            <div className="flex items-center gap-3 py-1 bg-gray-200 border-2 border-gray-600 rounded-md hover:border-orange-400 px-3">
              <IoSearchOutline size={20} className="font-bold" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Admin Products"
                className="outline-none w-full lg:w-[300px]  font-serif font-semibold bg-gray-200 text-black"
              />
            </div>
          </div>

          <p className="w-full h-[1.5px] -ml-4  mt-2 bg-gray-300"></p>
          
        </>
      )}

      {!filter[0] && !loading && (
        <div className=" flex justify-center items-center mt-4">
          <img
            src={emptyImage}
            alt=""
            className=" lg:w-[500px] w-[300px] h-[300px] lg:h-[400px]"
          />
        </div>
      )}

      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
        {filter.map((data, index) => {
          return (
            <div className=" w-30 h-[280px] rounded-md shadow-md flex flex-col border-2 border-orange-400 ">
              <div className="h-[150px] w-full">
                <img
                  src={data.image[0]}
                  alt=""
                  className="  h-[100%] w-[100%] mt-2 rounded-md object-scale-down"
                />
             
              </div>
              <div className="bg-gray-200 h-[130px]  flex rounded-b-md flex-col mt-2 ">
                <h1 className="overflow-hidden text-ellipsis line-clamp-1 px-2 mt-2 font-serif font-semibold">
                  {data.name}
                </h1>

                <div className="flex justify-between">
                  <strike className="text-red-500 font-sans pl-2 text-lg font-semibold">₹ {data.discount}</strike>
                  <p className="pr-2 font-sans font-semibold text-lg text-green-700">₹ {data.price}</p>
                </div>

               <div className="px-2 mt-2 flex justify-between items-center">
                    <button  
                    onClick={()=>{
                      setEditProductId(data._id)
                     setEditSection(true)
                     setEditProductData({
                      brand:data.brand,
                      color: data.color,
                      unit: data.unit,
                      stock: data.stock,
                      price: data.price,
                      discount: data.discount
                     })
                      
                    }}
                    
                    className="w-[75px] py-1 rounded-md border-2 border-green-500 hover:bg-green-500 hover:text-white font-serif font-semibold">Edit</button>
                    <button onClick={()=>{
                       setRemoveProductId(data._id),

                     setConfirmDeleteBox(true)
                     
                    }
                      } className=" w-[75px] py-1 rounded-md border-2 border-red-400 hover:bg-red-400 hover:text-white font-serif font-semibold">Delete</button>
              </div>
              </div>

             
            </div>
          );
        })}
      </div>


      {
        confirmDetelBox && (
            <DeleteAdminProduct fatchAdminData={fatchAdminData}  _id={removeProductId} openConfirmBoxHandler={openConfirmBoxHandler}/>
        )
      }

      {
      editSection && (

        <EditProduct editProductData={editProductData} editProductId={editProductId} handlepenEditSection={handlepenEditSection} fatchAdminData={fatchAdminData}/>
      )

      }
    </section>
  );
}

export default AdminProduct;
