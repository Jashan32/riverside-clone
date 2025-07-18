import { List, ArrowDownWideNarrow, Search } from 'lucide-react';
import GenericDropdown from './dropdownMenu/generic';
import AddButton from './buttons/addButton';

export default function ProjectHeader() {
    return (
        <div className="h-[36px] flex items-end justify-between">
            <div className="text-[20px] font-extrabold">Projects</div>
            <div className='flex gap-[8px]'>
                <div className='relative flex flex-col justify-center p-[8px] rounded-[10px] cursor-pointer hover:bg-[#383838] group'>
                    <div>
                        <Search className='size-[20px]' />
                    </div>
                    <GenericDropdown title={"Search projects"} />
                </div>
                <div className='relative flex flex-col justify-center p-[8px] rounded-[10px] cursor-pointer hover:bg-[#383838] group'>
                    <div>
                        <ArrowDownWideNarrow className='size-[20px]' />
                    </div>
                    <GenericDropdown title={"Sort"} />
                </div>
                <div className='relative flex flex-col justify-center p-[8px] rounded-[10px] cursor-pointer hover:bg-[#383838] group'>
                    <List className='size-[20px]' />
                    <GenericDropdown title={"List view"} />
                </div>
                <AddButton text={"New"} type='small' />
            </div>
        </div>
    )
}