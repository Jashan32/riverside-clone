import { FolderOpen } from "lucide-react";
import { useEffect, useState } from "react";

type Projects = {
    id: number;
    title: string;
    date: string;
};

function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    }).replace(",", ",");
}

export default function Projects() {
    const [projects, setProjects] = useState<Projects[]>([]);

    // temporary data for testing
    useEffect(() => {
        setProjects([
            { id: 1, title: "project 1", date: "2023-10-01" },
            { id: 2, title: "project 2", date: "2023-10-01" },
            { id: 3, title: "project 3", date: "2023-10-01" },
            { id: 4, title: "project 4", date: "2023-10-01" },
            { id: 5, title: "project 5", date: "2023-10-01" },
            { id: 6, title: "project 6", date: "2023-10-01" },
            { id: 7, title: "project 7", date: "2023-10-01" },
            { id: 8, title: "project 8", date: "2023-10-01" },
        ]);
    }, []);

    return (
        <div className="max-h-[434px] h-[434px] overflow-y-auto hide-scrollbar">
            {
                projects.map((project) => {
                    return (
                        <div key={project.id} className="flex gap-[16px] w-full h-[80px] p-[12px] hover:bg-[#383838] cursor-pointer rounded-[10px]">
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
        </div>
    )
}