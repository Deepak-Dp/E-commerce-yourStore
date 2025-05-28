import React, { useEffect, useState } from "react";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { CgProfile } from "react-icons/cg";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import toast from "react-hot-toast";
import UserMenu from "./UserMenu";

function Header() {
  const navigate = useNavigate();
  const [totalItemInCart, setTotalItemInCart] = useState('')
  const [open, setOpen] = useState(false);
  const cartitem = useSelector((state) => state.product.allCartProduct);

  const userDetails = useSelector((state) => state.user);

  const colcutateTotalCartItem = ()=>{
    let  total = 0;
    cartitem.map((data)=>{
      total = total + data.quantity
    })
    setTotalItemInCart(total)
  }

  const openHandler = () => {
    setOpen(!open);
  };

  useEffect(() => {
    colcutateTotalCartItem()
  }, [cartitem]);

  return (
    <header className=" lg:h-20 h-28  md:h-20 bg-slate-100 z-40 shadow-md top-0 sticky p-3 ">
      <div className=" container mx-auto flex items-center justify-between">
        {/* logo */}
        <Link to={"/"}>
          <h1 className="font-serif font-extrabold cursor-pointer text-[30px]   lg:text-[40px]">
            your<span className="text-orange-500">Store</span>
          </h1>
        </Link>

        {/* search */}

        <div className=" hidden lg:block  ">
          <Search />
        </div>
        {/* login and cart */}
        <div className=" flex items-center lg:gap-6 gap-4 ">
          {userDetails?._id ? (
            <div className=" lg:px-5 lg:py-2 hidden lg:block  font-serif font-bold  rounded-md cursor-pointer ">
              <div className=" relative flex justify-center items-center">
                <h1
                  onClick={openHandler}
                  className="text-lg hover:text-orange-600"
                >
                  Account
                </h1>
                {open ? (
                  <>
                    <FaCaretUp
                      size={23}
                      onClick={openHandler}
                      className="text-stone-600"
                    />

                    <div className=" absolute pl-4 p-2 bg-white h-auto w-[300px] top-12 rounded-sm shadow-lg">
                      <MdOutlineClose
                        onClick={openHandler}
                        size={20}
                        className="ml-auto hover:text-red-600 "
                      />
                      <UserMenu setOpen={setOpen} open={open} />
                    </div>
                  </>
                ) : (
                  <FaCaretDown
                    onClick={openHandler}
                    size={23}
                    className="text-stone-600"
                  />
                )}
              </div>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="bg-blue-600 lg:px-5 lg:py-2 hidden lg:block  font-serif font-bold text-white rounded-md cursor-pointer hover:bg-blue-800"
            >
              <button>LOGIN</button>
            </Link>
          )}

          <Link to={'/viewcart'} className="      cursor-pointer  ">
            <TiShoppingCart
              size={24}
              className=" text-orange-700 lg:size-9 z-30"
            />
            <p className=" absolute text-center text-[14px] font-sans font-bold text-green-600 top-4 ml-1 lg:ml-3 animate-bounce  rounded-full z-10  ">
              {totalItemInCart}
            </p>
          </Link>

          {userDetails?._id ? (
           
             

              <Link
                to={"/user"}
                className="h-[35px] w-[35px] flex justify-center items-center lg:hidden lg:h-[50px] lg:w-[50px] rounded-full border-2 border-stone-700 hover:border-orange-400  cursor-pointer"
              >
                <img
                  src={userDetails.avatar}
                  className="h-[34px] w-[34px] rounded-full"
                  alt=""
                />
              </Link>
           
          ) : (
            <Link
              to={"/login"}
              className="h-[35px] w-[35px] lg:hidden lg:h-[50px] lg:w-[50px] rounded-full border-2 border-stone-700 hover:border-orange-400  cursor-pointer"
            >
              <CgProfile className="h-full w-full" />
            </Link>
          )}
        </div>
      </div>

      <div className="lg:hidden flex items-center justify-center mt-2 md:-mt-9 ">
        <Search />
      </div>
    </header>
  );
}

export default Header;
