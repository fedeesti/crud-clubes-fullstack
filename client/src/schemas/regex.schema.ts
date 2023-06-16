export const nameRegex =
  /^[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]+(?:[\w -./']*[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]+)*$/;

export const tlaRegex = /^[a-zA-Z]+$/;

export const clubColorsRegex = /^[A-Za-z\s/ñ]+$/;

export const addressRegex = /^[A-Za-z0-9\u00C0-\u024F .,'!&]+$/;

export const phoneRegex =
  /^(\+{0,})(\d{0,})(\s?[(]{1}\d{1,5}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/;

export const websiteRegex =
  /(?:^|[^@\.\w-])([a-z0-9]+:\/\/)?(\w(?!ailto:)\w+:\w+@)?([\w.-]+\.[a-z]{2,4})(:[0-9]+)?(\/.*)?(?=$|[^@\.\w-])/;

export const todayDate = new Date();

export const venueRegex = /^[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]+(?:[\w -.]*[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]+)*$/;

export const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export const arrayOfCountries = [
  'Africa',
  'Argentina',
  'Asia',
  'Australia',
  'Austria',
  'Belgium',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Brazil',
  'Bulgaria',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'Croatia',
  'Czech Republic',
  'Denmark',
  'Ecuador',
  'England',
  'Estonia',
  'Europe',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Iceland',
  'India',
  'Israel',
  'Italy',
  'Japan',
  'Latvia',
  'Lithuania',
  'Malta',
  'Mexico',
  'Netherlands',
  'North Ireland',
  'Norway',
  'Oceania',
  'Panama',
  'Paraguay',
  'Peru',
  'Poland',
  'Portugal',
  'Republic of Ireland',
  'Romania',
  'Russian Federation',
  'Scotland',
  'South Africa',
  'South America',
  'Spain',
  'Sweden',
  'Switzerland',
  'Turkey',
  'Ukraine',
  'United States',
  'Uruguay',
  'Venezuela',
  'Vietnam',
  'Wales',
  'World',
];
