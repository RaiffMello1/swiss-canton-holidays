import CalendarService from "@/api/calendar";
import Home from "./Home";

export default async function Page() {
  const holidays = await CalendarService.getCalendar('2022-01-01', '2022-01-01')

  console.log(holidays)
  holidays.map((holiday: unknown)=> console.log(holiday))
  // console.log(holidays)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-2">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <Home />

        
      </main>
      
    </div>
  );
}