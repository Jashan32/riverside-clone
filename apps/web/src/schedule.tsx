import { useState } from "react";
import CurrentDateCard from "./components/cards/currentDateCard";
import AddButton from "./components/buttons/addButton";
import { useNavigate } from "react-router-dom";


export default function Schedule() {
    const navigate = useNavigate();
    const [upcomingSessions, setUpcomingSessions] = useState([]);
    return (
        <div className="px-[60px] pt-[60px] h-full">
            {
                upcomingSessions.length <= 0 ? <div className="w-full h-full flex flex-col items-center justify-center">
                    <CurrentDateCard />
                    <div className="text-[20px] font-extrabold mt-[24px]">No upcoming sessions</div>
                    <div className="text-[14px] text-[#888888] mt-[12px]">Plan your sessions in advance. Choose a date and time,</div>
                    <div className="text-[14px] text-[#888888]">then invite others to join or watch your event.</div>
                    <div className="mt-[20px]">
                        <AddButton text={"New session"} type="medium" onClickFunction={()=>{navigate("/dashboard/schedule/create")}}/>
                    </div>

                </div> : <div>
                
                </div>
            }
        </div>
    );
}