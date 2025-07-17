import { FolderOpen, Ellipsis } from 'lucide-react';

export default function ProjectCard({ title, timeCreated }: { title: string, timeCreated: string }) {
    return (
        <div className="w-[356px] h-[267px] flex flex-col">
            <div className="rounded-[8px] w-[100%] bg-[#1d1d1d] hover:bg-[#383838] cursor-pointer flex-1 bg-gradient-to-b from-transparent to-black/50 flex items-center justify-center">
                <FolderOpen className='size-[28px] text-[#555555]' />
            </div>
            <div className="h-[42px] mt-[12px] w-[100%] flex justify-between">
                <div>
                    <div className="text-[14px] font-bold">
                        {title}
                    </div>
                    <div className="text-[12px] text-[#888888] font-medium">
                        {timeCreated} ago
                    </div>
                </div>
                <div className='h-[32px] w-[32px] hover:bg-[#383838] flex items-center justify-center rounded-[8px]'>
                    <Ellipsis className='cursor-pointer size-[20px] ' />
                </div>
            </div>
        </div>
    )
}