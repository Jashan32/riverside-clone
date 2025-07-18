import {Plus} from 'lucide-react';

export default function AddButton({text, type}: {text: string, type: string}) {
    return (
        <div className={`flex items-center gap-[8px] hover:bg-[#5f3fc8] rounded-[10px] ${type=="small"? "px-[12px] py-[8px] bg-[#7848ff]":"px-[16px] py-[10px] bg-[#875eff]"} cursor-pointer`}>
            <Plus className='size-[20px]' />
            <div className='text-[14px]'>{text}</div>
        </div>
    )
}