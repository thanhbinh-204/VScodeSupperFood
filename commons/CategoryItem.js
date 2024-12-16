import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CategoryItem = ({ dataCate,onSelect }) => {
    return (
        <View
            style={{
                padding: 10,
                borderRadius: 20,
                backgroundColor: '#D7F9FA',
                marginHorizontal: 5,
            }}
        >
            <Text style={{width:90,
                fontSize:16,
                height:50,
                textAlign:'center',
                color:'black',
                fontWeight:'600'
                }} 
                onPress={onSelect}>{dataCate.name}</Text>
        </View>
    );
}


export default CategoryItem

const styles = StyleSheet.create({})