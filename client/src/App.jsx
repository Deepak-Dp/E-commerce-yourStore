import { useEffect, useState } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import  { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getUserdetails } from './store/auth/getUser';
import { setAddress, setAdminOrder, setAllCategory, setAllProducts, setCartProduct, setUserOrder } from './store/product/productSlice';


function App() {

  const dispatch = useDispatch()
   const getUserHandler= async()=>{
    const response = await axios.get('https://yourstorebackend.vercel.app/api/user/get-user',{
      withCredentials: true
    })
  dispatch(getUserdetails(response?.data?.data))
    
    
   }

   const fatchAdminCategory = async () => {
    
    const adminsCategory = await axios.get(
      "https://yourstorebackend.vercel.app/api/category/fatch-AdminCategoorys",
      {
        withCredentials: true,
      }
    );
  
   
   dispatch(setAllCategory(adminsCategory.data.data))
   
    
  };

  const getUserOrder= async()=>{
    const response = await axios.get('https://yourstorebackend.vercel.app/api/order/order-list',{
      withCredentials: true
    })
  
  
   dispatch(setUserOrder(response.data.data))
    
  }

  const getAdminOrder= async()=>{
    const response = await axios.get('https://yourstorebackend.vercel.app/api/order/admin-order-list',{
      withCredentials: true
    })
  
   dispatch(setAdminOrder(response.data.data))
    
  }

  const getCartItem = async ()=>{
    const  response = await axios.get("https://yourstorebackend.vercel.app/api/cart/get",{
       withCredentials: true
     })
 
      
      dispatch(setCartProduct(response.data.data))
      
     
   }


  const fatchAllProduct = async ()=>{
    const response = await axios.get('https://yourstorebackend.vercel.app/api/product/get',{
      withCredentials:true
    })

    dispatch(setAllProducts(response?.data?.data))

   
    
  }

  const getAddress =async ()=>{
         const response = await axios.get("https://yourstorebackend.vercel.app/api/address/get-address",{withCredentials:true})
  
        
         dispatch(setAddress(response?.data?.data))
         
    }


  useEffect(()=>{
    getUserHandler()
    fatchAdminCategory()
    fatchAllProduct()
    getCartItem()
    getAddress()
    getUserOrder()
   
    
  },[fatchAdminCategory,getUserOrder, getCartItem, fatchAllProduct,getAddress])

 
  return (
   <>
      <Header/>
      <main className='min-h-[78vh]   ' >
          <Outlet/>
      </main>
      <Footer/>
      
      <Toaster/>
   </>
  )
}

export default App
