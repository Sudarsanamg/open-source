import { useState, useRef, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface DatePickerProps {
  date: Date;
  onChange: (date: Date) => void;
}

export function DatePicker({ date, onChange }: DatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(date);
  const calendarRef = useRef<HTMLDivElement>(null);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePrevDay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    onChange(newDate);
  };

  const handleNextDay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    onChange(newDate);
  };

  const handleDateClick = (selectedDate: Date) => {
    onChange(selectedDate);
    setShowCalendar(false);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add all days in month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCalendarMonth(
      new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCalendarMonth(
      new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1)
    );
  };

  const days = getDaysInMonth(calendarMonth);
  const monthYear = calendarMonth.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const isToday = (checkDate: Date) => {
    const today = new Date();
    return (
      checkDate.getDate() === today.getDate() &&
      checkDate.getMonth() === today.getMonth() &&
      checkDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelectedDate = (checkDate: Date) => {
    return (
      checkDate.getDate() === date.getDate() &&
      checkDate.getMonth() === date.getMonth() &&
      checkDate.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div className="relative" ref={calendarRef}>
      <div
        className="date-picker inline-flex items-center gap-4 border-2 border-gray-300 rounded-2xl px-4 py-2 cursor-pointer hover:border-gray-400 transition-colors"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <div>
          <button
            onClick={handlePrevDay}
            className="hover:text-blue-600 transition-colors"
          >
            <FaAngleLeft />
          </button>
        </div>
        <div>
          <span className="font-medium">{formattedDate}</span>
        </div>
        <div>
          <button
            onClick={handleNextDay}
            className="hover:text-blue-600 transition-colors"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      {showCalendar && (
        <div className="absolute top-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 z-10">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <FaAngleLeft />
            </button>
            <span className="font-semibold">{monthYear}</span>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <FaAngleRight />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-gray-600 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div key={index} className="text-center">
                {day ? (
                  <button
                    onClick={() => handleDateClick(day)}
                    className={`w-8 h-8 rounded-full hover:bg-blue-100 transition-colors ${
                      isSelectedDate(day)
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : isToday(day)
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-800"
                    }`}
                  >
                    {day.getDate()}
                  </button>
                ) : (
                  <div className="w-8 h-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
