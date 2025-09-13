import { useEffect, useState } from "react";
import MagicClips from "../../../assets/magicClips";
import MagicEpisodes from "../../../assets/magicEpisodes";
import { useParams } from "react-router-dom";
import MadeForYouBlock from "./madeForYouBlock";

export default function MadeForYou() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const { projectId } = useParams();

    const [linkedMadeForYou, setLinkedMadeForYou] = useState<any[]>([]);


    useEffect(() => {
        async function fetcher() {
            const res = await fetch(`${backendUrl}/madeforyou/all/${projectId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('authToken') || ""
                }
            });
            const data = await res.json();
            setLinkedMadeForYou(data.data);
            console.log(data.data)
        }
        fetcher();
    }, []);

    return (
        <div className="h-full w-full">
            {linkedMadeForYou.length > 0 ? <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
                    {linkedMadeForYou.map((linkedEdit, idx) => (
                        <MadeForYouBlock key={idx} linkedEdit={linkedEdit} />))}
                </div>
            </div> : <div className="flex flex-col items-center h-full">
                <div className="text-[16px] font-medium">No recordings yet</div>
                <div className="text-[16px] text-[#9e9e9e] mt-[24px]">All your edits will show up here.</div>
                <div className="mt-[24px] flex gap-[16px]">
                    <div className="w-[168px] h-[41px] cursor-default bg-[#1d1d1d] px-[16px] py-[10px] flex items-center justify-around rounded-[10px]">
                        <div><MagicEpisodes color="555555" className="size-[20px]" /></div>
                        <div className="text-[14px] text-[#555555]">Magic Episodes</div>
                    </div>
                    <div className="w-[140px] h-[41px] cursor-default bg-[#1d1d1d] px-[16px] py-[10px] flex items-center justify-around rounded-[10px]">
                        <div><MagicClips color="555555" className="size-[20px]" /></div>
                        <div className="text-[14px] text-[#555555]">Magic Clips</div>
                    </div>
                </div>
            </div>}
        </div>
    )
}