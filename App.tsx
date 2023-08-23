import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { MainNavigator } from './src/navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext';

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}



const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <MainNavigator />
      </AppState>
    </NavigationContainer>
  )
}

export default App;