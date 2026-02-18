export interface Episode {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate?: string | null;
  runtime?: number | null;
  summary?: string | null;
}

export default Episode;
