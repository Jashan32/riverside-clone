import { useNavigate } from "react-router-dom";
import { useState } from "react";
import homeSVG from "./assets/home.svg";
import projectsSVG from "./assets/projects.svg";
import scheduleSVG from "./assets/schedule.svg";
import { PanelLeftClose, PanelRightOpen } from 'lucide-react';
import { useLocation } from "react-router-dom";


export default function Sidebar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(localStorage.getItem('isOpen') == 'true');
    // const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') == 'true');
    // if (!isLoggedIn) {
        //     navigate("/login")
        // }
        const currentTab = useLocation().pathname.split('/').filter(Boolean).pop();
    return (
        <div className={` text-white flex flex-col gap-[12px] transition-[width] duration-300 ${isOpen ? " w-[232px]" : "w-[68px]"} h-[100vh] m-[8px] mr-0`}>
            <div className={`text-lg font-bold h-[40px] flex items-center ${isOpen?"justify-between ml-[12px]":"justify-center ml-[0px]"}`}>
                {isOpen && <div>Sidebar</div>}
                <div className="flex hover:bg-[#383838] rounded-[8px] " onClick={() => { setIsOpen(!isOpen); localStorage.setItem('isOpen', `${!isOpen}`) }}>
                    {isOpen ? <PanelLeftClose className="size-[32px] p-[6px] text-[#888888] hover:text-white cursor-pointer" />
                        : <PanelRightOpen className="size-[32px] p-[6px] text-[#888888] hover:text-white cursor-pointer rotate-180" />}
                </div>
            </div>
            <div>
                <div className={`flex flex-col gap-[4px] [&>div]:flex [&>div]:gap-[8px] [&>div]:items-center [&>div]:hover:bg-[#383838] [&>div]:cursor-pointer [&>div]:rounded-[8px] ${isOpen ? "[&>div]:h-[40px]" : "[&>div]:h-[68px]"} [&>div]:py-[12px] [&>div]:px-[16px]`}>
                    <div className={`${isOpen ? "" : "flex flex-col"} ${currentTab === "home" ? "bg-[#383838]" : ""}`}
                        onClick={() => navigate("/dashboard/home")}>
                        <img src={homeSVG} style={{ filter: 'invert(1)' }} className={`${isOpen ? "h-[24px]" : "h-[20px]"}`} />
                        <div className={`${isOpen ? "text-[14px]" : "text-[10px]"} `}>Home</div>
                    </div>
                    <div className={`${isOpen ? "" : "flex flex-col"} ${currentTab === "project" ? "bg-[#383838]" : ""}` }
                        onClick={() => navigate("/dashboard/project")}>
                        <img src={projectsSVG} style={{ filter: 'invert(1)' }} className={`${isOpen ? "h-[24px]" : "h-[20px]"}`} />
                        <div className={`${isOpen ? "text-[14px]" : "text-[10px]"} `}>Projects</div>
                    </div>
                    <div className={`${isOpen ? "" : "flex flex-col"} ${currentTab === "schedule" ? "bg-[#383838]" : ""}`}
                        onClick={() => navigate("/dashboard/schedule")}>
                        <img src={scheduleSVG} style={{ filter: 'invert(1)' }} className={`${isOpen ? "h-[24px]" : "h-[20px]"}`} />
                        <div className={`${isOpen ? "text-[14px]" : "text-[10px]"} `}>Schedule</div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}