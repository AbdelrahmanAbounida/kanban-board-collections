import React from "react";
import Sidebar from "./_components/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center w-full h-screen">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
