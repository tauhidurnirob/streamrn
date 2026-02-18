// DTO types for TVmaze API

export interface TvMazeImageDto {
  medium?: string | null;
  original?: string | null;
}

export interface TvMazeRatingDto {
  average?: number | null;
}

export interface TvMazeShowDto {
  id: number;
  name: string;
  summary?: string | null;
  image?: TvMazeImageDto | null;
  rating?: TvMazeRatingDto | null;
  genres?: string[];
  runtime?: number | null;
  premiered?: string | null;
}

export interface TvMazeSearchResultDto {
  score: number;
  show: TvMazeShowDto;
}

export interface TvMazeEpisodeDto {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate?: string | null;
  runtime?: number | null;
  summary?: string | null;
}

export interface TvMazeCastPersonDto {
  id: number;
  name: string;
  image?: TvMazeImageDto | null;
}

export interface TvMazeCastCharacterDto {
  id?: number;
  name?: string;
}

export interface TvMazeCastDto {
  person: TvMazeCastPersonDto;
  character?: TvMazeCastCharacterDto | null;
}
