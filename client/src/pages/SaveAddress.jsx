import React, { useEffect, useState } from 'react'
import AddAddress from '../components/AddAddress'
import axios, { AxiosError } from 'axios'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../store/product/productSlice';
import { IoClose } from 'react-icons/io5';
import toast from 'react-hot-toast';
import UpdateAddress from '../components/UpdateAddress';






function SaveAddress() {
  const [open, setOpen] = useState(false)
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [deleteAddressId, setDeleteAddressId] = useState('')
  const [updatedData, setUpdatedData] = useState([''])
  const [openUpdate, setOpenUpdate] = useState(false)
  const dispatch = useDispatch()
  const address = useSelector(state=>state.product.allAddress)


  
  
 
  

 
 
  

  const openHandler = () => {
    setOpen(!open)
  }

  const getAddress =async ()=>{
       const response = await axios.get("https://yourstorebackend.vercel.app/api/address/get-address",{withCredentials:true})

     
       dispatch(setAddress(response?.data?.data))
  }

  const openDeleteHandler=()=>{
    setOpenDeleteConfirm(!openDeleteConfirm)
  }
  const openUpdateHandler=()=>{
    setOpenUpdate(!openUpdate)
  }

  const deleteAddressHandler =async ()=>{

try {
  
  const response = await axios.delete(`https://yourstorebackend.vercel.app/api/address/delete-address/${deleteAddressId}`,{withCredentials:true})
 
  
  if(response?.data?.success){
    toast.success(response.data.message)
    getAddress()
    setOpenDeleteConfirm(false)
  }
  else{
    toast.error(response.data.message)
  }

 
  
} catch (error) {
  toast.error(error?.response?.data?.message);
    
}

setOpenDeleteConfirm(false)
  }
  useEffect(()=>{
    
  },[])
  return (
    <section className="w-full h-full ">
       <div className=" flex items-center justify-between font-serif px-2 font-bold  lg:px-4 py-2">
        <h1 className="lg:text-xl text-lg">Address</h1>

        <button
         onClick={openHandler}
          className="px-2 py-1 text-sm border-2 rounded-md border-orange-400 hover:bg-orange-400"
        >
          Add Address
        </button>
      </div>

      <div className='flex w-full flex-col mt-2 bg-blue-100 rounded-sm
       justify-center'>

        

      
       {
        address.map((item,index)=>{
          return (
            <div key={item+index} className='flex justify-between border-2 border-dashed border-gray-300 rounded-sm bg-white m-3'>

    
            <div className='flex flex-col p-3 '>
              <p className='text-sm font-semibold'>{item.address_line}</p>
              <p className='text-sm font-semibold'>{item.city} - {item.pincode}</p>
              <p className='text-sm font-semibold'>{item.state}</p>
              <p className='text-sm font-semibold'>{item.country}</p>
             
              <p className='text-sm font-semibold'>{item.mobile}</p>
            </div>
        
            <div className='flex flex-col justify-between p-3 '>
              <div onClick={()=>{
                openUpdateHandler()
                setUpdatedData(item)
                
              }}  className='h-[40px] w-[30px] bg-opacity-75 rounded-sm bg-green-400 flex justify-center items-center hover:bg-green-600 hover:text-white '><MdEdit size={20}/></div>
              <div onClick={()=>{
                setDeleteAddressId(item._id)
                openDeleteHandler()
              }} className='h-[40px] w-[30px]  bg-opacity-75 rounded-sm bg-red-400 flex justify-center items-center hover:bg-red-600 hover:text-white '><MdDelete size={20}/></div>
              
            </div>
        
            </div>
          )
        })
       }

       <div className='  bg-blue-100'>
        <div onClick={openHandler} className=' cursor-pointer border-2 text-center py-3 text-lg font-sans font-semibold border-dashed border-gray-300 rounded-sm bg-white m-3'>
              Add Address
        </div>
       </div>
      
      </div>




      {
        open &&(
          <AddAddress openHandler={openHandler} getAddress={getAddress}/>
        )
      }

      {
        openDeleteConfirm &&(
           <section className="fixed left-0 right-0 bottom-0 top-0 bg-opacity-70 bg-slate-300 z-50 flex justify-center items-center">
                   <div className="w-[95%] lg:w-[50%] bg-white rounded-md p-4">
                     <div className="flex justify-between">
                       <h1 className="font-serif font-bold text-lg">Permanent Delete</h1>
                       <IoClose
                        onClick={openDeleteHandler}
                         size={25}
                         className=" hover:text-orange-400 cursor-pointer"
                       />
                     </div>
             
                     <p className="font-sans font-semibold text-gray-600">
                     Are you sure want to permanent delete ?
                     </p>
             
                     <div className=" flex gap-2 mt-2 justify-end">
                       <button
                         onClick={openDeleteHandler}
                         className=" py-[2px] px-3 border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white font-serif font-semibold rounded-md "
                       >
                         Cancel
                       </button>
                       <button 
                       onClick={deleteAddressHandler}
                        className=" py-[2px] px-3 border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white font-serif font-semibold rounded-md">
                         Confirm
                       </button>
                     </div>
                   </div>
                 </section>
        )
      }

      {
         openUpdate &&(
          <UpdateAddress openHandler={openUpdateHandler} updatedData={updatedData} getAddress={getAddress}/>
         )
        }
    </section>
  )
}

export default SaveAddress






