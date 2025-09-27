import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const NavBar = ({ email }:{ email: string}) => {
  return (
    <View className="w-full px-2.5 h-20 flex-row gap-x-2 items-center justify-between bg-bg">
        <View className="flex-row items-center justify-center gap-x-2">
          <Image source={icons.icon} className="w-14 h-14 rounded-full" />
          <Text className="text-3xl font-medium text-secondary">Cartly</Text>
        </View>

        <View className="flex items-center justify-center gap-x-2">
          <Text className="text-lg font-medium text-secondary capitalize">
            👋 Hi, {email ? email.split('@')[0] : '🤨'}
          </Text>
        </View>
    </View>
  )
}

export default NavBar