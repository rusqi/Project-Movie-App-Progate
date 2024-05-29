import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { API_ACCESS_TOKEN } from '@env';
import { FontAwesome } from '@expo/vector-icons';
import type { Movie } from '../types/app';
import MovieItem from '../components/movies/MovieItem';

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMovieDetail();
  }, []);

  const fetchMovieDetail = (): void => {
    setLoading(true);
    setError(null);
    const url = `https://api.themoviedb.org/3/movie/${id}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((data) => {
        setMovie(data);
        fetchRecommendations();
      })
      .catch((error) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  };

  const fetchRecommendations = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((data) => {
        setRecommendations(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch recommendations');
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.posterContainer}>
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
          style={styles.poster}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{movie?.title}</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color="yellow" />
              <Text style={styles.rating}>{movie?.vote_average.toFixed(1)}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.overview}>{movie?.overview}</Text>
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <Text style={styles.gridTitle}>Original Language</Text>
            <Text style={styles.gridValue}>{movie?.original_language}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridTitle}>Popularity</Text>
            <Text style={styles.gridValue}>{movie?.popularity.toFixed(2)}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridTitle}>Release Date</Text>
            <Text style={styles.gridValue}>
              {movie?.release_date ? new Date(movie.release_date).toDateString() : 'N/A'}
            </Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridTitle}>Vote Count</Text>
            <Text style={styles.gridValue}>{movie?.vote_count}</Text>
          </View>
        </View>
      </View>
      <View style={styles.recommendationsContainer}>
        <View style={styles.recommendationHeader}>
          <View style={styles.purpleLabel}></View>
          <Text style={styles.recommendationsTitle}>Recommendations</Text>
        </View>
        <FlatList
          horizontal
          data={recommendations}
          renderItem={({ item }) => (
            <MovieItem
              movie={item}
              size={{ width: 100, height: 160 }}
              coverType="poster"
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterContainer: {
    alignItems: 'center',
    width: '100%',
  },
  poster: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
  },
  titleContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    color: 'yellow',
    fontWeight: '700',
    marginLeft: 4,
  },
  detailContainer: {
    padding: 16,
    width: '100%',
  },
  overview: {
    fontSize: 16,
    marginVertical: 8,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 16,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  gridValue: {
    fontSize: 14,
  },
  recommendationsContainer: {
    width: '100%',
    paddingLeft: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  purpleLabel: {
    width: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8978A4',
    marginRight: 12,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MovieDetail;
