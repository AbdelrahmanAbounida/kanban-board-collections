import { cn } from "@/lib/utils";
import {
  BarChart2,
  BellIcon,
  BlocksIcon,
  Grid3X3Icon,
  Home,
  HomeIcon,
  ListCollapse,
  LogOutIcon,
  LucideIcon,
  NewspaperIcon,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface navLinkProps {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const Sidebar = () => {
  const navLinks: navLinkProps[] = [
    {
      name: "Home",
      href: "/",
      icon: <HomeIcon className="w-4 h-4" />,
    },
    {
      name: "Boards",
      href: "/boards",
      icon: <BlocksIcon className="w-4 h-4" />,
    },
    {
      name: "Projects",
      href: "/projects",
      icon: <Grid3X3Icon className="w-4 h-4" />,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: <BarChart2 className="w-4 h-4" />,
    },
    {
      name: "Workflows",
      href: "/workflow",
      icon: <User2Icon className="w-4 h-4" />,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: <BellIcon className="w-4 h-4" />,
    },
    {
      name: "Newsletter",
      href: "/newsletter",
      icon: <NewspaperIcon className="w-4 h-4" />,
    },
  ];
  return (
    <div className="fixed left-0 w-[70px] md:w-[250px] flex flex-col gap-2  h-full border-r bg-white ">
      <div className="hidden md:flex absolute top-0 left-0 inset-y-0 text-red-500 text-2xl m-2 font-bold">
        Boardify
      </div>
      <div className="flex md:hidden absolute top-0 left-4 inset-y-0 text-red-500 text-2xl m-2 font-bold">
        B.
      </div>

      <div className="flex flex-col gap-2 mt-12 p-3 w-full">
        {navLinks.map((navlink, index) => (
          <Link
            key={index}
            href={navlink.href}
            className={cn(
              "w-full  flex items-center space-x-3 p-3 rounded-md hover:bg-red-500 cursor-pointer hover:text-white",
              index == 1 && "text-white bg-red-500"
            )}
          >
            {navlink.icon}
            <p className="text-md hidden md:flex">{navlink.name}</p>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-0 w-full p-4 flex items-center justify-center hover:bg-red-500 rounded-md hover:text-white">
        <Link
          href={"/logout"}
          className=" justify-center  left-0 flex items-center"
        >
          <LogOutIcon className="w-4 h-4" />
          <div className="hidden md:flex">Logout</div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
