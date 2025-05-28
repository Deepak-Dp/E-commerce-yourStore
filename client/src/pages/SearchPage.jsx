import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import ProductCard from '../components/ProductCard';
import emptyImage from "../assets/no-data-display.jpg";


function SearchPage() {

  const params = useLocation()

  const searchText = params?.search.slice(3)

  
  

  const products = useSelector((state) => state.product.allProduct);

  const filteredProducts = products.filter((data) =>
    data.name.toLowerCase().includes(searchText) ||
    data.description.toLowerCase().includes(searchText)
  );



  return (
    <section className='h-full w-full '>

    <div className='m-4'>
    <h1 className='font-serif font-semibold text-xl'>Search Result: {filteredProducts.length}</h1>
    </div>

    {
      !filteredProducts[0] && (
         <div className=" flex justify-center items-center ml-1 mr-1  mt-4">
                  <img
                    src={emptyImage}
                    alt=""
                    className=" lg:w-[500px] w-[300px]  rounded-md h-[300px] lg:h-[400px]"
                  />
                </div>
      )
    }

   
<div className=" justify-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 p-4 md:mx-4 -mt-3 lg:mx-8 ">
        {filteredProducts.map((data, index) => {
          return (
          <div key={data+index+"product"}
          
          >
             <ProductCard  data={data}/>
          </div>
          );
        })}
      </div>

    </section>
  )
}

export default SearchPage