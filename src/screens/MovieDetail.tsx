import React from 'react'
import { View, Text } from 'react-native'

const MovieDetail = ({ navigation, route }) => {
  const { movie } = route.params

  return (
    <View>
      <Text>Movie Detail</Text>
      <Text>Title: {movie.title}</Text>
      <Text>Release Date: {movie.releaseDate}</Text>
      <Text>Overview: {movie.overview}</Text>
    </View>
  )
}

export default MovieDetail
