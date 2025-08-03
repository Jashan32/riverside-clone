import { MessageSquareDot } from "lucide-react";
import ToggleSwitch from "../buttons/toggleSwitch";
import { useEffect, useState } from "react";

export default function Notifications() {
    const [editExportNotification, setEditExportNotification] = useState(localStorage.getItem("editExportNotification") != "false");
    useEffect(() => {
        localStorage.setItem("editExportNotification", editExportNotification.toString());
    }, [editExportNotification]);
    return (
        <div className="w-[800px] rounded-[12px] bg-[#1d1d1d] p-[24px]">
            <div className="flex flex-col gap-[24px]">
                <div className="flex gap-[8px] items-center">
                    <div><MessageSquareDot className="size-[24px]" /></div>
                    <div className="text-[20px] font-bold">Export notification</div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-[14px] mb-[4px] font-medium">Show notification each time your edit is exported.</div>
                    <div><ToggleSwitch enabled={editExportNotification} onChange={setEditExportNotification} /></div>
                </div>
            </div>
        </div>
    )
}