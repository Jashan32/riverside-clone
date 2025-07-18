import { Link, Copy, Trash, Pencil } from "lucide-react";

export default function ProjectsDropdown({ setRemoveCardState, setDropDownState }: { setRemoveCardState: (state: boolean) => void, setDropDownState: (state: boolean) => void }) {
    return (
        <div className="select-none flex flex-col gap-[4px] w-[204px] h-[204px] p-[8px] bg-[#2b2b2b] rounded-[12px]">
            <div className="flex gap-[12px] w-[188px] h-[44px] py-[10px] px-[16px] hover:bg-[#383838] cursor-pointer rounded-[8px]">
                <Link className="size-[20px]" />
                <div className="text-[14px]">Copy project link</div>
            </div>
            <div className="flex gap-[12px] w-[188px] h-[44px] py-[10px] px-[16px] hover:bg-[#383838] cursor-pointer rounded-[8px]">
                <Pencil className="size-[20px]" />
                <div className="text-[14px]">Rename</div>
            </div>
            <div className="flex gap-[12px] w-[188px] h-[44px] py-[10px] px-[16px] hover:bg-[#383838] cursor-pointer rounded-[8px]"
                onClick={() => { setRemoveCardState(true); setDropDownState(false); }}>
                <Trash className="size-[20px]" />
                <div className="text-[14px]">Remove</div>
            </div>
            <div className="flex gap-[12px] w-[188px] h-[44px] py-[10px] px-[16px] hover:bg-[#383838] cursor-pointer rounded-[8px]">
                <Copy className="size-[20px]" />
                <div className="text-[14px]">Copy project ID</div>
            </div>
        </div>
    );
}