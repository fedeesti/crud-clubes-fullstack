import * as yup from 'yup';
import {
  nameRegex,
  tlaRegex,
  clubColorsRegex,
  addressRegex,
  phoneRegex,
  websiteRegex,
  todayDate,
  venueRegex,
  emailRegex,
  arrayOfCountries,
} from './regex.schema';

export const createTeamSchema = yup.object({
  'area[name]': yup.string().oneOf(arrayOfCountries, 'please select a country'),
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .matches(nameRegex, {
      message: "Name should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
    })
    .min(7, 'must be at least 7 characters long')
    .max(30, 'must be a maximum of 30 characters'),
  shortName: yup
    .string()
    .trim()
    .required('Short name is required')
    .matches(nameRegex, {
      message: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
    })
    .min(4, 'must be at least 4 characters long')
    .max(20, 'must be a maximum of 20 characters'),
  tla: yup
    .string()
    .trim()
    .required('TLA is required')
    .matches(tlaRegex, { message: 'TLA only contains letters' })
    .length(3, 'TLA must contain 3 chars')
    .uppercase(),
  crestUrl: yup.mixed().required('Logo is required'),
  clubColors: yup
    .string()
    .trim()
    .required('Club Colors is required')
    .matches(clubColorsRegex, { message: 'Club Colors only contains words, spaces and slash' })
    .min(3, 'must be at least 3 characters long')
    .max(20, 'must be a maximum of 20 characters'),
  address: yup
    .string()
    .trim()
    .matches(addressRegex, { message: 'Address should be a valid address' })
    .min(7, 'must be at least 7 characters long')
    .max(50, 'must be a maximum of 50 characters'),
  phone: yup
    .string()
    .trim()
    .matches(phoneRegex, { message: 'should be a valid phone number' })
    .min(10, 'must be at least 10 characters long')
    .max(30, 'must be a maximum of 30 characters'),
  website: yup.string().trim().matches(websiteRegex, { message: 'should be a URL' }).url('should be a URL'),
  email: yup.string().trim().matches(emailRegex, { message: 'Please provide valid email' }),
  founded: yup
    .number()
    .lessThan(todayDate.getUTCFullYear(), 'must not exceed current year')
    .positive()
    .integer()
    .nullable(),
  venue: yup
    .string()
    .trim()
    .matches(venueRegex, { message: "should only contain alphanumeric, spaces and the next symbol: '-'" })
    .min(7, 'must be at least 7 characters long')
    .max(40, 'must be a maximum of 40 characters'),
});

export const updateTeamSchema = yup.object({
  'area[name]': yup.string().oneOf(arrayOfCountries, 'please select a country'),
  name: yup
    .string()
    .trim()
    .matches(nameRegex, {
      message: "Name should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
    })
    .defined('Name cannot be empty')
    .min(7, 'must be at least 7 characters long')
    .max(30, 'must be a maximum of 30 characters'),
  shortName: yup
    .string()
    .trim()
    .defined('ShortName cannot be empty')
    .matches(nameRegex, {
      message: "ShortName should only contain alphanumeric, spaces and the next symbols: [ '/', '.', '-']",
    })
    .min(4, 'must be at least 4 characters long')
    .max(20, 'must be a maximum of 20 characters'),
  tla: yup
    .string()
    .trim()
    .defined('TLA cannot be empty')
    .matches(tlaRegex, { message: 'TLA only contains letters' })
    .length(3, 'TLA must contain 3 chars')
    .uppercase(),
  crestUrl: yup.mixed().optional(),
  clubColors: yup
    .string()
    .trim()
    .defined('Club Colors cannot be empty')
    .matches(clubColorsRegex, { message: 'Club Colors only contains words, spaces and slash' })
    .min(3, 'must be at least 3 characters long')
    .max(20, 'must be a maximum of 20 characters'),
  address: yup
    .string()
    .trim()
    .matches(addressRegex, { message: 'Address should be a valid address' })
    .min(7, 'must be at least 7 characters long')
    .max(50, 'must be a maximum of 50 characters')
    .nullable(),
  phone: yup
    .string()
    .trim()
    .matches(phoneRegex, { message: 'should be a valid phone number' })
    .min(10, 'must be at least 10 characters long')
    .max(30, 'must be a maximum of 30 characters')
    .nullable(),
  website: yup.string().trim().matches(websiteRegex, { message: 'should be a URL' }).url('should be a URL').nullable(),
  email: yup.string().trim().matches(emailRegex, { message: 'Please provide valid email' }).nullable(),
  founded: yup
    .number()
    .lessThan(todayDate.getUTCFullYear(), 'must not exceed current year')
    .positive()
    .integer()
    .nullable(),
  venue: yup
    .string()
    .trim()
    .matches(venueRegex, { message: "should only contain alphanumeric, spaces and the next symbol: '-'" })
    .min(7, 'must be at least 7 characters long')
    .max(40, 'must be a maximum of 40 characters')
    .nullable(),
});
