import { useNavigate } from "react-router-dom";
import { useState } from "react";
import homeSVG from "./assets/home.svg";
import projectsSVG from "./assets/projects.svg";
import scheduleSVG from "./assets/schedule.svg";
import { PanelLeftClose, PanelRightOpen, PartyPopper, Settings } from 'lucide-react';
// import { useLocation } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    const [isSidebarClosed, setIsSidebarClosed] = useState(localStorage.getItem('isSidebarClosed') == 'true');
    const profilePicUrl = localStorage.getItem('profilePic') || '';
    // const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') == 'true');
    // if (!isLoggedIn) {
    //     navigate("/login")
    // }
    const currentTab = location.pathname.split('/dashboard/')[1]?.split('/')[0];
    return (
        <div className=" flex flex-col justify-between m-[8px] mr-0">
            <div className={` text-white flex flex-col gap-[12px] transition-all duration-400 ${isSidebarClosed ? " w-[68px] min-w-[68px]" : "min-w-[232px] w-[232px]"} h-[100vh] `}>
                <div className={`text-lg font-bold h-[40px] flex items-center ${isSidebarClosed ? "justify-center ml-[0px]" : "justify-between ml-[12px]"}`}>
                    {!isSidebarClosed && <div>Sidebar</div>}
                    <div className="flex hover:bg-[#1d1d1d] rounded-[8px] " onClick={() => { setIsSidebarClosed(!isSidebarClosed); localStorage.setItem('isSidebarClosed', `${!isSidebarClosed}`) }}>
                        {isSidebarClosed ? <PanelRightOpen className="size-[32px] p-[6px] text-[#888888] hover:text-white cursor-pointer rotate-180" /> :
                            <PanelLeftClose className="size-[32px] p-[6px] text-[#888888] hover:text-white cursor-pointer" />}
                    </div>
                </div>
                <div className={`flex flex-col gap-[4px] [&>div]:flex [&>div]:gap-[8px] [&>div]:items-center [&>div]:hover:bg-[#1d1d1d] [&>div]:cursor-pointer [&>div]:rounded-[8px] ${isSidebarClosed ? "[&>div]:h-[68px] [&>div]:flex-col" : "[&>div]:h-[40px] [&>div]:flex-row"} [&>div]:py-[12px] [&>div]:px-[16px] [&>div]:transition-all [&>div]:duration-400`}>
                    <div className={`${currentTab === "home" ? "bg-[#1d1d1d]" : ""}`}
                        onClick={() => navigate("/dashboard/home")}>
                        <img src={homeSVG} style={{ filter: 'invert(1)' }} className={`${isSidebarClosed ? "h-[20px]" : "h-[24px]"} transition-all duration-400`} />
                        <div className={`${isSidebarClosed ? "text-[10px]" : "text-[14px]"} overflow-hidden font-medium transition-all duration-400`}>Home</div>
                    </div>
                    <div className={`${currentTab === "project" ? "bg-[#1d1d1d]" : ""}`}
                        onClick={() => navigate("/dashboard/project")}>
                        <img src={projectsSVG} style={{ filter: 'invert(1)' }} className={`${isSidebarClosed ? "h-[20px]" : "h-[24px]"} transition-all duration-400`} />
                        <div className={`${isSidebarClosed ? "text-[10px]" : "text-[14px]"} overflow-hidden font-medium transition-all duration-400`}>Projects</div>
                    </div>
                    <div className={`${currentTab === "schedule" ? "bg-[#1d1d1d]" : ""}`}
                        onClick={() => navigate("/dashboard/schedule")}>
                        <img src={scheduleSVG} style={{ filter: 'invert(1)' }} className={`${isSidebarClosed ? "h-[20px]" : "h-[24px]"} transition-all duration-400`} />
                        <div className={`${isSidebarClosed ? "text-[10px]" : "text-[14px]"} overflow-hidden font-medium transition-all duration-400`}>Schedule</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className={`flex gap-[8px] cursor-pointer items-center mb-[4px] py-[8px] px-[16px] hover:bg-[#1d1d1d] rounded-[8px] ${isSidebarClosed ? "flex-col w-[68px]" : "flex-row"} transition-all duration-400`}>
                    <div>
                        <PartyPopper className="size-[24px] text-white" />
                    </div>
                    <div className={`font-medium text-white ${isSidebarClosed ? "text-[10px] text-center" : "text-[14px]"} overflow-hidden transition-all duration-400`}>What's New</div>
                </div>
                <div className={`flex gap-[8px] cursor-pointer items-center py-[8px] px-[16px] hover:bg-[#1d1d1d] rounded-[8px] ${isSidebarClosed ? "flex-col w-[68px]" : "flex-row"} transition-all duration-400`}
                    onClick={() => navigate("/dashboard/settings/profile")}>
                    <div>
                        <Settings className="size-[24px] text-white" />
                    </div>
                    <div className={`font-medium text-white ${isSidebarClosed ? "text-[10px]" : "text-[14px]"} transition-all duration-400`}>Settings</div>
                </div>
                <div className=" h-[64px] py-[16px] ml-[11px]">
                    <div className="w-[42px] h-[42px] hover:bg-[#383838] flex items-center justify-center rounded-full cursor-pointer">
                        <img src={`${profilePicUrl}`} referrerPolicy="no-referrer" className="h-[32px] w-[32px] rounded-full cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    );
}