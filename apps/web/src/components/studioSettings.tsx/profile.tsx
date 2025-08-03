export default function Profile() {
    return (
        <div className="flex flex-col gap-[20px]">
            <div className="text-[16px] font-bold">Profile</div>
            <div className="flex flex-col gap-[24px]">
                <div className="rounded-full cursor-pointer">
                    <img src={`${localStorage.getItem("profilePic")}`} className="w-[120px] h-[120px] rounded-full" />
                </div>
                <div className="flex flex-col gap-[24px]">
                    <div className="flex flex-col gap-[12px]">
                        <div className="text-[14px] ">Name</div>
                        <input type="text" className="text-[14px] w-full bg-[#222222] rounded-[10px] h-[39px] py-[8px] px-[12px] hover:bg-[#383838] focus:outline-[1px] focus:outline-[#bb86fc]" placeholder={`${localStorage.getItem("name") || "Enter your name"}`} defaultValue={localStorage.getItem("name") || ""} />
                    </div>
                    <div className="flex flex-col gap-[12px]">
                        <div className="text-[14px] ">Email</div>
                        <input type="text" className="text-[14px] w-full bg-[#222222] rounded-[10px] h-[39px] py-[8px] px-[12px] hover:bg-[#383838] focus:outline-[1px] focus:outline-[#bb86fc]" placeholder={`${localStorage.getItem("email") || "Enter your email"}`} defaultValue={localStorage.getItem("email") || ""} />
                    </div>
                </div>
            </div>
        </div>
    )
}