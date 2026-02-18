import { ShowsRepository } from '../repositories/ShowsRepository';
import Show from '../entities/Show';

export async function getShowDetails(
  showsRepo: ShowsRepository,
  showId: number,
): Promise<Show> {
  return showsRepo.getShow(showId);
}

export default getShowDetails;
