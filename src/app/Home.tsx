"use client";

import CalendarService from "@/api/calendar";
import { useState } from "react";

type DaysOfWeek = {
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
};

type Canton = {
  id: string;
  name: string;
};
const cantons: Canton[] = [
  { id: "AG", name: "Aargau" },
  { id: "AI", name: "Appenzell Innerrhoden" },
  { id: "AR", name: "Appenzell Ausserrhoden" },
  { id: "BE", name: "Bern" },
  { id: "BL", name: "Basel-Landschaft" },
  { id: "BS", name: "Basel-Stadt" },
  { id: "FR", name: "Fribourg" },
  { id: "GE", name: "Geneva" },
  { id: "GL", name: "Glarus" },
  { id: "GR", name: "Graubünden" },
  { id: "JU", name: "Jura" },
  { id: "LU", name: "Lucerne" },
  { id: "NE", name: "Neuchâtel" },
  { id: "NW", name: "Nidwalden" },
  { id: "OW", name: "Obwalden" },
  { id: "SG", name: "St. Gallen" },
  { id: "SH", name: "Schaffhausen" },
  { id: "SO", name: "Solothurn" },
  { id: "SZ", name: "Schwyz" },
  { id: "TG", name: "Thurgau" },
  { id: "TI", name: "Ticino" },
  { id: "UR", name: "Uri" },
  { id: "VD", name: "Vaud" },
  { id: "VS", name: "Valais" },
  { id: "ZG", name: "Zug" },
  { id: "ZH", name: "Zurich" },
];

const Home = () => {
  const CURRENT_YEAR = 2025;
  const MAX_YEAR = 2030;
  const [selectedDays, setSelectedDays] = useState<DaysOfWeek>({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
  });
  const [selectedCanton, setSelectedCanton] = useState<string>("");

  const [inputValue, setInputValue] = useState<string>("");
  const [year, setYear] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateYear = (value: string) => {
    setError(null);
    if (!value.trim()) {
      setYear(null);
      return;
    }
    const parsedYear = parseInt(value, 10);
    if (isNaN(parsedYear)) {
      setError("Please enter a valid year");
      setYear(null);
      return;
    }
    if (parsedYear < CURRENT_YEAR) {
      setError(`Year must be at least ${CURRENT_YEAR}`);
      setYear(null);
      return;
    }
    if (parsedYear > MAX_YEAR) {
      setError(`Year must not exceed ${MAX_YEAR}`);
      setYear(null);
      return;
    }
    setYear(parsedYear);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setInputValue(value);
      validateYear(value);
    }
  };

  const handleDaysChange = (day: keyof DaysOfWeek): void => {
    setSelectedDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  const handleSubmit = async () => {
    if (year !== null) {
        console.log(typeof year);
      const holidays = await CalendarService.getCalendar(year);
      console.log(holidays);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 md:gap-16 w-full item-center justify-center">
        <div className="mb-8">
          <label className="block text-gray-700 mb-2 text-xl font-bold ">
            Select a Canton:
          </label>
          <select
            value={selectedCanton}
            onChange={(e) => setSelectedCanton(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select a Canton --</option>
            {cantons.map((canton) => (
              <option key={canton.id} value={canton.id}>
                {canton.name} ({canton.id})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Work Days</h3>
          {(Object.keys(selectedDays) as Array<keyof DaysOfWeek>).map((day) => (
            <div key={day} className="flex items-center">
              <input
                type="checkbox"
                id={day}
                checked={selectedDays[day]}
                onChange={() => handleDaysChange(day)}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor={day} className="ml-2 text-gray-700  text-lg">
                {day}
              </label>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="year-input"
            className="text-xl font-bold text-gray-700"
          >
            Enter a year ({CURRENT_YEAR}-{MAX_YEAR})
          </label>

          <input
            id="year-input"
            type="text"
            value={inputValue}
            onChange={handleYearChange}
            className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder={`${CURRENT_YEAR} to ${MAX_YEAR}`}
            maxLength={4}
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          {year !== null && !error && (
            <p className="text-sm text-green-600">Valid year: {year}</p>
          )}
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className={`py-2 px-4 font-semibold rounded-lg self-center ${
            year === null 
            ? "bg-green-300 text-gray-500 cursor-not-allowed opacity-75" 
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
        disabled={year === null}
      >
        Get holidays calendar
      </button>
    </>
  );
};

export default Home;
