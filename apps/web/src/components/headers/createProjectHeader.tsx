import { ChevronRight, Link } from "lucide-react";
import { useRef, useState } from "react";
import AddButton from "../buttons/addButton";
import ShareLinkDropDown from "../dropdownMenu/shareLink";
import { useNavigate } from "react-router-dom";

export default function CreateProjectHeader({ isAlredyCreated, id, name }: { isAlredyCreated?: boolean, id?: string, name?: string }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [focused, setFocused] = useState(false);
    const [inputValue, setInputValue] = useState(name || "Untitled");
    const [shareLinkDropDownState, setShareLinkDropDownState] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const createProject = async () => {
        const title = inputValue.trim() || "Untitled";
        const res = await fetch(`${backendUrl}/project/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, token: localStorage.getItem("authToken") }),
        });
        const data = await res.json();
        if (data.error) {
            console.error("Error creating project:", data.error);
            return;
        }
        navigate(`/dashboard/project/view/${data.data.projectId}/${data.data.title}`);

    }

    return (
        <div className="h-[60px] pl-[28px] flex items-center justify-between max-w-[100%]">
            <div className="flex items-center min-w-0 flex-1">
                <a className="text-[#888888] text-[20px] font-extrabold cursor-pointer flex-shrink-0"
                    href="/dashboard/project">
                    Projects
                </a>
                <div className="mx-[12px] flex items-center flex-shrink-0">
                    <ChevronRight className="size-[16px] text-[#888888]" />
                </div>
                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    size={focused ? 100 : Math.max(inputValue.length, 8)}
                    className="outline-none text-[20px] font-extrabold border-b-[1px] border-transparent focus:border-[#3d3c3c] bg-transparent transition-all duration-200"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            </div>
            <div className="flex items-center gap-[8px] pr-[12px] flex-shrink-0">
                <div className={`${shareLinkDropDownState ? "pointer-events-none" : ""} relative`}>
                    <div className="h-[36px] w-[52px] py-[10px] px-[16px] flex items-center cursor-pointer hover:bg-[#383838] rounded-[8px]"
                        onClick={() => setShareLinkDropDownState(!shareLinkDropDownState)}>
                        <Link className="size-[20px]" />
                    </div>
                    <ShareLinkDropDown setShareLinkDropDownState={setShareLinkDropDownState} shareLinkDropDownState={shareLinkDropDownState} />
                </div>
                {isAlredyCreated ? <AddButton type="small" text={"Save"} onClickFunction={()=>{}} /> :
                    <AddButton type="small" text={"Create"} onClickFunction={createProject} />}
            </div>
        </div>
    )
}