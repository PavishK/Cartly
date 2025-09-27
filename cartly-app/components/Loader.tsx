import { View, ActivityIndicator } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View className="flex-1 items-center justify-center bg-bg">
      <ActivityIndicator size={50} color="green" />
    </View>
  )
}

export default Loader