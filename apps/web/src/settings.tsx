import { Cable, CreditCard, MessageSquareDot, User, Video } from "lucide-react";
import { useEffect, useState, type JSX } from "react";
import Profile from "./components/studioSettings.tsx/profile";
import Subscription from "./components/studioSettings.tsx/subscription";
import Notifications from "./components/studioSettings.tsx/notifications";
import Integrations from "./components/studioSettings.tsx/integrations";
import StudioSettings from "./components/studioSettings.tsx/studioSettings";
import { useNavigate, useParams } from "react-router-dom";

type SectionKey = "profile" | "subscription" | "notifications" | "integrations" | "studiosettings";
const sectionComponents: Record<SectionKey, JSX.Element> = {
    profile: <Profile />,
    subscription: <Subscription />,
    notifications: <Notifications />,
    integrations: <Integrations />,
    studiosettings: <StudioSettings />,
};


export default function Settings() {
    const { section } = useParams()
    const navigate = useNavigate();
    const [selected, setSelected] = useState<SectionKey>(section as SectionKey);
    useEffect(() => {
        setSelected(section as SectionKey)
    }, [section])
    return (
        <div className="px-[60px] pt-[60px] h-full flex ">
            <div className="flex gap-[16px] w-full justify-center">
                <div className="flex flex-col gap-[40px] pt-[70px] w-[220px]">
                    {/* Your account part */}
                    <div className="flex flex-col">
                        <div className="text-[12px] text-[#bbbbbb] font-semibold mb-[8px]">YOUR ACCOUNT</div>
                        <div className={`${selected == "profile" ? "text-white" : "text-[#acacac]"} hover:text-white flex gap-[12px] items-center cursor-pointer py-[12px]`}
                            onClick={() => navigate("/dashboard/settings/profile")}>
                            <div><User className="size-[24px] " /></div>
                            <div className="text-[14px] font-medium">Profile</div>
                        </div>
                        <div className={`${selected == "subscription" ? "text-white" : "text-[#acacac]"} hover:text-white flex gap-[12px] items-center cursor-pointer py-[12px]`}
                            onClick={() => navigate("/dashboard/settings/subscription")}>
                            <div><CreditCard className="size-[24px] " /></div>
                            <div className="text-[14px] font-medium">Subscription</div>
                        </div>
                        <div className={`${selected == "notifications" ? "text-white" : "text-[#acacac]"} hover:text-white flex gap-[12px] items-center cursor-pointer py-[12px]`}
                            onClick={() => navigate("/dashboard/settings/notifications")}>
                            <div><MessageSquareDot className="size-[24px] " /></div>
                            <div className="text-[14px] font-medium">Notifications</div>
                        </div>
                        <div className={`${selected == "integrations" ? "text-white" : "text-[#acacac]"} hover:text-white flex gap-[12px] items-center cursor-pointer py-[12px]`}
                            onClick={() => navigate("/dashboard/settings/integrations")}>
                            <div><Cable className="size-[24px] " /></div>
                            <div className="text-[14px] font-medium">Integrations</div>
                        </div>
                    </div>
                    {/* Audio and video part */}
                    <div>
                        <div className="text-[12px] text-[#bbbbbb] font-semibold mb-[8px]">AUDIO & VIDEO</div>
                        <div className={`${selected == "studiosettings" ? "text-white" : "text-[#acacac]"} hover:text-white flex gap-[12px] items-center cursor-pointer py-[12px]`}
                            onClick={() => navigate("/dashboard/settings/studiosettings")}>
                            <div><Video className="size-[24px] " /></div>
                            <div className="text-[14px] font-medium">Studio settings</div>
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-[800px]">
                    <div className="w-full text-[28px] mb-[28px] font-bold">Settings</div>
                    {sectionComponents[selected]}
                </div>
            </div>
        </div>
    )
}