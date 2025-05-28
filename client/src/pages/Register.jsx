import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/auth/auth";




function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
   const [wait, setWait] = useState(false);

   const dispatch = useDispatch()
  
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
  setWait(true)
    dispatch(registerUser(data)).then((data)=>{
      setWait(false)
      if(data.payload.success){
        toast.success(data.payload.message)
        navigate('/login')
        data({
          name: "",
          email: "",
          password: ""
        })
      }else{
        toast.error(data.payload.message)
      }
      
    })
   
  };

  return (
    <section className="h-full w-full flex items-center    justify-center mt-3 ">
      <div className="h-[90%] lg:h-[80%] lg:w-[500px] w-[280px] rounded-md bg-white ">
        <div className="flex items-center justify-between p-3 lg:p-5">
          <h1 className="text-2xl font-bold font-serif">Register User</h1>
          <Link to={"/"}>
            <ImCross className="text-red-600 hover:text-red-900 cursor-pointer" />
          </Link>
        </div>

        <form
          className=" flex flex-col items-center justify-center gap-6"
          onSubmit={submitHandler}
        >
          <div className="flex flex-col ">
            <label htmlFor="" className="font-serif font-bold text-xl">
              Name:
            </label>

            <input
              type="text"
              placeholder="Enter Your Name."
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="w-[260px]  lg:w-[400px] bg-slate-100 h-8 outline-none font-semibold px-4 border-2 border-gray-300 hover:border-orange-300 rounded-sm "
            />
          </div>

          <div className="flex flex-col ">
            <label htmlFor="" className="font-serif font-bold text-xl">
              Email:
            </label>

            <input
              type="text"
              value={data.email}
              name="email"
              onChange={handleOnChange}
              placeholder="Enter Your Email Id."
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
              onChange={handleOnChange}
              className="w-[260px]  lg:w-[400px] bg-slate-100  h-8 outline-none font-semibold px-4 border-2 border-gray-300 hover:border-orange-300 rounded-sm "
            />
          </div>

         {
          wait ? (  <button
            className="w-[260px]  lg:w-[400px]   h-8 outline-none 
                 px-4 bg-blue-900 rounded-sm text-lg font-serif font-bold text-white ">
            Wait......</button>):
            ( <button
              className="w-[260px]  lg:w-[400px] bg-blue-600  h-8 outline-none 
                   px-4 hover:bg-blue-900 rounded-sm text-lg font-serif font-bold text-white ">
              SignUp</button>)
         }

          <p className="font-serif text-lg mb-5 ">
            Already Have a Account?
            <Link to={"/login"} className="text-blue-600 hover:text-blue-900">
              {" "}
              login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
