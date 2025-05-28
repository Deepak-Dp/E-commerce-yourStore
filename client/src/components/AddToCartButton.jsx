import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCartProduct } from '../store/product/productSlice';
import toast from 'react-hot-toast';

function AddToCartButton({data}) {
   

    const [isAvailableCart, setIsAvailableCart] = useState()
    

    const dispatch = useDispatch()
    
  const getCartItem = async ()=>{
    const  response = await axios.get("http://localhost:5000/api/cart/get",{
       withCredentials: true
     })
 
    
      dispatch(setCartProduct(response.data.data))
      
     
   }

  
   const cartItems = useSelector(state => state.product.allCartProduct)




    useEffect(()=>{
     
 
        const checkingitem = cartItems.some(item => item.productId._id === data._id)
        

        
        setIsAvailableCart(checkingitem)

        
       
       
    },[data,cartItems])

   
    
    
    const [wait,setWait] = useState(false)
  const addToCartHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setWait(true);
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId: data._id },
        {
          withCredentials: true,
        }
      );

     

      if (response.data.success) {
        toast.success(response.data.message);
        setWait(false)
        getCartItem()
      } else {
        toast.error(response.data.message);
      }

      
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setWait(false);
  };

 



  return (
    <div>
        {
            isAvailableCart ? ( 
                <Link to={'/viewcart'}>
                <button className="py-1 px-5 border-2 border-orange-400 hover:bg-orange-400 hover:text-white font-serif font-bold  rounded-md">
                Go to cart
              </button>
                </Link>
            ):(
               
               wait ? (
                <button onClick={addToCartHandler} className="py-1 w-[120px] border-2 border-orange-400 hover:bg-orange-400 hover:text-white font-serif font-bold  rounded-md">
                   wait
                 </button>
               ):(
                <button onClick={addToCartHandler} className="py-1 px-4 border-2 border-orange-400 hover:bg-orange-400 hover:text-white font-serif font-bold  rounded-md">
                Add to cart
                 </button>
               )
             
            )
        }
    </div>
  )
}

export default AddToCartButton