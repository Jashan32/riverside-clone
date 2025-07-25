import { CalendarPlus, Radio, ScissorsLineDashed, Upload } from "lucide-react";
import RecordingIcon from "../../assets/recordIcon";

export default function HomeHeader() {
    return (
                    <div className="flex items-center justify-center h-[93px]">
                <div className="flex item-center gap-[32px]">
                    <div className="flex flex-col items-center w-[65px] h-[93px] gap-[8px]">
                        <div className="w-[65px] h-[65px] py-[10px] px-[16px] rounded-full bg-[#e43b581a] cursor-pointer flex justify-center items-center group">
                            <RecordingIcon color="#e43b58" className="size-[21px]" />
                        </div>
                        <div className="text-[12px] font-medium">Record</div>
                    </div>
                    <div className="flex flex-col items-center w-[65px] h-[93px] gap-[8px]">
                        <div className="w-[65px] h-[65px] py-[10px] cursor-pointer hover:bg-[#383838] px-[16px] rounded-full bg-[#1d1d1d] flex justify-center items-center">
                            <ScissorsLineDashed color="white" className="size-[21px]" />
                        </div>
                        <div className="text-[12px] font-medium">Edit</div>
                    </div>
                    <div className="flex flex-col items-center w-[65px] h-[93px] gap-[8px]">
                        <div className="w-[65px] h-[65px] py-[10px] cursor-pointer hover:bg-[#383838] px-[16px] rounded-full bg-[#1d1d1d] flex justify-center items-center">
                            <Radio color="white" className="size-[21px]" />
                        </div>
                        <div className="text-[12px] font-medium">Go live</div>
                    </div>
                    <div className="flex flex-col items-center w-[65px] h-[93px] gap-[8px]">
                        <div className="w-[65px] h-[65px] py-[10px] cursor-pointer hover:bg-[#383838] px-[16px] rounded-full bg-[#1d1d1d] flex justify-center items-center">
                            <CalendarPlus color="white" className="size-[21px]" />
                        </div>
                        <div className="text-[12px] font-medium">Plan</div>
                    </div>
                    <div className="flex flex-col items-center w-[65px] h-[93px] gap-[8px]">
                        <div className="w-[65px] h-[65px] py-[10px] cursor-pointer hover:bg-[#383838] px-[16px] rounded-full bg-[#1d1d1d] flex justify-center items-center">
                            <Upload color="white" className="size-[21px]" />
                        </div>
                        <div className="text-[12px] font-medium">Upload</div>
                    </div>
                </div>
            </div>
    )
}