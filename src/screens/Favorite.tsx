import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Movie } from '../types/app'
import MovieItem from '../components/movies/MovieItem'
import { useFocusEffect } from '@react-navigation/native'

const Favorite = (): JSX.Element => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])

  // Memuat favorit
  useEffect(() => {
    fetchFavoriteMovies()
  }, [])

  // Gunakan useFocusEffect untuk memuat ulang data saat halaman difokuskan
  useFocusEffect(
    React.useCallback(() => {
      fetchFavoriteMovies()
    }, []),
  )

  const fetchFavoriteMovies = async (): Promise<void> => {
    try {
      const storedData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      if (storedData !== null) {
        const favoriteList: Movie[] = JSON.parse(storedData)
        setFavoriteMovies(favoriteList)
      }
    } catch (error) {
      console.log('Error fetching favorite movies:', error)
    }
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Movie Favorite</Text>
      </View>
      <View style={styles.container}>
        {favoriteMovies.length > 0 ? (
          <ScrollView>
            <View style={styles.rowItem}>
              {favoriteMovies.map((movie) => (
                <MovieItem
                  movie={movie}
                  size={styles.movieItem}
                  coverType="poster"
                />
              ))}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <Text>No favorite movies yet!</Text>
          </View>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '',
    padding: 18,
  },
  headerTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  movieItem: {
    width: 100,
    height: 200,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowItem: {
    flex: 3,
    margin: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'row',
  },
})

export default Favorite
