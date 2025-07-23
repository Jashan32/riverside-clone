import { useRef, useState } from "react";
import CurrentDateCard from "./components/cards/currentDateCard";
import AddButton from "./components/buttons/addButton";
import { useNavigate } from "react-router-dom";
import { ArrowDownWideNarrow } from "lucide-react";
import SessionCard from "./components/cards/sessionCard";
import SessionSort from "./components/dropdownMenu/sessionSort";
import { v4 as uuidv4 } from 'uuid';

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
    const [previousSessions, setPreviousSessions] = useState([{
        date: "2023-10-01",
        timeFrom: "10:00 AM",
        timeTo: "11:00 AM",
        timeOffset: "+05:30",
        title: "Monthly Review Meeting",
        invited: []
    }]);
    const [isSessionSortOpen, setIsSessionSortOpen] = useState(false);
    const [isUpcomingSortOpen, setIsUpcomingSortOpen] = useState(false);
    const SessionSortRef = useRef<HTMLDivElement>(null);

    return (
        <div className="px-[60px] pt-[60px] h-full">
            {
                upcomingSessions.length <= 0 ? <div className="w-full h-full flex flex-col items-center justify-center">
                    <CurrentDateCard />
                    <div className="text-[20px] font-extrabold mt-[24px]">No upcoming sessions</div>
                    <div className="text-[14px] text-[#888888] mt-[12px]">Plan your sessions in advance. Choose a date and time,</div>
                    <div className="text-[14px] text-[#888888]">then invite others to join or watch your event.</div>
                    <div className="mt-[20px]">
                        <AddButton text={"New session"} type="medium" onClickFunction={() => { navigate(`/dashboard/schedule/create/${uuidv4()}`) }} />
                    </div>

                </div> : <div>
                    <div className="h-[36px] flex items-center justify-between mb-[32px]">
                        <div className="text-[24px] font-extrabold">Scheduled sessions</div>
                        <div className="flex items-center gap-[12px]">
                            <div className="relative">
                                <div className={`${isSessionSortOpen ? "pointer-events-none" : ""} flex items-center gap-[8px] py-[8px] px-[12px] hover:bg-[#222222] rounded-[10px] cursor-pointer`}
                                    onClick={() => setIsSessionSortOpen(!isSessionSortOpen)}>
                                    <div><ArrowDownWideNarrow className="size-[20px]" /></div>
                                    <div className="text-[14px] font-semibold">Upcoming</div>
                                </div>
                                <div ref={SessionSortRef} className={`absolute right-0 top-full z-1 mt-2 ${isSessionSortOpen ? "opacity-100 translate-y-0 translate-x-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-10 translate-x-5 scale-70 pointer-events-none"} transition-all duration-200 ease-in-out`}>
                                    <SessionSort setIsSessionSortOpen={setIsSessionSortOpen} setIsUpcomingSortOpen={setIsUpcomingSortOpen} isUpcomingSortOpen={isUpcomingSortOpen} />
                                </div>
                            </div>
                            <div> <AddButton text="New" type="small" onClickFunction={() => { navigate(`/dashboard/schedule/create/${uuidv4()}`) }} /> </div>
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