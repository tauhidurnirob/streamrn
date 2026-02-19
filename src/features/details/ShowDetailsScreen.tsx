import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useGetShowQuery, useGetShowEpisodesQuery, useGetShowCastQuery } from '../../data/api/tvmazeApiSlice';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { toggleWatchlistLocal } from '../watchlist/watchlistSlice';
import WatchlistRepositoryImpl from '../../data/repositories/WatchlistRepositoryImpl';

const ShowDetailsScreen: React.FC = () => {
  const route: any = useRoute();
  const showId = route.params?.showId as number;
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const { data: show } = useGetShowQuery(showId);
  const { data: episodes } = useGetShowEpisodesQuery(showId);
  const { data: cast } = useGetShowCastQuery(showId);

  const onToggleWatchlist = async () => {
    if (!show) return;
    const repo = new WatchlistRepositoryImpl();
    await repo.toggleWatchlist(show);
    dispatch(toggleWatchlistLocal(show));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {show?.image?.original ? <Image source={{ uri: show.image.original }} style={styles.backdrop} /> : null}
      <Text style={styles.title}>{show?.name}</Text>
      <Text style={styles.summary}>{show?.summary ?? ''}</Text>
      <TouchableOpacity onPress={onToggleWatchlist} style={styles.button}>
        <Text style={styles.buttonText}>Toggle Watchlist</Text>
      </TouchableOpacity>

      <View style={styles.sectionContainer}>
        <Text style={styles.section}>Episodes</Text>
        {episodes?.slice(0, 10).map((ep) => (
          <TouchableOpacity
            key={ep.id}
            onPress={() => {
              if (!ep?.id) {
                console.warn('Episode has no id, cannot open player', ep);
                return;
              }
              try {
                (navigation as any).navigate('Player', { episodeId: ep.id, episodeName: ep.name });
              } catch (e) {
                console.error('Navigation to Player failed', e);
              }
            }}
            style={styles.episodeRow}
          >
            <Text>{`S${ep.season}E${ep.number} — ${ep.name}`}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.section}>Cast</Text>
        {cast?.slice(0, 10).map((c) => (
          <View key={c.id} style={styles.castRow}>
            {c.image?.medium ? <Image source={{ uri: c.image.medium }} style={styles.castImg} /> : <View style={styles.castImg} />}
            <View style={styles.castInfo}>
              <Text style={styles.castName}>{c.name}</Text>
              <Text style={styles.characterText}>{c.character}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backdrop: { width: '100%', height: 220, borderRadius: 8, backgroundColor: '#ccc' },
  title: { fontSize: 22, fontWeight: '700', marginTop: 12 },
  summary: { marginTop: 8, color: '#444' },
  button: { marginTop: 12, backgroundColor: '#007AFF', padding: 10, borderRadius: 6, alignItems: 'center' },
  section: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  episodeRow: { paddingVertical: 8, borderBottomColor: '#eee', borderBottomWidth: 1 },
  castRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  castImg: { width: 48, height: 72, borderRadius: 4, backgroundColor: '#ddd' },
  container: { flex: 1 },
  contentContainer: { padding: 12 },
  buttonText: { color: 'white' },
  sectionContainer: { marginTop: 18 },
  castInfo: { marginLeft: 8 },
  castName: { fontWeight: '600' },
  characterText: { color: '#666' },
});

export default ShowDetailsScreen;
