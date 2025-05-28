import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";


function Dashboard() {

  

  return (
    <section className="w-full min-h-[78vh] flex justify-start p-4 bg-white">
      <div className="hidden lg:block pl-6 pt-6 font-serif font-semibold border-r-2 border-gray-200 w-[350px]">
        <UserMenu />
      </div>
      <div className="p-2 w-full h-full">
        <Outlet/>
      </div>
    </section>
  );
}

export default Dashboard;
