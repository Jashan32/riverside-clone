import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(localStorage.getItem('isOpen') == 'true');
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') == 'true');
    if(!isLoggedIn){
        navigate("/login")
    }
    return (
        <div className={` text-white transition-[width] duration-300 ${isOpen ? " w-[232px]" : "w-[68px]"} h-[100vh] m-[8px] mr-0`}>
            <h2 className="text-lg font-bold" onClick={() => { setIsOpen(!isOpen); localStorage.setItem('isOpen', `${!isOpen}`) }} >Sidebar</h2>
            <div>
                <div className="mt-4 space-y-2">
                    <div onClick={() => navigate("/dashboard/home")} className="hover:underline">Home</div>
                    <div onClick={() => navigate("/dashboard/project")} className="hover:underline">Projects</div>
                    <div onClick={() => navigate("/dashboard/schedule")} className="hover:underline">Schedule</div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}