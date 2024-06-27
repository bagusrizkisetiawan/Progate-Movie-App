import { API_ACCESS_TOKEN } from '@env'
import { FontAwesome } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import { Movie, MovieListProps } from '../types/app'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import MovieList from '../components/movies/MovieList'

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params
  const [movieDetail, setMovieDetail] = useState<Movie>()
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    getMovieDetail()
  }, [])

  const getMovieDetail = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${id}`
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
        console.log(response)
        setMovieDetail(response)
        setLoading(false)
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
        setLoading(false)
      })
  }

  const handleBack = (): void => {
    navigation.goBack()
  }

  const movieLists: MovieListProps[] = [
    {
      title: 'Recommendations',
      path: `/movie/${id}/recommendations`,
      coverType: 'poster',
    },
  ]

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Feather name="arrow-left" size={28} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Movie Detail</Text>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <ImageBackground
            resizeMode="cover"
            style={styles.backgroundImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movieDetail?.backdrop_path || movieDetail?.poster_path}`,
            }}
          >
            <LinearGradient
              colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
              locations={[0.6, 0.8]}
              style={styles.gradientStyle}
            >
              <Text style={styles.movieTitle}>{movieDetail?.title}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color="yellow" />
                <Text style={styles.rating}>
                  {movieDetail?.vote_average.toFixed(1)}
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>

          <Text style={styles.overview}>{movieDetail?.overview}</Text>
          <View style={styles.detailContainer}>
            <View style={styles.detailColumn}>
              <Text style={styles.subDesc}>Original Language</Text>
              <Text style={styles.textDesc}>
                {movieDetail?.original_language}
              </Text>
              <Text style={styles.subDesc}>Release Date</Text>
              <Text style={styles.textDesc}>
                {movieDetail?.release_date.toString()}
              </Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.subDesc}>Popularity</Text>
              <Text style={styles.textDesc}>{movieDetail?.popularity}</Text>
              <Text style={styles.subDesc}>Vote Count</Text>
              <Text style={styles.textDesc}>{movieDetail?.vote_count}</Text>
            </View>
          </View>

          <View style={styles.movieListsContainer}>
            {movieLists.map((movieList) => (
              <MovieList
                key={movieList.title}
                title={movieList.title}
                path={movieList.path}
                coverType={movieList.coverType}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    marginLeft: 12,
  },
  backgroundImage: {
    width: '100%',
    height: 250,
  },
  movieTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  gradientStyle: {
    padding: 8,
    height: '100%',
    width: '100%',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    color: 'yellow',
    fontWeight: '700',
    marginLeft: 4,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginTop: 16,
  },
  detailColumn: {
    flex: 1,
    marginRight: 16,
  },
  overview: {
    fontSize: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  textDesc: {
    fontSize: 16,
    marginBottom: 8,
  },
  subDesc: {
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieListsContainer: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
})

export default MovieDetail
