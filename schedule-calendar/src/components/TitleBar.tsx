import { useState } from "react";
import { DatePicker } from "./shared/DatePicker";

export function TitleBar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="title-bar">
      <div className="flex justify-between px-10 py-5 items-center">
        <div>
          <span>Calender</span>
        </div>
        {/* right */}
        <div>
          <button className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-800">
            Add Event
          </button>
        </div>
      </div>

      {/* Date selector here */}
      <div>
        <DatePicker date={date} onChange={setDate} />
      </div>
    </div>
  );
}
