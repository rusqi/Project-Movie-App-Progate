import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { API_ACCESS_TOKEN } from '@env';

const CategorySearch = (): JSX.Element => {
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = (): void => {
    const url = `https://api.themoviedb.org/3/genre/movie/list`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setGenres(response.genres.map((genre: { id: number; name: string }) => genre.name));
      })
      .catch((error) => console.error('Error fetching genres:', error));
  };

  const handlePress = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const navigation = useNavigation();
  
  const handleSearch = () => {

    navigation.dispatch(StackActions.push('CategorySearchResult', { selectedGenres }));
    console.log('Searching for movies with genres:', selectedGenres);
  };

  return (
    <View style={styles.container}>
      {genres.map((genre) => (
        <TouchableOpacity
          key={genre}
          activeOpacity={0.9}
          style={{
            ...styles.topBar,
            backgroundColor: selectedGenres.includes(genre) ? '#8978A4' : '#dfd7ec',
            borderRadius: 10,
          }}
          onPress={() => handlePress(genre)}
        >
          <Text style={styles.topBarLabel}>{genre}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%', // Adjust width according to your preference
    height: 45,
    marginBottom: 4,
  },
  topBarLabel: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  searchButton: {
    backgroundColor: '#8c77a7',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: '100%', // Adjust width according to your preference
    marginTop: 16,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default CategorySearch;
