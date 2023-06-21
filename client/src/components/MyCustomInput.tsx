import { FormikErrors, FormikTouched, useField } from 'formik';
import { REQUIRED_FIELDS } from '../utils/constants';

interface InputProps {
  label: string;
  name: string;
  id?: string;
  type: string;
  cypress: string;
  placeholder?: string;
  errors?: FormikErrors<{
    [field: string]: any;
  }>;
  touched?: FormikTouched<{
    [field: string]: any;
  }>;
}

export function MyCustomInput({ label, id, ...props }: InputProps) {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.name} className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
        {label}
        {!id && REQUIRED_FIELDS.includes(props.name) ? <span className="ml-px text-red-800">*</span> : null}
      </label>
      <input
        id={props.name}
        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <span data-cy={props.cypress} className="ml-3 mt-2 text-xs text-red-600 dark:text-red-500 font-medium">
          {meta.error}
        </span>
      ) : null}
    </>
  );
}
