import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface invitedEmail {
    email: string,
    invitationType: 'guest' | 'audience'
}

export default function InvitationType2({ 
    invitedEmail, 
    invitedEmailList, 
    setInvitedEmailList 
}: { 
    invitedEmail: string, 
    invitedEmailList: invitedEmail[], 
    setInvitedEmailList: (list: invitedEmail[]) => void 
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isCardOpen, setIsCardOpen] = useState(false);
    
    // Find current invitation type for this email
    const currentInvitation = invitedEmailList.find(item => item.email === invitedEmail);
    const invitationType = currentInvitation?.invitationType || "guest";

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
    }, []);

    const handleInvitationTypeChange = (newType: "guest" | "audience") => {
        const updatedList = invitedEmailList.map(item => 
            item.email === invitedEmail 
                ? { ...item, invitationType: newType }
                : item
        );
        setInvitedEmailList(updatedList);
        setIsCardOpen(false);
    };

    return (
        <div className="relative">
            {/* Trigger button */}
            <div 
                className={`${isCardOpen ? "pointer-events-none" : ""} flex items-center gap-[15px] pr-[12px] cursor-pointer flex-shrink-0`}
                onClick={() => setIsCardOpen(!isCardOpen)}
            >
                <div className="text-[14px]">{invitationType === "guest" ? "Guest" : "Audience"}</div>
                <ChevronDown className="size-[20px]" />
            </div>

            {/* Dropdown */}
            <div className={`absolute right-0 top-full z-10 mt-2 ${isCardOpen ? "opacity-100 translate-y-0 translate-x-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-10 translate-x-5 scale-70 pointer-events-none"} transition-all duration-200 ease-in-out`}>
                <div 
                    className="w-[356px] p-[8px] bg-[#2b2b2b] rounded-[12px] flex flex-col items-center border-[1px] border-[#2b2b2b]"
                    ref={cardRef}
                >
                    <div 
                        className="w-full py-[10px] px-[16px] flex items-center gap-[12px] cursor-pointer hover:bg-[#383838] rounded-[10px]"
                        onClick={() => handleInvitationTypeChange("audience")}
                    >
                        <div className="w-full flex justify-between items-center">
                            <div className="w-[280px]">
                                <div className="text-[14px]">Audience</div>
                                <div className="text-[12px] text-[#888888]">To watch your live stream and participate via the chat.</div>
                            </div>
                            <div className={`${invitationType === "audience" ? "flex" : "hidden"} justify-center items-center`}>
                                <Check className="size-[20px]" />
                            </div>
                        </div>
                    </div>
                    <div 
                        className="w-full py-[10px] px-[16px] flex gap-[12px] items-center cursor-pointer hover:bg-[#383838] rounded-[10px]"
                        onClick={() => handleInvitationTypeChange("guest")}
                    >
                        <div className="w-full flex justify-between items-center">
                            <div className="w-[280px]">
                                <div className="text-[14px]">Guest</div>
                                <div className="text-[12px] text-[#888888]">To join you for a recorded conversation.</div>
                            </div>
                            <div className={`${invitationType === "guest" ? "flex" : "hidden"} justify-center items-center`}>
                                <Check className="size-[20px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}