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
