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

export const requiredSchema: Schema = {
  id: {
    exists: {
      errorMessage: 'ID is required',
    },
  },
  'area.id': {
    exists: {
      errorMessage: 'Country ID is required',
    },
  },
  'area.name': {
    exists: {
      errorMessage: 'Country is required',
    },
  },
  name: {
    exists: {
      errorMessage: 'Name is required',
      options: { checkFalsy: true },
    },
  },
  shortName: {
    exists: {
      errorMessage: 'shortName is required',
      options: { checkFalsy: true },
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
    },
  },
};
