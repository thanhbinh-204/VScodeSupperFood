import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonCompo from '../commons/ButtonCompo';

const Qc3 = (props) => {
  const {navigation} = props;

  const getStyleButton = () => {
    return {
        width: 360,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#F54749',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 200,

    }
}

const getStyleTitle = () => {
    return {
        fontSize: 20,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: 'white',

    }
}

const nexthome = () =>{
  navigation.navigate('Signin');
}

  return (
    <View>
        <Image
        source={require('../image/logo4.png')}
        style={{justifyContent:'center',alignSelf:'center',marginTop:130,}}
        />
      <Text style={{alignSelf:'center',justifyContent:'center',color:'#F54749',fontWeight:'600',fontSize:20,marginTop:30,}}>Get your food  </Text>

        <View style={{marginTop:30}}>
        <Text style={{justifyContent:'center',alignSelf:'center',fontSize:15,marginTop:10}}>
        In publishing and graphic design, Lorem ipsum is a   </Text>
        <Text style={{justifyContent:'center',alignSelf:'center',fontSize:16,}}>
            placeholder text commonly used to demonstrate the</Text>
            <Text style={{justifyContent:'center',alignSelf:'center',fontSize:16}}> visual form of a document or </Text>
        </View>
        <ButtonCompo
                styles={{
                    Buttonstyle: getStyleButton(),
                    title: getStyleTitle()
                }}
                title={'NEXT'}
                onprees={nexthome}
            />

    </View>
  )
}

export default Qc3

const styles = StyleSheet.create({})