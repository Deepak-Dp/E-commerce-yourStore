import axios from "axios";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

function ManageOrderDetailsAdmin() {
  const location = useLocation();
  const [updateOrder, setUpdateOrder] = useState();
  const data = location.state;
  
  
  const [orderId, setOrderId] = useState(data.orderId);
  
  
 

 
  

  const updateOrderStatus= async()=>{
   
   
     const response = await axios.put('https://yourstorebackend.vercel.app/api/order/update-order-status',{
      orderId: orderId,
      orderStatus: updateOrder
    },{
      withCredentials: true
    })
    

    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
    
  }
  
  
  return (
    <section className=" w-full  flex justify-center">
      <div className="flex flex-col bg-slate-100 px-10 lg:h-[500px] md:h-[500px] lg:mt-5 md:mt-2 mb-2 overflow-scroll scrollbar md:border-2 lg:border-2 border-gray-200 py-5 lg:rounded-lg md:rounded-lg ">
        <div className="flex justify-between items-center">
          <h1 className="font-sans font-bold text-lg border-b-2 border-gray-500 ">
            Order Details
          </h1>
          <Link to={"/dashboard/manage-orders"} className="-mr-6">
            {" "}
            <IoClose size={25} className="text-red-500 " />
          </Link>
        </div>
        <p className="font-sans font-medium ">Order ID: {data.orderId}</p>
        <p className="font-sans font-medium ">
          Order Date: {data.createdAt.substring(0, 10)}
        </p>
        <p className="font-sans font-medium ">
          Delivery Address: {data.delivery_address.address_line}{" "}
          {data.delivery_address.city} {data.delivery_address.state}{" "}
          {data.delivery_address.country} - {data.delivery_address.pincode}
        </p>
        <p className="font-sans font-medium">
          Phone number: {data.delivery_address.mobile}
        </p>
        <p className="font-sans font-medium ">
          Order Status:{" "}
          <span className=" px-3  pb-1">
           <div >
            <select name="" id="" onChange={(e)=> setUpdateOrder(e.target.value)} className="text-white mt-2  px-4 bg-black rounded-lg">
              <option value={data.order_status}>{data.order_status}</option>
              <option value="pending">Pending</option>
              <option value="In Process">In Process</option>
              <option value="In Shipping">In Shipping</option>
              <option value="Delivered">Delivered</option>
              <option  value="Rejected">Rejected</option>
            </select>
            {
              data.order_status === "pending" && <button onClick={updateOrderStatus}  className="ml-5 bg-black text-white px-4 py-[1.5px] rounded-lg">Update</button>
           }
            {
              data.order_status === "In Process" && <button onClick={updateOrderStatus}  className="ml-5 bg-black text-white px-4 py-[1.5px] rounded-lg">Update</button>
           }
            {
              data.order_status === "In Shipping" && <button onClick={updateOrderStatus}  className="ml-5 bg-black text-white px-4 py-[1.5px] rounded-lg">Update</button>
           }
         
             </div>
          </span>
        </p>
        <p className="font-sans font-medium -mt-3 mb-1 ">Order Price: ₹{data.totalAmt}</p>
        <p className="font-sans font-medium border-t-2 border-gray-500 ">
          Order Items: {data.product_details.length}{" "}
          {data.product_details.map((item, index) => {
            return (
              <div key={item._id + index}>
                <p className="font-sans font-medium border-t-2  border-gray-500">
                  Product No. {index + 1}
                </p>

                <div className="flex flex-col rounded-md  px-3 py-3 mt-2 mb-2 items-center bg-white">
                  <img
                    src={item.image}
                    className="h-[100px] w-[100px]"
                    alt=""
                  />
                  <p>Product Name: {item.name}</p>
                  <p>Product Price: ₹{item.price}</p>
                  <p>Product Quantity: {item.quantity}</p>
                </div>

                <p className="w-full h-[1.5px] bg-gray-500"></p>
              </div>
            );
          })}
        </p>
      </div>
    </section>
  );
}

export default ManageOrderDetailsAdmin;
