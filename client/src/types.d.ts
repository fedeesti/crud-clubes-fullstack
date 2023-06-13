export interface Team {
  id: number;
  area: Area;
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  email: string | null;
  founded: number | null;
  clubColors: string;
  venue: string | null;
  lastUpdated: string;
}

interface Area {
  id: number;
  name: string;
}

export interface FormValues {
  name: string;
  area: Omit<Area, 'id'>;
  shortName: string;
  tla: string;
  crestUrl: string;
  clubColors: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  email: string | null;
  founded: number | null;
  venue: string | null;
}
