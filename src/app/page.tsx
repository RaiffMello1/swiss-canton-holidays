import Home from "./Home";

export default function Page() {
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-2">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <Home />        
      </main> 
    </div>
  );
}