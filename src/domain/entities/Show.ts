export interface ShowImage {
  medium?: string | null;
  original?: string | null;
}

export interface Show {
  id: number;
  name: string;
  summary?: string | null;
  image?: ShowImage | null;
  rating?: number | null;
  genres?: string[];
  runtime?: number | null;
  premiered?: string | null;
}

export default Show;
