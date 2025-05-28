import React from 'react'
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";

function Footer() {
  return (
    <section className='w-full h-20 bg-slate-500 -z-40 '>
  
  <div  >

     <p  className='text-center font-serif font-semibold text-lg  pt-3'> © Created By Deepak Verma.</p>
   

   <div className=' flex items-center justify-center gap-5  '>

    <FaInstagramSquare size={24} className='hover:text-orange-400 cursor-pointer'/>
    <FaFacebookSquare size={24} className='hover:text-orange-400 cursor-pointer'/>
    <FaTwitterSquare size={24} className='hover:text-orange-400 cursor-pointer'/>
    <FaYoutubeSquare size={24} className='hover:text-orange-400 cursor-pointer'/>


   </div>
  </div>

       
    </section>
  )
}

export default Footer