import { Image, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

const Textinput = (props) => {
  const { styles, value,  iconRight, placeholder,onchangetext,secureTextentry } = props;

  return (
    <View style={styles.container}>
        <TextInput
          
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onchangetext}
          secureTextentry={secureTextentry}
      />
      {
        iconRight && <Image
          source={iconRight}
          style={{ width: 20, height: 20 }}
        />
      }
    </View>
  )
}

export default Textinput

const styles = StyleSheet.create({})