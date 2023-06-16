import { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import { FormValues } from '../types';
import { createTeamRequest, deleteTeamRequest, getTeamRequest, updateTeamRequest } from '../services/api';
import { createTeamSchema, updateTeamSchema } from '../schemas/team.schema';

const INITIAL_VALUES: FormValues = {
  name: '',
  area: { name: '' },
  shortName: '',
  tla: '',
  crestUrl: '',
  address: '',
  phone: '',
  website: '',
  email: '',
  founded: null,
  clubColors: '',
  venue: '',
};

export function TeamForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState<FormValues>(INITIAL_VALUES);

  const getTeam = async () => {
    if (id) {
      const { data } = await getTeamRequest(id);

      const team = {
        area: { name: data.area.name },
        name: data.name,
        shortName: data.shortName,
        tla: data.tla,
        crestUrl: data.crestUrl,
        address: data.address,
        phone: data.phone,
        website: data.website,
        email: data.email,
        founded: data.founded,
        clubColors: data.clubColors,
        venue: data.venue,
      };

      setInitialValues(team);
    }
  };

  const onDelete = (id: number) => {
    deleteTeamRequest(id);
    navigate('/');
  };

  useEffect(() => {
    getTeam();
  }, []);

  const onSubmit = (values: FormValues) => {
    if (id) {
      updateTeamRequest(id, values);
    } else {
      createTeamRequest(values);
    }

    setInitialValues(INITIAL_VALUES);
    navigate('/');
  };

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
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
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
              />
            </div>
            <div className="w-full" data-cy="form-short-name">
              <label htmlFor="shortName" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
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
              />
            </div>
            <div className="w-full" data-cy="form-tla">
              <label htmlFor="tla" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
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
              />
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('area[name]', e.target.value);
                }}
              >
                <option value="country">Select country</option>
                <option value="Africa">Africa</option>
                <option value="Argentina">Argentina</option>
                <option value="Asia">Asia</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Belgium">Belgium</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                <option value="Brazil">Brazil</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Canada">Canada</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Colombia">Colombia</option>
                <option value="Croatia">Croatia</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Ecuador">Ecuador</option>
                <option value="England">England</option>
                <option value="Estonia">Estonia</option>
                <option value="Europe">Europe</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Greece">Greece</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Japan">Japan</option>
                <option value="Latvia">Latvia</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Malta">Malta</option>
                <option value="Mexico">Mexico</option>
                <option value="Netherlands">Netherlands</option>
                <option value="North Ireland">North Ireland</option>
                <option value="Norway">Norway</option>
                <option value="Oceania">Oceania</option>
                <option value="Panama">Panama</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Republic of Ireland">Republic of Ireland</option>
                <option value="Romania">Romania</option>
                <option value="Russian Federation">Russian Federation</option>
                <option value="Scotland">Scotland</option>
                <option value="South Africa">South Africa</option>
                <option value="South America">South America</option>
                <option value="Spain">Spain</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Turkey">Turkey</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United States">United States</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Wales">Wales</option>
                <option value="World">World</option>
              </Field>
              <ErrorMessage
                name="area[name]"
                component="span"
                data-cy="form-country-msg-error"
                className="ml-3 mt-2 text-xs text-red-600 dark:text-red-500 font-medium"
              />
            </div>
            <div className="w-full" data-cy="form-club-colors">
              <label htmlFor="clubColors" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
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
              />
            </div>
            <div className="w-full" data-cy="form-venue">
              <label htmlFor="venue" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
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
              />
            </div>
            <div className="w-full" data-cy="form-founded">
              <label htmlFor="founded" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
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
              />
            </div>
            <div className="w-full" data-cy="form-address">
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
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
              />
            </div>
            <div className="w-full" data-cy="form-phone">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
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
              />
            </div>
            <div className="w-full" data-cy="form-email">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
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
              />
            </div>
            <div className="w-full" data-cy="form-website">
              <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
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
              />
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
