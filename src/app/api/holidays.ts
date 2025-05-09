import { Holiday } from "@/app/types";
import apiService from "./apiService";

const HOLIDAYS_ENDPOINT =
  "https://openholidaysapi.org/PublicHolidays?countryIsoCode=CH&languageIsoCode=DE&";

const HolidaysService = {
  // Get the holidays
  getHolidays(year: number): Promise<Holiday[]> {
    return apiService.get(
      `${HOLIDAYS_ENDPOINT}validFrom=${year}-01-01&validTo=${year}-12-31`
    );
  },
};

export default HolidaysService;
