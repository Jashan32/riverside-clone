import { ArrowDownToLine, Ellipsis, Upload } from "lucide-react";
import { useState } from "react";
import ExportOptions from "../../dropdownMenu/exportOptions";

function formatMonthDateYear(isoDate: string) {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function ExportsBlock({ linkedExport }: { linkedExport: any }) {
    const [isExportOptionsOpen, setIsExportOptionsOpen] = useState(false);
    return (
        <div className="w-full flex flex-col gap-[12px]">
            <div className="w-full aspect-[1.77778/1] bg-gray-700 rounded-[12px]"></div>
            <div className="flex gap-[8px] items-center justify-between">
                <div className="flex flex-col">
                    <div className="mb-[4px] text-[14px] font-semibold">{linkedExport.title} | {formatMonthDateYear(linkedExport.createdDate)}</div>
                    <div className="flex items-center gap-[4px]">
                        <div className="text-[12px] text-[#888888]">Edited x hour ago</div>
                        <div onClick={() => setIsExportOptionsOpen(!isExportOptionsOpen)} className="relative">
                            <div className="w-[40px] h-[40px] p-[10px] cursor-pointer rounded-[10px] hover:bg-[#383838]"><Ellipsis className="size-[20px]" /></div>
                            <div className={`absolute right-0 top-full z-1 mt-2 ${isExportOptionsOpen ? "opacity-100 translate-y-0 translate-x-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-10 translate-x-5 scale-70 pointer-events-none"} transition-all duration-200 ease-in-out`}>
                                <ExportOptions setIsRecordingOptionsOpen={setIsExportOptionsOpen} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-[8px]">
                    <div className={`flex items-center px-[16px] py-[10px] gap-[8px] rounded-[10px] bg-[#222222] hover:bg-[#383838] cursor-pointer`}>
                        <ArrowDownToLine className="size-[20px]" />
                        <div className="text-[13px]">Download</div>
                    </div>
                    <div className={`flex items-center px-[16px] py-[10px] gap-[8px] rounded-[10px] bg-[#222222] hover:bg-[#383838] cursor-pointer`}>
                        <Upload className="size-[20px]" />
                        <div className="text-[13px]">Share</div>
                    </div>

                </div>
            </div>
        </div>
    )
}