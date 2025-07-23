import { FolderOpen, Ellipsis } from "lucide-react";
import ProjectsDropdown from "../dropdownMenu/projects";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectCardList({ projectName, timeCreated, setRemoveCardState, projectId }: { projectName: string, timeCreated: string, setRemoveCardState: (state: boolean) => void, projectId: string }) {
    const navigate = useNavigate();
    const [dropDownState, setDropDownState] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!dropDownState) return;
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropDownState(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropDownState]);
    return (
        <div className="select-none h-[68px] w-[full] hover:bg-[#1d1d1d] cursor-pointer rounded-[10px] flex items-center justify-between p-[24px]">
            <div className="flex gap-[12px] w-[100%]"
                onClick={() => { navigate(`/dashboard/project/view/${projectId}/${projectName}`) }}>
                <div className="h-[52px] w-[52px] bg-[#2b2b2b] rounded-[8px] flex items-center justify-center">
                    <FolderOpen className="size-[20px] text-[#555555]" />
                </div>
                <div className="flex flex-1 items-center text-[14px] select-text">
                    {projectName}
                </div>
            </div>
            <div className="relative">
                <div onClick={() => setDropDownState(!dropDownState)} className={` ${dropDownState ? "pointer-events-none" : ""} hover:bg-[#383838] rounded-[10px] h-[32px] w-[32px] p-[6px]`}>
                    <Ellipsis className="size-[20px]" />
                </div>
                <div ref={dropdownRef} className={`absolute right-0 top-full z-1 mt-2 ${dropDownState ? "opacity-100 translate-y-0 translate-x-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-10 translate-x-5 scale-70 pointer-events-none"} transition-all duration-200 ease-in-out`}>
                    <ProjectsDropdown setRemoveCardState={setRemoveCardState} setDropDownState={setDropDownState} />
                </div>
            </div>
        </div>
    );
}