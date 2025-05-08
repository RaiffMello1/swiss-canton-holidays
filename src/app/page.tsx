import Home from "./Home";

export default function Page() {
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-4 md:p-8 pb-20 gap-2">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <Home />        
      </main> 
    </div>
  );
}