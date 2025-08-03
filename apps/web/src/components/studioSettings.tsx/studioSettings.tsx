import { useState, type JSX } from "react";
import General from "./studioSection/general";
import Recording from "./studioSection/recording";
import LiveStream from "./studioSection/liveStream";

type SectionKey = "general" | "recording" | "liveStream";
const sectionComponents: Record<SectionKey, JSX.Element> = {
    general: <General />,
    recording: <Recording />,
    liveStream: <LiveStream />,
};

export default function StudioSettings() {
    const [tabSelected, setTabSelected] = useState<SectionKey>("general");
    return (
        <div className="flex flex-col">
            <div className="h-[49px] flex items-center w-full border-b-[2px] border-[#222222]">
                <div className={`w-[140px] flex justify-center ${tabSelected == "general" ? "border-b-[2px] border-[#b196ff] text-[#b196ff]" : " border-[#222222] text-[#acacac]"} py-[12px] px-[10px] text-[14px] cursor-pointer`} onClick={() => { setTabSelected("general") }} >General</div>
                <div className={`w-[140px] flex justify-center ${tabSelected == "recording" ? "border-b-[2px] border-[#b196ff] text-[#b196ff]" : " border-[#222222] text-[#acacac]"} py-[12px] px-[10px] text-[14px] cursor-pointer`} onClick={() => { setTabSelected("recording") }} >Recording</div>
                <div className={`w-[140px] flex justify-center ${tabSelected == "liveStream" ? "border-b-[2px] border-[#b196ff] text-[#b196ff]" : " border-[#222222] text-[#acacac]"} py-[12px] px-[10px] text-[14px] cursor-pointer`} onClick={() => { setTabSelected("liveStream") }} >Live stream</div>
            </div>
            {sectionComponents[tabSelected]}
        </div>
    )
}