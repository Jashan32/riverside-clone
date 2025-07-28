import { ArrowDownToLine, Check, Ellipsis, FolderDown, Scissors, Upload, Users } from "lucide-react";

export default function RecordingBlock({ recording, index }: { recording: any, index: number }) {
    console.log(recording.Participants.length)
    function formatMonthNameDate(isoDate: string) {
        const date = new Date(isoDate);
        return date.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
        });
    }
    return (
        <div className="w-full pb-[48px] mb-[32px] border-b-[1px] border-white/10">
            <div className="w-[50%] flex flex-col gap-[12px]">
                <div className="aspect-[1.77778/1] bg-[#3f3434] rounded-[12px]">
                </div>
                <div className="flex justify-between gap-[12px] mb-[4px] ">
                    <div className="mb-[4px] flex flex-col gap-[7px]">
                        {recording.Participants.length == 1 ? `${recording.Participants}` : recording.Participants.length == 2 ? `${recording.Participants[0]} & ${recording.Participants[1]}` : `${recording.Participants.map((participant: any) => participant).join(', ')}`}
                        <div className="flex gap-[15px] items-center">
                            <div className="text-[12px] text-[#888888] flex items-center">Created {formatMonthNameDate(recording.createdDate)}</div>
                            <div className="w-[30px] h-[30px] rounded-[10px] hover:bg-[#383838] flex items-center justify-center cursor-pointer"><Ellipsis className="size-[20px]" /></div>
                        </div>
                    </div>
                    <div className="flex gap-[8px]">
                        <div className="flex items-center gap-[8px] py-[8px] px-[12px] h-[36px] cursor-pointer bg-[#222222] hover:bg-[#383838] rounded-[10px]">
                            <div><Scissors className="size-[20px]" /></div>
                            <div className="text-[14px]">Edit</div>
                        </div>
                        <div className="flex items-center gap-[8px] py-[8px] px-[12px] h-[36px] cursor-pointer bg-[#222222] hover:bg-[#383838] rounded-[10px]">
                            <div><Upload className="size-[20px]" /></div>
                            <div className="text-[14px]">Share</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[32px] mb-[12px] flex justify-between items-center">
                <div className="text-[15px] font-extrabold">Tracks</div>
                <div className="h-[32px] rounded-[10px] flex items-center cursor-pointer bg-[#222222] hover:bg-[#383838] py-[6px] px-[12px] gap-[8px]">
                    <div><FolderDown className="size-[20px]" /></div>
                    <div className="text-[12px]">Export all</div>
                </div>
            </div>
            <div className="flex flex-col gap-[12px]">
                <div className="h-[74px] p-[12px] bg-[#1d1d1d] rounded-[12px] w-full flex items-center justify-between">
                    <div className="flex items-center gap-[12px]">
                        <div className="w-[73px] h-[50px] bg-[#2b2b2b] rounded-[8px] flex items-center justify-center"><Users className="size-[20px] text-[#b196ff]" /></div>
                        <div className="flex flex-col gap-[5px]">
                            <div className="text-[12px] font-bold">All participants</div>
                            {true ? <div className="flex items-center gap-[5px]">
                                <Check className="size-[16px] text-[#888888]" />
                                <div className="text-[12px] text-[#888888]">Ready</div>
                            </div> : <div className="flex items-center gap-[5px]">
                                <div className="text-[12px]">Uploading</div>
                                <div className="text-[12px]">x%</div>
                            </div>}
                        </div>
                    </div>
                    <div className="flex items-center gap-[8px]">
                        <div className={`flex items-center px-[16px] py-[10px] gap-[8px] rounded-[10px] bg-[#222222] hover:bg-[#383838] cursor-pointer`}>
                            <ArrowDownToLine className="size-[20px]" />
                            <div className="text-[13px]">High quality</div>
                        </div>
                        <div className={`flex items-center px-[16px] py-[10px] gap-[8px] rounded-[10px] bg-[#222222] hover:bg-[#383838] cursor-pointer`}>
                            <ArrowDownToLine className="size-[20px]" />
                            <div className="text-[13px]">Cloud</div>
                        </div>
                        <div className="w-[40px] h-[40px] p-[10px] cursor-pointer rounded-[10px] hover:bg-[#383838]"><Ellipsis className="size-[20px]" /></div>
                    </div>
                </div>
                {
                    recording.Participants.map((participant: any, idx: number) => (
                        <div className="h-[74px] p-[12px] bg-[#1d1d1d] rounded-[12px] w-full flex items-center justify-between">
                            <div className="flex items-center gap-[12px]">
                                <div className="w-[73px] h-[50px] bg-[#2b2b2b] rounded-[8px] flex items-center justify-center">{participant[0]}</div>
                                <div className="flex flex-col gap-[5px]">
                                    <div className="text-[12px] font-bold">{participant}</div>
                                    {true ? <div className="flex items-center gap-[5px]">
                                        <Check className="size-[16px] text-[#888888]" />
                                        <div className="text-[12px] text-[#888888]">Ready</div>
                                    </div> : <div className="flex items-center gap-[5px]">
                                        <div className="text-[12px]">Uploading</div>
                                        <div className="text-[12px]">x%</div>
                                    </div>}
                                </div>
                            </div>
                            <div className="flex items-center gap-[8px]">
                                <div className={`flex items-center px-[16px] py-[10px] gap-[8px] rounded-[10px] bg-[#222222] hover:bg-[#383838] cursor-pointer`}>
                                    <ArrowDownToLine className="size-[20px]" />
                                    <div className="text-[13px]">High quality</div>
                                </div>
                                <div className={`flex items-center px-[16px] py-[10px] gap-[8px] rounded-[10px] bg-[#222222] hover:bg-[#383838] cursor-pointer`}>
                                    <ArrowDownToLine className="size-[20px]" />
                                    <div className="text-[13px]">Cloud</div>
                                </div>
                                <div className="w-[40px] h-[40px] p-[10px] cursor-pointer rounded-[10px] hover:bg-[#383838]"><Ellipsis className="size-[20px]" /></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}