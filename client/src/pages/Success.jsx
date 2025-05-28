import React from 'react'
import { Link } from 'react-router-dom'

function Success() {
  return (
    <section className='h-screen w-full flex  justify-center sm:mt-10'>

        <div className=' text-center bg-orange-300 h-full lg:h-[200px] md:h-[200px] w-[400px] p-4 rounded-md'> 
            <h1 className='text-2xl mt-4 font-bold'>Order Placed Successfully</h1>
            <p className=''>Your order has been placed successfully</p>
            
            <div className='flex flex-col'>
            <Link to={'/dashboard/order'} className='mt-3 font-medium font-sans bg-black text-white rounded-md w-[105px] ml-[90px] lg:ml-[133px] md:ml-[133px]  py-[1px]'>View Order</Link>
            <Link to='/'>
                
            <button className='border-2 border-orange-600 font-medium hover:scale-105 duration-200  mt-4 px-4 py-1'> Go To Home </button>
    
            </Link>
            </div>
    </div>

    </section>
  )
}

export default Success