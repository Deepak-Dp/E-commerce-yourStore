import React from 'react'
import UserMenu from '../components/UserMenu'
import { Link } from 'react-router-dom'
import { IoClose } from "react-icons/io5";

function User() {

  return (
    <div className='h-auto w-auto p-5 bg-white font-serif font-semibold block lg:hidden'>
    
    <Link to={'/'} className='flex justify-end cursor-pointer hover:text-orange-400'>
    <IoClose size={25}/>
    </Link>
         
        <UserMenu/>
    </div>
  )
}

export default User