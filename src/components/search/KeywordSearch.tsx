import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Movie } from '../../types/app'
import { API_ACCESS_TOKEN } from '@env'
import MovieItem from '../movies/MovieItem'

const KeywordSearch = () => {
  const [keyword, setKeyword] = useState('')
  const [movieLists, setMovieLists] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (keyword.trim()) {
      getMovieList()
    } else {
      setMovieLists([])
    }
  }, [keyword])

  const getMovieList = async (): Promise<void> => {
    setIsLoading(true)
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      setMovieLists(data.results)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
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
          />
          <Feather name="search" size={24} color="gray" style={styles.icon} />
        </View>

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#8978A4"
            style={styles.loading}
          />
        ) : (
          <View style={styles.rowItem}>
            {movieLists.map((movie) => (
              <View style={styles.colItem}>
                <MovieItem
                  key={movie.id}
                  movie={movie}
                  size={styles.movieItem}
                  coverType="poster"
                />
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 110,
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
    width: 104,
    height: 180,
  },
  rowItem: {
    width: '100%',
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  colItem: {
    width: '33.33%',
    marginBottom: 12,
    alignItems: 'center',
  },
  loading: {
    marginTop: 20,
  },
})

export default KeywordSearch
