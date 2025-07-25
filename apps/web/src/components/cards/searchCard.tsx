import { useEffect, useRef, useState } from "react";

export default function SearchCard({ searchCardVisible, setSearchCardVisible }: { searchCardVisible: boolean, setSearchCardVisible: (visible: boolean) => void }) {
    const [selected, setSelected] = useState("Recordings");
    const searchCardRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchCardRef.current && !searchCardRef.current.contains(event.target as Node)) {
                setSearchCardVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setSearchCardVisible]);
    return (<>
        {searchCardVisible && <div className="absolute w-[100vw] h-full z-2 bg-black/40 backdrop-blur-[10px] flex justify-center">
            <div ref={searchCardRef} className="absolute top-[100px] h-[610px] max-h-[610px] w-[580px] bg-[#151515] rounded-[12px] border-[1px] border-white/10 px-[20px] flex flex-col justify-between">
                <div>
                    <div className="h-[56px] py-[16px] px-[20px] flex items-center justify-center">
                        <input className="w-[568px] h-[32px] pt-[4px] pb-[5px] placeholder-[#4e4e4e] text-[18px] outline-none text-white caret-[#b196ff]" placeholder="Search" />
                    </div>
                    <div className="h-[44px] flex gap-[8px]">
                        <div className={`h-[32px] ${selected == "Recordings" ? "bg-[#7848ff33] text-[#b196ff]" : "bg-[#222222] text-white"} cursor-pointer text-[12px] flex items-center justify-center py-[7px] px-[12px] rounded-[64px]`}
                            onClick={() => setSelected("Recordings")}
                        >Recordings</div>
                        <div className={`h-[32px] ${selected == "Edits" ? "bg-[#7848ff33] text-[#b196ff]" : "bg-[#222222] text-white"} cursor-pointer text-[12px] flex items-center justify-center py-[7px] px-[12px] rounded-[64px]`}
                            onClick={() => setSelected("Edits")}
                        >Edits</div>
                        <div className={`h-[32px] ${selected == "Magic Clips" ? "bg-[#7848ff33] text-[#b196ff]" : "bg-[#222222] text-white"} cursor-pointer text-[12px] flex items-center justify-center py-[7px] px-[12px] rounded-[64px]`}
                            onClick={() => setSelected("Magic Clips")}
                        >Magic Clips</div>
                        <div className={`h-[32px] ${selected == "Magic Episodes" ? "bg-[#7848ff33] text-[#b196ff]" : "bg-[#222222] text-white"} cursor-pointer text-[12px] flex items-center justify-center py-[7px] px-[12px] rounded-[64px]`}
                            onClick={() => setSelected("Magic Episodes")}
                        >Magic Episodes</div>
                        <div className={`h-[32px] ${selected == "Exports" ? "bg-[#7848ff33] text-[#b196ff]" : "bg-[#222222] text-white"} cursor-pointer text-[12px] flex items-center justify-center py-[7px] px-[12px] rounded-[64px]`}
                            onClick={() => setSelected("Exports")}
                        >Exports</div>
                        <div className={`h-[32px] ${selected == "Projects" ? "bg-[#7848ff33] text-[#b196ff]" : "bg-[#222222] text-white"} cursor-pointer text-[12px] flex items-center justify-center py-[7px] px-[12px] rounded-[64px]`}
                            onClick={() => setSelected("Projects")}
                        >Projects</div>
                    </div>
                </div>
                <div className="flex items-center justify-between py-[12px]">
                        <div></div>
                        <div className="cursor-pointer text-[#b196ff] text-[12px]">Give feedback</div>
                </div>
            </div>
        </div>}
    </>
    );
}