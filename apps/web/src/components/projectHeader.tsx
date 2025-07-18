import { List, LayoutGrid, ArrowDownWideNarrow, Search } from 'lucide-react';
import GenericDropdown from './dropdownMenu/generic';
import AddButton from './buttons/addButton';
import { useEffect, useRef, useState } from 'react';

export default function ProjectHeader({ setListView, listView }: { setListView: (state: boolean) => void, listView: boolean }) {
    const [searchInputStatus, setSearchInputStatus] = useState(false);
    const searchBarRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                setSearchInputStatus(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleListView = () => {
        setListView(!listView);
        localStorage.setItem('listView', (!listView).toString());
    };

    return (
        <div className="h-[36px] flex items-end justify-between">
            <div className="text-[20px] font-extrabold">Projects</div>
            <div className='flex gap-[8px]'>
                <div
                    ref={searchBarRef}
                    className={` relative flex gap-[10px] items-center h-[35px] rounded-[12px] transition-all delay-100 duration-500 ${searchInputStatus ? "w-[220px] bg-[#222222]" : "w-[35px] cursor-pointer group"}`}
                    onClick={() => {
                        if (!searchInputStatus) setSearchInputStatus(true);
                    }}
                >
                    <Search className={`${searchInputStatus ? "size-[18px] text-[#888888] ml-[12px]" : "size-[20px]"} transition-all delay-300 duration-300`} />
                    <input
                        placeholder='Find a project'
                        className={`${searchInputStatus ? "opacity-100 w-[100%]" : "w-[0px]"} placeholder:text-[14px] flex items-center text-[14px] transition-all delay-200 outline-none caret-[#9170fe] bg-transparent`}
                        style={{ pointerEvents: searchInputStatus ? 'auto' : 'none' }}
                        onBlur={() => setSearchInputStatus(false)}
                        tabIndex={searchInputStatus ? 0 : -1}
                    />
                    <GenericDropdown title={"Search projects"} />
                </div>
                <div className='relative flex flex-col justify-center p-[8px] rounded-[10px] cursor-pointer hover:bg-[#383838] group'>
                    <div>
                        <ArrowDownWideNarrow className='size-[20px]' />
                    </div>
                    <GenericDropdown title={"Sort"} />
                </div>
                <div onClick={toggleListView} className='relative flex flex-col justify-center p-[8px] rounded-[10px] cursor-pointer hover:bg-[#383838] group'>
                    {listView ? <LayoutGrid className='size-[20px]' /> : <List className='size-[20px]' />}
                    <GenericDropdown title={listView ? "Grid view" : "List view"} />
                </div>
                <AddButton text={"New"} type='small' />
            </div>
        </div>
    )
}