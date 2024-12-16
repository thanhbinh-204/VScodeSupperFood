import React, { useState } from 'react'
import Textinput from '../commons/Textinput'
import ButtonCompo from '../commons/ButtonCompo'
import Textcom from '../commons/Textcom'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, View,Image,Text } from "react-native";

const Quenmk1 = (props) => {
   const [email, setEmail] = useState('');

   const getText1 = () => {
      return {
          width: 250,
          height: 45,
          marginTop: 10,
          fontSize: 20,
          fontFamily: 'Poppins',
          fontWeight: '400',
          color: 'black',
          marginLeft:120
      }
  }
  const getText2 = () =>{
   return{
      padding:10,
      marginLeft:10,
      fontSize:16
   }
  }
  const getContainerStyle2 = () => {
   return {
       width: 360,
       height: 50,
       borderRadius: 20,
       borderWidth: 1,
       alignSelf: 'center',
       marginTop: 10,
       
   }
}
const getInputStye = () => {
   return {
       marginLeft: 14,
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
                source={require('../image/back.png')}
                style={{width: 30,height:30,top:37,marginLeft:10}}
            />

    <Textcom
                text={'Forgot Password'}
                styles={{
                    text: getText1(),
                }}
            />
            <Textcom
               text={'Please enter your email address. You will receive a link to create a new password via email.'}
                styles={{
                  text:getText2(),
                }}
            />
             <Textinput
                styles={{
                    container: getContainerStyle2(),
                    input: getInputStye(),
                }}
                placeholder={'Email'}
                value={email}
                onChangeText={setEmail}
                iconRight={null}
            />

            <ButtonCompo
                styles={{
                    Buttonstyle: getStyleButton(),
                    title: getStyleTitle()
                }}
                title={'SEND'}
            />
    </View>

    </KeyboardAwareScrollView>
 )
}
export default Quenmk1
const styles = StyleSheet.create({

})