import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../store/auth/auth";
import { logout } from "../store/auth/getUser";
import toast from "react-hot-toast";
import { setCartProduct } from "../store/product/productSlice";

function UserMenu({ setOpen, open }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutUser()).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        dispatch(logout());
        navigate("/");
        dispatch(setCartProduct([]));
      } else {
        toast.error(data?.payload?.message);
      }
    });
  };

  const openHandler = () => {
    setOpen(!open);
  };

  return (
    <section>
      <h1 className="text-[20px]">My Account </h1>
      <div className=" flex  justify-start items-center gap-2 mt-2">
        <h1 className="text-lg">
          {user.name}{" "}
          <span className="text-red-500">
            {user.role === "Admin" ? "(Admin)" : ""}
          </span>
        </h1>
        <Link to={"/dashboard/profile"} onClick={openHandler}>
          <FaUserEdit className="hover:text-orange-400" />
        </Link>
      </div>

      <p className="w-full bg-slate-300 h-[2px] mt-1"></p>
      <div className="flex flex-col gap-2 mt-2   text-slate-700 ">
        {user.role === "Admin" && (
          <NavLink to={"/dashboard/category"}  className={({isActive}) =>  `pl-[3px] ${isActive && "bg-orange-300 text-white" }` }
          >
            <h3
              onClick={openHandler}
              className="hover:bg-orange-300 pl-[3px] hover:text-white"
            >
              Category
            </h3>
          </NavLink>
        )}

        {user.role === "Admin" && (
          <NavLink to={"/dashboard/upload-product"}  className={({isActive}) =>  `pl-[3px] ${isActive && "bg-orange-300 text-white" }` }
          >
            <h3
              onClick={openHandler}
              className="hover:bg-orange-300 pl-[3px] hover:text-white"
            >
              Upload Product
            </h3>
          </NavLink>
        )}

        {user.role === "Admin" && (
          <NavLink  className={({isActive}) =>  `pl-[3px] ${isActive && "bg-orange-300 text-white" }` }
          to={"/dashboard/admin-product"}>
            <h3
              onClick={openHandler}
              className="hover:bg-orange-300 pl-[3px] hover:text-white"
            >
              Admin Product
            </h3>
          </NavLink>
        )}

        {user.role === "Admin" && (
          <NavLink   className={({isActive}) =>  `pl-[3px] ${isActive && "bg-orange-300 text-white" }` }
          to={"/dashboard/manage-orders"}>
            <h3
              onClick={openHandler}
              className="hover:bg-orange-300 pl-[3px] hover:text-white"
            >
              Manage Orders
            </h3>
          </NavLink>
        )}

        <NavLink to={"/dashboard/order"}  className={({isActive}) =>  `pl-[3px] ${isActive && "bg-orange-300 text-white" }` }
         >
          <h3
            onClick={openHandler}
               className="hover:bg-orange-300 pl-[3px] hover:text-white"
            >
            My Order
          </h3>
        </NavLink>

        <NavLink  className={({isActive}) =>  `pl-[3px] ${isActive && "bg-orange-300 text-white" }` }
          to={"/dashboard/save-address"}>
          <h3
            onClick={openHandler}
            className="hover:bg-orange-300 pl-[3px] hover:text-white"
          >
            Save Address
          </h3>
        </NavLink>
      </div>

      <h1
        onClick={logoutHandler}
        className="text-lg hover:bg-orange-300 pl-[3px] hover:text-white"
      >
        Logout
      </h1>
    </section>
  );
}

export default UserMenu;
