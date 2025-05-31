import React, { useEffect, useState } from "react";
import UploadCategory from "../components/UpdateCategory";
import axios from "axios";
import Loader from "../components/Loader";
import emptyImage from "../assets/no-data-display.jpg";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import {useDispatch} from 'react-redux'
import { setAllCategory } from "../store/product/productSlice";



function Category() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch()

  const [_id, setRemoveCategoryId] = useState('')
  const [loading, setLoading] = useState(false);
  const [confirmBox, setConfirmBox] = useState(false);
  const [categoryData, setCategory] = useState([]);
  const fatchAdminCategory = async () => {
    setLoading(true);
    const adminsCategory = await axios.get(
      "https://yourstorebackend.vercel.app/api/category/fatch-AdminCategoorys",
      {
        withCredentials: true,
      }
    );
  
   setCategory(  adminsCategory.data.data)
   dispatch(setAllCategory(adminsCategory.data.data))
   setLoading(false)
    
  };

  const deleteConfirmBox = ()=>{
    setConfirmBox(!confirmBox)
  }




  const removeCategoryHendler = async() =>{
  

    const response = await axios.delete(`https://yourstorebackend.vercel.app/api/category/remove-category/${_id}` )

    
    

    if(response?.data?.success){
      toast.success(response?.data?.message)
      setConfirmBox(false)
      fatchAdminCategory()
    }
    else{
      toast.error(response?.data?.message)
    }
    
  }
 
  
  useEffect(() => {
    fatchAdminCategory();
  }, []);

  

  
  

  return (
    <section className="w-full h-full ">
      <div className=" flex items-center justify-between font-serif px-2 font-bold shadow-md lg:px-4 py-2">
        <h1 className="lg:text-xl text-lg">Category</h1>

        <button
          onClick={handleOpen}
          className="px-2 py-1 text-sm border-2 rounded-md border-orange-400 hover:bg-orange-400"
        >
          Add Category
        </button>
      </div>

      {loading && (
        <div className=" flex justify-center items-center mt-9 ">
          <Loader />
        </div>
      )}

      {
        !categoryData[0] && !loading && (
          <div className=" flex justify-center mt-4">
           
            <img src={emptyImage} className=" lg:w-[500px] w-[300px] h-[300px] lg:h-[500px]" />
          </div>
        )
      }
      
     
           <h1 className="font-serif font-semibold mt-2 lg:text-xl">{categoryData.length >0 ? "Number Of Category :" :""}  <span className="text-orange-600 font-sans font-bold">{  categoryData.length > 0 ? `${categoryData.length}`: ""}</span></h1>

      

     
      <div className=" grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6 pt-2 ">
 
         {
          categoryData.map((categoryData, index)=>{
            return (
              
              <div key={categoryData+index} className=" w-30 h-64 rounded-md shadow-md flex flex-col  ">
                   <img src={categoryData.image} className="w-30 h-44 object-center rounded-t-md" />
                   <h1 className="text-ellipsis line-clamp-1 mx-2 font-serif font-semibold  mt-1">{categoryData.name}</h1>
                   <button onClick={()=>{
                    setRemoveCategoryId(categoryData._id),
                    setConfirmBox(true)
                   }} className="ml-auto mb-3 px-4 py-1 mr-2 hover:bg-orange-400 hover: mt-2 rounded-md font-serif font-semibold  border-2 hover:text-white border-orange-400">Delete</button>
              </div>
            )
          })
         }
        

      </div>

     {
      confirmBox && (
        <div className="fixed flex items-center justify-center left-0 right-0 bottom-0 top-0 bg-slate-500 bg-opacity-70 z-50">

          <div className="w-[95%] lg:w-[50%] bg-white rounded-md p-4">
               
               <div className="flex justify-between">
                  <h1 className="font-serif font-bold text-lg">Permanent Delete</h1>
                  <IoClose onClick={deleteConfirmBox} size={25} className=" hover:text-orange-400 cursor-pointer"/>
               </div>

               <p className="font-sans font-semibold text-gray-600">Are you sure permanent delete ?</p>

               <div className=" flex gap-2 mt-2 justify-end">
                  <button onClick={deleteConfirmBox} className=" py-[2px] px-3 border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white font-serif font-semibold rounded-md ">Cancel</button>
                  <button  onClick={removeCategoryHendler} className=" py-[2px] px-3 border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white font-serif font-semibold rounded-md" >Confirm</button>
               </div>
          </div>

        </div>
      )
        
     }

      {open && <UploadCategory fatchAdminCategory={fatchAdminCategory} setOpen={setOpen} open={open} />}
    </section>
  );
}

export default Category;
