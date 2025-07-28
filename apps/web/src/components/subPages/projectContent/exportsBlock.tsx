import { ArrowDownToLine, Ellipsis, Upload } from "lucide-react";

function formatMonthDateYear(isoDate: string) {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

// Example usage:
formatMonthDateYear("2023-10-01"); // "October 1, 2023"

export default function ExportsBlock({ linkedExport }: { linkedExport: any }) {
    return (
        <div className="w-full flex flex-col gap-[12px]">
            <div className="w-full aspect-[1.77778/1] bg-gray-700 rounded-[12px]"></div>
            <div className="flex gap-[8px] items-center justify-between">
                <div className="flex flex-col">
                    <div className="mb-[4px] text-[14px] font-semibold">{linkedExport.title} | {formatMonthDateYear(linkedExport.createdDate)}</div>
                    <div className="flex items-center gap-[4px]">
                        <div className="text-[12px] text-[#888888]">Edited x hour ago</div>
                        <div className="p-[6px] w-[28px] h-[28px] rounded-[10px] hover:bg-[#383838] cursor-pointer"><Ellipsis className="size-[16px]" /></div>
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