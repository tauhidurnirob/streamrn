import {
  TvMazeShowDto,
  TvMazeEpisodeDto,
  TvMazeCastDto,
  TvMazeSearchResultDto,
} from './tvmazeTypes';
import Show from '../../domain/entities/Show';
import Episode from '../../domain/entities/Episode';
import CastMember from '../../domain/entities/CastMember';

function stripHtml(input?: string | null): string | null {
  if (!input) return null;
  return input.replace(/<[^>]*>/g, '').trim();
}

export function mapShowDtoToShow(dto: TvMazeShowDto): Show {
  return {
    id: dto.id,
    name: dto.name,
    summary: stripHtml(dto.summary) || null,
    image: dto.image || null,
    rating: dto.rating?.average ?? null,
    genres: dto.genres ?? [],
    runtime: dto.runtime ?? null,
    premiered: dto.premiered ?? null,
  };
}

export function mapSearchResultDtoToShow(dto: TvMazeSearchResultDto): Show {
  return mapShowDtoToShow(dto.show);
}

export function mapEpisodeDtoToEpisode(dto: TvMazeEpisodeDto): Episode {
  return {
    id: dto.id,
    name: dto.name,
    season: dto.season,
    number: dto.number,
    airdate: dto.airdate ?? null,
    runtime: dto.runtime ?? null,
    summary: stripHtml(dto.summary) || null,
  };
}

export function mapCastDtoToCastMember(dto: TvMazeCastDto): CastMember {
  return {
    id: dto.person.id,
    name: dto.person.name,
    character: dto.character?.name ?? null,
    image: dto.person.image ?? null,
  };
}
