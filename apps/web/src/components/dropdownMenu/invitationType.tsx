import { Check } from "lucide-react";
import { useEffect, useRef } from "react";

export default function InvitationType({ setIsCardOpen, setInvitationType, invitationType }: { setIsCardOpen: (state: boolean) => void, setInvitationType: (state: "guest" | "audience") => void, isCardOpen: boolean, invitationType: "guest" | "audience" }) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setIsCardOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsCardOpen]);

    return (
        <div className=" w-[356px] p-[8px] mt-[10px] bg-[#2b2b2b] rounded-[12px] flex flex-col items-center border-[1px] border-[#2b2b2b]"
            ref={cardRef}>
            <div className=" w-full py-[10px] px-[16px] flex items-center gap-[12px] cursor-pointer hover:bg-[#383838] rounded-[10px]"
                onClick={() => { setInvitationType("audience"); setIsCardOpen(false); }}>
                <div className="w-full flex justify-between items-center">
                    <div className="w-[280px]">
                        <div className="text-[14px] ">Audience</div>
                        <div className="text-[12px] text-[#888888]">To watch your live stream and participate via the chat.</div>
                    </div>
                    <div className={`${invitationType === "audience" ? "flex" : "hidden"} justify-center items-center`}>
                        <Check className="size-[20px]" />
                    </div>
                </div>
            </div>
            <div className=" w-full py-[10px] px-[16px] flex gap-[12px] items-center cursor-pointer hover:bg-[#383838] rounded-[10px]"
                onClick={() => { setInvitationType("guest"); setIsCardOpen(false); }}>
                <div className="w-full flex justify-between items-center">
                    <div className="w-[280px]">
                        <div className="text-[14px] ">Guest</div>
                        <div className="text-[12px] text-[#888888]">To join you for a recorded conversation.</div>
                    </div>
                    <div className={`${invitationType === "guest" ? "flex" : "hidden"} justify-center items-center`}>
                        <Check className="size-[20px]" />
                    </div>
                </div>

            </div>
        </div>
    )
}