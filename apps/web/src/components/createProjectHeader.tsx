import { ChevronRight, Link } from "lucide-react";
import { useRef, useState } from "react";
import AddButton from "./buttons/addButton";

export default function CreateProjectHeader() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [focused, setFocused] = useState(false);
    return (
        <div className="h-[60px] pl-[28px] flex items-center justify-between">
            <div className="flex items-center">
                <a className="text-[#888888] text-[20px] font-extrabold cursor-pointer"
                    href="/dashboard/project">
                    Projects
                </a>
                <div className="mx-[12px] flex items-center">
                    <ChevronRight className="size-[16px] text-[#888888]" />
                </div>
                <div className={`${focused ? "flex-1" : ""}`}
                    style={!focused && inputRef.current ? { width: `${Math.max(inputRef.current.value.length, 1)}ch` } : {}}
                >
                    <input
                        ref={inputRef}
                        defaultValue="Untitled"
                        className="truncate overflow-hidden whitespace-nowrap w-[100%] outline-none text-[20px] font-extrabold border-b-[1px] border-transparent focus:border-[#3d3c3c]"
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                    />
                </div>
            </div>
            <div className="flex items-center gap-[8px] pr-[12px]">
                <div className="h-[36px] w-[52px] py-[10px] px-[16px] flex items-center cursor-pointer hover:bg-[#383838] rounded-[8px]">
                    <Link className="size-[20px]"/>
                </div>
                <AddButton type="small" text={"Create"} />
            </div>
        </div>
    )
}