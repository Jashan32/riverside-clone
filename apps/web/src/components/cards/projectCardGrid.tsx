import { FolderOpen, Ellipsis } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ProjectsDropdown from '../dropdownMenu/projects';
import { useNavigate } from 'react-router-dom';

export default function ProjectCardGrid({ projectName, timeCreated, setRemoveCardState, projectId }: { projectName: string, timeCreated: string, setRemoveCardState: (state: boolean) => void, projectId: string }) {
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
        <div className="w-full aspect-[4/3] flex flex-col group">
            <div className="rounded-[8px] w-full bg-[#1d1d1d] hover:bg-[#383838] cursor-pointer flex-1 bg-gradient-to-b from-transparent to-black/50 flex items-center justify-center"
            onClick={()=>{navigate(`/dashboard/project/view/${projectId}/${projectName}`)}}>
                <FolderOpen className='size-[28px] text-[#555555]' />
            </div>
            <div className="h-[42px] mt-[12px] w-full flex justify-between">
                <div>
                    <div className="text-[14px] font-bold">{projectName}</div>
                    <div className="text-[12px] text-[#888888] font-medium">{timeCreated} ago</div>
                </div>
                <div className="relative flex items-center">
                    <div
                        className={`opacity-0 group-hover:opacity-100 ${dropDownState ? "opacity-100" : ""} transition-opacity duration-400 h-[32px] w-[32px] hover:bg-[#383838] flex items-center justify-center rounded-[8px]`}
                        onClick={() => setDropDownState(!dropDownState)}
                    >
                        <Ellipsis className='cursor-pointer size-[20px]' />
                    </div>
                    <div ref={dropdownRef} className={`absolute right-0 top-full z-1 mt-2 ${dropDownState ? "opacity-100 translate-y-0 translate-x-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-10 translate-x-5 scale-70 pointer-events-none"} transition-all duration-200 ease-in-out`}>
                        <ProjectsDropdown setRemoveCardState={setRemoveCardState} setDropDownState={setDropDownState} />
                    </div>
                </div>
            </div>
        </div>
    )
}