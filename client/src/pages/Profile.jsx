import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import toast from "react-hot-toast";
import { getUserdetails, uploadAvatar } from "../store/auth/getUser";

function Profile() {
  const user = useSelector((state) => state.user);

  const [data, setData] = useState({
    name: user?.name,
    mobile: user.mobile,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const dispatch = useDispatch();
  const [wait, setWait] = useState(false);
  const [loading, setLoading] = useState(false)

  const submitAvatar = async (e) => {
    const avatar = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", avatar);
    setWait(true);
    const response = await axios.put(
      "http://localhost:5000/api/user/upload-avatar",
      formData,
      {
        withCredentials: true,
      }
    );
   
    
    if (response?.data?.success) {
      setWait(false);
      dispatch(uploadAvatar({ avatar: response?.data?.data?.avatar }));
      toast.success(response.data.message);
    } else {
      toast.success(response.data.message);
    }
  };

  useEffect(()=>{
     setData({
        name: user?.name,
        mobile: user.mobile,
     })
  },[user])


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const submitUpdateUser = async(e) =>{
    e.preventDefault()
   setLoading(true)
    const response = await axios.put("http://localhost:5000/api/user/updateUserDetails",data,{
        withCredentials: true
    })

   if(response?.data?.success){
   
    toast.success(response?.data?.message)
    
      const res = await axios.get('http://localhost:5000/api/user/get-user',{
        withCredentials: true
      })
    dispatch(getUserdetails(res?.data?.data))
    setLoading(false)
   }

   else{
    toast.error(response?.data?.message)
   }
    

  }

  return (
    <section className="w-full h-full flex flex-col items-center pt-4 lg:pl-4">
      <div className="h-[100px]  w-[100px] lg:h-[150px] lg:w-[150px] rounded-full border border-gray-400 hover:border-orange-400">
        {user?.avatar ? (
          <img
            src={user?.avatar}
            alt=""
            className="h-full w-full rounded-full"
          />
        ) : (
          <CgProfile className="h-full w-full rounded-full text-gray-400" />
        )}
      </div>

      <form className="mt-4" onSubmit={handleSubmit}>
        {!wait ? (
          <label
            htmlFor="avatar"
            className="px-3 cursor-pointer py-1 border-2 rounded-md font-serif
                font-bold hover:bg-orange-400 border-orange-400 "
          >
            Change Avatar
          </label>
        ) : (
          <div
            className="px-3 cursor-pointer w-[115px] py-1 border-2 rounded-md font-serif
                    font-bold hover:bg-orange-400 border-orange-400 "
          >
            Loading...
          </div>
        )}

        <input
          type="file"
          onChange={submitAvatar}
          id="avatar"

          className="hidden"
        />
      </form>

      <form  onSubmit={submitUpdateUser} className="flex flex-col justify-start font-serif font-semibold mt-4 gap-2">
       
        <div className="flex flex-col w-full ">
          <label htmlFor="" className="font-serif font-bold text-xl">
            User Name:
          </label>

          <input
            type="text"
            onChange={handleOnChange}
            value={data.name}
            name="name"
           
            required
            className="w-[260px]  lg:w-[400px] bg-slate-100  h-8 outline-none font-semibold px-4 border-2 border-gray-300 hover:border-orange-300 rounded-sm "
          />
        </div>

        <div className="flex flex-col w-full ">
          <label htmlFor="" className="font-serif font-bold text-xl">
            Mobile:
          </label>

          <input
            type="text"
            onChange={handleOnChange}
            placeholder="Enter mobile Number"
            value={data.mobile}
            name="mobile"
           
            required
            className="w-[260px]  lg:w-[400px] bg-slate-100  h-8 outline-none font-semibold px-4 border-2 border-gray-300 hover:border-orange-300 rounded-sm "
          />
        </div>

        <button  className="w-[260px]  lg:w-[400px] bg-slate-100  h-8 outline-none font-semibold px-4 border-2 border-gray-300 hover:border-orange-300 rounded-sm "
          >
           {
            loading ? "UpDate" : "Submit"
           }
        </button>

      </form>

      
    </section>
  );
}

export default Profile;
