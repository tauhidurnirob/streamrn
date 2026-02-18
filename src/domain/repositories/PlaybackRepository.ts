export interface PlaybackRepository {
  getProgress(episodeId: number): Promise<number | null>;
  setProgress(episodeId: number, positionSeconds: number): Promise<void>;
}

export default PlaybackRepository;
