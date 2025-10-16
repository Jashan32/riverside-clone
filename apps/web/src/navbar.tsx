import { Search } from 'lucide-react';

export default function Navbar({ searchCardVisible, setSearchCardVisible }: { searchCardVisible: boolean, setSearchCardVisible: (visible: boolean) => void }) {
    return (
        <div className=" flex justify-around h-[56px] items-center">
            <div className="w-[480px] h-[32px] bg-[#222222] rounded-[8px] flex items-center justify-center cursor-pointer hover:bg-[#2b2b2b]"
                onClick={() => setSearchCardVisible(!searchCardVisible)}>
                <div className='flex items-center gap-[8px]'>
                    <Search className='size-[16px] text-[#888888]' />
                    <div className='text-white text-[16px]'>Search</div>
                </div>
            </div>
        </div>
    );
}