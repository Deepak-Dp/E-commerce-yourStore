import React from 'react'
import axios from "axios";

import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { setCartProduct } from '../store/product/productSlice';
import { useDispatch } from 'react-redux';


function DeleteCartItem({ id, openConfirmBoxHandler }) {

  const dispatch = useDispatch()
  const getCartItem = async ()=>{
    const  response = await axios.get("https://yourstorebackend.vercel.app/api/cart/get",{
       withCredentials: true
     })
 
    
      dispatch(setCartProduct(response.data.data))
      
     
   }

   const deleteProductHandler =async ()=>{

    const response = await axios.delete(`https://yourstorebackend.vercel.app/api/cart/delete-cart-item/${id}`)
   
    if (response?.data?.success) {
      toast.success(response.data.message);
      openConfirmBoxHandler();
      getCartItem();
      
    }
    else{
      toast.error(response.data.message)
    }
    
   }
    
    
  return (
    <section className="fixed left-0 right-0 bottom-0 top-0 bg-opacity-70 bg-slate-300 z-50 flex justify-center items-center">
         <div className="w-[95%] lg:w-[50%] bg-white rounded-md p-4">
           <div className="flex justify-between">
             <h1 className="font-serif font-bold text-lg">Permanent Delete</h1>
             <IoClose
               onClick={openConfirmBoxHandler}
               size={25}
               className=" hover:text-orange-400 cursor-pointer"
             />
           </div>
   
           <p className="font-sans font-semibold text-gray-600">
           Are you sure want to permanent delete ?
           </p>
   
           <div className=" flex gap-2 mt-2 justify-end">
             <button
               onClick={openConfirmBoxHandler}
               className=" py-[2px] px-3 border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white font-serif font-semibold rounded-md "
             >
               Cancel
             </button>
             <button 
             onClick={deleteProductHandler}
              className=" py-[2px] px-3 border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white font-serif font-semibold rounded-md">
               Confirm
             </button>
           </div>
         </div>
       </section>
  )
}

export default DeleteCartItem