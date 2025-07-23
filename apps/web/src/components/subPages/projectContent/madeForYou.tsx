import MagicClips from "../../../assets/magicClips";
import MagicEpisodes from "../../../assets/magicEpisodes";

export default function MadeForYou({ linkedMadeForYou, setLinkedMadeForYou }: { linkedMadeForYou: any[], setLinkedMadeForYou: (recordings: any[]) => void }) {
    return (
        <div className="h-full w-full">
            {linkedMadeForYou.length > 0 ? <div>

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