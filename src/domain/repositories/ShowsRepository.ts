import Show from '../entities/Show';
import Episode from '../entities/Episode';
import CastMember from '../entities/CastMember';

export interface ShowsRepository {
  searchShows(query: string): Promise<Show[]>;
  getShow(id: number): Promise<Show>;
  getShowEpisodes(showId: number): Promise<Episode[]>;
  getShowCast(showId: number): Promise<CastMember[]>;
}

export default ShowsRepository;
