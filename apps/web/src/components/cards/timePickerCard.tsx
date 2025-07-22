import { useEffect, useRef } from "react";

function generateTimes() {
    const times: string[] = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
            const hour12 = h % 12 === 0 ? 12 : h % 12;
            const minute = m.toString().padStart(2, "0");
            const ampm = h < 12 ? "AM" : "PM";
            times.push(`${hour12 <= 9 ? "0" + hour12 : hour12}:${minute} ${ampm}`);
        }
    }
    return times;
}

export default function TimePickerCard({
    isOpen,
    setIsOpen,
    selectedTime,
    setSelectedTime,
}: {
    isOpen: boolean,
    setIsOpen: (open: boolean) => void,
    selectedTime: string,
    setSelectedTime: (time: string) => void,
}) {
    const times = generateTimes();
    const cardRef = useRef<HTMLDivElement>(null);
    const selectedRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        if (!isOpen) return;
        function handleClickOutside(event: MouseEvent) {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Auto-scroll to selected time
    useEffect(() => {
        if (isOpen && selectedRef.current && cardRef.current) {
            const timeElement = selectedRef.current;
            const cardElement = cardRef.current;
            const timeOffset = timeElement.offsetTop;
            const cardHeight = cardElement.clientHeight;
            const timeHeight = timeElement.clientHeight;
            const scrollTop = timeOffset - (cardHeight / 2) + (timeHeight /2);
            cardElement.scrollTop = Math.max(0, scrollTop);
        }
    }, [isOpen, selectedTime]);

    return (
        isOpen ? (
            <div
                ref={cardRef}
                className="absolute top-[60px] w-[131px] h-[360px] p-[12px] bg-[#2b2b2b] rounded-[12px] shadow-lg overflow-auto z-50"
            >
                {times.map((time) => (
                    <div
                        key={time}
                        ref={selectedTime === time ? selectedRef : null}
                        className={`px-4 py-2 flex items-center justify-center text-center cursor-pointer text-[14px] rounded-[8px] ${selectedTime === time ? "bg-[#3b364c] text-white" : "text-[#fff] hover:bg-[#383838]"
                            }`}
                        onClick={() => {
                            setSelectedTime(time);
                            setIsOpen(false);
                        }}
                    >
                        {time}
                    </div>
                ))}
            </div>
        ) : null
    );
}