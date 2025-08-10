import { List, LayoutGrid, ArrowDownWideNarrow, Search } from 'lucide-react';
import GenericDropdown from '../dropdownMenu/generic';
import AddButton from '../buttons/addButton';
import { useEffect, useRef, useState } from 'react';
import SortDropdown from '../dropdownMenu/sortDropdown';
import { useNavigate } from 'react-router-dom';

export default function ProjectHeader({ setListView, listView, setSortState, sortState }: { setListView: (state: boolean) => void, listView: boolean, setSortState: (state: string) => void, sortState: string }) {
    const [searchInputStatus, setSearchInputStatus] = useState(false);
    const searchBarRef = useRef<HTMLDivElement | null>(null);
    const sortDropdownRef = useRef<HTMLDivElement>(null);
    const [sortDropDownState, setSortDropDownState] = useState(false);
    const sortButtonRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                setSearchInputStatus(false);
            }
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
                if (sortButtonRef.current && !sortButtonRef.current.contains(event.target as Node)) {
                    setSortDropDownState(false);
                }
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
                    className={`-mr-[10px] relative flex gap-[10px] items-center justify-center h-[35px] rounded-[12px] transition-all delay-100 duration-500 ${searchInputStatus ? "w-[220px] bg-[#222222]" : "w-[35px] cursor-pointer group"}`}
                    onClick={() => {
                        if (!searchInputStatus) setSearchInputStatus(true);
                    }}
                >
                    <Search className={`${searchInputStatus ? " size-[18px] text-[#888888] ml-[12px]" : "size-[20px]"} transition-all delay-300 duration-300`} />
                    <input
                        placeholder='Find a project'
                        className={`${searchInputStatus ? "opacity-100 w-[100%]" : "w-[0px]"} placeholder:text-[14px] flex items-center text-[14px] transition-all delay-200 outline-none caret-[#9170fe] bg-transparent`}
                        style={{ pointerEvents: searchInputStatus ? 'auto' : 'none' }}
                        onBlur={() => setSearchInputStatus(false)}
                        tabIndex={searchInputStatus ? 0 : -1}
                    />
                    <GenericDropdown title={"Search projects"} />
                </div>
                <div className='relative '>
                    <div className='flex flex-col justify-center p-[8px] rounded-[10px] cursor-pointer hover:bg-[#383838] group'
                        ref={sortButtonRef} onClick={() => setSortDropDownState(!sortDropDownState)}>
                        <ArrowDownWideNarrow className='size-[20px]' />
                    </div>
                    <GenericDropdown title={"Sort"} />
                    <div ref={sortDropdownRef} className={`absolute right-0 top-full z-1 mt-2 ${sortDropDownState ? "opacity-100 translate-y-0 translate-x-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-10 translate-x-5 scale-70 pointer-events-none"} transition-all duration-200 ease-in-out`}>
                        <SortDropdown setSortDropDownState={setSortDropDownState} setSortState={setSortState} sortState={sortState} />
                    </div>
                </div>
                <div onClick={toggleListView} className='relative flex flex-col justify-center p-[8px] rounded-[10px] cursor-pointer hover:bg-[#383838] group'>
                    {listView ? <LayoutGrid className='size-[20px]' /> : <List className='size-[20px]' />}
                    <GenericDropdown title={listView ? "Grid view" : "List view"} />
                </div>
                <AddButton text={"New"} type='small' onClickFunction={() => {navigate(`/dashboard/project/create`)}} />
            </div>
        </div>
    )
}