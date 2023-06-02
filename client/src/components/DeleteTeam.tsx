import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Modal } from './Modal';
import { Team } from '../types';

type TeamModal = Pick<Team, 'id' | 'crestUrl' | 'shortName'>;

export function DeleteTeam() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(true);
  const [team, setTeam] = useState<TeamModal>();

  useEffect(() => {
    findTeam(id);
  }, [id]);

  const findTeam = async (id: string | undefined) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/v1/teams/${id}`);
      setTeam(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {showModal &&
        createPortal(
          <Modal logo={team?.crestUrl} name={team?.shortName} id={team?.id} onClose={() => setShowModal(false)} />,
          document.getElementById('modal-root') as Element,
        )}
    </>
  );
}
