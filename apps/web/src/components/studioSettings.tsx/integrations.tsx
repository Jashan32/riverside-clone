import hubSpotSvg from "../../assets/hubSpotSvg.svg";
export default function Integrations() {
    return (
        <div className="w-[800px] rounded-[12px] bg-[#1d1d1d] p-[24px]">
            <div className="flex flex-col gap-[8px]">
                <div className="text-[20px] font-bold">Integrations</div>
                <div className="flex gap-[5px] text-[12px]">
                    <div className="text-[#888888]">Connect apps and services to streamline your workflow.</div>
                    <div className="text-[#b196ff] cursor-pointer">Learn more</div>
                </div>
                <div className="mt-[20px] flex justify-between items-center">
                    <div className="flex gap-[12px] items-center">
                        <div className="p-[8px] w-[44px] h-[44px] bg-white rounded-[12px]"><img src={hubSpotSvg} className="" /></div>
                        <div className="text-[14px]">HubSpot</div>
                    </div>
                    <div className="px-[12px] py-[8px] text-[14px] rounded-[10px] bg-[#2b2b2b] hover:bg-[#383838] cursor-pointer">
                        Connect
                    </div>
                </div>
            </div>
        </div>
    )
}