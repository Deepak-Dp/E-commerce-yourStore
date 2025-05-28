import React, { useEffect } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation';

import { IoSearchSharp } from "react-icons/io5";


function Search() {
  const location = useLocation()
    const isSearch = location.pathname === '/searchPage'
    
    const navigate = useNavigate()
    const params = useLocation()
    const searchText =params.search.slice(3)

    const redirectToSearchPage = ()=>{
      navigate('/searchPage')
    }

   const handleOnChange =(e)=>{
    const value = e.target.value
    const url = `/searchPage?q=${value}`

    navigate(url)
    
   }


  
  return (
    <div className=' text-neutral-600 h-8 lg:h-9 p-3 w-[250px] md:w-[400px] lg:w-[500px] overflow-hidden font-serif flex items-center rounded-md bg-slate-200 border-2 border-neutral-400 hover:border-orange-300 hover:text-orange-400 '>

        <IoSearchSharp size={22} className='mr-3 cursor-pointer'/>
    
    {
      !isSearch ? (
        <div onClick={redirectToSearchPage}>
         
        <TypeAnimation 
      sequence={[
        
        'search "shoes"',
        1000, 
        'search "Jacket"',
        1000,
        'search "T-shirt"',
        1000,
        'search "Accessories"',
        1000,
        'search "Blazer"',
        1000,
        'search "Jeans"',
        1000,
        'search "Booties"',
        1000,
        'search "Hoodie"',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '20px', display: 'inline-block' }}
      repeat={Infinity}
    />  </div>
      ) : (
        <div>
              
              <input type="text"
              autoFocus
              defaultValue={searchText}
               onChange={handleOnChange}
               placeholder='search "products"'
                className='outline-none text-[20px]
                 bg-slate-200'
                  />
          
        </div>
      )
    }


      


    </div>
  )
}

export default Search