import { Play, Search, Users } from "lucide-react";
import { useEffect, useState } from "react";

type Episode = {
    id: number;
    title: string;
    date: string;
    members: string[];
};

function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    }).replace(",", ",");
}

export default function Exports({ searchedItem }: { searchedItem?: string }) {
    const [allMagicExports, setAllMagicExports] = useState<Episode[]>([]);
    const [displayMagicExports, setDisplayMagicExports] = useState<Episode[]>([]);

    // temporary data for testing
    useEffect(() => {
        const data = [
            { id: 1, title: "Untitled Magic Export", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 2, title: "Untitled Magic Export 2", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 3, title: "Untitled Magic Export 3", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 4, title: "Untitled Magic Export 4", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 5, title: "Untitled Magic Export 5", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 6, title: "Untitled Magic Export 6", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 7, title: "Untitled Magic Export 7", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 8, title: "Untitled Magic Export 8", date: "2023-10-01", members: ["Member 1", "Member 2"] },
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
                            <div key={Export.id} className="flex gap-[16px] w-full h-[80px] p-[12px] hover:bg-[#383838] cursor-pointer rounded-[10px]">
                                <div className="w-[100px] h-[56px] bg-[#1d1d1d] rounded-[10px] flex items-center justify-center"><Play className="size-[20px] text-[#9a86dc]"/></div>
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