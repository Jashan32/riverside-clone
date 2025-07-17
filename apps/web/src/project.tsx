import { Plus, List, ArrowDownWideNarrow, Search } from 'lucide-react';

export default function Project() {
    return (
        <div className="">
            <div>
                <div className="h-[36px] flex items-end justify-between">
                    <div className="text-[20px] font-extrabold">Projects</div>
                    <div className='flex gap-[8px]'>
                        <div className='flex flex-col justify-center p-[8px] rounded-[10px] cursor-pointer hover:bg-[#383838]'>
                            <Search className='size-[20px]' />
                        </div>
                        <div className='flex flex-col justify-center p-[8px] rounded-[10px] cursor-pointer hover:bg-[#383838]'>
                            <ArrowDownWideNarrow className='size-[20px]' />
                        </div>
                        <div className='flex flex-col justify-center p-[8px] rounded-[10px] cursor-pointer hover:bg-[#383838]'>
                            <List className='size-[20px]' />
                        </div>
                        <div className='flex gap-[8px] h-[36px] w-[81px] bg-[#7848ff] hover:bg-[#5f3fc8] rounded-[10px] px-[12px] py-[8px] cursor-pointer'>
                            <Plus className='size-[20px]' />
                            <div className='text-[14px]'>New</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
