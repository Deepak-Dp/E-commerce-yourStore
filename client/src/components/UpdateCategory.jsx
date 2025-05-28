import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadImage from "../utils/uploadImage";

function UploadCategory({ setOpen, open,fatchAdminCategory }) {
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const [wait, setWait] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    setWait(true);
    const image = await uploadImage(file);
    setWait(false);
    setData((prev) =>{
      return {
        ...prev,
        image:image
      }
    })
  };

  const [loading, setLoading] = useState(false);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post(
      "http://localhost:5000/api/category/add",
      data,
      {
        withCredentials: true,
      }
    );

    fatchAdminCategory()

    if (response?.data?.success) {
      toast.success(response?.data?.message);
      setData({
        name: "",
        image: "",
      });
      handleOpen()
    } else {
      toast.error(response?.data?.message);
    }
    setLoading(false);
  };

  return (
    <section className=" fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-opacity-75 z-50 bg-gray-400">
      <div className=" w-[95%] lg:w-[50%] bg-white rounded-md p-4">
        <div className="flex justify-between">
          <h1 className="font-serif font-bold text-xl"> Category</h1>
          <IoClose
            onClick={handleOpen}
            size={25}
            className="hover:text-orange-400 cursor-pointer"
          />
        </div>

        <form onSubmit={SubmitHandler}>
          <div className="flex flex-col mt-2">
            <label className="font-serif font-bold text-lg">Name:</label>
            <input
              type="text"
              placeholder="Enter Category Name?"
              value={data.name}
              name="name"
              onChange={onChangeHandler}
              className="outline-none border-2 border-gray-300 font-semibold hover:border-orange-400 bg-slate-100 rounded-sm px-1 py-1 mt-1"
            />

            <label className="font-serif font-bold mt-2 text-lg">Image:</label>
          </div>

          <div className="flex justify-center  mt-1 ">
            <div className=" h-[150px] w-[150px] bg-slate-400 rounded-md border-2 border-orange-400">
              {!data.image ? (
                <div className="text-center mt-14 text-lg">No Image</div>
              ) : (
                <img
                  src={data.image}
                  alt=""
                  className=" h-full w-full rounded-md object-fill"
                />
              )}
            </div>
          </div>

          <form onChange={onSubmit}>
            {wait ? (
              <div className=" flex justify-center mt-2">
                <div
                  className="py-1 px-2 w-[100px] text-center border-2
                           border-orange-400 hover:bg-orange-400 rounded-md font-serif
                            font-semibold cursor-pointer"
                >
                  Wait..
                </div>
              </div>
            ) : (
              <label htmlFor="image" className=" flex justify-center mt-2">
                <div
                  className="py-1 px-2 w-[150px] text-center border-2
                           border-orange-400 hover:bg-orange-400 rounded-md font-serif
                            font-semibold cursor-pointer"
                >
                  Upload Image
                </div>
              </label>
            )}

            <input
              disabled={!data.name}
              type="file"
              onChange={uploadImageHandler}
              id="image"
              className="hidden"
            />
          </form>

          <button
            onSubmit={SubmitHandler}
            className="border-2 border-orange-400 bg-slate-100 w-full rounded-md
                   mt-3 font-serif font-semibold py-1 hover:bg-orange-400 "
          >
            {loading ? "uploading.." : "Add Category"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default UploadCategory;
