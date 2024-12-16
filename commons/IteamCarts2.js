import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { increaseItemQuantity,decreaseItemQuantity,removeItemFromCart } from '../redux/Reducer';

const ItemCarts2 = ({ data }) => {

    const useAppDispatch = () => useDispatch();
    const dispatch = useAppDispatch();
    const useAppSelector = useSelector;
    const appState = useAppSelector((state) => state.app);

    return (
        <View style={styles.cartItem}>
            <View style={styles.body}>
                <Image 
                source={data.images ? { uri: `${data.images}` } : require('../image/erro.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.cartInfo}>
                    <Text style={styles.productName}>{data.name}</Text>
                    <Text style={styles.productPrice}>{(data.price).toLocaleString('vi-VN')} VND</Text>

                    <View>
                        <TouchableOpacity onPress={()=>{dispatch(removeItemFromCart(data._id))}}>
                        <Image
                            source={require('../image/trash.png')}
                            style={{width:30,height:30,marginTop:5}}
                        />
                        </TouchableOpacity>
                    </View>

                </View>

                

                <View style={styles.quantity}>
                    <TouchableOpacity style={styles.buttonStyle}
                        onPress={()=>{dispatch(decreaseItemQuantity(data._id))}}
                    >
                        <Text style={styles.textquantity}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.textquantity2}>{data.quantity}</Text>
                    <TouchableOpacity style={styles.buttonStyle}
                        onPress={()=>{dispatch(increaseItemQuantity(data._id))}}
                    >
                        <Text style={styles.textquantity}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem: {
        width: '100%',
        height: 112,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        marginTop: 12,
    },
    body: {
        width: '100%',
        height: 112,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 90
    },
    cartInfo: {
        width: 150,
        height: "90%"
    },
    productName: {
        fontSize: 18,
        color: '#3D3D3D',
        width: 150,
        height: 45,
        fontWeight:'bold'
    },
    productPrice: {
        fontSize: 16,
        color: '#FE554A',
        marginTop: -6
    },
    quantity: {
        flexDirection: 'row',
        width: 80,
        justifyContent: 'space-between'
    },
    buttonStyle: {
        width: 26,
        height: 26,
        backgroundColor: '#F54749',
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textquantity: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    textquantity2: {
        color: 'red',
        fontSize: 20,
        fontWeight: '500'
    }
});

export default ItemCarts2;
