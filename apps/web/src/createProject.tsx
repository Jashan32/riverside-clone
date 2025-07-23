import CreateProjectHeader from "./components/headers/createProjectHeader";
import createProjectImg from "./assets/CreateProjectImg.png";
import FeatureCard from "./components/cards/featureCard";

export default function CreateProject() {
    return (
        <div className="max-w-[100%]">
            <CreateProjectHeader />
            <div className="pt-[88px] flex flex-col items-center max-w-[100%]">
                <img src={createProjectImg} />
                <div className="font-extrabold text-[20px]">Start creating</div>
                <div className="text-[#888888] text-[12px] mt-[12px] mb-[24px]">Record something, dive into editing or upload files to use here.</div>
                <div className="max-w-[100%] px-[40px] flex items-center justify-center">
                    <div className="flex flex-row gap-[24px] overflow-x-auto hide-scrollbar">
                    <FeatureCard text1="Plan" text2="Schedule and invite guests."/>
                    <FeatureCard text1="Record" text2="Record or live stream." />
                    <FeatureCard text1="Upload" text2="Edit and transcribe files." />
                    <FeatureCard text1="Edit" text2="Create clips and episodes." />
                    <FeatureCard text1="AI Voice" text2="Convert text to speech." />
                    </div>
                </div>
            </div>
        </div>
    )
}