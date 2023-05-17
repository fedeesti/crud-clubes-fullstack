import { Schema } from 'express-validator';

export const idSchema: Schema = {
  id: {
    in: ['params'],
    errorMessage: 'ID is wrong, its must be a number',
    isNumeric: {
      options: { no_symbols: true },
    },
  },
};

export const createTeamSchema: Schema = {
  'area.name': {
    exists: {
      errorMessage: 'Country is required',
    },
  },
  name: {
    exists: {
      errorMessage: 'Name is required',
      options: { checkFalsy: true },
      bail: true,
    },
    trim: true,
    matches: {
      options: [/^[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]+(?:[\w -./']*[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]+)*$/gm],
      errorMessage: "Name should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
      bail: true,
    },
    isLength: {
      errorMessage: 'Name should be at least 7 chars long and maximum of 30 chars',
      options: { min: 7, max: 30 },
    },
  },
  shortName: {
    exists: {
      errorMessage: 'shortName is required',
      options: { checkFalsy: true },
      bail: true,
    },
    trim: true,
    matches: {
      options: [/^[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]+(?:[\w -.'/]*[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]+)*$/gm],
      errorMessage: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
      bail: true,
    },
    isLength: {
      errorMessage: 'ShortName should be at least 4 chars long and maximum of 20 chars',
      options: { min: 4, max: 20 },
    },
  },
  tla: {
    exists: {
      errorMessage: 'TLA is required',
      options: { checkFalsy: true },
      bail: true,
    },
    trim: true,
    isAlpha: {
      errorMessage: 'TLA only contains letters',
      bail: true,
    },
    isLength: {
      options: { min: 3, max: 3 },
      errorMessage: 'TLA must contain 3 chars',
    },
  },
  crestUrl: {
    exists: {
      errorMessage: 'Image is required',
      options: { checkFalsy: true },
    },
  },
  clubColors: {
    exists: {
      errorMessage: 'Team colors is required',
      options: { checkFalsy: true },
      bail: true,
    },
    matches: {
      options: [/^[A-Za-z\s/ñ]+$/g],
      errorMessage: 'clubColors only contains words, spaces and slash',
      bail: true,
    },
    trim: true,
    isLength: {
      errorMessage: 'clubColors should be at least 3 chars long and maximum of 20 chars',
      options: { min: 3, max: 20 },
    },
  },
  address: {
    trim: true,
    optional: { options: { checkFalsy: true } },
    matches: {
      options: [/^[A-Za-z0-9 .,'!&]+$/],
      errorMessage: 'Address should be a valid address',
      bail: true,
    },
    isLength: {
      errorMessage: 'Address should be at least 7 chars long and maximum of 40 chars',
      options: { min: 7, max: 40 },
    },
  },
  phone: {
    trim: true,
    optional: { options: { checkFalsy: true } },
    matches: {
      options: [
        /^(\+{0,})(\d{0,})(\s?[(]{1}\d{1,4}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/g,
      ],
      errorMessage: 'Phone should be a valid phone number',
    },
    isLength: {
      errorMessage: 'Phone should be at least 10 chars long and maximum of 30 chars',
      options: { min: 10, max: 30 },
    },
  },
  website: {
    trim: true,
    optional: { options: { checkFalsy: true } },
    matches: {
      options: [
        /(?:^|[^@\.\w-])([a-z0-9]+:\/\/)?(\w(?!ailto:)\w+:\w+@)?([\w.-]+\.[a-z]{2,4})(:[0-9]+)?(\/.*)?(?=$|[^@\.\w-])/g,
      ],
      errorMessage: 'Website should be a URL',
      bail: true,
    },
    isURL: true,
    errorMessage: 'Website should be a URL',
  },
  email: {
    optional: { options: { checkFalsy: true } },
    isEmail: { errorMessage: 'Please provide valid email' },
    normalizeEmail: true,
  },
  founded: {
    trim: true,
    optional: { options: { checkFalsy: true } },
    isNumeric: {
      options: { no_symbols: true },
      errorMessage: 'Founded must not contain symbols or alphabetic',
      bail: true,
    },
    isLength: {
      errorMessage: 'Founded must contain 4 chars',
      options: { min: 4, max: 4 },
    },
  },
  venue: {
    trim: true,
    optional: { options: { checkFalsy: true } },
    matches: {
      options: [/^[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]+(?:[\w -]*[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]+)*$/gm],
      errorMessage: "Venue should only contain alphanumeric, spaces and the next symbol: '-'",
      bail: true,
    },
    isLength: {
      errorMessage: 'Venue should be at least 7 chars long and maximum of 40 chars',
      options: { min: 7, max: 40 },
    },
  },
};
