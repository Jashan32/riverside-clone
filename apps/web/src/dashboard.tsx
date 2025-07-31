import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import SearchCard from "./components/cards/searchCard";
import { useEffect, useState } from "react";

export default function DashboardLayout() {
  const [searchCardVisible, setSearchCardVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      
    }
  }, []);

  return (
    <div className="relative bg-[#0d0d0d] flex h-[100vh] overflow-hidden p-2 pl-0 pt-0 w-full">
      <SearchCard searchCardVisible={searchCardVisible} setSearchCardVisible={setSearchCardVisible} />
      <Sidebar />
      <div className=" flex-1 min-w-0 pl-2 flex flex-col h-full">
        <Navbar searchCardVisible={searchCardVisible} setSearchCardVisible={setSearchCardVisible} />
        <div className="flex-1 min-w-0 text-white w-full overflow-auto">
          <div className="bg-[#151515] overflow-auto custom-scrollbar rounded-[12px] border border-b-0 border-white/10 h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}