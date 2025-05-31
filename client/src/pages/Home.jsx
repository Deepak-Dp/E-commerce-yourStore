import React, { useEffect, useState } from "react";
import banner from "../assets/banner.webp";
import mobileBanner from "../assets/mobileBanner2.jpg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setAllProducts, setCartProduct } from "../store/product/productSlice";
import ProductCard from "../components/ProductCard";

function Home() {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const productList = useSelector((state) => state.product.allProduct);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRedirectCategoryProduct = (name, id) => {
    

    const url = `/category-${name}/id-${id}`;

    navigate(url);
  };

  const getCartItem = async () => {
    const response = await axios.get("https://yourstorebackend.vercel.app/api/cart/get", {
      withCredentials: true,
    });

    
    dispatch(setCartProduct(response.data.data));
  };

  const fatchAllProduct = async () => {
    const response = await axios.get("https://yourstorebackend.vercel.app/alhost:5000/api/product/get", {
      withCredentials: true,
    });

    dispatch(setAllProducts(response?.data?.data));
  };

  const fatchcategory = async () => {
    setLoading(true);
    const response = await axios.get("https://yourstorebackend.vercel.app/api/category/get", {
      withCredentials: true,
    });

    setCategoryData(response?.data?.data);

    setLoading(false);
  };

  useEffect(() => {
    fatchcategory();
    fatchAllProduct();
    getCartItem();
  }, []);
  return (
    <section className=" h-full w-full   ">
      <div className="h-full w-full flex justify-center mt-2 ">
        <div
          className={`h-[250px] w-[95%] mt-2 bg-blue-200 hidden md:block  ${
            !banner && animate - pulse
          } rounded-md `}
        >
          <img
            src={banner}
            className="h-full w-full rounded-2xl  "
            alt=""
          />
        </div>

        <div
          className={`h-[130px] w-[95%] bg-blue-200  md:hidden  ${
            !banner && animate - pulse
          } rounded-md `}
        >
          <img
            src={mobileBanner}
            className="h-full w-full rounded-md border-2 border-orange-400 "
            alt=""
          />
        </div>
      </div>

      <div className=" justify-center grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 p-2 md:mx-4 lg:mx-8 ">
        {loading &&
          new Array(12).fill(null).map((c, index) => {
            return (
              <div
                key={index + c}
                className="p-4 flex flex-col h-[163px] gap-2 bg-white rounded-md shadow animate-pulse"
              >
                <div className="h-[140px]  rounded-md  bg-blue-100"></div>

                <div className=" bg-blue-100 rounded-md h-[50px] "></div>
              </div>
            );
          })}
      </div>

      <h1 className="font-serif font-semibold -mt-2 mb-2 pl-4 md:pl-6 lg:pl-9 text-lg lg:text-xl">
        {categoryData.length > 0 ? "All Categories " : ""}{" "}
      </h1>

      <div className=" justify-center grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2 md:mx-4 -mt-3 lg:mx-8 ">
        {categoryData.map((data, index) => {
          return (
            <div
              onClick={() => {
                handleRedirectCategoryProduct(data?.name, data?._id);
              }}
              key={data + index}
              className="p-4 flex flex-col justify-center min-h-[150px] cursor-pointer border  border-orange-400 bg-white rounded-md shadow "
            >
              <img
                src={data.image}
                className="h-[100px] rounded-md object-cover"
                alt=""
              />
              <h1 className="text-center text-ellipsis line-clamp-1 font-serif font-semibold mt-2">
                {data.name}
              </h1>
            </div>
          );
        })}
      </div>

      <p className="bg-gray-500 h-[2px] w-[99vw] mt-2 mb-3"></p>

      <h1 className="font-serif font-semibold -mt-2 mb-2 pl-4 md:pl-6 lg:pl-9 text-lg lg:text-xl">
        {productList.length >= 0 ? "All Products " : ""}{" "}
      </h1>

      <div className=" justify-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 p-4 md:mx-4 -mt-3 lg:mx-8 ">
        {productList.map((data, index) => {
          return <ProductCard key={data + index} data={data} />;
        })}
      </div>
    </section>
  );
}

export default Home;
