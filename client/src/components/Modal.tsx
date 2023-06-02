import { useNavigate } from 'react-router-dom';
import { deleteTeam } from '../services/api';

export function Modal({
  logo,
  name,
  id,
  onClose,
}: {
  logo: string | undefined;
  name: string | undefined;
  id: number | undefined;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  const onDelete = (id: number | undefined) => {
    deleteTeam(`/teams/${id}`);
    navigate('/');
  };

  const closeModal = () => {
    onClose();
    navigate('/');
  };

  return (
    <div
      id="popup-modal"
      className="z-50 w-full h-screen flex justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0"
      onClick={closeModal}
    >
      <div className="relative w-full max-w-md max-h-full" onClick={(e) => e.stopPropagation()}>
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700" data-cy="modal-container">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="popup-modal"
            data-cy="modal-close"
            onClick={closeModal}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <img src={logo} alt={`logo-${name}`} className="w-16 h- mx-auto mb-4" data-cy="modal-img" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400" data-cy="modal-information">
              Are you sure you want to delete {name}?
            </h3>
            <button
              data-modal-hide="popup-modal"
              onClick={() => onDelete(id)}
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              data-cy="modal-btn-confirm"
            >
              Yes, I'm sure
            </button>
            <button
              data-modal-hide="popup-modal"
              onClick={closeModal}
              type="button"
              data-cy="modal-btn-cancel"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
