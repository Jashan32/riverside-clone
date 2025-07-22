import { Check, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function TimezoneCard({ isTimezoneCardOpen, setIsTimezoneCardOpen, selectedTimeZone, setSelectedTimeZone, timeZones }: { isTimezoneCardOpen: boolean, setIsTimezoneCardOpen: (isOpen: boolean) => void, selectedTimeZone: any, setSelectedTimeZone: (tz: any) => void, timeZones: any[] }) {

    const [displayTimeZones, setDisplayTimeZones] = useState(timeZones);
    // const [selectedTimeZone, setSelectedTimeZone] = useState({});
    const timeZoneCardRef = useRef<HTMLDivElement>(null);
    const selectedRef = useRef<HTMLDivElement>(null);
    const displayTimeZonesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isTimezoneCardOpen) return;
        function handleClickOutside(event: MouseEvent) {
            if (timeZoneCardRef.current && !timeZoneCardRef.current.contains(event.target as Node)) {
                setIsTimezoneCardOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isTimezoneCardOpen]);

    useEffect(() => {
        if (isTimezoneCardOpen && selectedRef.current && displayTimeZonesRef.current) {
            const timeElement = selectedRef.current;
            const displayElement = displayTimeZonesRef.current;
            const timeOffset = timeElement.offsetTop;
            const displayHeight = displayElement.clientHeight;
            const timeHeight = timeElement.clientHeight;
            const scrollTop = timeOffset - (displayHeight / 2) + (timeHeight / 2);
            displayElement.scrollTop = Math.max(0, scrollTop);
        }
    }, [isTimezoneCardOpen, selectedTimeZone, displayTimeZones]);


    return (
        <div ref={timeZoneCardRef} className="px-[12px] absolute top-[60px] w-[568px] max-h-[292px] min-h-[90px] bg-[#2b2b2b] rounded-[12px]">
            <div className="flex items-center h-[53px] px-[16px] pt-[8px] pb-[4px] border-b-[1px] border-[#444444]">
                <div className="flex items-center">
                    <Search className="size-[16px]" />
                </div>
                <input className="text-[14px] placeholder-[#5a5a5a] py-[8px] px-[12px] outline-none w-full" placeholder="Choose a timezome"
                    onChange={(e) => {
                        const searchTerm = e.target.value.toLowerCase();
                        const filteredTimeZones = timeZones.filter((tz: any) =>
                            tz.label.toLowerCase().includes(searchTerm) || tz.offset.toLowerCase().includes(searchTerm)
                        );
                        setDisplayTimeZones(filteredTimeZones);
                    }}
                />
            </div>
            <div className="overflow-auto max-h-[240px]"
                ref={displayTimeZonesRef}>
                {
                    displayTimeZones.length > 0 ? <div>
                        {displayTimeZones.map((tz: any) => (
                            <div key={tz.value} className={`${selectedTimeZone == tz ? "bg-[#3b364c]" : ""} rounded-[10px] flex items-center gap-[12px] px-[16px] py-[10px] h-[40px] hover:bg-[#383838] cursor-pointer`}
                                ref={selectedTimeZone == tz ? selectedRef : null}
                                onClick={() => {
                                    setSelectedTimeZone(tz);
                                    setIsTimezoneCardOpen(false);
                                }}>
                                <div><Check className={`size-[20px] ${selectedTimeZone != tz ? "text-transparent" : ""}`} /></div>
                                <div className="text-[10px] bg-[#444444] rounded-[200px] py-[4px] px-[8px] mr-[16px] font-medium tracking-wider">{tz.offset}</div>
                                <div className="text-[14px] flex-1">{tz.label}</div>
                                <div className="text-[14px]">{tz.currentTime}</div>
                            </div>
                        ))}
                    </div> :
                        <div className="text-[14px] text-[#888888] py-[10px] px-[16px]">No matching timezone</div>
                }
            </div>
        </div>
    )
}