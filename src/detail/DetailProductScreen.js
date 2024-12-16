import { Text, TouchableOpacity, View, Image, ScrollView, StyleSheet, } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../../commons/CostomHeader';
import AxiosInstance from '../../helper/AxiosInstance';
import { addItemToCart, } from '../../redux/Reducer';
import { useDispatch, useSelector, } from 'react-redux'

const DetailProductScreen = (props) => {
  const { navigation } = props;
  const useAppDispatch = () => useDispatch();
  const useAppSelector = useSelector;
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.app);

  const { route } = props;
  const id = route?.params?.id; // chống crash

  const [product, setProducts] = useState({});
  const fetchProducts = async () => {
    try {
      const response = await AxiosInstance().post(`/products/getproductID/${id}`);
      if (response.status) {
        setProducts(response.data);
        console.log(response)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
    return () => { };
  }, [])

  const addItem = () => {
    const item = {
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: Number(appState.count) || 1,
    }
    dispatch(addItemToCart(item));

  }

  const backhome = () => {
    navigation.goBack();
  }
  const goCart = () => {
    navigation.navigate('CartScreen');
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomHeader
          leftIcon={require('../../image/left-chevron.png')}
          onPressLeftIcon={backhome}
          title={product.name}
          rightIcon={require('../../image/cart.png')}
          onPressRightIcon={goCart}
        />

        <Image
          source={{ uri: `${product.images}` }}
          style={{ width: 350, height: 270, justifyContent: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 20, borderColor: 'red', borderWidth: 1 }}
        />

        <View style={styles.contaibutontree}>
          <View style={styles.contentbuttontree}>
            <Text style={styles.emptyText}>{product.name}</Text>
          </View>
        </View>

        <View style={styles.contenchitiet}>
          <View style={styles.contaichitiet}>
            <Text style={styles.textkc}>Chi tiết sản phẩm</Text>
          </View>

          <View
            style={{ width: '100%', height: 1, backgroundColor: 'black' }}>
          </View>

          <View style={styles.contaichitiet}>
            <Text style={styles.textkc}>Kích cỡ</Text>
            <Text style={styles.textsp}></Text>
          </View>

          <View
            style={{ width: '100%', height: 0.7, backgroundColor: 'black', }}>
          </View>

          <View style={styles.contaichitiet}>
            <Text style={styles.textkc}>Xuất xứ</Text>
            <Text style={styles.textsp}>Công ty Thức ăn nhanh FAST FOOD NO.1</Text>
          </View>

          <View
            style={{
              width: '100%',
              height: 0.7,
              backgroundColor: 'black',
            }}></View>

          <View style={styles.contaichitiet}>
            <Text style={styles.textkc}>Tình trạng</Text>
            <Text style={styles.textsp}></Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 0.7,
              backgroundColor: 'black',
            }}>

          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.texttamtinh}>Giá :</Text>

          <Text style={styles.tientamtinh}>
            {product.price && !isNaN(product.price) ? product.price.toLocaleString('vi-VN') : '0'} VND
          </Text>
        </View>


        <View style={styles.contaifooter}>
          <View style={styles.contaitamtinh}>

          </View>
          <View style={styles.contaibuttonchonmua}>
            <TouchableOpacity
              style={styles.buttonchonmua}
              onPress={addItem}>
              <Text style={styles.textchonmua}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailProductScreen;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    width: '100%',
    height: 270,
    justifyContent: 'space-between',
  },
  paginationBoxStyle: {
    bottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  headerimage: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  buttonContainer: {
    paddingHorizontal: 10,
    marginTop: '30%',
    margin: 10,
    zIndex: 1,
  },
  contaisliderbox: {
    width: 337,
    height: 270,
    flexDirection: 'row',
    position: 'absolute',
    marginEnd: 4,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  contaibutontree: {
    flexDirection: 'row',
  },
  contentbuttontree: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // backgroundColor: '#F54749',
    width: 180,
    height: 40,
    borderRadius: 20,
    marginTop: 5,
    marginLeft: 40,
  },
  bottontree: {
    width: 'auto',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#009245',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  textbuttontree: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    lineHeight: 22,
  },
  contentext: {
    flexDirection: 'row',
    backgroundColor: '#F54749',
    width: 150,
    height: 40,
    borderRadius: 20,
    marginTop: 5,
    marginLeft: 30,
  },
  contenchitiet: {
    width: '100%',
    height: 173,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 40,
    paddingHorizontal: 40,
    paddingVertical: 48,
    alignSelf: 'stretch',
  },
  textchitiet: {
    width: 'auto',
    height: 'auto',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    color: '#3a3a3a',
    lineHeight: 22,
  },
  contaichitiet: {
    width: 279,
    height: 'auto',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignSelf: 'stretch',
  },
  textkc: {
    width: 'auto',
    height: 'auto',
    lineHeight: 20,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    color: '#3a3a3a',
  },
  textsp: {
    width: 'auto',
    height: 'auto',
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    color: '#F54749',
  },
  contaifooter: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 24,
    paddingBottom: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30
  },
  contaitamtinh: {
    width: '100%',
    height: 82,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 2,
    paddingVertical: 15,
    alignSelf: 'stretch',
  },
  texttamtinh: {
    width: 92,
    height: '60',
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginLeft: 44,
  },
  tientamtinh: {
    fontSize: 20,
    marginLeft: -40,
    color: '#F54749',
    fontWeight: 'bold',
  },
  textspdachon: {
    width: 'auto',
    height: 'auto',
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    color: '#000',
  },
  contaisquare: {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  iconsquare: {
    width: 20,
    height: 20,
    flexShrink: 0,
  },
  icminus: {
    width: 20,
    height: 20,
    flexShrink: 0,
  },
  contaitextsquare: {
    display: 'flex',
    width: 30,
    height: 40,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textsquare: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    marginTop: -20
  },
  contaibuttonchonmua: {
    width: '100%',
    display: 'flex',
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F54749',
    borderRadius: 10,
    alignSelf: 'stretch',
  },
  buttonchonmua: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#F54749',
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F54749'
  },
  textchonmua: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    color: 'white',
    lineHeight: 22,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 20
  },

})
