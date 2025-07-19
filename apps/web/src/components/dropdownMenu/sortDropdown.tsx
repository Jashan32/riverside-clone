import { Check } from "lucide-react";

export default function SortDropdown({ setSortDropDownState, setSortState, sortState }: { setSortDropDownState: (state: boolean) => void, setSortState: (state: string) => void, sortState: string,  }) {
    const handleSortChange = (newSortState: string) => {
        setSortState(newSortState);
        localStorage.setItem('sortState', newSortState);
        setSortDropDownState(false);
    };
    
    return (
        <div className="select-none flex flex-col w-[240px] h-[192px] p-[8px] bg-[#2b2b2b] rounded-[12px]">
            <div className="flex justify-between h-[44px] py-[10px] px-[16px] hover:bg-[#383838] cursor-pointer rounded-[8px]"
                onClick={() => handleSortChange('newest')}>
                <div className="text-[14px]">Newest</div>
                <Check className={`size-[20px] ${sortState == "newest" ? "flex" : "hidden"} `} />
            </div>
            <div className="flex justify-between h-[44px] py-[10px] px-[16px] hover:bg-[#383838] cursor-pointer rounded-[8px]"
                onClick={() => handleSortChange('oldest')}>
                <div className="text-[14px]">Oldest</div>
                <Check className={`size-[20px] ${sortState == "oldest" ? "flex" : "hidden"} `} />
            </div>
            <div className="flex justify-between h-[44px] py-[10px] px-[16px] hover:bg-[#383838] cursor-pointer rounded-[8px]"
                onClick={() => handleSortChange('a-z')}>
                <div className="text-[14px]">A - Z</div>
                <Check className={`size-[20px] ${sortState == "a-z" ? "flex" : "hidden"} `} />
            </div>
            <div className="flex justify-between h-[44px] py-[10px] px-[16px] hover:bg-[#383838] cursor-pointer rounded-[8px]"
                onClick={() => handleSortChange('z-a')}>
                <div className="text-[14px]">Z - A</div>
                <Check className={`size-[20px] ${sortState == "z-a" ? "flex" : "hidden"} `} />
            </div>
        </div>
    );
}