import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
   
   
 useEffect(()=>{
    if(!location?.state?.email){
        navigate('/')
    }
 },[])

  const [data, setData] = useState({
    email: location?.state?.email,
    newPassword: "",
    confirmPassword: "",
  });

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

    const response = await axios.put(
      "http://localhost:5000/api/user/reset-Password",
      data,
      {
        withCredentials: true,
      }
    );

    console.log(response);

    if (response?.data?.success) {
      toast.success(response?.data?.message);
      navigate("/login");
    } else {
      toast.error(response?.data?.message);
    }
  };

  console.log(data);

  return (
    <section className="h-full w-full flex items-center  justify-center mt-4 pb-4">
      <div className="h-[80%] lg:h-[75%] lg:w-[500px] w-[280px]  bg-white ">
        <div className="flex items-center justify-between p-3 lg:p-5">
          <h1 className="text-2xl font-bold font-serif">Reset Password</h1>
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
              newPassword:
            </label>

            <input
              type="password"
              value={data.newPassword}
              name="newPassword"
              onChange={handleOnChange}
              placeholder="Enter Your newPassword."
              className="w-[260px]  lg:w-[400px] bg-slate-100  h-8 outline-none font-semibold px-4 border-2 border-gray-300 hover:border-orange-300 rounded-sm "
            />
          </div>

          <div className="flex flex-col ">
            <label htmlFor="" className="font-serif font-bold text-xl">
              Confirm-Password:
            </label>

            <input
              type="password"
              placeholder="Enter Your Confirm Password."
              value={data.confirmPassword}
              name="confirmPassword"
              onChange={handleOnChange}
              className="w-[260px]  lg:w-[400px] bg-slate-100  h-8 outline-none font-semibold px-4 border-2 border-gray-300 hover:border-orange-300 rounded-sm "
            />
          </div>

          <button
            className="w-[260px] mb-7 lg:w-[400px] bg-blue-600  h-8 outline-none 
                 px-4 hover:bg-blue-900 rounded-sm text-lg font-serif font-bold text-white "
          >
            {" "}
            Reset Password{" "}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ResetPassword;
