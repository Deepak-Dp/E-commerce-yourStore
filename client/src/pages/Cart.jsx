import React, { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { data, Link, useNavigate } from "react-router-dom";
import emptyImage from "../assets/no-data-display.jpg";
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import DeleteCartItem from "../components/DeleteCartItem";
import axios from "axios";
import { setAddress, setCartProduct } from "../store/product/productSlice";
import toast from "react-hot-toast";


function Cart() {
  const cartItem = useSelector((state) => state.product.allCartProduct);
  const [totalPrice, setTotalPrice] = useState();
  const [totalDiscountPrice, setTotalDiscountPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [totalItemInCart, setTotalItemInCart] = useState('')
  const [removeProductId, setRemoveProductId] = useState();
  const [openReoveConfirmBox, setOpenRemoveConfirmBox] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const getCartItem = async () => {
    const response = await axios.get("https://yourstorebackend.vercel.app/api/cart/get", {
      withCredentials: true,
    });

   
    dispatch(setCartProduct(response.data.data));
  };

  const getAddress = async () => {
    const response = await axios.get(
      "https://yourstorebackend.vercel.app/api/address/get-address",
      { withCredentials: true }
    );

    dispatch(setAddress(response?.data?.data));
  };

  const colculateTotalPrice = () => {
    let total = 0;
    cartItem.map((data) => {
      total = total + data.productId.price * data.quantity;
    });
    setTotalPrice(total);
  };

  const colculateTotalDiscountPrice = () => {
    let total = 0;
    cartItem.map((data) => {
      total = total + data.productId.discount * data.quantity;
    });
    setTotalDiscountPrice(total);
  };


  const colcutateTotalCartItem = ()=>{
    let  total = 0;
    cartItem.map((data)=>{
      total = total + data.quantity
    })
    setTotalItemInCart(total)
  }

  

  const openConfirmBoxHandler = () => {
    setOpenRemoveConfirmBox(!openReoveConfirmBox);
  };

  const updateQuantityHandler = async ({id,quantity}) => {
    
  
   
    setLoading(true);
    const response = await axios.put(`https://yourstorebackend.vercel.app/api/cart/updata-cart-item/${id}`,{quantity},
      { withCredentials: true }
    );
    

    if (response?.data?.success) {
      toast.success(response.data.message);
      getCartItem();
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };


const redirectTocheckout = ()=>{
  getAddress()
  navigate('/checkout',{state:{data:cartItem, totalPrice:totalPrice, totalItem:totalItemInCart }})
}


  useEffect(() => {
    colculateTotalPrice();
    colculateTotalDiscountPrice();
    colcutateTotalCartItem()
    setDiscountPrice(totalDiscountPrice - totalPrice);
  },[colcutateTotalCartItem]);

  return (
    <section className="h-full w-full flex  flex-col  md:flex-row justify-center mb-3 md:gap-3 ">
      <div className="w-full md:w-[40%] max-h-[550px]  lg:w-[40%] md:mt-4 bg-white  md:border-2 border-gray-400 md:rounded-md  md:p-4">
        <div className=" flex justify-start  items-center pt-2 gap-7">
          <Link to={"/"}>
            {" "}
            <GoArrowLeft size={25} />{" "}
          </Link>
          <h1 className="font-serif font-semibold text-lg">My Cart</h1>
        </div>

        <p className="h-[2px] w-[100%] mt-1 bg-gray-200"></p>

        {!cartItem[0] && (
          <div className=" flex flex-col justify-center mt-4">
            <img
              src={emptyImage}
              className=" lg:w-[500px] w-[300px] h-[300px] lg:h-[400px]"
            />
            <Link to={"/"} className=" flex justify-center">
              <button className="py-1 mb-3 text-lg rounded-md hover:bg-white hover:text-orange-400 hover:border-2 hover:border-orange-400 px-5 font-serif font-bold bg-orange-400 text-white">
                Shop now
              </button>
            </Link>
          </div>
        )}

        <div className=" max-h-[400px] overflow-hidden overflow-y-scroll scrollbar flex flex-col justify-start gap-1 mt-1">
          {cartItem.map((data, index) => {
            return (
              <div
                key={data + index}
                className="border-b-2  border-gray-200 flex flex-col"
              >
                <div
                  key={data + index + "cart"}
                  className="  pb-2  flex justify-evenly gap-3"
                >
                  <div className=" w-[30%] flex items-center">
                    <div className="h-[100px] w-[100px] rounded-md border-2 flex  border-orange-400">
                      <img
                        src={data.productId.image[0]}
                        alt=""
                        className="rounded-md"
                      />
                    </div>
                  </div>
                  <div className=" w-[50%] flex flex-col mt-3">
                    <h1 className=" font-serif font-semibold  ">
                      {data.productId.name}
                    </h1>
                    {data.productId.color && (
                      <h1 className="font-serif font-semibold ">
                        Color:{" "}
                        <span className="font-serif font-medium text-gray-600">
                          {data.productId.color}
                        </span>
                      </h1>
                    )}
                    <h1 className=" font-serif font-semibold  ">
                      Quantity:{" "}
                      <span className="font-sans font-medium text-gray-600">
                        {data.quantity}
                      </span>
                    </h1>
                    <h1 className=" font-serif font-semibold  ">
                      <strike className="font-sans font-medium">
                        ₹{data.productId.discount}
                      </strike>{" "}
                      <span className="font-sans font-medium text-green-600">
                        ₹{data.productId.price}
                      </span>
                    </h1>

                    <h1 className=" hidden md:block font-serif font-semibold  ">
                      Total Price:{" "}
                      <span className="font-sans font-medium text-gray-600">
                        ₹{data.productId.price * data.quantity}
                      </span>
                    </h1>
                  </div>
                </div>

                <h1 className="md:hidden  mx-auto font-serif font-semibold  ">
                  Total Price: ₹
                  <span className="font-sans font-medium text-gray-600">
                    {data.productId.price * data.quantity}
                  </span>
                </h1>

                <div className="flex justify-between w-[90%] mt-2 mx-auto gap-3  items-center mb-3">
                  <div className="flex justify-center  border-2  border-orange-400 ">
                    <button
                    disabled={data.quantity===1}
                       onClick={()=>
                        
                        updateQuantityHandler({id:data._id,quantity:data.quantity-1})
                       }
                    className=" font-serif font-bold px-3 text-xl hover:text-white hover:bg-orange-400">
                     <TiMinus/>
                    </button>
                    <p className="border-l-2 px-4 font-sans font-semibold text-xl border-r-2 border-orange-400">
                      {data.quantity}
                    </p>
                    <button onClick={()=> updateQuantityHandler({id:data._id, quantity:data.quantity+1})} className="font-serif font-bold px-3 text-xl hover:text-white hover:bg-orange-400">
                     <FaPlus/>
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setRemoveProductId(data._id);
                        openConfirmBoxHandler();
                      }}
                      className="font-serif font-bold border-2 border-orange-400 px-2 md:px-5 text-gray-500 hover:text-white hover:bg-orange-400 rounded-md text-xl"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {cartItem[0] && (
          <>
            <p className="h-[2px]  bg-slate-300"></p>
            <div className="flex justify-end mt-5 ">
              <button
             onClick={redirectTocheckout}
              className="py-2 mb-2 mr-2 px-8 font-serif font-bold text-white rounded-md bg-orange-400">
                Place Order
              </button>
            </div>
          </>
        )}
      </div>

      {cartItem[0] && (
        <div className="w-full  md:w-[30%] h-full lg:w-[30%] mt-1 md:mt-4 bg-white  md:border border-gray-400 md:rounded-md p-4">
          <h1 className="font-serif font-semibold text-lg">Price Details</h1>
          <p className="h-[2px] w-[100%] mt-1 bg-gray-200"></p>
          <div className="flex justify-between mt-3">
            <h1 className="font-serif font-semibold">
              Price (<span className="font-sans">{totalItemInCart}</span> items)
            </h1>
            <h1 className="font-sans font-semibold">₹{totalDiscountPrice}</h1>
          </div>
          <div className="flex justify-between mt-3">
            <h1 className="font-serif font-semibold">Discount</h1>
            <h1 className="font-sans font-semibold">- ₹ {discountPrice}</h1>
          </div>
          <div className="flex justify-between mt-3">
            <h1 className="font-serif font-semibold">Delivery Charges</h1>
            <h1 className="">
              {" "}
              <strike className="text-gray-700 font-medium"> ₹40 </strike>{" "}
              <span className="text-green-800"> Free </span>
            </h1>
          </div>
          <p className="h-[2px] w-[100%] mt-1 bg-gray-200"></p>
          <div className="flex justify-between mt-3 text-lg">
            <h1 className="font-serif font-semibold">Total Amount</h1>
            <h1 className="font-sans font-bold">₹{totalPrice}</h1>
          </div>

          <p className="h-[2px] w-[100%] mt-1 bg-gray-200"></p>

          <div className="flex justify-between mt-3">
            <h1 className="font-serif font-semibold text-green-600 text-lg">
              You will save{" "}
              <span className="font-sans font-semibold">₹{discountPrice}</span>{" "}
              on this order
            </h1>
          </div>
        </div>
      )}

      {openReoveConfirmBox && (
        <DeleteCartItem
          openConfirmBoxHandler={openConfirmBoxHandler}
          id={removeProductId}
        />
      )}

      
    </section>
  );
}

export default Cart;
