import React from "react";
import Sidebar from "./_components/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-start w-full h-screen bg-red-100">
      <Sidebar />
      <div className=" ml-[70px] md:ml-[250px]">{children}</div>
    </div>
  );
};

export default Layout;
