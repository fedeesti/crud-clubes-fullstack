import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

import { FormValues } from '../types';
import { createTeamRequest } from '../services/api';

export function TeamForm() {
  const navigate = useNavigate();
  const inititalValues: FormValues = {
    country: '',
    name: '',
    shortName: '',
    tla: '',
    crestUrl: '',
    address: '',
    phone: '',
    website: '',
    email: '',
    founded: 0,
    clubColors: '',
    venue: '',
  };

  const onSubmit = (values: FormValues) => {
    createTeamRequest(values);
    navigate('/');
  };

  return (
    <Formik initialValues={inititalValues} onSubmit={onSubmit}>
      {(props) => (
        <Form data-cy="team-form-container">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2" data-cy="form-team-name">
              {' '}
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Team Name
                <span className="ml-px text-red-800">*</span>
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type team name"
                required
              />
              <ErrorMessage name="name" />
            </div>
            <div className="w-full" data-cy="form-short-name">
              <label htmlFor="shortName" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Short name
                <span className="ml-px text-red-800">*</span>
              </label>
              <Field
                type="text"
                name="shortName"
                id="shortName"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type short name"
                required
              />
              <ErrorMessage name="shortName" />
            </div>
            <div className="w-full" data-cy="form-tla">
              <label htmlFor="tla" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                TLA
                <span className="ml-px text-red-800">*</span>
              </label>
              <Field
                type="text"
                name="tla"
                id="tla"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="AAA"
                required
              />
              <ErrorMessage name="tla" />
            </div>
            <div className="w-full" data-cy="form-country">
              <label htmlFor="area[name]" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Country
                <span className="ml-px text-red-800">*</span>
              </label>
              <Field
                as="select"
                name="area[name]"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
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
              <ErrorMessage name="area.name" />
            </div>
            <div className="w-full" data-cy="form-club-colors">
              <label htmlFor="clubColors" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Club Colors
                <span className="ml-px text-red-800">*</span>
              </label>
              <Field
                type="text"
                name="clubColors"
                id="clubColors"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type club colors"
                required
              />
              <ErrorMessage name="clubColors" />
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
              <ErrorMessage name="venue" />
            </div>
            <div className="w-full" data-cy="form-founded">
              <label htmlFor="founded" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Founded
              </label>
              <Field
                type="number"
                name="founded"
                id="founded"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="1900"
              />
              <ErrorMessage name="founded" />
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
              <ErrorMessage name="address" />
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
              <ErrorMessage name="phone" />
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
              <ErrorMessage name="email" />
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
              <ErrorMessage name="website" />
            </div>
            <div className="sm:col-span-2" data-cy="form-update-logo">
              <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-white" htmlFor="crestUrl">
                Upload logo
                <span className="ml-px text-red-800">*</span>
              </label>
              <input
                className="block w-full text-sm text-gray-800 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:bg-gray-800 file:py-1 file:cursor-pointer file:text-white hover:file:bg-gray-700"
                aria-describedby="crestUrl"
                id="crestUrl"
                type="file"
                name="crestUrl"
                accept=".png, .jpg, .jpeg, .svg"
                onChange={(e) => {
                  const files = e.target.files;
                  console.log(files);
                  props.setFieldValue('crestUrl', URL.createObjectURL(files?.item(0) as Blob));
                }}
                required
              />
              <ErrorMessage name="crestUrl" />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gold rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            data-cy="form-btn-submit"
          >
            Add team
          </button>
        </Form>
      )}
    </Formik>
  );
}
