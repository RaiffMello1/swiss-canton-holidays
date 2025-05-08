"use client";

import HolidaysService from "@/api/holidays";
import { useEffect, useMemo, useState } from "react";
import { DaysOfWeek, Holiday } from "./types";
import { cantons, monthNames } from "./const";
import { getDayOfWeek, getDayOfMonth } from "./utils";

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
  const [workDays, setWorkDays] = useState<string[]>([]);
  const [selectedCanton, setSelectedCanton] = useState<string>("");

  const [inputValue, setInputValue] = useState<string>("");
  const [year, setYear] = useState<number | null>(null);
  const [error, setError] = useState<string | null>("");

  const [allHolidays, setAllHolidays] = useState<Holiday[] | null>(null);

  // Find the holidays of an specific canton
  const allCantonHollidays = useMemo(() => {
    if (allHolidays) {
      // Get national holidays
      const nationalHolidays = allHolidays.filter(
        (holiday) => holiday.nationwide
      );

      // Separate thesubdivisions holidays
      const subDivisionHolidays = allHolidays.filter(
        (holiday) => holiday.subdivisions && holiday.subdivisions.length
      );

      // Finding canton holyday
      const cantonHolidays = subDivisionHolidays.filter((holiday) => {
        let acronymCantonFound;

        holiday.subdivisions.forEach((element) => {
          const shortNameList = element.shortName.split("-");
          for (let index = 0; index < shortNameList.length; index++) {
            // This is the match that we want, the canton selected equals the acronym defined in the subdivision
            if (shortNameList[index] === selectedCanton) {
              acronymCantonFound = shortNameList[index];
              break;
            }
          }
        });
        // We filter the holiday
        return acronymCantonFound === selectedCanton;
      });

      //ordering
      const ascendingItems = [...nationalHolidays, ...cantonHolidays].sort(
        (a, b) => {
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        }
      );
      return ascendingItems;
    }
  }, [allHolidays, selectedCanton]);

  // We use this use effect to add or remove a work day on the list
  useEffect(() => {
    for (const [key, value] of Object.entries(selectedDays)) {
      if (value && !workDays.includes(key)) {
        setWorkDays((prevWorkDays) => [...prevWorkDays, key]);
      } else if (!value && workDays.includes(key)) {
        setWorkDays((prevWorkDays) =>
          prevWorkDays.filter((item) => item !== key)
        );
      }
    }
  }, [selectedDays]);

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
      HolidaysService.getHolidays(year)
        .then((res) => {
          if (res) setAllHolidays(res);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div
        data-testid="home-component"
        className="flex flex-col md:flex-row gap-4 md:gap-16 w-full item-center justify-center"
      >
        <div className="mb-8">
          {/* Select a Canton */}
          <label
            data-testid="select-label"
            className="block text-gray-700 mb-2 text-xl font-bold "
          >
            Select a Canton:
          </label>
          <select
            value={selectedCanton}
            onChange={(e) => setSelectedCanton(e.target.value)}
            className="w-full md:text-lg p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          {/* Check the work days */}
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
              <label htmlFor={day} className="ml-2 text-gray-700 md:text-lg">
                {day}
              </label>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {/* Type a year */}
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
        className={`py-2 px-4 md:text-lg font-semibold rounded-lg self-center ${
          year === null ||
          selectedCanton.length === 0 ||
          Object.values(selectedDays).every((value) => value === false)
            ? "bg-green-300 text-gray-500 cursor-not-allowed opacity-75"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
        disabled={
          // Only enable the button when the fields has value
          year === null ||
          selectedCanton.length === 0 ||
          Object.values(selectedDays).every((value) => value === false)
        }
      >
        Get holidays calendar
      </button>
      <>
        {allCantonHollidays && allCantonHollidays.length > 0 && (
          <div className="self-center">
            <h2 className="flex justify-center mb-2 text-2xl">
              {cantons.find((canton) => canton.id === selectedCanton)?.name}
            </h2>
            <table className="bg-white border border-gray-200 shadow-md rounded-lg md:text-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-1 md:px-4 text-left border-b">Day</th>
                  <th className="py-3 px-1 md:px-4 text-left border-b">
                    Month
                  </th>
                  <th className="py-3 px-1 md:px-4 text-left border-b">
                    Holiday Name
                  </th>
                  <th className="py-3 px-1 md:px-4 text-left border-b">
                    Match work day
                  </th>
                </tr>
              </thead>
              <tbody>
                {allCantonHollidays &&
                  allCantonHollidays.map((holiday, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-3 px-1 md:px-4 border-b">
                        {getDayOfMonth(holiday.startDate)}
                      </td>
                      <td className="py-3 px-1 md:px-4 border-b">
                        {monthNames[Number(holiday.startDate.split("-")[1])]}
                      </td>
                      <td className="py-3 px-1 md:px-4 border-b">
                        {holiday.name[0].text}
                      </td>

                      <td
                        className={`py-3 px-1 md:px-4 border-b ${
                          // We higlith when the holiday its the same day of a work day
                          workDays.includes(getDayOfWeek(holiday.startDate))
                            ? "font-bold text-orange-400 border-t"
                            : ""
                        }`}
                      >
                        {getDayOfWeek(holiday.startDate)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    </>
  );
};

export default Home;
