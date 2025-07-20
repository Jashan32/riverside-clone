export default function CurrentDateCard() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const currentDay = days[today.getDay()];
    const currentDate = today.getDate();
    const currentMonth = today.toLocaleString('default', { month: 'short' });
    return (
        <div className="relative flex items-center justify-between w-[100px]">
            <div className="absolute flex flex-col gap-[2px] top-2 right-1 bg-[#222222] h-[90px] w-[100px] rounded-[10px] p-[14px]">
                <div className="text-[10px] text-[#888888] font-medium">{currentDay}</div>
                <div className="text-[18.132px] font-bold leading-[22px]">{currentDate}</div>
                <div className="text-[18.132px] font-bold leading-[22px]">{currentMonth}</div>
            </div>
            <div className=" bg-[#1c1c1c] h-[90px] w-[90px] rounded-[10px]">

            </div>
        </div>
    )
}