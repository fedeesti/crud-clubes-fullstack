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
export interface CreateTeamResponse {
  id?: number;
  area: Omit<Area, 'id'>;
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string;
  address?: string;
  phone?: string;
  website?: string;
  email?: string;
  founded?: number;
  clubColors: string;
  venue?: string;
}
