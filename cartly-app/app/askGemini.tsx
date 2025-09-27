import { View, Text, Image, Pressable, ScrollView, ToastAndroid } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { icons } from '@/constants/icons';
import Markdown from 'react-native-markdown-display';
import Loader from '@/components/Loader';
import { askGemini } from '@/services/cartApi';

interface AskDataSchema {
  item: string;
}

interface Cart {
  item: string;
}

const AskGemini = () => {
  const { cartDatas, _id, email } = useLocalSearchParams<{ cartDatas: string; _id: string; email: string }>();
  const router = useRouter();

  const [askData, setAskData] = useState<AskDataSchema[]>([]);
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const askAi = useCallback(async (datas: AskDataSchema[]) => {
    if (!datas.length) return;
    try {
      setLoading(true);
      setError(false);
      const res = await askGemini(datas);
      setResponse(res.response);
    } catch (err) {
      setError(true);
      ToastAndroid.show('Error while generating', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (cartDatas) {
      try {
        const items: Cart[] = JSON.parse(cartDatas);
        const formattedItems = items.map(v => ({ item: v.item }));
        setAskData(formattedItems);
        askAi(formattedItems);
      } catch (err) {
        setError(true);
      }
    }
  }, [cartDatas, askAi]);

  const markdownStyle = {
    body: { fontSize: 18, color: '#556B2F' },
    table: { fontSize: 18, color: '#556B2F' },
    code_inline: { fontFamily: 'monospace', fontSize: 18, color: '#8FA31E' },
    strong: { fontSize: 20, color: '#556B2F' },
    em: { fontFamily: 'monospace', fontSize: 20, color: '#556B2F' },
  };

  return (
    <View className="relative w-full h-full flex-1 flex-col">
      {/* Header */}
      <View className="w-full px-3 h-20 flex-row gap-x-2 items-center justify-between bg-bg">
        <Pressable
          onPress={() => router.replace({ pathname: '/(tabs)/dashboard', params: { _id, email } })}
          className="flex items-center justify-center gap-x-2"
        >
          <AntDesign name="arrow-left" size={24} color="black" />
        </Pressable>

        <View className="flex-row items-center justify-center gap-x-2">
          <Image source={icons.gemini} className="w-14 h-14 rounded-full" />
          <Text className="text-3xl font-medium text-secondary">Gemini</Text>
        </View>
      </View>

      {loading ? (
        <Loader />
      ) : (
        <View className="relative flex-1 justify-center items-center">
          {error ? (
            <View className="flex-1 items-center justify-center">
              <Text className="text-xl text-red-500 font-medium">An error occurred!</Text>
            </View>
          ) : (
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ padding: 15, paddingBottom: 90 }}
              showsVerticalScrollIndicator={false}
            >
              <Markdown style={markdownStyle}>{response}</Markdown>
            </ScrollView>
          )}

          <Pressable
            onPress={() => askAi(askData)}
            className="absolute right-4 bottom-4 bg-accent p-3 rounded-xl"
          >
            <Feather name="refresh-ccw" size={26} color="#556B2F" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default AskGemini;