import { Search, Users } from "lucide-react";
import { useEffect, useState } from "react";

type Recording = {
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

export default function Recordings({ searchedItem }: { searchedItem?: string }) {
    const [allRecordings, setAllRecordings] = useState<Recording[]>([]);
    const [displayRecordings, setDisplayRecordings] = useState<Recording[]>([]);

    // temporary data for testing
    useEffect(() => {
        const data = [
            { id: 1, title: "Recording 1 Recording 1Recording 1Recording 1Recording 1", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 2, title: "Recording 2", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 3, title: "Recording 3", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 4, title: "Recording 4", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 5, title: "Recording 5", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 6, title: "Recording 6", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 7, title: "Recording 7", date: "2023-10-01", members: ["Member 1", "Member 2"] },
            { id: 8, title: "Recording 8", date: "2023-10-01", members: ["Member 1", "Member 2"] },
        ];
        setAllRecordings(data);
        setDisplayRecordings(data);
    }, []);

    useEffect(() => {
        if (searchedItem) {
            setDisplayRecordings(
                allRecordings.filter(recording =>
                    recording.title.toLowerCase().includes(searchedItem.toLowerCase())
                )
            );
        } else {
            setDisplayRecordings(allRecordings);
        }
    }, [searchedItem, allRecordings]);

    return (
        <div className="max-h-[434px] h-[434px] overflow-y-auto hide-scrollbar">
            {allRecordings.length > 0 ? <>
                {
                    displayRecordings.map((recording) => {
                        return (
                            <div key={recording.id} className="flex gap-[16px] w-full h-[80px] p-[12px] hover:bg-[#383838] cursor-pointer rounded-[10px]">
                                <div className="w-[100px] h-[56px] bg-gray-500 rounded-[10px]"></div>
                                <div className="flex flex-col gap-[5px] flex-1 min-w-0">
                                    <div className="flex items-center gap-[10px] min-w-0">
                                        <div className="text-white text-[14px] font-light truncate">{recording.title}</div>
                                        <div className="text-[#888888] text-[11px] whitespace-nowrap">{formatDate(recording.date)}</div>
                                    </div>
                                    <div className="flex items-center gap-[8px] min-w-0">
                                        <div><Users className="size-[14px] text-[#888888]" /></div>
                                        <div className="text-[#888888] text-[14px] truncate">
                                            {recording.members.join(", ")}
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