import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export default function CalendarCard({ setIsCalendarCardOpen, setSelectedDate }: { setIsCalendarCardOpen: (isOpen: boolean) => void, setSelectedDate: (date: string) => void }) {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 22)); // July 22, 2025
    const [displayDate, setDisplayDate] = useState(new Date(2025, 6, 22));
    const [showYearMenu, setShowYearMenu] = useState(false);
    const [slideClass, setSlideClass] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const currentYearRef = useRef<HTMLDivElement>(null);
    const yearGridRef = useRef<HTMLDivElement>(null);
    const currentYear = currentDate.getFullYear();
    const dayNumber = new Date().getDate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarCardOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (showYearMenu && currentYearRef.current && yearGridRef.current) {
            const yearElement = currentYearRef.current;
            const gridElement = yearGridRef.current;
            const yearOffsetTop = yearElement.offsetTop;
            const gridHeight = gridElement.clientHeight;
            const yearHeight = yearElement.offsetHeight;
            const scrollTop = yearOffsetTop - (gridHeight / 2) + (yearHeight / 2);
            gridElement.scrollTop = Math.max(0, scrollTop);
        }
    }, [showYearMenu]);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    // Generate years around current year
    const generateYears = () => {
        const years = [];
        for (let i = 1900; i <= 2099; i++) {
            years.push(i);
        }
        return years;
    };

    const getDaysInMonth = (date: any) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const firstDayOfWeek = firstDay.getDay();
        const daysInMonth = lastDay.getDate();

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(null);
        }

        // Add all days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    const navigateMonth = (direction: any) => {
        if (isAnimating) return;

        setIsAnimating(true);

        // Start the slide out animation
        if (direction === 'next') {
            setSlideClass('slide-out-left');
        } else {
            setSlideClass('slide-out-right');
        }

        // After slide out completes, update date and slide in
        setTimeout(() => {
            const newDate = new Date(currentDate);
            if (direction === 'next') {
                newDate.setMonth(newDate.getMonth() + 1);
                setSlideClass('slide-in-right');
            } else {
                newDate.setMonth(newDate.getMonth() - 1);
                setSlideClass('slide-in-left');
            }
            setCurrentDate(newDate);
            setDisplayDate(newDate);
        }, 150);

        // Complete the animation
        setTimeout(() => {
            setSlideClass('');
            setIsAnimating(false);
        }, 300);
    };

    const selectYear = (year: any) => {
        const newDate = new Date(currentDate);
        newDate.setFullYear(year);
        setCurrentDate(newDate);
        setDisplayDate(newDate);
        setShowYearMenu(false);
    };

    const days = getDaysInMonth(displayDate);
    const isToday = (day: any) => {
        return day === 22 &&
            displayDate.getMonth() === 6 &&
            displayDate.getFullYear() === 2025;
    };

    return (
        <div className="absolute top-[55px] select-none z-[2] bg-[#2b2b2b] w-[350px] h-[350px] rounded-[16px] p-[16px] text-white overflow-hidden"
            ref={calendarRef}>

            <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                    <div
                        onClick={() => setShowYearMenu(!showYearMenu)}
                        className="flex items-center cursor-pointer gap-[10px] px-2 py-1 rounded-lg transition-colors"
                    >
                        <span className="text-[16px]">
                            {months[displayDate.getMonth()]} {displayDate.getFullYear()}
                        </span>
                        <div className='hover:bg-[#3c3c3c] rounded-full w-[30px] h-[30px] flex items-center justify-center'><ChevronDown size={16} className={`${showYearMenu ? "rotate-180" : ""} transition-all`} /></div>
                    </div>
                </div>

                {!showYearMenu && <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigateMonth('prev')}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[#404040] rounded-lg transition-colors disabled:opacity-50"
                        disabled={isAnimating}
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => navigateMonth('next')}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[#404040] rounded-lg transition-colors disabled:opacity-50"
                        disabled={isAnimating}
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>}
            </div>
            {!showYearMenu ? (
                <>
                    {/* Header */}

                    {/* Calendar Grid */}
                    <div className="relative overflow-hidden">
                        {/* Weekday Headers */}
                        <div className="grid grid-cols-7 gap-1 mb-3">
                            {weekdays.map(day => (
                                <div key={day} className="text-center text-sm text-gray-400 font-medium py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Container */}
                        <div className="relative h-60 overflow-hidden">
                            <div className={`${slideClass}`}>
                                <div className="grid grid-cols-7 gap-1">
                                    {days.map((day, index) => (
                                        <div key={`${displayDate.getMonth()}-${displayDate.getFullYear()}-${index}`} className="h-10 flex items-center justify-center">
                                            {day && (
                                                <button
                                                    className={`${day < dayNumber ? "text-[#555555]" : "cursor-pointer"} w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 hover:bg-[#404040] ${isToday(day) ? 'bg-[#454154] text-[#ae97f8]' : ''}`}
                                                    onClick={() => {
                                                        const d = day.toString().padStart(2, "0");
                                                        const m = (displayDate.getMonth() + 1).toString().padStart(2, "0");
                                                        const y = displayDate.getFullYear();
                                                        setSelectedDate(`${d}/${m}/${y}`);
                                                        setIsCalendarCardOpen(false);
                                                    }}
                                                >
                                                    {day}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                /* Year Picker View */
                <div className="h-full">
                    {/* Years Grid */}
                    <div
                        ref={yearGridRef}
                        className="grid grid-cols-4 gap-[10px] h-full overflow-y-auto"
                    >
                        {generateYears().map(year => (
                            <div
                                key={year}
                                onClick={() => selectYear(year)}
                                className={`${(year < currentYear) ? "text-[#555555]" : "cursor-pointer"} h-[40px] rounded-xl flex items-center justify-center text-[14px] font-medium transition-all duration-200 hover:bg-[#404040] ${year === displayDate.getFullYear() ? 'bg-[#454054] text-[#ae97f8]' : ''}`}
                                ref={year === currentYear ? currentYearRef : null}
                            >
                                {year}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}