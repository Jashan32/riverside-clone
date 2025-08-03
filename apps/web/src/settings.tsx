import { Cable, CreditCard, MessageSquareDot, User, Video } from "lucide-react";
import { useState } from "react";

export default function Settings() {
    const [selected, setSelected] = useState("Profile");
    return (
        <div className="px-[60px] pt-[60px] h-full flex ">
            <div className="flex gap-[16px] w-full justify-center">
                <div className="flex flex-col gap-[40px] pt-[70px] w-[220px]">
                    {/* Your account part */}
                    <div className="flex flex-col">
                        <div className="text-[12px] text-[#bbbbbb] font-semibold mb-[8px]">YOUR ACCOUNT</div>
                        <div className={`${selected == "Profile" ? "text-white" : "text-[#acacac]"} hover:text-white flex gap-[12px] items-center cursor-pointer py-[12px]`}
                            onClick={() => setSelected("Profile")}>
                            <div><User className="size-[24px] " /></div>
                            <div className="text-[14px] font-medium">Profile</div>
                        </div>
                        <div className={`${selected == "Subscription" ? "text-white" : "text-[#acacac]"} hover:text-white flex gap-[12px] items-center cursor-pointer py-[12px]`}
                            onClick={() => setSelected("Subscription")}>
                            <div><CreditCard className="size-[24px] " /></div>
                            <div className="text-[14px] font-medium">Subscription</div>
                        </div>
                        <div className={`${selected == "Notifications" ? "text-white" : "text-[#acacac]"} hover:text-white flex gap-[12px] items-center cursor-pointer py-[12px]`}
                            onClick={() => setSelected("Notifications")}>
                            <div><MessageSquareDot className="size-[24px] " /></div>
                            <div className="text-[14px] font-medium">Notifications</div>
                        </div>
                        <div className={`${selected == "Integrations" ? "text-white" : "text-[#acacac]"} hover:text-white flex gap-[12px] items-center cursor-pointer py-[12px]`}
                            onClick={() => setSelected("Integrations")}>
                            <div><Cable className="size-[24px] " /></div>
                            <div className="text-[14px] font-medium">Integrations</div>
                        </div>
                    </div>
                    {/* Audio and video part */}
                    <div>
                        <div className="text-[12px] text-[#bbbbbb] font-semibold mb-[8px]">AUDIO & VIDEO</div>
                        <div className={`${selected == "Studio settings" ? "text-white" : "text-[#acacac]"} hover:text-white flex gap-[12px] items-center cursor-pointer py-[12px]`}
                            onClick={() => setSelected("Studio settings")}>
                            <div><Video className="size-[24px] " /></div>
                            <div className="text-[14px] font-medium">Studio settings</div>
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-[800px]">
                    <div className="w-full text-[28px] mb-[28px] font-bold">Settings</div>
                    <div className="w-[800px] h-[402px] rounded-[12px] bg-[#1d1d1d] p-[24px]">
                        <div className="flex flex-col gap-[20px]">
                            <div className="text-[16px] font-bold">Profile</div>
                            <div className="flex flex-col gap-[24px]">
                                <div className="rounded-full cursor-pointer">
                                    <img src={`${localStorage.getItem("profilePic")}`} className="w-[120px] h-[120px] rounded-full" />
                                </div>
                                <div className="flex flex-col gap-[24px]">
                                    <div className="flex flex-col gap-[12px]">
                                        <div className="text-[14px] ">Name</div>
                                        <input type="text" className="text-[14px] w-full bg-[#222222] rounded-[10px] h-[39px] py-[8px] px-[12px] hover:bg-[#383838] focus:outline-[1px] focus:outline-[#bb86fc]" placeholder={`${localStorage.getItem("name") || "Enter your name"}`} value={localStorage.getItem("name") || ""} />
                                    </div>
                                    <div className="flex flex-col gap-[12px]">
                                        <div className="text-[14px] ">Email</div>
                                        <input type="text" className="text-[14px] w-full bg-[#222222] rounded-[10px] h-[39px] py-[8px] px-[12px] hover:bg-[#383838] focus:outline-[1px] focus:outline-[#bb86fc]" placeholder={`${localStorage.getItem("email") || "Enter your email"}`} value={localStorage.getItem("email") || ""} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}