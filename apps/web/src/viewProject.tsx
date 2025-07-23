import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SessionCard from "./components/cards/sessionCard";
import ProjectTabs from "./components/headers/projectTabs";
import Recordings from "./components/subPages/projectContent/recordings";
import ProjectContent from "./components/subPages/projectContent/projectContent";

export default function ViewProject() {
    const [tabSelected, setTabSelected] = useState("Recordings");
    const navigate = useNavigate();
    const { projectId, projectName } = useParams();
    // const [linkedRecordings, setLinkedRecordings] = useState<any[]>([]);
    const [linedSession, setLinedSession] = useState([{
        date: "2023-10-15",
        timeFrom: "10:00 AM",
        timeTo: "11:00 AM",
        timeOffset: "+05:30",
        title: "Weekly Team Sync",
        invited: []
    }]);

    return (
        <div className="px-[16px]">
            <div className="h-[60px] pl-[28px] flex items-center ">
                <div className="text-[22px] text-[#888888] hover:text-white font-extrabold cursor-pointer "
                    onClick={() => { navigate('/dashboard/project') }}>Projects</div>
                <div className="w-[16px] h-[16px] mx-[12px] flex items-center"><ChevronRight className="size-[16px] text-[#888888] " /></div>
                <div className="text-[22px] font-extrabold ">{projectName}</div>
            </div>
            <div className="flex flex-col gap-[44px]">
                <div className="text-[20px] font-extrabold">Session({linedSession.length})</div>
                <div>
                    {
                        linedSession.map((session, index) => {
                            return (
                                <SessionCard session={session} />
                            )
                        })
                    }
                </div>
            </div>
            {/* conatins Recordings, Made for you, Edits, Exports */}
            <div>
                <ProjectContent tabSelected={tabSelected} setTabSelected={setTabSelected} />
            </div>
        </div>
    )
}