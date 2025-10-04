import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export default function FeatureCard({projectId, text1, text2}: {projectId?: string, text1?: string, text2?: string}) {
    const navigate = useNavigate();
    return (
        <div className="h-[110px] w-[200px] p-[16px] rounded-[8px] bg-[#1d1d1d] hover:bg-[#383838] flex-shrink-0 cursor-pointer"
            onClick={() => {
                if(text1==="Plan" && projectId){
                    navigate(`/dashboard/schedule/create/${uuidv4()}/${projectId}`)
                }
            }}>
            <div className="w-[20px] h-[20px] mb-[16px]">
                <Calendar className="size-[20px] text-[#c3afff]"/>
            </div>
            <div className="text-[14px] font-semibold">{text1}</div>
            <div className="text-[12px] text-[#888888]">{text2}.</div>
        </div>
    )
}