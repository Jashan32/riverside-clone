import { useState } from "react";
import ProjectTabs from "../../headers/projectTabs";
import Edits from "./edits";
import Exports from "./exports";
import MadeForYou from "./madeForYou";
import Recordings from "./recordings";

export default function ProjectContent({ tabSelected, setTabSelected }: { tabSelected: string, setTabSelected: (tab: string) => void }) {
    const [linkedRecordings, setLinkedRecordings] = useState<any[]>([]);
    const [linkedEdits, setLinkedEdits] = useState<any[]>([]);
    const [linkedMadeForYou, setLinkedMadeForYou] = useState<any[]>([]);
    const [linkedExports, setLinkedExports] = useState<any[]>([]);

    return (
        <div className="">
            <div className="mb-[48px]">
                <ProjectTabs tabSelected={tabSelected} setTabSelected={setTabSelected} />
            </div>
            {tabSelected === "Recordings" && <Recordings linkedRecordings={linkedRecordings} setLinkedRecordings={setLinkedRecordings} />}
            {tabSelected === "Made for You" && <MadeForYou linkedMadeForYou={linkedMadeForYou} setLinkedMadeForYou={setLinkedMadeForYou} />}
            {tabSelected === "Edits" && <Edits linkedEdits={linkedEdits} setLinkedEdits={setLinkedEdits} />}
            {tabSelected === "Exports" && <Exports linkedExports={linkedExports} setLinkedExports={setLinkedExports} />}
        </div>
    );
}