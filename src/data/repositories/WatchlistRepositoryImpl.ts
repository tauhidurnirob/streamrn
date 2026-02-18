import AsyncStorage from '@react-native-async-storage/async-storage';
import { WatchlistRepository } from '../../domain/repositories/WatchlistRepository';
import Show from '../../domain/entities/Show';

const KEY = '@streamapp/watchlist';

export class WatchlistRepositoryImpl implements WatchlistRepository {
  async getWatchlist(): Promise<Show[]> {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as Show[];
      return parsed;
    } catch (e) {
      console.log('Failed to parse watchlist, resetting to empty', e);
      return [];
    }
  }

  async toggleWatchlist(show: Show): Promise<void> {
    const current = await this.getWatchlist();
    const exists = current.find((s) => s.id === show.id);
    let next: Show[];
    if (exists) {
      next = current.filter((s) => s.id !== show.id);
    } else {
      next = [show, ...current];
    }
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
  }
}

export default WatchlistRepositoryImpl;
