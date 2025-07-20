import { useEffect, useRef } from "react";
import PurpleButton from "../buttons/genericPurple";
import { X } from "lucide-react";

export default function ShareLinkDropDown({ shareLinkDropDownState, setShareLinkDropDownState }: { shareLinkDropDownState: boolean, setShareLinkDropDownState: (state: boolean) => void }) {
    const dropDownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
                setShareLinkDropDownState(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [shareLinkDropDownState]);
    return (
        <div ref={dropDownRef} className={` absolute right-0 top-full z-1 mt-2 ${shareLinkDropDownState ? "opacity-100 translate-y-0 translate-x-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-10 translate-x-5 scale-70 pointer-events-none"} transition-all duration-200 ease-in-out p-[28px] pb-[20px] w-[460px] bg-[#222222] rounded-[10px] flex flex-col gap-[16px]`}>
            <button onClick={() => setShareLinkDropDownState(false)} className="absolute top-4 right-4 bg-[#2b2b2b] hover:bg-[#383838] w-[28px] h-[28px] p-[4px] cursor-pointer flex justify-center items-center rounded-full"> <X className="size-[16px]" /> </button>
            <div className="text-[20px] font-extrabold">Share Project</div>
            <div className="text-[14px] text-[#888888]">Share access to this project including all its items. Anyone with the link can view and download all project files.</div>
            <div className="p-[8px] pl-[12px] bg-[#2b2b2b] rounded-[8px] flex gap-[12px] items-center">
                <div className="text-[14px] font-extralight truncate overflow-none">{window.location.href.replace("/create/", "/")}</div>
                <PurpleButton text="Copy Link" onClickFunction={() => { navigator.clipboard.writeText(window.location.href.replace("/create/", "/")) ; alert("coppied")}} />
            </div>
        </div>
    )
}