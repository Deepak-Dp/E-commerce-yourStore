import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import axios from "axios";

function ForgotPassword() {
  const [data, setData] = useState({
    email: "",
  });

  const [loader, setLoader] = useState(false);

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
    setLoader(true);
    const response = await axios.put(
      "http://localhost:5000/api/user/forgot-password",
      data,
      {
        withCredentials: true,
      }
    );

    setLoader(false);

    if (response?.data?.success) {
      toast.success(response?.data?.message);
      navigate("/verification-otp", {
        state: data,
      });
    } else {
      toast.error(response?.data?.message);
    }
  };

  

  return (
    <section className="h-full w-full flex items-center  justify-center mt-4 pb-4">
      <div className="h-[60%] lg:h-[50%] lg:w-[500px] w-[280px]  bg-white ">
        <div className="flex items-center justify-between p-3 lg:p-5">
          <h1 className="text-2xl font-bold font-serif">Forgot Password</h1>
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
              Email:
            </label>

            <input
              type="text"
              placeholder="Enter Your Email Id."
              value={data.email}
              name="email"
              onChange={handleOnChange}
              className="w-[260px]  lg:w-[400px] bg-slate-100  h-8 outline-none font-semibold px-4 border-2 border-gray-300 hover:border-orange-300 rounded-sm "
            />
          </div>
            {
              loader ? (
                <button
            className="w-[260px]  lg:w-[400px]   h-8 outline-none 
             px-4 bg-blue-900 rounded-sm text-lg font-serif font-bold text-white ">
              Sending otp
             </button>
              ):(
                <button
            className="w-[260px]  lg:w-[400px] bg-blue-600  h-8 outline-none 
             px-4 hover:bg-blue-900 rounded-sm text-lg font-serif font-bold text-white ">
              Send OTP</button>
              )
            }
          

          <p className="font-serif text-lg -mt-3 mb-5 ">
            Already Have a Account?
            <Link to={"/login"} className="text-blue-600 hover:text-blue-900">
              login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;
