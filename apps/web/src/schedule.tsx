import { useState } from "react";
import CurrentDateCard from "./components/cards/currentDateCard";
import AddButton from "./components/buttons/addButton";
import { useNavigate } from "react-router-dom";
import { ArrowDownWideNarrow } from "lucide-react";
import SessionCard from "./components/cards/sessionCard";


export default function Schedule() {
    const navigate = useNavigate();
    const [upcomingSessions, setUpcomingSessions] = useState([{
        date: "2023-10-15",
        timeFrom: "10:00 AM",
        timeTo: "11:00 AM",
        timeOffset: "+05:30",
        title: "Weekly Team Sync",
        invited: []
    }]);
    return (
        <div className="px-[60px] pt-[60px] h-full">
            {
                upcomingSessions.length <= 0 ? <div className="w-full h-full flex flex-col items-center justify-center">
                    <CurrentDateCard />
                    <div className="text-[20px] font-extrabold mt-[24px]">No upcoming sessions</div>
                    <div className="text-[14px] text-[#888888] mt-[12px]">Plan your sessions in advance. Choose a date and time,</div>
                    <div className="text-[14px] text-[#888888]">then invite others to join or watch your event.</div>
                    <div className="mt-[20px]">
                        <AddButton text={"New session"} type="medium" onClickFunction={() => { navigate("/dashboard/schedule/create") }} />
                    </div>

                </div> : <div>
                    <div className="h-[36px] flex items-center justify-between mb-[32px]">
                        <div className="text-[24px] font-extrabold">Scheduled sessions</div>
                        <div className="flex items-center gap-[12px]">
                            <div className="flex items-center gap-[8px] py-[8px] px-[12px] hover:bg-[#222222] rounded-[10px] cursor-pointer">
                                <div><ArrowDownWideNarrow className="size-[20px]" /></div>
                                <div className="text-[14px] font-semibold">Upcoming</div>
                            </div>
                            <div> <AddButton text="New" type="small" onClickFunction={() => { }} /> </div>
                        </div>
                    </div>
                    {
                        upcomingSessions.map((session, index) => {
                            return (
                                <SessionCard session={session} />
                            )
                        })
                    }
                </div>
            }
        </div>
    );
}