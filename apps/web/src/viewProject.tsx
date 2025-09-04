import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SessionCard from "./components/cards/sessionCard";
import ProjectContent from "./components/subPages/projectContent/projectContent";

export default function ViewProject() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const location = useLocation();
    const [tabSelected, setTabSelected] = useState("Recordings");
    const navigate = useNavigate();
    const { projectId, projectName } = useParams();
    const [project, setProject] = useState<any>()

    useEffect(() => {
        async function fetcher() {
            const res = await fetch(`${backendUrl}/project/${projectId}`)
            const data = await res.json()
            console.log(data)
        }
        fetcher()
    })
    const [linedSession, setLinedSession] = useState([{
        date: "2023-10-15",
        timeFrom: "10:00 AM",
        timeTo: "11:00 AM",
        timeOffset: "+05:30",
        title: "Weekly Team Sync",
        invited: []
    }]);
    useEffect(() => {
        if (location.state?.tab) {
            setTabSelected(location.state.tab);
        }
    }, [location.state]);

    return (
        <div className="px-[16px]">
            <div className="px-[46px] h-[60px] pl-[28px] flex items-center ">
                <div className="text-[22px] text-[#888888] hover:text-white font-extrabold cursor-pointer "
                    onClick={() => { navigate('/dashboard/project') }}>Projects</div>
                <div className="w-[16px] h-[16px] mx-[12px] flex items-center"><ChevronRight className="size-[16px] text-[#888888] " /></div>
                <div className="text-[22px] font-extrabold ">{projectName}</div>
            </div>
            <div className="flex flex-col gap-[44px] px-[46px]">
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
            <div className="px-[46px]">
                <ProjectContent tabSelected={tabSelected} setTabSelected={setTabSelected} />
            </div>
        </div>
    )
}