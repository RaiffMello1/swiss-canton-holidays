import apiService from './apiService';

const CALENDAR_ENDPOINT = 'https://openholidaysapi.org/PublicHolidays?countryIsoCode=CH&languageIsoCode=DE&';

const CalendarService = {

  // Get the holidays
  getCalendar(validFrom: string,validTo: string ) {
    return apiService.get(`${CALENDAR_ENDPOINT}validFrom=${validFrom}&validTo=${validTo}`);
  },

};

export default CalendarService;