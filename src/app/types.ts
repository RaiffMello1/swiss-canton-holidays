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
// {
//     "id": "57239e4f-4778-4fea-8cba-a512cec7566a",
//     "startDate": "2026-01-17",
//     "endDate": "2026-01-17",
//     "type": "Public",
//     "name": [
//         {
//             "language": "DE",
//             "text": "Antoniustag"
//         }
//     ],
//     "regionalScope": "Local",
//     "temporalScope": "FullDay",
//     "nationwide": false,
//     "subdivisions": [
//         {
//             "code": "CH-SZ-SZ-RT",
//             "shortName": "SZ-SZ-RT"
//         },
//         {
//             "code": "CH-SO-TH-AD",
//             "shortName": "SO-TH-AD"
//         }
//     ]
// }
