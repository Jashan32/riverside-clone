import ytSvg from "../../../assets/ytSvg.svg";
import fbSvg from "../../../assets/fbSvg.svg";
export default function LiveStream() {
    return (
        <>
            <div className="flex gap-[5px] items-center my-[12px]">
                <div className="text-[#888888] text-[12px]">Manage your live stream and audience settings.</div>
                <div className="text-[12px] text-[#b196ff] cursor-pointer">Learn more</div>
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
                            <img src={ytSvg} className="h-[29px] w-[29px]" />
                            <div className="text-[14px] font-medium leading-[20px]">LinkedIn</div>
                        </div>
                        <div className="bg-[#222222] cursor-pointer px-[16px] py-[8px] h-[40px] rounded-[12px] flex items-center gap-[8px]">
                            <img src={ytSvg} className="h-[29px] w-[29px]" />
                            <div className="text-[14px] font-medium leading-[20px]">X (Twitter)</div>
                        </div>
                        <div className="bg-[#222222] cursor-pointer px-[16px] py-[8px] h-[40px] rounded-[12px] flex items-center gap-[8px]">
                            <img src={ytSvg} className="h-[29px] w-[29px]" />
                            <div className="text-[14px] font-medium leading-[20px]">Twitch</div>
                        </div>
                        <div className="bg-[#222222] cursor-pointer px-[16px] py-[8px] h-[40px] rounded-[12px] flex items-center gap-[8px]">
                            <img src={ytSvg} className="h-[29px] w-[29px]" />
                            <div className="text-[14px] font-medium leading-[20px]">TikTok</div>
                        </div>
                        <div className="bg-[#222222] cursor-pointer px-[16px] py-[8px] h-[40px] rounded-[12px] flex items-center gap-[8px]">
                            <img src={ytSvg} className="h-[29px] w-[29px]" />
                            <div className="text-[14px] font-medium leading-[20px]">Custom RTMP</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}