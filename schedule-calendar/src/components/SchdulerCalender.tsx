export function SchdulerCalender() {
  const xaxios = ["Staff1", "Staff2", "Staff3"];
  const bookings = [
    {
      staffId : "Staff1",
      date: "2024-10-01",
      from: "10:00:00",
      to: "11:00:00",
      title: "Meeting with Client A"
    },
    {
      staffId : "Staff1",
      date: "2024-10-01",
      from: "13:30:00",
      to: "14:30:00",
      title: "Project Discussion"
    }
  ]
  const startTime = 9; // 9 AM
  const endTime = 21; // 9 PM
  const timeSlots = [];
  for (let hour = startTime; hour <= endTime; hour++) {
    const period = hour < 12 ? "AM" : "PM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    timeSlots.push(`${displayHour}:00 ${period}`);
    timeSlots.push(`${displayHour}:30 ${period}`);
  }

  return (
    <div>

      {/* staff displaying */}
      <div>
        <div className="flex">
        <div className="ml-20"></div>
          {xaxios.map((staff) => (
            <div
              key={staff}
              style={{ height: "100px", width: `${100 / xaxios.length}%`, textAlign:"center",display:"flex", alignItems:"center", justifyContent:"center"}}
            >
              {staff}
            </div>
          ))}
        </div>
      </div>


      {/* left */}
      <div className="flex h-screen overflow-auto gap-2">
        <div className="">
          {timeSlots.map((time) => (
            <div key={time} style={{ height: "100px" ,paddingLeft:'10px' }}>
              {time}
            </div>
          ))}
        </div>
        {/* right */}
        <div className="w-full">
        
          {timeSlots.map((time) =>
            <div className="w-full flex" key={time}>
              {xaxios.map((staff) => (
                <div
                  key={`${time}-${staff}`}
                  className={`flex border border-white flex-1 h-[100px] hover:bg-gray-100 relative`}
                >
                  {/* {index} */}
                </div>
              ))}

          
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
