import { useFetch } from '@/hooks/useFetch'
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react'
import { Text, View, Pressable, ActivityIndicator } from 'react-native'

interface SaveSchema {
  onClickSaveItems: () => Promise<void>
}

const SaveBtn = ({ onClickSaveItems }: SaveSchema) => {
  const { updateLoading:loading } = useFetch()

  const handleSave = async () => {
    await onClickSaveItems()
  }

  return (
    <Pressable
      onPress={handleSave}
      className="flex-row items-center justify-center gap-x-1 p-3"
    >
      <View>
        { !loading
        ?<AntDesign name="cloud-upload" size={20} color="#556B2F" />
        :<ActivityIndicator size={20} color={"#556B2F"}/>
      }
      </View>
      <Text className="text-lg font-medium text-secondary">
        {loading ? 'Saving...' : 'Save'}
      </Text>
    </Pressable>
  )
}

export default SaveBtn