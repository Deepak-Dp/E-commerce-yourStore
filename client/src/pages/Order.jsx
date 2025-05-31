import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserOrder } from "../store/product/productSlice";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState([]);

  const getUserOrder = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/order/order-list",
      {
        withCredentials: true,
      }
    );

    dispatch(setUserOrder(response.data.data));
  };

  const order = useSelector((state) => state.product.allOrder);
  

  const redirectToOrderDetails = (data) => {
    navigate("/order-details", { state: data });
  };

  useEffect(() => {
    getUserOrder();
  }, []);
  return (
    <section className="h-full w-full lg:ml-3 ">
      <h1 className="text-xl font-medium   mb-2 ">Order History</h1>
      <p className="w-[100%] h-[1.5px] bg-gray-400"></p>

      <div className="hidden md:flex flex-col">
        <div className="flex flex-row justify-between items-center   w-[75%] ml-2  mt-2">
          <h2 className="font-medium text-lg">Order ID</h2>
          <h2 className="font-medium text-lg ml-3">Order Date</h2>
          <h2 className="font-medium text-lg">Order Status</h2>
          <h2 className="font-medium text-lg">Order Price</h2>
        </div>

        <p className="w-[100%] h-[1.5px] bg-gray-400 mt-2"></p>

        {order.map((data, index) => {
          return (
            <div key={data + index}>
              <div className="flex flex-row justify-between items-center w-[95%] ml-2  mt-2">
                <h2 className="font-medium text-lg">{data.orderId}</h2>

                <h2 className="font-medium text-lg">
                  {data.createdAt.substring(0, 10)}
                </h2>
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

                {data.order_status === "In Shipping" && (
                  <h2 className="font-medium text-lg bg-green-400 text-white px-2 rounded-lg">
                    {data.order_status}
                  </h2>
                )}

                {data.order_status === "Delivered" && (
                  <h2 className="font-medium text-lg bg-green-700 text-white px-2 rounded-lg">
                    {data.order_status}{" "}
                    <span className="text-orange-600">✔</span>
                  </h2>
                )}

                <h2 className="font-medium text-lg ">₹{data.totalAmt}</h2>
                <button
                  onClick={() => {
                    redirectToOrderDetails(data);
                  }}
                  className="font-medium text-lg bg-black text-white px-2 rounded-lg"
                >
                  View Details
                </button>
              </div>
              <p className="w-[100%] h-[1.5px] bg-gray-400 mt-2"></p>
            </div>
          );
        })}
      </div>

      <div className="md:hidden flex flex-col px-1 ">
        {order.map((data, index) => {
          return (
            <div key={data + index}>
              <div className="flex flex-col justify-between items-center w-[95%] ml-2  mt-2">
                <h2 className="font-medium ">
                  Order Id: {"   "} {data.orderId}
                </h2>

                <h2 className="font-medium ">
                  Order Date: {data.createdAt.substring(0, 10)}
                </h2>
                {data.order_status === "pending" && (
                  <div className="flex gap-2">
                    <h2 className="font-medium ">Order Status:</h2>

                    <h2 className="font-medium  bg-black text-white px-2 rounded-lg">
                       {data.order_status}
                    </h2>
                  </div>
                )}
                {data.order_status === "Rejected" && (
                  <div className="flex gap-2">
                    <h2 className="font-medium">Order Status:</h2>
                    <h2 className="font-medium  bg-red-500 text-white px-2 rounded-lg">
                       {data.order_status}
                    </h2>
                  </div>
                )}

                {data.order_status === "In Process" && (
                  <div className="flex gap-2">
                    <h2 className="font-medium">Order Status:</h2>
                    <h2 className="font-medium  bg-green-400 text-white px-2 rounded-lg">
                       {data.order_status}
                    </h2>
                  </div>
                )}

                {data.order_status === "In Shipping" && (
                  <div className="flex gap-2">
                    <h2 className="font-medium">Order Status:</h2>
                    <h2 className="font-medium  bg-green-400 text-white px-2 rounded-lg">
                      {data.order_status}
                    </h2>
                  </div>
                )}

                {data.order_status === "Delivered" && (
                  <div className=" flex gap-2">
                    <h2 className="font-medium ">Order Status:</h2>
                    <h2 className="font-medium  bg-green-700 text-white px-2 rounded-lg">
                      {data.order_status}
                      <span className="text-orange-600">✔</span>
                    </h2>
                  </div>
                )}

                <h2 className="font-medium  ">₹{data.totalAmt}</h2>
                <button
                  onClick={() => {
                    redirectToOrderDetails(data);
                  }}
                  className="font-medium  bg-black text-white px-2 rounded-lg"
                >
                  View Details
                </button>
              </div>
              <p className="w-[100%] h-[1.5px] bg-gray-400 mt-2"></p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Order;
