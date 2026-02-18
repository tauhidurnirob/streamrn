import { ShowsRepository } from '../../domain/repositories/ShowsRepository';
import Show from '../../domain/entities/Show';
import Episode from '../../domain/entities/Episode';
import CastMember from '../../domain/entities/CastMember';
import {
  mapShowDtoToShow,
  mapEpisodeDtoToEpisode,
  mapCastDtoToCastMember,
} from '../api/tvmazeMappers';

const BASE = 'https://api.tvmaze.com';

export class ShowsRepositoryImpl implements ShowsRepository {
  async searchShows(query: string): Promise<Show[]> {
    const res = await fetch(`${BASE}/search/shows?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.map((r: any) => mapShowDtoToShow(r.show));
  }

  async getShow(id: number): Promise<Show> {
    const res = await fetch(`${BASE}/shows/${id}`);
    const data = await res.json();
    return mapShowDtoToShow(data);
  }

  async getShowEpisodes(showId: number): Promise<Episode[]> {
    const res = await fetch(`${BASE}/shows/${showId}/episodes`);
    const data = await res.json();
    return data.map((e: any) => mapEpisodeDtoToEpisode(e));
  }

  async getShowCast(showId: number): Promise<CastMember[]> {
    const res = await fetch(`${BASE}/shows/${showId}/cast`);
    const data = await res.json();
    return data.map((c: any) => mapCastDtoToCastMember(c));
  }
}

export default ShowsRepositoryImpl;
