import React, { useState } from 'react'
import Textinput from '../commons/Textinput'
import ButtonCompo from '../commons/ButtonCompo'
import Textcom from '../commons/Textcom'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, View,Image,Text } from "react-native";

const Quenmk2 = () => {
  
   const getText1 = () => {
      return {
          marginTop: 10,
          fontSize: 30,
          fontFamily: 'Poppins',
          fontWeight: 'bold',
          color: '#F54749',
          textAlign:'center'
      }
  }
  
const getStyleButton = () => {
   return {
       width: 360,
       height: 50,
       borderRadius: 20,
       backgroundColor: '#F54749',
       alignItems: 'center',
       justifyContent: 'center',
       alignSelf: 'center',
       marginTop: 20,

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
 return(
   <KeyboardAwareScrollView>

    <View>
    <Image
                source={require('../image/lock.png')}
                style={{width: 230,height:230,justifyContent:'space-between',alignItems:'center',alignSelf:'center',marginTop:100}}
            />

    <Textcom
                text={'Your password has '}
                styles={{
                    text: getText1(),
                }}
            />
            <Textcom
                text={'been reset! '}
                styles={{
                    text: getText1(),
                }}
            />
            <ButtonCompo
                styles={{
                    Buttonstyle: getStyleButton(),
                    title: getStyleTitle()
                }}
                title={'DONE'}
            />
    </View>

    </KeyboardAwareScrollView>
 )
}
export default Quenmk2
const styles = StyleSheet.create({

})