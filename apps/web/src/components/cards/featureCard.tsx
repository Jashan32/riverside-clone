import { Calendar } from "lucide-react";
export default function FeatureCard({text1, text2}: {text1?: string, text2?: string}) {
    return (
        <div className="h-[110px] w-[200px] p-[16px] rounded-[8px] bg-[#1d1d1d] hover:bg-[#383838] flex-shrink-0 cursor-pointer">
            <div className="w-[20px] h-[20px] mb-[16px]">
                <Calendar className="size-[20px] text-[#c3afff]"/>
            </div>
            <div className="text-[14px] font-semibold">{text1}</div>
            <div className="text-[12px] text-[#888888]">{text2}.</div>
        </div>
    )
}