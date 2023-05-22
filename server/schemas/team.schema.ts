import { Schema } from 'express-validator';

export const createTeamSchema: Schema = {
  'area.name': {
    trim: true,
    exists: {
      options: { checkFalsy: true },
      errorMessage: 'Country is required',
    },
  },
  name: {
    trim: true,
    exists: {
      options: { checkFalsy: true },
      errorMessage: 'Name is required',
      bail: true,
    },
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
    trim: true,
    exists: {
      options: { checkFalsy: true },
      errorMessage: 'shortName is required',
      bail: true,
    },
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
    trim: true,
    exists: {
      options: { checkFalsy: true },
      errorMessage: 'TLA is required',
      bail: true,
    },
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
    trim: true,
    exists: {
      options: { checkFalsy: true },
      errorMessage: 'Image is required',
    },
  },
  clubColors: {
    trim: true,
    exists: {
      options: { checkFalsy: true },
      errorMessage: 'Team colors is required',
      bail: true,
    },
    matches: {
      options: [/^[A-Za-z\s/ñ]+$/g],
      errorMessage: 'clubColors only contains words, spaces and slash',
      bail: true,
    },
    isLength: {
      errorMessage: 'clubColors should be at least 3 chars long and maximum of 20 chars',
      options: { min: 3, max: 20 },
    },
  },
  address: {
    trim: true,
    optional: { options: { checkFalsy: true } },
    matches: {
      options: [/^[A-Za-z0-9\u00C0-\u024F .,'!&]+$/],
      errorMessage: 'Address should be a valid address',
      bail: true,
    },
    isLength: {
      errorMessage: 'Address should be at least 7 chars long and maximum of 40 chars',
      options: { min: 7, max: 50 },
    },
  },
  phone: {
    trim: true,
    optional: { options: { checkFalsy: true } },
    matches: {
      options: [
        /^(\+{0,})(\d{0,})(\s?[(]{1}\d{1,5}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/g,
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
      options: [/^[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]+(?:[\w -.]*[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]+)*$/gm],
      errorMessage: "Venue should only contain alphanumeric, spaces and the next symbol: '-'",
      bail: true,
    },
    isLength: {
      errorMessage: 'Venue should be at least 7 chars long and maximum of 40 chars',
      options: { min: 7, max: 40 },
    },
  },
};

export const updateTeamSchema: Schema = {
  'area.name': {
    trim: true,
    optional: true,
    notEmpty: {
      errorMessage: 'Country cannot be empty',
      bail: true,
    },
  },
  name: {
    trim: true,
    optional: true,
    notEmpty: {
      errorMessage: 'Name cannot be empty',
      bail: true,
    },
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
    trim: true,
    optional: true,
    notEmpty: {
      errorMessage: 'ShortName cannot be empty',
      bail: true,
    },
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
    trim: true,
    optional: true,
    notEmpty: {
      errorMessage: 'TLA cannot be empty',
      bail: true,
    },
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
    trim: true,
    optional: true,
    notEmpty: {
      errorMessage: 'Image cannot be empty',
      bail: true,
    },
  },
  clubColors: {
    trim: true,
    optional: true,
    notEmpty: {
      errorMessage: 'clubColors cannot be empty',
      bail: true,
    },
    matches: {
      options: [/^[A-Za-z\s/ñ]+$/g],
      errorMessage: 'clubColors only contains words, spaces and slash',
      bail: true,
    },
    isLength: {
      errorMessage: 'clubColors should be at least 3 chars long and maximum of 20 chars',
      options: { min: 3, max: 20 },
    },
  },
  address: {
    optional: { options: { checkFalsy: true } },
    trim: true,
    matches: {
      options: [/^[A-Za-z0-9\u00C0-\u024F .,'!&]+$/],
      errorMessage: 'Address should be a valid address',
      bail: true,
    },
    isLength: {
      errorMessage: 'Address should be at least 7 chars long and maximum of 40 chars',
      options: { min: 7, max: 50 },
    },
  },
  phone: {
    optional: { options: { checkFalsy: true } },
    trim: true,
    matches: {
      options: [
        /^(\+{0,})(\d{0,})(\s?[(]{1}\d{1,5}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/g,
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
      options: [/^[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]+(?:[\w -.]*[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]+)*$/gm],
      errorMessage: "Venue should only contain alphanumeric, spaces and the next symbol: '-'",
      bail: true,
    },
    isLength: {
      errorMessage: 'Venue should be at least 7 chars long and maximum of 40 chars',
      options: { min: 7, max: 40 },
    },
  },
};
