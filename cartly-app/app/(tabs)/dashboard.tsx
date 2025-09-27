import ListItem from '@/components/ListItem'
import Loader from '@/components/Loader'
import { icons } from '@/constants/icons'
import { useFetch } from '@/hooks/useFetch'
import { cartDeleteItem, cartInsertHandler } from '@/services/cartApi'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { router, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, AppState, AppStateStatus, FlatList, Image, Pressable, Text, ToastAndroid, Vibration, View } from 'react-native'
import SaveBtn from '@/components/SaveBtn'
import NavBar from '@/components/NavBar'
const makeToast = (msg: string) => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
}

const Dashboard = () => {
  const { data, loading: isDataLoading, handleCartLists, handlerUpdateItem } = useFetch();
  const router = useRouter();
  const { _id: userId, email } = useLocalSearchParams<{ _id: string; email: string }>();
  const [cartData, setCartData] = useState<Cart[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const isItemUpdated = useRef(false);

  //AI 
  const onClickAi = () =>{

    if(isItemUpdated.current){
        handlerUpdateItem(cartData);
        isItemUpdated.current=false;
        Vibration.vibrate(100);
    }

    const params = {
      cartDatas:JSON.stringify(cartData.filter(v => !v.checked && v.item)),
      _id:userId,
      email,
    }
    router.push({ pathname:'/askGemini', params:params });
  }

  // Sort checked items first
  const sortByChecked = (items: Cart[]): Cart[] => {
    return [
      ...items.filter(item => !item.checked),
      ...items.filter(item => item.checked),
    ];
  };

  // Add new item
  const onClickAdd = async (): Promise<void> => {
    try {
      setLoading(true);
      const schema = await cartInsertHandler(userId);
      if (schema?.data) {
        const newCart = [...cartData, schema.data];
        setCartData(sortByChecked(newCart));
      }
    } catch (error) {
      console.log(error);
      makeToast("❗Unable to add new Item");
    } finally {
      setLoading(false);
    }
  };

  // Delete item
  const onClickDelete = async (itemId: string): Promise<void> => {
    try {
      setLoading(true);
      await cartDeleteItem(itemId);
      setCartData(sortByChecked(cartData.filter(v => v._id !== itemId)));
    } catch (_) {
      makeToast("❗Unable to delete Item");
    } finally {
      setLoading(false);
    }
  };

  // Update item
  const updateCartItem = (updatedItem: Cart): void => {
    const index = cartData.findIndex(v => v._id === updatedItem._id);
    if (index < 0) return;

    const updatedCart = [...cartData];
    updatedCart[index] = updatedItem;
    setCartData(sortByChecked(updatedCart));
    isItemUpdated.current=true;
  };

  // Click save Button
  const onClickSaveItems = async():Promise<void> => {
    await handlerUpdateItem(cartData);
    isItemUpdated.current=false;
  }

  // Initial fetch
  useEffect(() => {
    handleCartLists();
  }, []);

  // Update cart when data changes
  useEffect(() => {
    if (data) {
      setCartData(sortByChecked(data));
    }
  }, [data]);

  // cart data when app goes background
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state: AppStateStatus) => {
      if (state === 'background' && isItemUpdated.current) {
        handlerUpdateItem(cartData);
        isItemUpdated.current=false;
        Vibration.vibrate(100);
      }
    });

    return () => subscription.remove();
  }, [cartData]);

  // Reusable Add Button
  const AddButton = () => (
    <View className="mt-6 mb-6 flex-row items-center justify-center rounded-lg gap-x-1 bg-accent p-3">
      {!loading ? (
        <Pressable onPress={onClickAdd} className='w-full h-fit flex items-center justify-center'>
          <FontAwesome6 name="add" size={22} color="#556B2F" />
        </Pressable>
      ) : (
        <ActivityIndicator size={23} color="#556B2F" />
      )}
    </View>
  );

  return (
    <View className="relative w-full h-full flex-1 flex-col">
      {/* Header */}
      <NavBar email={ email}/>

      { isItemUpdated.current && <SaveBtn onClickSaveItems={onClickSaveItems}/>}

      {/* Cart List */}
      {!isDataLoading ? (
        <View className="flex-1 items-center justify-center">
          {cartData.length > 0 ? (
            <FlatList
              data={cartData}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <ListItem
                  item={item}
                  onClickDelete={onClickDelete}
                  updateCartItem={updateCartItem}
                />
              )}
              contentContainerStyle={{ padding: 10 }}
              ListFooterComponent={<AddButton />}
            />
          ) : (
            <View className="items-center">
              <Text>Empty Cart — Add Items Now!</Text>
              <AddButton />
            </View>
          )}
        </View>
      ) : (
        <Loader />
      )}

      { cartData.length > 0 && 
      (<Pressable onPress={onClickAi} className='absolute right-3 bottom-3 p-2 rounded-xl bg-white border-secondary border-2'>
        <Image source={icons.gemini} className='size-10 rounded-full'/>
      </Pressable>)}

    </View>
  );
};

export default Dashboard;