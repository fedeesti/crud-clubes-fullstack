import { createPortal } from 'react-dom';
import { Modal } from '../components/Modal';

export function DeleteTeam({
  id,
  logo,
  name,
  showModal,
}: {
  id: number;
  logo: string;
  name: string;
  showModal: () => void;
}): JSX.Element {
  return (
    <>
      {showModal &&
        createPortal(
          <Modal logo={logo} name={name} id={id} onClose={showModal} />,
          document.getElementById('modal-root') as Element,
        )}
    </>
  );
}
