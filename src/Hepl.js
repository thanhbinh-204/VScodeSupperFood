import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header2 from '../commons/Header2'

const Hepl = ({navigation}) => {
  return (
      <View style={styles.container}>
            <Header2
                imgIconleft={require('../image/left-chevron.png')}
                backto={() => navigation.goBack()}
            />
            <View style={{flexDirection:'row',marginTop:30,marginLeft:20}}>
            <Text style={{fontSize:24,color:'black'}}>Cần hỗ trợ xin liên hệ số hotline :</Text>
            </View>
            <Text style={{marginTop:5,marginLeft:20,fontSize:24,color:'black'}}>0374204107</Text>
        </View>
  )
}

export default Hepl

const styles = StyleSheet.create({})