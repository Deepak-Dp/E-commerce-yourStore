import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


import toast from "react-hot-toast";
import axios from "axios";
import { loginUser } from "../store/auth/auth";
import { getUserdetails } from "../store/auth/getUser";


function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [wait, setwait] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    setwait(true)

    dispatch(loginUser(data)).then( async (data) => {
         setwait(false)
      if(data.payload.success){
        toast.success(data.payload.message)
        
        localStorage.setItem('accessToken', data.payload.data.accessToken)
        localStorage.setItem('refreshToken', data.payload.data.refreshToken)
        
        const response = await axios.get('http://localhost:5000/api/user/get-user',{
          withCredentials: true
        })
      dispatch(getUserdetails(response?.data?.data))
        
        
        navigate('/')
      }else{
        toast.error(data.payload.message)
      }
    })
    

    
      

    
    
     
  };

  return (
    <section className="h-full w-full flex items-center  justify-center mt-4 pb-4">
      <div className="h-[80%] lg:h-[75%] lg:w-[500px] w-[280px] rounded-md bg-white ">
        <div className="flex items-center justify-between p-3 lg:p-5">
          <h1 className="text-2xl font-bold font-serif">Login User</h1>
          <Link to={"/"}>
            <ImCross className="text-red-600 hover:text-red-900 cursor-pointer" />
          </Link>
        </div>

        <form
          className=" flex flex-col items-center justify-center pb-3 gap-6"
          onSubmit={submitHandler}
        >
          <div className="flex flex-col ">
            <label htmlFor="" className="font-serif font-bold text-xl">
              Email:
            </label>

            <input
              type="text"
              placeholder="Enter Your Email Id."
              value={data.email}
              name="email"
              onChange={handleOnChange}
              required
              className="w-[260px]  lg:w-[400px] bg-slate-100  h-8 outline-none font-semibold px-4 border-2 border-gray-300 hover:border-orange-300 rounded-sm "
            />
          </div>

          <div className="flex flex-col ">
            <label htmlFor="" className="font-serif font-bold text-xl">
              Password:
            </label>

            <input
              type="password"
              placeholder="Enter Your Password."
              value={data.password}
              name="password"
              required
              onChange={handleOnChange}
              className="w-[260px]  lg:w-[400px] bg-slate-100  h-8 outline-none font-semibold px-4 border-2 border-gray-300 hover:border-orange-300 rounded-sm "
            />
          </div>

          <Link
            to={"/Forgot-Password"}
            className=" ml-auto mr-4 text-sm font-serif font-semibold text-blue-500 cursor-pointer hover:text-blue-900 "
          >
            Forgot Password?
          </Link>

          {wait ? (
            <button
              className="w-[260px]  lg:w-[400px] bg-blue-900  h-8 outline-none 
                   px-4  rounded-sm text-lg font-serif font-bold text-white "
            >
              Wait........
            </button>
          ) : (
            <button
              className="w-[260px]  lg:w-[400px] bg-blue-600  h-8 outline-none 
           px-4 hover:bg-blue-900 rounded-sm text-lg font-serif font-bold text-white "
            >
              Login
            </button>
          )}

          <p className="font-serif text-lg ">
            Don't Have a Account?
            <Link
              to={"/register"}
              className="text-blue-600 hover:text-blue-900 "
            >
            
              register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
