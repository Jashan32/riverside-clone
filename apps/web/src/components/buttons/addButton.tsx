import {Plus} from 'lucide-react';

export default function AddButton({text, type}: {text: string, type: string}) {
    return (
        <div className={`flex items-center hover:bg-[#5f3fc8] rounded-[10px] select-none ${type=="small"? "px-[12px] py-[8px] gap-[5px] pr-[17px] bg-[#7848ff]":"px-[16px] py-[10px] gap-[8px] bg-[#875eff]"} cursor-pointer`}>
            <Plus className='size-[20px]' />
            <div className='text-[14px]'>{text}</div>
        </div>
    )
}