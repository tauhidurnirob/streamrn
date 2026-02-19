import React, { useCallback, memo } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { useNavigation } from '@react-navigation/native';

type WatchlistRowProps = { show?: any; onPress: () => void };

const WatchlistRow: React.FC<WatchlistRowProps> = memo(({ show, onPress }) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      {show?.image?.medium ? <Image source={{ uri: show.image.medium }} style={styles.thumb} /> : <View style={styles.thumb} />}
      <View style={styles.content}>
        <Text style={styles.title}>{show?.name}</Text>
        <Text numberOfLines={2} style={styles.summary}>{show?.summary ?? ''}</Text>
      </View>
    </TouchableOpacity>
  );
});

const WatchlistEmpty: React.FC = () => <Text style={styles.empty}>Your watchlist is empty</Text>;

const WatchlistScreen: React.FC = () => {
  const nav = useNavigation<any>();
  const ids = useSelector((s: RootState) => s.watchlist.ids);
  const entities = useSelector((s: RootState) => s.watchlist.entities);

  const renderItem = useCallback(
    ({ item }: { item: number }) => {
      const show = entities[item];
      return <WatchlistRow show={show} onPress={() => (nav as any).navigate('ShowDetails', { showId: item })} />;
    },
    [entities, nav]
  );

  return (
    <FlatList
      data={ids}
      keyExtractor={(id) => id.toString()}
      renderItem={renderItem}
      ListEmptyComponent={WatchlistEmpty}
    />
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  thumb: { width: 64, height: 96, borderRadius: 6, backgroundColor: '#ddd', marginRight: 12 },
  content: { flex: 1 },
  title: { fontWeight: '600' },
  summary: { color: '#666' },
  empty: { padding: 12 },
});

export default WatchlistScreen;
