import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <>
      <Tabs screenOptions={{
        tabBarStyle:{
          display:"none"
        }
      }}>

          <Tabs.Screen
          name='login'
          options={{
              title:"Login",
              headerShown:false,
              animation:"none"
          }}/>

          <Tabs.Screen
          name='register'
          options={{
              title:"Register",
              headerShown:false,
              animation:"none"
          }}/>

      </Tabs>
    </>
  )
}

export default _layout