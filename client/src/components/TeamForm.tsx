import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';

import { useCustomFormik } from '../hooks/useCustomFormik';
import { createTeamSchema, updateTeamSchema } from '../schemas/team.schema';
import { countries } from '../utils/constants';
import { MyCustomInput } from './MyCustomInput';

export function TeamForm() {
  const { id } = useParams();
  const { initialValues, onDelete, onSubmit } = useCustomFormik(id);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={id ? updateTeamSchema : createTeamSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form data-cy="team-form-container">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2" data-cy="form-team-name">
              <MyCustomInput
                label="Team Name"
                name="name"
                id={id}
                type="text"
                placeholder="Type team name"
                cypress="form-name-msg-error"
              />
              {/* <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Team Name
                {id ? null : <span className="ml-px text-red-800">*</span>}
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type team name"
              />
              <ErrorMessage
                name="name"
                component="span"
                data-cy="form-name-msg-error"
                className="ml-3 mt-2 text-xs text-red-600 dark:text-red-500 font-medium"
              /> */}
            </div>
            <div className="w-full" data-cy="form-short-name">
              <MyCustomInput
                label="Short name"
                name="shortName"
                id={id}
                type="text"
                placeholder="Type short name"
                cypress="form-short-name-msg-error"
              />
              {/* <label htmlFor="shortName" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Short name
                {id ? '' : <span className="ml-px text-red-800">*</span>}
              </label>
              <Field
                type="text"
                name="shortName"
                id="shortName"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type short name"
              />
              <ErrorMessage
                name="shortName"
                component="span"
                data-cy="form-short-name-msg-error"
                className="ml-3 mt-2 text-xs text-red-600 dark:text-red-500 font-medium"
              /> */}
            </div>
            <div className="w-full" data-cy="form-tla">
              <MyCustomInput
                label="TLA"
                name="tla"
                id={id}
                type="text"
                placeholder="AAA"
                cypress="form-tla-msg-error"
              />
              {/* <label htmlFor="tla" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                TLA
                {id ? '' : <span className="ml-px text-red-800">*</span>}
              </label>
              <Field
                type="text"
                name="tla"
                id="tla"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="AAA"
              />
              <ErrorMessage
                name="tla"
                component="span"
                data-cy="form-tla-msg-error"
                className="ml-3 mt-2 text-xs text-red-600 dark:text-red-500 font-medium"
              /> */}
            </div>
            <div className="w-full" data-cy="form-country">
              <label htmlFor="area.name" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Country
                {id ? '' : <span className="ml-px text-red-800">*</span>}
              </label>
              <Field
                as="select"
                id="area.name"
                name="area[name]"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="country">Select country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="area[name]"
                component="span"
                data-cy="form-country-msg-error"
                className="ml-3 mt-2 text-xs text-red-600 dark:text-red-500 font-medium"
              />
            </div>
            <div className="w-full" data-cy="form-club-colors">
              <MyCustomInput
                label="Club Colors"
                name="clubColors"
                id={id}
                type="text"
                placeholder="Type club colors"
                cypress="form-club-colors-msg-error"
              />
              {/* <label htmlFor="clubColors" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Club Colors
                {id ? '' : <span className="ml-px text-red-800">*</span>}
              </label>
              <Field
                type="text"
                name="clubColors"
                id="clubColors"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type club colors"
              />
              <ErrorMessage
                name="clubColors"
                component="span"
                data-cy="form-club-colors-msg-error"
                className="ml-3 mt-2 text-xs text-red-600 dark:text-red-500 font-medium"
              /> */}
            </div>
            <div className="w-full" data-cy="form-venue">
              <MyCustomInput
                label="Stadium name"
                name="venue"
                type="text"
                placeholder="Type Stadium name"
                cypress="form-venue-msg-error"
              />
              {/* <label htmlFor="venue" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Stadium name
              </label>
              <Field
                type="text"
                name="venue"
                id="venue"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type Stadium name"
              />
              <ErrorMessage
                name="venue"
                component="span"
                data-cy="form-venue-msg-error"
                className="ml-3 mt-2 text-xs text-red-600 dark:text-red-500 font-medium"
              /> */}
            </div>
            <div className="w-full" data-cy="form-founded">
              <MyCustomInput
                label="Founded"
                name="founded"
                type="number"
                placeholder="1900"
                cypress="form-founded-msg-error"
              />
              {/* <label htmlFor="founded" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Founded
              </label>
              <Field
                type="number"
                name="founded"
                id="founded"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="1900"
              />
              <ErrorMessage
                name="founded"
                component="span"
                data-cy="form-founded-msg-error"
                className="ml-3 mt-2 text-xs text-red-600 dark:text-red-500 font-medium"
              /> */}
            </div>
            <div className="w-full" data-cy="form-address">
              <MyCustomInput
                label="Address"
                name="address"
                type="text"
                placeholder="Type address"
                cypress="form-address-msg-error"
              />
              {/* <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Address
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type address"
              />
              <ErrorMessage
                name="address"
                component="span"
                data-cy="form-address-msg-error"
                className="ml-3 mt-2 text-xs text-red-600 dark:text-red-500 font-medium"
              /> */}
            </div>
            <div className="w-full" data-cy="form-phone">
              <MyCustomInput
                label="Phone"
                name="phone"
                type="tel"
                placeholder="44 (020) 76195003"
                cypress="form-phone-msg-error"
              />
              {/* <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Phone
              </label>
              <Field
                type="tel"
                id="phone"
                name="phone"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="44 (020) 76195003"
              />
              <ErrorMessage
                name="phone"
                component="span"
                data-cy="form-phone-msg-error"
                className="ml-3 mt-2 text-xs text-red-600 dark:text-red-500 font-medium"
              /> */}
            </div>
            <div className="w-full" data-cy="form-email">
              <MyCustomInput
                label="Email"
                name="email"
                type="text"
                placeholder="teamname@gmail.com"
                cypress="form-email-msg-error"
              />
              {/* <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="teamname@gmail.com"
              />
              <ErrorMessage
                name="email"
                component="span"
                data-cy="form-email-msg-error"
                className="ml-3 mt-2 text-xs text-red-600 dark:text-red-500 font-medium"
              /> */}
            </div>
            <div className="w-full" data-cy="form-website">
              <MyCustomInput
                label="Website"
                name="website"
                type="url"
                placeholder="www.teamname.com"
                cypress="form-website-msg-error"
              />
              {/* <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Website
              </label>
              <Field
                type="url"
                id="website"
                name="website"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="www.teamname.com"
              />
              <ErrorMessage
                name="website"
                component="span"
                data-cy="form-website-msg-error"
                className="ml-3 mt-2 text-xs text-red-600 dark:text-red-500 font-medium"
              /> */}
            </div>
            <div className="sm:col-span-2" data-cy="form-update-logo">
              <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white" htmlFor="crestUrl">
                Upload logo
                {id ? null : <span className="ml-px text-red-800">*</span>}
              </label>
              <input
                className="block w-full text-sm text-gray-800 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:bg-gray-800 file:py-1 file:cursor-pointer file:text-white hover:file:bg-gray-700"
                id="crestUrl"
                type="file"
                name="crestUrl"
                accept=".png, .jpg, .jpeg, .svg"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const files = e.target.files;
                  setFieldValue('crestUrl', URL.createObjectURL(files?.item(0) as Blob));
                }}
              />
              <ErrorMessage
                name="crestUrl"
                component="span"
                data-cy="form-logo-msg-error"
                className="ml-3 mt-2 text-xs text-red-600 dark:text-red-500 font-medium"
              />
            </div>
          </div>
          {id ? (
            <div className="flex items-center space-x-4 py-6">
              <button
                type="submit"
                data-cy="form-btn-update"
                className="text-white bg-gold hover:bg-opacity-80 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Update team
              </button>
              <button
                type="button"
                data-cy="form-btn-delete"
                onClick={() => onDelete(Number(id))}
                className="text-red-600 inline-flex items-center bg-white hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                <svg
                  className="w-5 h-5 mr-1 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Delete
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gold rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-opacity-80"
              data-cy="form-btn-submit"
            >
              Add team
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
}
