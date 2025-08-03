import { MessagesSquare, Trash } from "lucide-react"
import { useState } from "react";
import ToggleSwitch from "../../buttons/toggleSwitch";

export default function General() {
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const [isWaitingRoomEnabled, setIsWaitingEnabled] = useState(false);
    return (
        <>
            <div className="flex gap-[5px] items-center my-[12px]">
                <div className="text-[#888888] text-[12px]">Manage general settings related to the recording studio.</div>
                <div className="text-[12px] text-[#b196ff] cursor-pointer">Learn more</div>
            </div>
            <div className="flex flex-col gap-[24px]">
                <div className="p-[25px] w-full rounded-[12px] bg-[#1d1d1d] flex flex-col gap-[24px]">
                    <div className="text-[20px] font-bold">Studio info</div>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <div className="text-[14px] ">Name</div>
                            <div className="text-[12px] text-[#888888] whitespace-nowrap">The name for your studio</div>
                        </div>
                        <input type="text" className="text-[14px] max-w-[304px] w-full bg-[#2b2b2b] rounded-[10px] h-[39px] py-[8px] px-[12px] hover:bg-[#383838] focus:outline-[1px] focus:outline-[#bb86fc]" placeholder={`${localStorage.getItem("name") || "Enter your name"}`} defaultValue={localStorage.getItem("studioName") || localStorage.getItem("name") + "'s Studio" || ""}
                            onChange={(e) => { localStorage.setItem("studioName", `${e.target.value}`) }} />

                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <div className="text-[14px] ">Enable lobby waiting room</div>
                            <div className="text-[12px] text-[#888888] whitespace-nowrap">People will have to be let into the studio by a host or producer.</div>
                        </div>
                        <ToggleSwitch enabled={isWaitingRoomEnabled} onChange={setIsWaitingEnabled} />

                    </div>
                </div>
                <div className="p-[25px] w-full rounded-[12px] bg-[#1d1d1d] flex flex-col gap-[24px]">
                    <div className="flex items-center gap-[8px]">
                        <div><MessagesSquare className="size-[24px]" /></div>
                        <div className="text-[20px] font-bold">Language</div>
                    </div>
                    <div className="text-[14px] ">Choose a language for your transcript and captions.</div>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <div className="text-[14px] ">Transcript & captions language</div>
                        </div>
                        <div className="pr-[12px] bg-[#2b2b2b] rounded-[10px] max-w-[304px] w-full">
                            <select
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="text-[14px] max-w-[304px] px-[12px] w-full bg-[#2b2b2b] rounded-[10px] h-[39px] hover:bg-[#383838] outline-none ">
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="ja">Japanese</option>
                                <option value="zh">Chinese</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="p-[25px] w-full rounded-[12px] bg-[#1d1d1d] flex flex-col gap-[15px]">
                    <div className="flex items-center gap-[8px]">
                        <div><Trash className="size-[24px] fill-" /></div>
                        <div className="text-[20px] font-bold">Remove Studio</div>
                    </div>
                    <div className="flex justify-between items-center h-fit">
                        <div className="text-[14px] ">This will remove your studio and all recordings. This action cannot be undone.</div>
                        <div className="px-[16px] py-[10px] bg-[#e04040] rounded-[10px] w-fit h-fit cursor-pointer hover:bg-[#b93d37]">Remove studio</div>
                    </div>
                </div>
            </div>
        </>
    )
}