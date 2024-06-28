import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Movie } from '../../types/app'
import { API_ACCESS_TOKEN } from '@env'
import MovieItem from '../movies/MovieItem'

const KeywordSearch = () => {
  const [keyword, setKeyword] = useState('')
  const [movieLists, setMovieLists] = useState<Movie[]>([])

  const handleSubmit = () => {
    console.log('Submitted keyword:', keyword)
    getMovieList()
  }

  useEffect(() => {
    getMovieList()
  }, [])

  const getMovieList = (): void => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        const movies = response.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          overview: movie.overview,
          releaseDate: movie.release_date,
        }))
        // console.log(movies)

        setMovieLists(movies)
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Input title movie here"
            value={keyword}
            onChangeText={setKeyword}
            onSubmitEditing={handleSubmit}
          />
          <Feather name="search" size={24} color="gray" style={styles.icon} />
        </View>

        <View style={styles.rowItem}>
          {movieLists.map((movie) => (
            <MovieItem
              movie={movie}
              size={styles.movieItem}
              coverType="poster"
            />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
  },
  movieItem: {
    width: 110,
    height: 200,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  rowItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
})

export default KeywordSearch
