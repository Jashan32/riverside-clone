import { FolderOpen, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Projects = {
    id: number;
    title: string;
    date: string;
    projectId: string;
    projectName: string;
};

function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    }).replace(",", ",");
}

export default function Projects({ searchedItem, setSearchCardVisible }: { searchedItem?: string, setSearchCardVisible: (visible: boolean) => void }) {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Projects[]>([]);
    const [displayProjects, setDisplayProjects] = useState<Projects[]>([]);

    // temporary data for testing
    useEffect(() => {
        const data = [
            { id: 1, projectId: "id1", projectName: "untitled", title: "project 1", date: "2023-10-01" },
            { id: 2, projectId: "id2", projectName: "untitled", title: "project 2", date: "2023-10-01" },
            { id: 3, projectId: "id3", projectName: "untitled", title: "project 3", date: "2023-10-01" },
            { id: 4, projectId: "id4", projectName: "untitled", title: "project 4", date: "2023-10-01" },
            { id: 5, projectId: "id5", projectName: "untitled", title: "project 5", date: "2023-10-01" },
            { id: 6, projectId: "id6", projectName: "untitled", title: "project 6", date: "2023-10-01" },
            { id: 7, projectId: "id7", projectName: "untitled", title: "project 7", date: "2023-10-01" },
            { id: 8, projectId: "id8", projectName: "untitled", title: "project 8", date: "2023-10-01" },
        ];
        setProjects(data);
        setDisplayProjects(data);
    }, []);

    useEffect(() => {
        if (searchedItem) {
            setDisplayProjects(
                projects.filter(project =>
                    project.title.toLowerCase().includes(searchedItem.toLowerCase())
                )
            );
        } else {
            setDisplayProjects(projects);
        }
    }, [searchedItem, projects]);

    return (
        <div className="max-h-[434px] h-[434px] overflow-y-auto hide-scrollbar">
            {projects.length > 0 ? <>
                {
                    displayProjects.map((project) => {
                        return (
                            <div key={project.id} className="flex gap-[16px] w-full h-[80px] p-[12px] hover:bg-[#383838] cursor-pointer rounded-[10px]"
                                onClick={() => {
                                    navigate(`/dashboard/project/view/${project.projectId}/${project.projectName}`, {
                                        state: { tab: "Recordings" },
                                    });
                                    setSearchCardVisible?.(false);
                                }}>
                                <div className="w-[100px] h-[56px] bg-[#1d1d1d] rounded-[10px] flex items-center justify-center"><FolderOpen className="text-white size-[20px]" /></div>
                                <div className="flex flex-col gap-[5px] flex-1 min-w-0">
                                    <div className="flex items-center gap-[10px] min-w-0">
                                        <div className="text-white text-[14px] font-light truncate ">{project.title}</div>
                                        <div className="text-[#888888] text-[11px] whitespace-nowrap ">{formatDate(project.date)}</div>
                                    </div>
                                    <div className="flex items-center gap-[5px] min-w-0">
                                        <div><FolderOpen className="size-[14px] text-[#888888] " /></div>
                                        <div className="text-[#888888] text-[14px] truncate">Project</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </> :
                <div className="flex items-center justify-center h-full flex-col gap-[8px]">
                    <div><Search className="size-[20px] text-[#888888]" /></div>
                    <div className="text-[#888888] text-[14px]">Nothing found :(</div>
                </div>}
        </div>
    )
}