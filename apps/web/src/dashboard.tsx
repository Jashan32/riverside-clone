import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

export default function DashboardLayout() {
  
  return (
    <div className="bg-[#0d0d0d] flex h-[100vh] overflow-hidden p-2 pl-0 pt-0 w-full">
      <Sidebar />
      <div className="flex-1 min-w-0 pl-2 flex flex-col h-full">
        <Navbar />
        <div className="flex-1 min-w-0 text-white w-full overflow-auto">
          <div className="bg-[#151515] overflow-auto custom-scrollbar rounded-[12px] border border-b-0 border-white/10 h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}