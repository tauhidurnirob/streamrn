import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Video, { OnProgressData } from 'react-native-video';
import { DEMO_STREAM_URL } from '../../app/config/streams';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setProgress } from './playbackSlice';
import PlaybackRepositoryImpl from '../../data/repositories/PlaybackRepositoryImpl';

type Params = { params: { episodeId?: number; episodeName?: string } };

const repo = new PlaybackRepositoryImpl();

const PlayerScreen: React.FC = () => {
  const route = useRoute() as Params;
  const episodeId = route.params?.episodeId ?? 0;
  const episodeName = route.params?.episodeName ?? 'Episode';
  const dispatch = useDispatch();
  const [initialPosition, setInitialPosition] = useState<number>(0);
  const [hasVideoError, setHasVideoError] = useState(false);
  const saveTimeout = useRef<any>(null);
  const videoRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!episodeId) return;
      try {
        const pos = await repo.getProgress(episodeId);
        if (mounted && typeof pos === 'number') setInitialPosition(pos);
      } catch (e) {
        console.error('Failed to read playback progress', e);
      }
    })();
    return () => { mounted = false; };
  }, [episodeId]);

  const onProgress = (data: OnProgressData) => {
    if (!episodeId) return;
    const seconds = Math.floor(data.currentTime);
    try {
      dispatch(setProgress({ episodeId, position: seconds }));
    } catch (e) {
      console.error('Failed to dispatch progress', e);
    }

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      repo.setProgress(episodeId, seconds).catch((err) => console.error('Failed to persist progress', err));
    }, 2000);
  };

  const onVideoError = (err: any) => {
    console.error('Video playback error', err);
    setHasVideoError(true);
  };

  return (
    <View style={styles.container}>
      {!hasVideoError ? (
        <Video
          ref={videoRef}
          source={{ uri: DEMO_STREAM_URL }}
          style={styles.video}
          controls
          paused={false}
          onProgress={onProgress}
          onError={onVideoError}
          onLoad={() => {
            if (initialPosition && videoRef.current && typeof videoRef.current.seek === 'function') {
              try {
                videoRef.current.seek(initialPosition);
              } catch (e) {
                console.error('Failed to seek video', e);
              }
            }
          }}
          resizeMode="contain"
        />
      ) : (
        <View style={[styles.video, styles.videoErrorContainer]}>
          <Text style={styles.videoErrorText}>Video not available</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{episodeName}</Text>
        <Text style={styles.demoText}>Demo stream</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  video: { width: '100%', height: 300, backgroundColor: '#000' },
  info: { padding: 12, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: '700' },
  demoText: { color: '#666' },
  videoErrorContainer: { alignItems: 'center', justifyContent: 'center' },
  videoErrorText: { color: '#fff' },
});

export default PlayerScreen;
