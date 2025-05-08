export type Holiday = {
  id: string;
  startDate: string;
  endDate: string;
  type: string;
  name: {
    language: string;
    text: string;
  }[];
  regionalScope: string;
  temporalScope: string;
  nationwide: false;
  subdivisions: {
    code: string;
    shortName: string;
  }[];
};

export type DaysOfWeek = {
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
};

export type Canton = {
  id: string;
  name: string;
};
