import { Play, Search, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Exports = {
    id: number;
    title: string;
    date: string;
    members: string[];
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

export default function Exports({ searchedItem, setSearchCardVisible }: { searchedItem?: string, setSearchCardVisible?: (visible: boolean) => void }) {
    const navigate = useNavigate()
    const [allMagicExports, setAllMagicExports] = useState<Exports[]>([]);
    const [displayMagicExports, setDisplayMagicExports] = useState<Exports[]>([]);

    // temporary data for testing
    useEffect(() => {
        const data = [
            { id: 1, projectId: "id1", projectName: "untitled", title: "Untitled Magic Export", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 2, projectId: "id2", projectName: "untitled", title: "Untitled Magic Export 2", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 3, projectId: "id3", projectName: "untitled", title: "Untitled Magic Export 3", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 4, projectId: "id4", projectName: "untitled", title: "Untitled Magic Export 4", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 5, projectId: "id5", projectName: "untitled", title: "Untitled Magic Export 5", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 6, projectId: "id6", projectName: "untitled", title: "Untitled Magic Export 6", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 7, projectId: "id7", projectName: "untitled", title: "Untitled Magic Export 7", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 8, projectId: "id8", projectName: "untitled", title: "Untitled Magic Export 8", date: "2023-10-01", members: ["Member 1", "Member 2"] },
        ];
        setAllMagicExports(data);
        setDisplayMagicExports(data);
    }, []);

    useEffect(() => {
        if (searchedItem) {
            setDisplayMagicExports(
                allMagicExports.filter(Export =>
                    Export.title.toLowerCase().includes(searchedItem.toLowerCase())
                )
            );
        } else {
            setDisplayMagicExports(allMagicExports);
        }
    }, [searchedItem, allMagicExports]);

    return (
        <div className="max-h-[434px] h-[434px] overflow-y-auto hide-scrollbar">
            {allMagicExports.length > 0 ? <>
                {
                    displayMagicExports.map((Export) => {
                        return (
                            <div key={Export.id} className="flex gap-[16px] w-full h-[80px] p-[12px] hover:bg-[#383838] cursor-pointer rounded-[10px]"
                                onClick={() => {
                                    navigate(`/dashboard/project/view/${Export.projectId}/${Export.projectName}`, {
                                        state: { tab: "Exports" },
                                    });
                                    setSearchCardVisible?.(false);
                                }}>
                                <div className="w-[100px] h-[56px] bg-[#1d1d1d] rounded-[10px] flex items-center justify-center"><Play className="size-[20px] text-[#9a86dc]" /></div>
                                <div className="flex flex-col gap-[5px] flex-1 min-w-0">
                                    <div className="flex items-center gap-[10px] min-w-0">
                                        <div className="text-white text-[14px] font-light truncate">{Export.title}</div>
                                        <div className="text-[#888888] text-[11px] whitespace-nowrap">{formatDate(Export.date)}</div>
                                    </div>
                                    <div className="flex items-center gap-[8px] min-w-0">
                                        <div><Users className="size-[14px] text-[#888888]" /></div>
                                        <div className="text-[#888888] text-[14px] truncate">
                                            {Export.members.join(", ")}
                                        </div>
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