import { ShowsRepository } from '../repositories/ShowsRepository';
import Show from '../entities/Show';

export async function searchShows(
  showsRepo: ShowsRepository,
  query: string,
): Promise<Show[]> {
  if (!query || query.trim().length === 0) return [];
  return showsRepo.searchShows(query.trim());
}

export default searchShows;
