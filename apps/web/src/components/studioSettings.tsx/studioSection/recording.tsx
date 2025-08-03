import { Mic, Video, Videotape, Zap } from "lucide-react";
import { useState } from "react";
import ToggleSwitch from "../../buttons/toggleSwitch";

export default function Recording() {
    const [isOnlyAudioEnebled, setIsOnlyAudioEnabled] = useState(false)
    const [isNoiseReductionEnabled, setIsNoiseReductionEnabled] = useState(false)
    const [isHighAudioRateSelected, setIsHighAudioRateSelected] = useState(false)
    const [isAdvancedVideoSelected, setIsAdvancedVideoSelected] = useState(false)
    return (
        <>
            <div className="flex gap-[5px] items-center my-[12px]">
                <div className="text-[#888888] text-[12px]">Manage settings related to the recording session.</div>
                <div className="text-[12px] text-[#b196ff] cursor-pointer">Learn more</div>
            </div>
            <div className="flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[24px]">
                    <div className="p-[25px] w-full rounded-[12px] bg-[#1d1d1d] flex flex-col gap-[24px]">
                        <div className="flex gap-[8px] items-center">
                            <div><Videotape className="size-[20px]" /></div>
                            <div className="text-[20px] font-bold">Recording mode</div>
                        </div>
                        <div className="flex items-center gap-[24px]">
                            <div className="text-[12px] text-[#888888]">Choose what you want to record. You’ll always be able to see each other while recording.</div>
                            <div className="p-[4px] flex items-center gap-[4px] rounded-[12px] h-[40px] bg-[#383838]">
                                <div className={`py-[6px] px-[12px] text-[14px] font-medium rounded-[8px] cursor-pointer ${isOnlyAudioEnebled ? "" : "bg-[#555555]"}`}
                                    onClick={() => { setIsOnlyAudioEnabled(false) }}>Video & audio</div>
                                <div className={`py-[6px] px-[12px] text-[14px] font-medium rounded-[8px] cursor-pointer ${isOnlyAudioEnebled ? "bg-[#555555]" : ""}`}
                                    onClick={() => { setIsOnlyAudioEnabled(true) }}>Audio only</div>
                            </div>
                        </div>
                    </div>
                    <div className="p-[25px] w-full rounded-[12px] bg-[#1d1d1d] flex flex-col gap-[24px]">
                        <div className="flex gap-[8px] items-center">
                            <div><Mic className="size-[20px]" /></div>
                            <div className="text-[20px] font-bold">Audio</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <div className="text-[14px] ">Noise reduction</div>
                                <div className="text-[12px] text-[#888888] max-w-[600px]">Reduce background noise like air conditioners and laptop fans for all participants. This usually ensures the best audio quality but can compress audio files.</div>
                            </div>
                            <ToggleSwitch enabled={isNoiseReductionEnabled} onChange={setIsNoiseReductionEnabled} />
                        </div>
                        <div className="flex items-center gap-[24px] justify-between">
                            <div className="flex flex-col">
                                <div>Audio sample rate</div>
                                <div className="text-[12px] text-[#888888]">We suggest 44.1kHz when recording only audio, and 48kHz when recording video and audio.</div>
                            </div>
                            <div className=" p-[4px] flex items-center gap-[4px] rounded-[12px] h-[40px] max-h-[40px] bg-[#383838]">
                                <div className={`whitespace-nowrap h-fit max-h-[32px] py-[6px] px-[12px] text-[14px] font-medium rounded-[8px] cursor-pointer ${isHighAudioRateSelected ? "" : "bg-[#555555]"}`}
                                    onClick={() => { setIsHighAudioRateSelected(false) }}>44.1kHz</div>
                                <div className={`whitespace-nowrap h-fit max-h-[32px] py-[6px] px-[12px] text-[14px] font-medium rounded-[8px] cursor-pointer ${isHighAudioRateSelected ? "bg-[#555555]" : ""}`}
                                    onClick={() => { setIsHighAudioRateSelected(true) }}>48kHz</div>
                            </div>
                        </div>
                        <div className="flex gap-[8px] items-center">
                            <div><Video className="size-[20px]" /></div>
                            <div className="text-[20px] font-bold">Video</div>
                        </div>
                        <div className="flex gap-[16px]">
                            <div className={`h-[192px] flex-1 rounded-[20px] cursor-pointer ${!isAdvancedVideoSelected ? "border-[2px] border-[#b196ff] bg-[#b196ff1f]" : "bg-[#1d1d1d] border-[2px] border-white/20 hover:border-white/100"} `}
                            onClick={() => setIsAdvancedVideoSelected(false)}>
                                <div className="m-[12px] ml-[24px] w-fit">
                                    <div className="px-[13px] py-[4px] bg-[#9671ff] rounded-[17px] text-[12px]">Recommended</div>
                                </div>
                                <div className="mx-[24px] text-[14px] font-semibold">Standard resolution</div>
                                <ul className="list-disc mx-[24px] mt-[4px] mb-[20px] pl-[40px]">
                                    <li className="mb-[20px] text-[#888888] text-[12px]">Separate tracks record in 720p. You can export composed edits in higher resolutions up to 4K.
                                        <br />
                                        <a className="text-[#9671ff] text-[12px] cursor-pointer">How does it work?</a>
                                    </li>
                                    <li className="mb-[20px] text-[#888888] text-[12px]">Fast upload and processing times.</li>
                                </ul>
                            </div>
                            <div className={`h-[192px] flex-1 rounded-[20px] cursor-pointer ${isAdvancedVideoSelected ? "border-[2px] border-[#b196ff] bg-[#b196ff1f]" : "bg-[#1d1d1d] border-[2px] border-white/20 hover:border-white/100"} `}
                            onClick={() => setIsAdvancedVideoSelected(true)}>
                                <div className="w-[24px] h-[24px] rounded-[8px] bg-[#ddfa8b33] m-[12px] ml-[24px] flex items-center justify-center">
                                    <Zap className="size-[16px] fill-[#d6fa8b]" />
                                </div>
                                <div className="mx-[24px] text-[14px] font-semibold">Advanced</div>
                                <ul className="list-disc mx-[24px] mt-[4px] mb-[20px] pl-[40px]">
                                    <li className="mb-[20px] text-[#888888] text-[12px]">Suitable for cameras that support 1080p and 4K HD recording.</li>
                                    <li className="mb-[20px] text-[#888888] text-[12px]">Longer upload and processing times.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}