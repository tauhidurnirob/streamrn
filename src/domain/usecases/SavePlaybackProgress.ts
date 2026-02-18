import { PlaybackRepository } from '../repositories/PlaybackRepository';

export async function savePlaybackProgress(
  playbackRepo: PlaybackRepository,
  episodeId: number,
  positionSeconds: number,
): Promise<void> {
  return playbackRepo.setProgress(episodeId, positionSeconds);
}

export default savePlaybackProgress;
