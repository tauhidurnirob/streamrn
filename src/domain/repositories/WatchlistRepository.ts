import Show from '../entities/Show';

export interface WatchlistRepository {
  getWatchlist(): Promise<Show[]>;
  toggleWatchlist(show: Show): Promise<void>;
}

export default WatchlistRepository;
