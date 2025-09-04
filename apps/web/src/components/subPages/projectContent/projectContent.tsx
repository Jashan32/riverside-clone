import { useEffect, useState } from "react";
import ProjectTabs from "../../headers/projectTabs";
import Edits from "./edits";
import Exports from "./exports";
import MadeForYou from "./madeForYou";
import Recordings from "./recordings";
import { useParams } from "react-router-dom";

export default function ProjectContent({ tabSelected, setTabSelected }: { tabSelected: string, setTabSelected: (tab: string) => void }) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const { projectId } = useParams();
    const [linkedRecordings, setLinkedRecordings] = useState<any[]>([]);
    const [linkedMadeForYou, setLinkedMadeForYou] = useState<any[]>([]);
    const [linkedExports, setLinkedExports] = useState<any[]>([]);

    useEffect(() => {
        async function fetcher() {
            const res = await fetch(`${backendUrl}/recording/all/${projectId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('authToken') || ""
                }
            });
            const data = await res.json();
            setLinkedRecordings(data.data);
        }
        fetcher();
    }, []);

    useEffect(() => {
        const exportData = [{ id: 1, title: "Sample Export 1", Participants: ["Jashan", "Jashan Alt"], duration: "2:30", createdDate: "2023-10-01" },
        { id: 2, title: "Sample Export 2", Participants: ["Jashan", "Jashan Alt"], duration: "3:15", createdDate: "2023-10-02" },
        { id: 3, title: "Sample Export 3", duration: "1:45", Participants: ["Jashan", "Jashan Alt"], createdDate: "2023-10-03" },
        { id: 4, title: "Sample Export 4", duration: "4:00", Participants: ["Jashan", "Jashan Alt"], createdDate: "2023-10-04" }];
        setLinkedExports(exportData);
    }, [])
    return (
        <div className="">
            <div className="mb-[48px]">
                <ProjectTabs tabSelected={tabSelected} setTabSelected={setTabSelected} />
            </div>
            {tabSelected === "Recordings" && <Recordings linkedRecordings={linkedRecordings} setLinkedRecordings={setLinkedRecordings} />}
            {tabSelected === "Made for You" && <MadeForYou linkedMadeForYou={linkedMadeForYou} setLinkedMadeForYou={setLinkedMadeForYou} />}
            {tabSelected === "Edits" && <Edits />}
            {tabSelected === "Exports" && <Exports linkedExports={linkedExports} setLinkedExports={setLinkedExports} />}
        </div>
    );
}