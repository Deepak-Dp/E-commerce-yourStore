import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

function OrderDetailsPage() {
  const location = useLocation();
  const data = location.state;
  const [openConfirmCancelOrder, setOpenConfirmCancelOrder] = useState(false);
  const [cancelOrder, setCancelOrder] = useState('Rejected');
  const [orderId, setOrderId] = useState(data.orderId);

 const openCancelOrderHandler=()=>{
   setOpenConfirmCancelOrder(!openConfirmCancelOrder); 
  }

 const cancelOrderHandler= async()=>{
  const response = await axios.put('http://localhost:5000/api/order/update-order-status',{
    orderId: orderId,
    orderStatus: cancelOrder
  },{
    withCredentials: true
  })
  

  if(response.data.success){
    toast.success(response.data.message)
    openCancelOrderHandler()
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
       <Link to={'/dashboard/order'} className="-mr-6"> <IoClose size={25} className="text-red-500 "/></Link>
        </div>
        <p className="font-sans font-medium ">Order ID: {data.orderId}</p>
        <p className="font-sans font-medium ">
          Order Date: {data.createdAt.substring(0, 10)}
        </p>
        <p className="font-sans font-medium ">
          Delivery
          Address: {data.delivery_address.address_line}{" "}

          {data.delivery_address.city}{' '} {data.delivery_address.state}{" "} {data.delivery_address.country}{" "}
          - {data.delivery_address.pincode}
        </p>
        <p className="font-sans font-medium">Phone number: {data.delivery_address.mobile
        }</p>
        <p className="font-sans font-medium ">
          Order Status:{" "}
          {data.order_status === "pending" && (
                  <h2 className="font-medium text-lg bg-black text-white px-2 rounded-lg">
                    {data.order_status}
                  </h2>
                )}
                {data.order_status === "Rejected" && (
                  <h2 className="font-medium text-lg bg-red-500 text-white px-2 rounded-lg">
                    {data.order_status}
                  </h2>
                )}

                {data.order_status === "In Process" && (
                  <h2 className="font-medium text-lg bg-green-400 text-white px-2 rounded-lg">
                    {data.order_status}
                  </h2>
                )}

                {data.order_status === "In Shoipping" && (
                  <h2 className="font-medium text-lg bg-green-400 text-white px-2 rounded-lg">
                    {data.order_status}
                  </h2>
                )}

                {data.order_status === "Delivered" && (
                  <h2 className="font-medium text-lg bg-green-700 text-white px-2 rounded-lg">
                    {data.order_status} <span className="text-orange-600">✔</span> 
                  </h2>
                )}

        </p>
        <p className="font-sans font-medium ">Order Price: ₹{data.totalAmt}</p>
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

{
              data.order_status === "pending" &&  <button onClick={openCancelOrderHandler} className="text-center w-full mt-3 py-[3px] rounded-md text-white  duration-300 hover:bg-red-800 bg-red-500">Cancel Order</button>
        
           }
            {
              data.order_status === "In Process" &&  <button onClick={openCancelOrderHandler} className="text-center w-full mt-3 py-[3px] rounded-md text-white  duration-300 hover:bg-red-800 bg-red-500">Cancel Order</button>
        
           }
            {
              data.order_status === "In Shipping" &&  <button onClick={openCancelOrderHandler} className="text-center w-full mt-3 py-[3px] rounded-md text-white  duration-300 hover:bg-red-800 bg-red-500">Cancel Order</button>
        
           }
               
        </p>
      </div>


      {
        openConfirmCancelOrder && (
            <section className="fixed left-0 right-0 bottom-0 top-0 bg-opacity-70 bg-slate-300 z-50 flex justify-center items-center">
                   <div className="w-[95%] lg:w-[50%] bg-white rounded-md p-4">
                     <div className="flex justify-between">
                       <h1 className="font-serif font-bold text-lg">Permanent Cancelled Order</h1>
                       <IoClose
                         onClick={openCancelOrderHandler}
                         size={25}
                         className=" hover:text-orange-400 cursor-pointer"
                       />
                     </div>
             
                     <p className="font-sans font-semibold text-gray-600">
                     Are you sure want to permanent cancel Order?
                     </p>
             
                     <div className=" flex gap-2 mt-2 justify-end">
                       <button
                         onClick={openCancelOrderHandler}
                         className=" py-[2px] px-3 border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white font-serif font-semibold rounded-md "
                       >
                         Back
                       </button>
                       <button 
                       onClick={cancelOrderHandler}
                        className=" py-[2px] px-3 border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white font-serif font-semibold rounded-md">
                         Confirm
                       </button>
                     </div>
                   </div>
                 </section>
        )
      }
     
    </section>
  );
}

export default OrderDetailsPage;
