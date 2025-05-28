import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import VerificationOtp from "../pages/VerificationOtp";
import ResetPassword from "../pages/ResetPassword";


import Order from "../pages/Order";
import SaveAddress from "../pages/SaveAddress";
import Dashboard from "../layOut/Dashboard";
import User from "../pages/User";
import Profile from "../pages/Profile";
import Category from "../pages/Category";

import UploadProduct from "../pages/UploadProduct";
import AdminProduct from "../pages/AdminProduct";
import UnAuth from "../pages/UnAuth";
import AdminPermision from "../layOut/AdminPermision";
import CategoryWiseProduct from "../pages/CategoryWiseProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import CheckoutPage from "../pages/CheckoutPage";
import Success from "../pages/Success";
import OrderDetailsPage from "../pages/OrderDetailsPage";
import ManageOrder from "../pages/ManageOrder";
import ManageOrderDetailsAdmin from "../pages/ManageOrderDetailsAdmin";
import Cancel from "../pages/Cancel";




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "searchPage",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "Forgot-Password",
        element: <ForgotPassword />,
      },
      {
        path: "verification-otp",
        element: <VerificationOtp />,
      },
      {
        path: "reset-Password",
        element: <ResetPassword />,
      },
      {
         path:"viewcart",
         element: <Cart/>
      },
      {
         path: "user",
         element: <User/>
      },
      {
        path:"dashboard",
        element: <Dashboard/>,
        children: [
          {
                 path: "profile",
                 element: <Profile/>
          },
          {
            path: "order",
            element: <Order/>
          },
          {
            path: 'save-address',
            element: <SaveAddress/>
          },
          {
            path : "category",
            element: <AdminPermision><Category/></AdminPermision> 
          },
         
          {
            path: "upload-product",
            element: <AdminPermision> <UploadProduct/></AdminPermision> 
          },
          {
            path: "manage-orders",
            element: <AdminPermision> <ManageOrder/></AdminPermision> 
          },
          {
            path: "admin-product",
            element: <AdminPermision> <AdminProduct/></AdminPermision> 
          }
        ]

      },

      {
           path:":category",
           children:[
            {
              path:":products",
              element:<CategoryWiseProduct/>

            }
           ]
      },
      {
        path:"product/:product",
        element:<ProductDetails/>
      },
      {
         path:"checkout",
         element:<CheckoutPage/>
      },
      {
            path:"success",
            element:<Success/>
      },
      {
         path: "cancel",
         element: <Cancel/>
      },
      {
         path:"order-details",
         element:<OrderDetailsPage/>
      },
      {
        path:"manage-orders",
        element: <ManageOrderDetailsAdmin/>
      },
     
      {
        path: "unauth-page",
        element: <UnAuth/>
      }
     
     
     
     
    ],
  },
]);

export default router;
