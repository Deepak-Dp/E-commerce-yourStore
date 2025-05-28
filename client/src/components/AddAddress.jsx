import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

function AddAddress({ openHandler ,getAddress}) {
  const [data, setData] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  

  const submitHandler=async (e)=>{
    e.preventDefault();
   setLoading(true)

    const response = await axios.post(
        "http://localhost:5000/api/address/add-Address",
        data,
        {
          withCredentials: true,
        }
      );
  
     
     
  
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setData({
          address_line: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
            mobile: "",
        });
        getAddress()
       openHandler();
      } else {
        toast.error(response?.data?.message);
      }

      setLoading(false)
    
  }
  return (
    <section className=" fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-opacity-75 z-50 bg-gray-400">
      <div className=" w-[95%] md:w-[60%] lg:w-[40%] bg-white rounded-md p-4">
        <div className="flex justify-between">
          <h1 className="font-serif font-bold text-xl">Add Address</h1>
          <IoClose
            onClick={openHandler}
            size={25}
            className="hover:text-orange-400 cursor-pointer"
          />
        </div>

        <form onSubmit={submitHandler}>
          <div className="flex flex-col mt-2">
            <label className="font-sans font-semibold text-lg text-gray-700">
              Address Line:
            </label>
            <input
              type="text"
              placeholder="Enter address line?"
              value={data. address_line}
              name="address_line"
              onChange={onChangeHandler}
              className="outline-none border-2 border-gray-300 font-semibold hover:border-orange-400 bg-slate-100 rounded-sm px-1 py-1 mt-1"
            />
          </div>

          <div className="flex flex-col mt-2">
            <label className="font-sans font-semibold text-lg text-gray-700">City:</label>
            <input
              type="text"
              placeholder="Enter city?"
              value={data.city}
              name="city"
              onChange={onChangeHandler}
              className="outline-none border-2 border-gray-300 font-semibold hover:border-orange-400 bg-slate-100 rounded-sm px-1 py-1 mt-1"
            />

           
          </div>

          
          <div className="flex flex-col mt-2">
            <label className="font-sans font-semibold text-lg text-gray-700">State:</label>
            <input
              type="text"
              placeholder="Enter state?"
              value={data.state}
              name="state"
              onChange={onChangeHandler}
              className="outline-none border-2 border-gray-300 font-semibold hover:border-orange-400 bg-slate-100 rounded-sm px-1 py-1 mt-1"
            />

           
          </div>

          
          <div className="flex flex-col mt-2">
            <label className="font-sans font-semibold text-lg text-gray-700">Pincode:</label>
            <input
              type="text"
              placeholder="Enter pincode?"
              value={data.pincode}
              name="pincode"
              onChange={onChangeHandler}
              className="outline-none border-2 border-gray-300 font-semibold hover:border-orange-400 bg-slate-100 rounded-sm px-1 py-1 mt-1"
            />

           
          </div>

          
          <div className="flex flex-col mt-2">
            <label className="font-sans font-semibold text-lg text-gray-700">Country:</label>
            <input
              type="text"
              placeholder="Enter country?"
              value={data.country}
              name="country"
              onChange={onChangeHandler}
              className="outline-none border-2 border-gray-300 font-semibold hover:border-orange-400 bg-slate-100 rounded-sm px-1 py-1 mt-1"
            />

           
          </div>

          
          <div className="flex flex-col mt-2">
            <label className="font-sans font-semibold text-lg text-gray-700">Mobile No:</label>
            <input
              type="text"
              placeholder="Enter mobile no?"
              value={data.mobile}
              name="mobile"
              onChange={onChangeHandler}
              className="outline-none border-2 border-gray-300 font-semibold hover:border-orange-400 bg-slate-100 rounded-sm px-1 py-1 mt-1"
            />

           
          </div>

          <button
            className="border-2 border-orange-400 bg-slate-100 w-full rounded-sm
                   mt-3 font-serif font-semibold mb-3 py-1 hover:bg-orange-400 "
          >
            {loading ? "uploading.." : "Add Address"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddAddress;
