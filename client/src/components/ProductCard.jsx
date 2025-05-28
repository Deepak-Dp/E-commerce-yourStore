import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";


function ProductCard({ data }) {
  

  const dispatch = useDispatch(); 

  const [wait, setWait] = useState(false);

  const url = `${data.name}-${data._id}-${data.category[0]._id}`;
  
  
  const navigate = useNavigate();

  const handleRidirectpage = (data) => {
    console.log("log=>", data);
    navigate(`/product/-${url}`, {
      state: data,
    });
  };

  

  

  return (
    <section>
      <div className="p-2  flex flex-col justify-center min-h-[250px]  bg-white rounded-md shadow-lg cursor-pointer border border-orange-400 ">
        <div
          onClick={() => {
            handleRidirectpage(data);
          }}
          className=" flex flex-col"
        >
          <img
            src={data.image[0]}
            className="h-[200px] cursor-pointer w-[90%]   rounded-md object-fill"
            alt=""
          />
          {data.stock == 0 && (
            <p className=" absolute  mt-20 ml-16 rounded-md px-2 p-1 bg-opacity-80 text-white font-serif font-semibold bg-red-500">
              Out of Stock
            </p>
          )}

          <h1 className="text-center text-ellipsis line-clamp-1 font-serif font-medium mt-2">
            {data.name}
          </h1>
        </div>

        <p className="p-1 rounded-md bg-blue-200 w-24 pl-2 font-sans font-semibold mt-1">
          Unit: {data.unit}
        </p>
        <div className=" flex justify-start mt-1 gap-3">
          <strike className="font-sans font-bold text-gray-500">
            ₹{data.discount}
          </strike>
          <p className="font-sans font-bold">₹{data.price}</p>
        </div>

        <div className="flex justify-between my-3 ml-auto mr-3 ">
         
          {
            data.stock ==0 ? (
             <div className="flex w-full justify-center">
               <button className="py-1 px-5 border-2  border-orange-400 font-serif font-bold  rounded-md">
            Out Of Stock
             </button>
             </div>
            ):(
             <AddToCartButton  data={data}/>
            )
          }
          
       
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
