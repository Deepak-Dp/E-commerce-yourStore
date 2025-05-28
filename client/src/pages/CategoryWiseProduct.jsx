import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import emptyImage from "../assets/no-data-display.jpg";

function CategoryWiseProduct() {

  const params = useParams()

  const categoryname = params.category.split('-')[1]
    const categoryId = params.products.split('-')[1]
    
  const products = useSelector((state) => state.product.allProduct);
 
  console.log();
  
  const filterCategoryProducts = products.filter((data) =>
    data.category[0]._id.toLowerCase().includes(categoryId)
  );

  
  
  
  
  return (
   <section className='h-full w-full  '>
       <div className='py-2 px-3 flex justify-center'>
          <h1 className='font-serif text-ellipsis line-clamp-1 font-bold text-2xl text-slate-800 lg:text-[30px]'>{categoryname}</h1>
        
       </div>
       <p className='w-[100vw] h-[2px] bg-slate-700'></p>

       <div className='m-4'>
    <h1 className='font-serif font-semibold text-lg md:text-xl'>Total Product: {filterCategoryProducts.length}</h1>
    </div>

     {
          !filterCategoryProducts[0] && (
             <div className=" flex justify-center items-center    mt-4">
                      <img
                        src={emptyImage}
                        alt=""
                        className=" lg:w-[500px] w-[300px] p-1 rounded-md h-[300px] lg:h-[400px]"
                      />
                    </div>
          )
        }
    
<div className=" justify-center grid grid-cols-1 mt-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-4 md:mx-4 lg:mx-8 ">
        {filterCategoryProducts.map((data, index) => {
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

export default CategoryWiseProduct