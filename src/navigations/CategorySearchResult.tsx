import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { API_ACCESS_TOKEN } from '@env';
import MovieItem from '../components/movies/MovieItem';
import { Movie } from '../types/app';

const CategorySearchResult = ({ route }: { route: any }): JSX.Element => {
  const { selectedGenres } = route.params;
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchMovies();
  }, [selectedGenres]);

  const fetchMovies = async () => {
    setLoading(true);
    const genreIdsString = selectedGenres.join(',');
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_ACCESS_TOKEN}&with_genres=${genreIdsString}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }
      const data = await response.json();
      setSearchResults(data.results);
      setError('');
    } catch (error) {
      if (error instanceof Error) {
        setError('Error fetching search results: ' + error.message);
        console.error('Error fetching search results:', error.message);
      } else {
        setError('An unknown error occurred');
        console.error('An unknown error occurred:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderMovieItem = ({ item }: { item: Movie }): JSX.Element => {
    return (
      <MovieItem 
        movie={item}
        size={{
          width: Dimensions.get('window').width / 2 - 24,
          height: (Dimensions.get('window').width / 2 - 24) * 1.5,
        }}
        coverType="poster" />
    );
  };

  const renderSeparator = (): JSX.Element => {
    return <View style={styles.separator} />;
  };

  const renderFooter = (): JSX.Element | null => {
    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const renderEmptyState = (): JSX.Element | null => {
    if (!loading && searchResults.length === 0 && error) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>{error}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={searchResults}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.movieList}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyState}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  movieList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  separator: {
    height: 16,
  },
  loading: {
    marginVertical: 20,
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#ff0000',
    fontSize: 16,
  },
});

export default CategorySearchResult;
