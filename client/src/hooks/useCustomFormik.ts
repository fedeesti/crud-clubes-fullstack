import { useEffect, useState } from 'react';
import { FormValues } from '../types';
import { INITIAL_VALUES } from '../utils/constants';
import { deleteTeamRequest, updateTeamRequest, createTeamRequest, getTeamRequest } from '../services/api';
import { useNavigate } from 'react-router-dom';

export function useCustomFormik(id: string | undefined) {
  const [initialValues, setInitialValues] = useState<FormValues>(INITIAL_VALUES);
  const navigate = useNavigate();

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

  return { initialValues, onDelete, onSubmit };
}
