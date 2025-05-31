import axios from "axios";

import toast from "react-hot-toast";

const uploadImage = async (image) =>{
    const formData = new FormData();
      formData.append("file", image);
      
      const response = await axios.post(
        "https://yourstorebackend.vercel.app/api/file/upload",
        formData,
        {
          withCredentials: true,
        }
      );
     

     
      
      if (response?.data?.success) {
       
        toast.success(response.data.message);
        return response?.data?.data
      } 

}

export default uploadImage
