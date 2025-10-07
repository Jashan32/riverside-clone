import { Check, X } from "lucide-react";

export default function RemoveAlert({ ProjectName }: { ProjectName: string }) {
    return(
        <div className="relative top-5">
            <div className="px-[16px] py-[6px] mb-[16px] bg-[#2b2b2b] w-fit flex items-center gap-[20px] rounded-[8px] h-[52px]">
                <div className="flex gap-[8px] items-center">
                    <div><Check className="size-[20px]"/></div>
                    <div className="text-[14px] font-medium">{ProjectName} was removed.</div>
                </div>
                <div 
                onClick={()=>{}}>
                    <X className="size-[16px] text-[#696969] hover:text-white cursor-pointer" strokeWidth={3}/>
                </div>
            </div>
        </div>
    )
}