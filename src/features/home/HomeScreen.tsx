import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CURATED_SHOW_IDS } from '../../app/config/curatedShows';
import { useGetShowQuery } from '../../data/api/tvmazeApiSlice';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';

type CuratedCardProps = { id: number; onPress: (id: number) => void };

export const CuratedCard: React.FC<CuratedCardProps> = ({ id, onPress }) => {
  const { data: show } = useGetShowQuery(id);
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(id)}>
      {show?.image?.medium ? (
        <Image source={{ uri: show.image.medium }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, styles.placeholder]} />
      )}
      <Text numberOfLines={1} style={styles.title}>{show?.name ?? 'Loading'}</Text>
    </TouchableOpacity>
  );
};

type HomeHeaderProps = { onPressShow: (id: number) => void };

const HomeHeader: React.FC<HomeHeaderProps> = ({ onPressShow }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.sectionTitle}>Popular Picks</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={CURATED_SHOW_IDS}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <CuratedCard id={item} onPress={onPressShow} />}
      />
    </View>
  );
};

const RecentRow: React.FC<{ id: number; onPress: (id: number) => void }> = ({ id, onPress }) => (
  <TouchableOpacity onPress={() => onPress(id)} style={styles.row}>
    <Text>Show ID: {id}</Text>
  </TouchableOpacity>
);

const RecentEmpty: React.FC = () => <Text style={styles.empty}>No recently viewed shows</Text>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const recentIds = useSelector((s: RootState) => s.recent.recentShowIds);

  const onPressShow = (showId: number) => (navigation as any).navigate('ShowDetails', { showId });

  return (
    <FlatList
      ListHeaderComponent={<HomeHeader onPressShow={onPressShow} />}
      data={recentIds}
      keyExtractor={(id) => id.toString()}
      renderItem={({ item }) => <RecentRow id={item} onPress={onPressShow} />}
      ListEmptyComponent={RecentEmpty}
    />
  );
};

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 18, fontWeight: '600', margin: 12 },
  card: { width: 120, margin: 8 },
  poster: { width: 120, height: 180, borderRadius: 6, backgroundColor: '#eee' },
  placeholder: { alignItems: 'center', justifyContent: 'center' },
  title: { marginTop: 6, fontSize: 12 },
  row: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  empty: { padding: 16, textAlign: 'center' },
  headerContainer: { paddingTop: 8 },
});

export default HomeScreen;
