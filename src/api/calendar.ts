import { Holiday } from "@/app/types";
import apiService from "./apiService";

const CALENDAR_ENDPOINT =
  "https://openholidaysapi.org/PublicHolidays?countryIsoCode=CH&languageIsoCode=DE&";

const CalendarService = {
  // Get the holidays
  getCalendar(year: number): Promise<Holiday[]> {
    return apiService.get(
      `${CALENDAR_ENDPOINT}validFrom=${year}-01-01&validTo=${year}-12-31`
    );
  },
};

export default CalendarService;
