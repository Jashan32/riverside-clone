'use client';
import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    console.log("Sidebar isOpen:", isOpen);
    return (
        <div className={` text-white  ${isOpen ? " w-[232px]" : "w-[68px]"} h-[100vh] m-[8px] mr-0`}>
            <h2 className="text-lg font-bold" onClick={() => { setIsOpen(!isOpen) }} >Sidebar</h2>
            <ul className="mt-4 space-y-2">
                <li><a href="/dashboard/home" className="hover:underline">Home</a></li>
                <li><a href="/dashboard/project" className="hover:underline">Projects</a></li>
                <li><a href="/dashboard/schedule" className="hover:underline">Schedule</a></li>
            </ul>
        </div>
    );
}