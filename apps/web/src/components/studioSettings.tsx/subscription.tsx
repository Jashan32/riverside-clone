import { GraduationCap, MessageSquare, Wand, Zap } from "lucide-react";
import PurpleButtonV2 from "../buttons/purpleButtonV2";
import GreenButton from "../buttons/greenButton";
import { useState } from "react";
import GenericButton from "../buttons/genericButton";

export default function Subscription() {
    const [credits, setCredits] = useState(0);
    return (
        <div className="flex flex-col gap-[12px]">
            <div className="w-[800px] rounded-[12px] bg-[#1d1d1d] p-[24px] flex justify-between items-center">
                <div>
                    <div className="text-[16px] font-bold">Meet our mind-blowing support team</div>
                    <div className="mt-[19px] mb-[27px]">
                        <div className="flex gap-[14px] items-center mb-[12px]">
                            <div><GraduationCap className="size-[20px]" /></div>
                            <div className="text-[12px] text-[#bbbbbb]">Ridiculously highly trained team</div>
                        </div>
                        <div className="flex gap-[14px] items-center mb-[12px]">
                            <div><Wand className="size-[20px]" /></div>
                            <div className="text-[12px] text-[#bbbbbb]">Near-magical diagnostics tools</div>
                        </div>
                        <div className="flex gap-[14px] items-center mb-[12px]">
                            <div><MessageSquare className="size-[20px]" /></div>
                            <div className="text-[12px] text-[#bbbbbb]">Available in (yes) every time zone</div>
                        </div>
                    </div>
                    <div>
                        <PurpleButtonV2 text="Contact support" onClickFunction={() => { }} />
                    </div>
                </div>
            </div>
            <div className="w-[800px] rounded-[12px] bg-[#1d1d1d] p-[24px] flex flex-col">
                <div className="text-[16px] font-bold mb-[8px]">You’re on the Free plan.</div>
                <div className="text-[12px] text-[#888888] mb-[16px]">Unlock even more features.</div>
                <GreenButton onClickFunction={() => { }}>
                    <div className="flex gap-[8px] items-center">
                        <div><Zap className="size-[20px] text-black fill-black" /></div>
                        <div className="text-[12px] text-black font-semibold">Upgrade plan</div>
                    </div>
                </GreenButton>
            </div>
            <div className="w-[800px] rounded-[12px] bg-[#1d1d1d] p-[24px] flex flex-col">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-[16px] font-bold mb-[8px]">AI credits</div>
                        <div className="flex gap-[5px]">
                            <div className="text-[16px] text-[#888888]">You have </div>
                            <div>✦</div>
                            <div>{credits}</div>
                            <div className="text-[16px] text-[#888888]"> credits remaining</div>
                        </div>
                    </div>
                    <GreenButton onClickFunction={() => { }}>
                        <div className="flex gap-[8px] items-center">
                            <div className="text-[12px] text-black font-semibold">Top up AI credits</div>
                        </div>
                    </GreenButton>
                </div>
            </div>
            <div className="w-[800px] rounded-[12px] bg-[#1d1d1d] p-[24px] flex flex-col">
                <div className="flex gap-[40px] items-center">
                    <div>
                        <div className="text-[16px] font-bold mb-[8px]">Delete account</div>
                        <div className="flex gap-[5px]">
                            <div className="text-[12px] text-[#888888] mb-[16px]">Your account will be deactivated and you’ll lose access to all your content.</div>
                            <div className="text-[12px] text-[#b196ff] mb-[16px] cursor-pointer"> credits remaining</div>
                        </div>
                    </div>
                    <div className="cursor-pointer hover:bg-[#e0625d] bg-[#e04040] py-[10px] px-[20px] rounded-[10px] h-fit w-fit text-[14px]">Delete</div>
                </div>
            </div>
        </div>
    )
}