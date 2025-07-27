import { Search, Users } from "lucide-react";
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

export default function MagicClips({ searchedItem }: { searchedItem?: string }) {
    const [allMagicClips, setAllMagicClips] = useState<Episode[]>([]);
    const [displayMagicClips, setDisplayMagicClips] = useState<Episode[]>([]);

    // temporary data for testing
    useEffect(() => {
        const data = [
            { id: 1, title: "Untitled Magic clip", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 2, title: "Untitled Magic clip 2", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 3, title: "Untitled Magic clip 3", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 4, title: "Untitled Magic clip 4", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 5, title: "Untitled Magic clip 5", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 6, title: "Untitled Magic clip 6", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 7, title: "Untitled Magic clip 7", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 8, title: "Untitled Magic clip 8", date: "2023-10-01", members: ["Member 1", "Member 2"] },
        ];
        setAllMagicClips(data);
        setDisplayMagicClips(data);
    }, []);

    useEffect(() => {
        if (searchedItem) {
            setDisplayMagicClips(
                allMagicClips.filter(clip =>
                    clip.title.toLowerCase().includes(searchedItem.toLowerCase())
                )
            );
        } else {
            setDisplayMagicClips(allMagicClips);
        }
    }, [searchedItem, allMagicClips]);

    return (
        <div className="max-h-[434px] h-[434px] overflow-y-auto hide-scrollbar">
            {allMagicClips.length > 0 ? <>
                {
                    displayMagicClips.map((clip) => {
                        return (
                            <div key={clip.id} className="flex gap-[16px] w-full h-[80px] p-[12px] hover:bg-[#383838] cursor-pointer rounded-[10px]">
                                <div className="w-[100px] h-[56px] bg-gray-500 rounded-[10px]"></div>
                                <div className="flex flex-col gap-[5px] flex-1 min-w-0">
                                    <div className="flex items-center gap-[10px] min-w-0">
                                        <div className="text-white text-[14px] font-light truncate">{clip.title}</div>
                                        <div className="text-[#888888] text-[11px] whitespace-nowrap">{formatDate(clip.date)}</div>
                                    </div>
                                    <div className="flex items-center gap-[8px] min-w-0">
                                        <div><Users className="size-[14px] text-[#888888]" /></div>
                                        <div className="text-[#888888] text-[14px] truncate">
                                            {clip.members.join(", ")}
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