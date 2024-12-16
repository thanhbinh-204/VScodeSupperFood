import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Splash = () => {
  return (
    <View style={{backgroundColor:'#F54749',width:'100%',height:'100%'}}>
    <Image
        source={require('../image/logo.png')}
        style={{justifyContent:'center',alignSelf:'center',marginTop:200,width:200,height:200}}
    />
      <Text style={{justifyContent:'center',alignSelf:'center',color:'white',fontSize:30,marginTop:10}}>Supper Food</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})



