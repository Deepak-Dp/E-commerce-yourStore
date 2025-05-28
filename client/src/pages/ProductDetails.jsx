import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import AddToCartButton from "../components/AddToCartButton";

function ProductDetails() {
  const location = useLocation();

  const [data, setdata] = useState(location?.state);
  const [clickedProduct, setClickedProduct] = useState([])
  const [query, setQuery] = useState(data.category[0]._id);
  const navigate = useNavigate();
  const [image, setImage] = useState("");

  const products = useSelector((state) => state.product.allProduct);

  

  

  const filterAllSimiralProducts = products.filter((data) =>
    data.category[0]._id.toLowerCase().includes(query)
  );

  const imageHandler = (img) => {
    setImage(img);
  };

  const redirectTocheckout = () => {
    navigate("/checkout", {
      state:{ data: data,totalPrice:data.price, totalItem:1},
    });
  };

 

  return (
    <section className="h-full w-full">

<div className="mt-4 ml-6">
    <Link to={'/'} className="font-serif font-bold text-xl border-2 border-orange-400 rounded-md hover:bg-orange-400 hover:text-white py-1 px-3 ">Back</Link>
</div>
    
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3  ">
        <div className="flex justify-center mt-2">
          <div className=" flex flex-col items-center my-3 ">
            <div className=" h-[350px] lg:h-[400px] w-[250px]  lg:w-[400px] bg-white border-2 border-orange-400 rounded-md">
              <img
                src={image || data.image[0] }
                className="h-full w-full object-scale-down py-4 "
                alt=""
              />
            </div>

            <div className="flex flex-wrap gap-1 mt-4 px-3">
              {data.image.map((img, index) => {
                return (
                  <div
                    key={img + index +"pro"}
                    onClick={() => {
                      imageHandler(img);
                    }}
                    className="h-[70px] w-[70px]  bg-white rounded-md border-2 cursor-pointer hover:scale-95  border-orange-400"
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full p-1  object-scale-down"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className=" flex flex-col -mt-3 md:mt-6 px-3 lg:w-[500px]">
          <h1 className="font-serif font-bold text-xl">{data.name}</h1>
          <p className="font-sans font-medium text-lg  mt-1 text-gray-700">
            {data.description}
          </p>
          <div className="flex justify-start gap-4 mt-1">
            <strike className="font-sans text-xl text-red-400 font-semibold">
              ₹{data.discount}
            </strike>
            <p className="font-sans text-xl text-green-700 font-semibold">
              ₹{data.price}
            </p>
          </div>

          <p className="font-sans font-bold text-lg text-gray-700 mt-1 ">
            Unit: {data.unit}
          </p>
          <p className="font-sans font-bold text-lg text-gray-700 mt-1 ">
            Stock: {data.stock}
          </p>

          {
            data.brand && (
              <p className="font-sans font-bold text-lg text-gray-700 mt-1 ">
              Brand: <span className="font-semibold text-orange-400">{data.brand}</span>
            </p>
            )
          }

           {
            data.color && (
              <p className="font-sans font-bold text-lg text-gray-700 mt-1 ">
              Color: <span className="font-semibold text-orange-400">{data.color}</span>
            </p>
            )
          }
          <h1 className="font-serif font-bold  text-2xl mt-1">Category :</h1>

          {data.category.map((data,index) => {
            return (
              <div key={data+index} className="ml-2">
                <p className="font-serif font-semibold text-lg text-gray-700">
                  {data.name}
                </p>
              </div>
            );
          })}
          <div className=" flex justify-between mt-4 mb-4 ml-auto mr-12">
          {
            data.stock ==0 ? (
              <button className="py-1 px-5 border-2  border-orange-400 hover:bg-orange-400 hover:text-white font-serif font-bold  rounded-md">
            Out Of Stock
             </button>
            ):(
             <AddToCartButton  data={data}/>
            )
          }
             </div>
        </div>
      </div>

      <div className=" flex flex-col mx-3 mb-3">
        <h1 className="font-serif font-bold text-xl">Explore more like this</h1>
         
         {
          filterAllSimiralProducts.length < 0 &&(
            
            <h1 className="text-center text-gray-800 text-lg font-serif font-medium">There are no similar products</h1>

          )
         }

<div className=" justify-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2  pt-4 md:mx-4 -mt-3 lg:mx-8 ">
        {filterAllSimiralProducts.map((data, index) => {
          return (
          <div key={data+index+"product"}
          onClick={()=>
           setdata(data)
          }
          >
             <ProductCard  data={data}/>
          </div>
          );
        })}
      </div>

      </div>
    </section>
  );
}

export default ProductDetails;
