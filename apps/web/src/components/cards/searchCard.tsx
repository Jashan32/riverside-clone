import { useEffect, useRef, useState } from "react";
import Recordings from "../subPages/searchContent/recordings";
import Edits from "../subPages/searchContent/edits";
import MagicClips from "../../components/subPages/searchContent/magicClips";
import MagicEpisodes from "../../components/subPages/searchContent/magicEpisodes";
import Exports from "../subPages/searchContent/exports";
import Projects from "../subPages/searchContent/projects";

export default function SearchCard({ searchCardVisible, setSearchCardVisible }: { searchCardVisible: boolean, setSearchCardVisible: (visible: boolean) => void }) {
    const [selected, setSelected] = useState("Recordings");
    const [searchedItem, setSearchedItem] = useState("");
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

    const searchContent = (selected: string) => {
        switch (selected) {
            case "Recordings":
                return <Recordings searchedItem={searchedItem} setSearchCardVisible={setSearchCardVisible} />;
            case "Edits":
                return <Edits searchedItem={searchedItem} setSearchCardVisible={setSearchCardVisible} />;
            case "Magic Clips":
                return <MagicClips searchedItem={searchedItem} setSearchCardVisible={setSearchCardVisible} />;
            case "Magic Episodes":
                return <MagicEpisodes searchedItem={searchedItem} setSearchCardVisible={setSearchCardVisible} />;
            case "Exports":
                return <Exports searchedItem={searchedItem} setSearchCardVisible={setSearchCardVisible} />;
            case "Projects":
                return <Projects searchedItem={searchedItem} setSearchCardVisible={setSearchCardVisible} />;
            default:
                return null;
        }
    };

    return (<>
        {searchCardVisible && <div className="absolute w-[100vw] h-full z-2 bg-black/40 backdrop-blur-[10px] flex justify-center">
            <div ref={searchCardRef} className="absolute top-[100px] h-[610px] max-h-[610px] w-[580px] bg-[#151515] rounded-[12px] border-[1px] border-white/10 px-[20px] flex flex-col justify-between">
                <div>
                    <div className="h-[56px] py-[16px] px-[20px] flex items-center justify-center">
                        <input className="w-[568px] h-[32px] pt-[4px] pb-[5px] placeholder-[#4e4e4e] text-[18px] outline-none text-white caret-[#b196ff]" placeholder="Search"
                            onChange={(e) => (setSearchedItem(e.target.value))} />
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
                    {
                        searchContent(selected)
                    }
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