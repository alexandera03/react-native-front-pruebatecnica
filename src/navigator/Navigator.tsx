import React, { useContext } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { AuthContext } from "../context/AuthContext";
import { LoadingScreen } from "../screens/LoadingScreen";

const Stack = createStackNavigator();

export const MainNavigator = () => {

  const { status } = useContext(AuthContext);

  if(status==='checking') return <LoadingScreen/>


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      {
        (status !== 'authenticated') ? (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

          </>
          ) : (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />

          </>)
      }

    </Stack.Navigator>
  );
}