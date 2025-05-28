import React from 'react'
import { Link } from 'react-router-dom'

function Cancel() {
  return (
      <section className='h-screen w-full flex  justify-center mt-10'>

        <div className=' text-center bg-red-500 text-white h-[200px] w-[400px] p-4 rounded-md'> 
            <h1 className='text-2xl mt-4 font-bold'>Order rejected</h1>
            <p className=''>Oops! Something went terribly wrong here</p>
            <p>Your Payment wasn't completed</p>
            
           
            <Link to='/checkout'>
                
            <button className='border-2 border-white font-medium hover:scale-105 duration-200  mt-4 px-4 py-1'> Please try again </button>
    
            </Link>
           
    </div>

    </section>
  )
}

export default Cancel