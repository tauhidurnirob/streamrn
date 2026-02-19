import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSearchShowsQuery } from '../../data/api/tvmazeApiSlice';
import { useNavigation } from '@react-navigation/native';
import useDebounce from '../../shared/hooks/useDebounce';
import { CURATED_SHOW_IDS } from '../../app/config/curatedShows';
import { CuratedCard } from '../home/HomeScreen';

type CuratedListProps = { onPress: (id: number) => void };

const CuratedList: React.FC<CuratedListProps> = ({ onPress }) => (
  <FlatList
    horizontal
    data={CURATED_SHOW_IDS}
    keyExtractor={(id) => id.toString()}
    renderItem={({ item }) => <CuratedCard id={item} onPress={onPress} />}
  />
);

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 350);
  const { data: results, isLoading } = useSearchShowsQuery(debounced, { skip: debounced.length < 2 });
  const navigation = useNavigation<any>();
  const onClear = () => setQuery('');

  const renderResult = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.row} onPress={() => (navigation as any).navigate('ShowDetails', { showId: item.id })}>
      {item.image?.medium ? <Image source={{ uri: item.image.medium }} style={styles.thumb} /> : <View style={styles.thumb} />}
      <View style={styles.resultContent}>
        <Text numberOfLines={1} style={styles.resultTitle}>{item.name}</Text>
        <Text numberOfLines={2} style={styles.resultSummary}>{item.summary ?? ''}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Search shows"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
          returnKeyType="search"
        />
        {query.length > 0 ? (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {debounced.length < 2 ? (
        <View>
          <CuratedList onPress={(id) => (navigation as any).navigate('ShowDetails', { showId: id })} />
        </View>
      ) : (
        <>
          {isLoading && <Text style={styles.loading}>Loading...</Text>}
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderResult}
            ListEmptyComponent={NoResults}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: { flex: 1, padding: 12, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  clearButton: { paddingHorizontal: 12, marginLeft: 8 },
  clearText: { color: '#007AFF' },
  sectionTitle: { fontSize: 18, fontWeight: '600', margin: 12 },
  row: { flexDirection: 'row', padding: 12, alignItems: 'center' },
  thumb: { width: 64, height: 96, borderRadius: 4, backgroundColor: '#ddd', marginRight: 12 },
  container: { flex: 1 },
  loading: { padding: 12 },
  resultContent: { flex: 1 },
  resultTitle: { fontWeight: '600' },
  resultSummary: { color: '#666' },
  empty: { padding: 12, textAlign: 'center' },
});

export default SearchScreen;

const NoResults: React.FC = () => <Text style={styles.empty}>No results</Text>;
