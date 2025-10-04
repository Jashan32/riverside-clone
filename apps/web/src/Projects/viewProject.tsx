import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SessionCard from "../components/cards/sessionCard";
import ProjectContent from "../components/subPages/projectContent/projectContent";
import CreateProject from "./createProject";

export default function ViewProject() {
    const backEndUrl = import.meta.env.VITE_BACKEND_URL
    const { projectId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [tabSelected, setTabSelected] = useState("Recordings");
    const [projectData, setProjectData] = useState<any>(null);
    const [projectName, setProjectName] = useState<string>("");

    const [linedSession, setLinedSession] = useState([{}]);
    useEffect(() => {
        async function fetchProject() {
            const result = await fetch(`${backEndUrl}/project/${projectId}`, {
                headers: {
                    "token": `${localStorage.getItem("authToken")}`,
                },
            });
            const parsed = await result.json();
            setProjectData(parsed.data);
            setProjectName(parsed.data.title);
        }
        async function fetchSessions() {
            const result = await fetch(`${backEndUrl}/getsession/linked/${projectId}`, {
                headers: {
                    "token": `${localStorage.getItem("authToken")}`,
                }
            }).then(res => res.json());
            console.log(result)
            console.log(result.length)
            setLinedSession(result)
        }
        fetchSessions()
        fetchProject();

    }, [projectId]);
    useEffect(() => {
        if (location.state?.tab) {
            setTabSelected(location.state.tab);
        }
    }, [location.state]);

    return (
        projectData?.containsData ? (
            <div className="px-[16px]">
                <div className="px-[46px] h-[60px] pl-[28px] flex items-center ">
                    <div className="text-[14px] text-[#888888] hover:text-white font-extrabold cursor-pointer "
                        onClick={() => { navigate('/dashboard/project') }}>Projects</div>
                    <div className="w-[16px] h-[16px] mx-[12px] flex items-center"><ChevronRight className="size-[16px] text-[#888888] " /></div>
                    <div className="text-[14px] font-extrabold ">{projectName}</div>
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
            </div>) : (
            <CreateProject isAlredyCreated={true} id={projectId} name={projectName} />
        )

    )
}