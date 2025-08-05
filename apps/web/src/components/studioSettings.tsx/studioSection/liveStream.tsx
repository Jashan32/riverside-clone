import ytSvg from "../../../assets/ytSvg.svg";
import fbSvg from "../../../assets/fbSvg.svg";
import xSvg from "../../../assets/xSvg.svg";
import ldnSvg from "../../../assets/ldnSvg.svg";
import twiSvg from "../../../assets/twiSvg.svg";
import tkSvg from "../../../assets/tkSvg.svg";
import { Radio, Settings2, Users } from "lucide-react";
import ToggleSwitch from "../../buttons/toggleSwitch";
import { useState } from "react";
export default function LiveStream() {
    const [hideWatermark, setHideWatermark] = useState(false);
    const [isHighStreamingResolutionSelected, setIsHighStreamingResolutionSelected] = useState(false);
    const [isAudienceCountPublic, setIsAudienceCountPublic] = useState(false);
    return (
        <>
            <div className=" my-[12px] text-[#888888] text-[12px]">
                Manage your live stream and audience settings{' '}
                <a className=" text-[12px] text-[#b196ff] cursor-pointer">Learn more</a>
            </div>
            <div className="flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[24px]">
                    <div className="text-[20px] font-bold leading-[24px]">Livestream</div>
                    <div className="text-[20px] font-bold leading-[24px]">Destinations</div>
                    <div className="flex gap-[12px] flex-wrap w-full">
                        <div className="bg-[#222222] cursor-pointer px-[16px] py-[8px] h-[40px] rounded-[12px] flex items-center gap-[8px]">
                            <img src={ytSvg} className="h-[29px] w-[29px]" />
                            <div className="text-[14px] font-medium leading-[20px]">YouTube</div>
                        </div>
                        <div className="bg-[#222222] cursor-pointer px-[16px] py-[8px] h-[40px] rounded-[12px] flex items-center gap-[8px]">
                            <img src={fbSvg} className="h-[24px] w-[24px]" />
                            <div className="text-[14px] font-medium leading-[20px]">Facebook</div>
                        </div>
                        <div className="bg-[#222222] cursor-pointer px-[16px] py-[8px] h-[40px] rounded-[12px] flex items-center gap-[8px]">
                            <div className="bg-[#0090d6] p-[6px] h-[26px] rounded-[50%] w-[26px] flex items-center justify-center">
                                <img src={ldnSvg} className="w-[13px] h-[13px] " />
                            </div>
                            <div className="text-[14px] font-medium leading-[20px]">LinkedIn</div>
                        </div>
                        <div className="bg-[#222222] cursor-pointer px-[16px] py-[8px] h-[40px] rounded-[12px] flex items-center gap-[8px]">
                            <div className="bg-[#131313] p-[8px] h-[26px] rounded-[50%] w-[26px] flex items-center justify-center">
                                <img src={xSvg} className="w-[10px] h-[10px] " />
                            </div>
                            <div className="text-[14px] font-medium leading-[20px]">X (Twitter)</div>
                        </div>
                        <div className="bg-[#222222] cursor-pointer px-[16px] py-[8px] h-[40px] rounded-[12px] flex items-center gap-[8px]">
                            <div className="bg-[#9864f6] p-[6px] h-[26px] rounded-[50%] w-[26px] flex items-center justify-center">
                                <img src={twiSvg} className="w-[13px] h-[13px] " />
                            </div>
                            <div className="text-[14px] font-medium leading-[20px]">Twitch</div>
                        </div>
                        <div className="bg-[#222222] cursor-pointer px-[16px] py-[8px] h-[40px] rounded-[12px] flex items-center gap-[8px]">
                            <div className="bg-[#222222] p-[6px] h-[26px] rounded-[50%] w-[26px] flex items-center justify-center">
                                <img src={tkSvg} className="w-[13px] h-[13px] " />
                            </div>
                            <div className="text-[14px] font-medium leading-[20px]">TikTok</div>
                        </div>
                        <div className="bg-[#222222] cursor-pointer px-[16px] py-[8px] h-[40px] rounded-[12px] flex items-center gap-[8px]">
                            <div className="bg-[#454545] p-[6px] h-[26px] rounded-[50%] w-[26px] flex items-center justify-center">
                                <Radio className="size-[13px]" />
                            </div>
                            <div className="text-[14px] font-medium leading-[20px]">Custom RTMP</div>
                        </div>
                    </div>
                    <div className="p-[25px] w-full rounded-[12px] bg-[#1d1d1d] flex flex-col gap-[24px]">
                        <div className="flex gap-[8px] items-center">
                            <div><Settings2 className="size-[20px]" /></div>
                            <div className="text-[20px] font-bold">Stream settings</div>
                        </div>
                        <div className="flex items-center gap-[24px] justify-between">
                            <div className="flex flex-col">
                                <div>Streaming resolution</div>
                                <div className="text-[12px] text-[#888888]">Choose the live streaming quality. This applies to the stream only, your recording resolution can be higher.</div>
                            </div>
                            <div className=" p-[4px] flex items-center gap-[4px] rounded-[12px] h-[40px] max-h-[40px] bg-[#383838]">
                                <div className={`whitespace-nowrap h-fit max-h-[32px] py-[6px] px-[12px] text-[14px] font-medium rounded-[8px] cursor-pointer ${isHighStreamingResolutionSelected ? "" : "bg-[#555555]"}`}
                                    onClick={() => { setIsHighStreamingResolutionSelected(false) }}>720p</div>
                                <div className={`whitespace-nowrap h-fit max-h-[32px] py-[6px] px-[12px] text-[14px] font-medium rounded-[8px] cursor-pointer ${isHighStreamingResolutionSelected ? "bg-[#555555]" : ""}`}
                                    onClick={() => { setIsHighStreamingResolutionSelected(true) }}>1080p</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <div className="text-[14px] ">Hide watermark</div>
                                <div className="text-[12px] text-[#888888] max-w-[600px]">Remove the Riverside watermark when streaming to other destinations.</div>
                            </div>
                            <ToggleSwitch enabled={hideWatermark} onChange={setHideWatermark} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <div className="text-[14px] ">Public chat</div>
                                <div className="text-[12px] text-[#888888] max-w-[600px]">
                                    Enable public chat to integrate comments from all destinations in one place, and select comments to show on the stream.{' '}
                                    <a className="text-[#9671ff] whitespace-nowrap cursor-pointer">Learn more</a>
                                </div>
                            </div>
                            <ToggleSwitch enabled={hideWatermark} onChange={setHideWatermark} />
                        </div>
                    </div>
                    <div className="p-[25px] w-full rounded-[12px] bg-[#1d1d1d] flex flex-col gap-[24px]">
                        <div className="flex gap-[8px] items-center">
                            <div><Users className="size-[20px]" /></div>
                            <div className="text-[20px] font-bold">Audience info</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <div className="text-[14px] ">Audience count</div>
                                <div className="text-[12px] text-[#888888] max-w-[600px]">Let guests and audience members see how many people are in the audience. You'll still be able to see the audience size even with this off.</div>
                            </div>
                            <ToggleSwitch enabled={isAudienceCountPublic} onChange={setIsAudienceCountPublic} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}