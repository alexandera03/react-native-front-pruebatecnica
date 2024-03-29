import React, { useContext } from 'react'
import {View,Text, StyleSheet, Button} from 'react-native';
import { AuthContext } from '../context/AuthContext';
export const HomeScreen = () => {

const {user,logOut} = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      <Button 
        title="logout"
        color="#5856D6"
        onPress={logOut}
      />

      <Text>
        {
          JSON.stringify(user,null,5)
        }
      </Text>
    </View>
  )
}

const styles =StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },title:{
    fontSize:20,
    marginBottom:20
  }
})