import { WatchlistRepository } from '../repositories/WatchlistRepository';
import Show from '../entities/Show';

export async function toggleWatchlist(
  watchlistRepo: WatchlistRepository,
  show: Show,
): Promise<void> {
  return watchlistRepo.toggleWatchlist(show);
}

export default toggleWatchlist;
