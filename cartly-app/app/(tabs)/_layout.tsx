import { View, Text, Vibration } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const IconProvider = ({name, focused}:any)=>{
  return (name==="home"
  ?<Entypo name="home" size={26} color={focused?"#8FA31E":"#556B2F"} />
  :<MaterialIcons name="account-box" size={26} color={focused?"#8FA31E":"#556B2F"} />);
}

const ActiveIcon = ( {focused, title}:any )=>{

  if(focused){
    //Vibration.vibrate(80);
    return(
    <View className='flex flex-col w-full h-full flex-1 min-w-[116px] min-h-16 mt-4 justify-center items-center bg-bg rounded-3xl'>
      <IconProvider focused={focused} name={title}/>
      <Text className='capitalize self-center text-primary text-base font-semibold'>{title}</Text>
    </View>
    );
  } else {
    return (
      <View className='size-full justify-center items-center mt-4 rounded-full'>
        <IconProvider name={title}/>
      </View>
    );
  }
}

const _layout = () => {
  return (
    <Tabs 
    screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: "#C6D870",
          height: 56,
          borderColor: "#C6D870"
    }}
  }>

        <Tabs.Screen 
        name='dashboard'
        options={{
            title:"Dashboard",
            headerShown:false,
            tabBarIcon:({focused})=> (
              <ActiveIcon focused={focused} title={"home"}/>
            )
        }}/>

        <Tabs.Screen 
        name='profile'
        options={{
            title:"Profile",
            headerShown:false,
            tabBarIcon:({focused})=> (
              <ActiveIcon focused={focused} title={"profile"}/>
            )
        }}/>
    </Tabs>
  )
}

export default _layout