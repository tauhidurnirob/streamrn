import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlaybackRepository } from '../../domain/repositories/PlaybackRepository';

const KEY = '@streamapp/playbackProgress';

export class PlaybackRepositoryImpl implements PlaybackRepository {
  private async _readMap(): Promise<Record<number, number>> {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return {};
    try {
      return JSON.parse(raw) as Record<number, number>;
    } catch (e) {
      console.log('Failed to parse playback progress map, resetting to empty', e);
      return {};
    }
  }

  private async _writeMap(map: Record<number, number>): Promise<void> {
    await AsyncStorage.setItem(KEY, JSON.stringify(map));
  }

  async getProgress(episodeId: number): Promise<number | null> {
    const map = await this._readMap();
    const val = map[episodeId];
    return typeof val === 'number' ? val : null;
  }

  async setProgress(episodeId: number, positionSeconds: number): Promise<void> {
    const map = await this._readMap();
    map[episodeId] = positionSeconds;
    await this._writeMap(map);
  }
}

export default PlaybackRepositoryImpl;
