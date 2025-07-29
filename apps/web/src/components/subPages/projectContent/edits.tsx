import { Scissors } from "lucide-react";
import EditsBlock from "./editsBlock";

export default function Edits({ linkedEdits, setLinkedEdits }: { linkedEdits: any[], setLinkedEdits: (recordings: any[]) => void }) {
    return (
        <div className="h-full w-full">
            {linkedEdits.length > 0 ? <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
                    {linkedEdits.map((linkedEdit, idx) => (
                        <EditsBlock key={idx} linkedEdit={linkedEdit} />))}
                </div>
            </div> : <div className="flex flex-col items-center h-full">
                <div className="text-[16px] font-medium">No edits yet</div>
                <div className="text-[16px] text-[#9e9e9e] mt-[24px]">All your edits will show up here.</div>
                <div className="mt-[24px] flex gap-[16px]">
                    {/* <div className="w-[120px] h-[52px] cursor-pointer hover:bg-[#593cbc] bg-[#7848ff] px-[16px] py-[10px] flex items-center justify-around rounded-[10px]">
                        <div><Video className="size-[20px]" /></div>
                        <div className="text-[14px]">Record</div>
                    </div> */}
                    <div className="w-[200px] h-[41px] cursor-pointer hover:bg-[#383838] bg-[#2b2b2b] px-[16px] py-[10px] flex items-center justify-around rounded-[10px]">
                        <div><Scissors className="size-[20px]" /></div>
                        <div className="text-[14px]">Edit from scratch</div>
                    </div>
                </div>
            </div>}
        </div>
    )
}