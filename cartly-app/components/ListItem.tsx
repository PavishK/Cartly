import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { Pressable, TextInput, TouchableWithoutFeedback, View } from 'react-native';

interface ListSchema {
  item: Cart;
  onClickDelete:(itemId: string) => Promise<void>;
  updateCartItem: (updatedItem: Cart) => void;
}

const ListItem = ({ item, onClickDelete, updateCartItem }: ListSchema) => {
  
  const [itemData, setItemData] = useState<Cart>(item);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(true);

  const updateItem = (key: string, value: string | boolean) => {
    setItemData({...itemData, [key]:value });
  }

  useEffect(()=>{
    if(isMounted){
      setIsMounted(false);
      return;
    }
    const timer = setTimeout(()=>updateCartItem(itemData),1000);
    return () => clearTimeout(timer);
  },[itemData]);

  return (
    <TouchableWithoutFeedback onPress={() => setIsActive(true)}>
      <View className="flex-row min-w-96 items-center justify-start mt-1 gap-x-3">
        <Checkbox
          value={itemData.checked}
          onValueChange={(flag) => updateItem('checked', flag)}
          className="border-bg accent-bg"
          color={itemData.checked ? '#C6D870' : ''}
        />

        <TextInput
          value={itemData.item}
          placeholder='Add an item here.'
          onChangeText={(text) => updateItem(  'item', text)}
          multiline={true}
          onFocus={() => setIsActive(true)}
          onBlur={() => setTimeout(() => setIsActive(false), 1500)}
          className={`text-xl w-72 font-medium ${
            itemData.checked ? 'line-through text-primary' : 'text-secondary'
          }`}
        />

        {isActive && (
          <Pressable
            onPress={() => {
              onClickDelete(itemData._id);
            }}
          >
            <MaterialCommunityIcons
              name="delete-outline"
              size={28}
              color="#556B2F"
            />
          </Pressable>
        )}

      </View>
    </TouchableWithoutFeedback>
  );
};

export default ListItem;
