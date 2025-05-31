import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AddAddress from "../components/AddAddress";
import { setAddress, setCartProduct } from "../store/product/productSlice";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

function CheckoutPage() {
  const address = useSelector((state) => state.product.allAddress);
  const cartProduct = useSelector((state) => state.product.allCartProduct);
  const location = useLocation();
  const [totalPrice, setTotalPrice] = useState();
  const [totalItemInCart, setTotalItemInCart] = useState("");

  const [open, setOpen] = useState(false);
  const [waitcashOnDelivery, setWaitcashOnDelivery] = useState(false);

  const [cartData, setCartData] = useState(location?.state);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const openHandler = () => {
    setOpen(!open);
  };

  const colculateTotalPrice = () => {
    let total = 0;
    cartProduct.map((data) => {
      total = total + data.productId.price * data.quantity;
    });
    setTotalPrice(total);
  };

  const colcutateTotalCartItem = () => {
    let total = 0;
    cartProduct.map((data) => {
      total = total + data.quantity;
    });
    setTotalItemInCart(total);
  };

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

  
  

  const onsubmitHandler = async () => {
    if (selectedAddress === null) {
      return toast.error("Please select address");
    }
    setWaitcashOnDelivery(true);
    const response = await axios.post(
      "https://yourstorebackend.vercel.app/api/order/cash-on-delivery",
      {
        addressId: address[selectedAddress]._id,
        totalPrice: totalPrice,
        totalItemInCart: totalItemInCart,
        ProductDetails: cartProduct,
      },
      { withCredentials: true }
    );

    if (response?.data?.success) {
      getCartItem();
      navigate("/success");
      toast.success(response?.data?.message);
    } else {
      toast.error(response?.data?.message);
    }

    setWaitcashOnDelivery(false);
  };

 

  useEffect(() => {
    colculateTotalPrice();
    colcutateTotalCartItem();
  }, [colculateTotalPrice, colcutateTotalCartItem]);

  return (
    <section className="h-full w-full flex  flex-col  md:flex-row justify-center mb-3 md:gap-3 ">
      <div className="w-full md:w-[50%]  p-4  lg:w-[40%] md:mt-4 bg-white  md:border-2 border-gray-400 md:rounded-md  md:p-4">
        <h1 className="font-serif font-semibold text-xl text-gray-700">
          Choose your address
        </h1>
        <div className=" w-full mt-1  rounded-sm bg-blue-100 p-2">
          {address.map((data, index) => {
            return (
              <div
                key={data + index}
                className="flex justify-start gap-1 border-2 px-2  border-gray-300 rounded-sm bg-white m-3"
              >
                <input
                  type="radio"
                  id="address"
                  value={index}
                  onChange={(e) => setSelectedAddress(index)}
                  name="address"
                  size={20}
                  className="-mt-20 "
                />
                <label htmlFor="address1">
                  <div className="flex flex-col p-3 ">
                    <p className="text-sm font-semibold">{data.address_line}</p>
                    <p className="text-sm font-semibold">
                      {data.city} - {data.pincode}
                    </p>
                    <p className="text-sm font-semibold">{data.state}</p>
                    <p className="text-sm font-semibold">{data.country}</p>
                    <p className="text-sm font-semibold">{data.mobile}</p>
                  </div>
                </label>
              </div>
            );
          })}

          <div className="  bg-blue-100">
            <div
              onClick={openHandler}
              className=" cursor-pointer border-2 text-center py-3 text-lg font-sans font-semibold border-dashed border-gray-300 rounded-sm bg-white m-3"
            >
              Add Address
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  md:w-[40%] h-full lg:w-[30%] mt-1 md:mt-4 bg-white  md:border border-gray-400 md:rounded-md p-4">
        <h1 className="font-serif font-semibold text-xl text-gray-700">
          Summary
        </h1>
        <div className="flex flex-col gap-2 mt-2 p-4">
          <h2 className="font-sans font-semibold">Bill details</h2>
          <div className="flex justify-between">
            <p className="font-sans font-semibold">Total Amount</p>
            <p className="font-sans font-semibold">₹{totalPrice}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-sans font-semibold">Quntity total</p>
            <p className="font-sans font-semibold">{totalItemInCart} item</p>
          </div>

          <div className="flex justify-between">
            <p className="font-sans font-semibold">Delivery Charge</p>
            <p className="font-sans font-semibold">
              <strike>₹40 </strike> Free
            </p>
          </div>

          <button
            // onClick={onlinePaymentHandler}
            className="w-full py-2 mt-1 bg-green-600 rounded-sm hover:bg-green-900 text-white text-lg font-sans font-semibold"
          >
            Online Payment
          </button>
          <button
            onClick={onsubmitHandler}
            className="w-full py-1 border-2 border-green-600 hover:border-green-900 hover:text-white text-green-900 hover:bg-green-900 rounded-sm text-lg font-sans font-semibold"
          >
            {waitcashOnDelivery ? "Processing..." : "Cash On Delivery"}
          </button>
        </div>
      </div>

      {open && <AddAddress openHandler={openHandler} getAddress={getAddress} />}
    </section>
  );
}

export default CheckoutPage;
