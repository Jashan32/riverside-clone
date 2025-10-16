import { useNavigate, useParams } from "react-router-dom"

export default function ProjectTabs({ tabSelected, setTabSelected }: { tabSelected: string, setTabSelected: (tab: string) => void }) {
    const {projectId} = useParams() 
    const navigate = useNavigate()
    return (
        <div className="h-[49px] flex items-center gap-[24px]">
            <div className={`${tabSelected == "Recordings" ? "border-b-[2px] text-white" : "text-[#acacac]"} py-[12px] px-[10px] text-[14px] cursor-pointer`} onClick={() => { setTabSelected("Recordings") }} >Recordings</div>
            <div className={`${tabSelected == "Made for You" ? "border-b-[2px] text-white" : "text-[#acacac]"} py-[12px] px-[10px] text-[14px] cursor-pointer`} onClick={() => { setTabSelected("Made for You") }} >Made for You</div>
            <div className={`${tabSelected == "Edits" ? "border-b-[2px] text-white" : "text-[#acacac]"} py-[12px] px-[10px] text-[14px] cursor-pointer`} onClick={() => { setTabSelected("Edits") }} >Edits</div>
            <div className={`${tabSelected == "Exports" ? "border-b-[2px] text-white" : "text-[#acacac]"} py-[12px] px-[10px] text-[14px] cursor-pointer`} onClick={() => { setTabSelected("Exports") }} >Exports</div>
            <div className={`py-[12px] px-[10px] text-[14px] cursor-pointer text-[#acacac]`} onClick={() => { navigate(`/dashboard/schedule/create/${projectId}`) }} >Create new session</div>
        </div>
    )
}