import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, FlatList } from 'react-native';
import ItemDelivery from '../commons/ItemDelivery';
import { useDispatch, useSelector } from 'react-redux'
import AxiosInstance from '../helper/AxiosInstance';
import { clearcart } from '../redux/Reducer';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeliveryMethod = (props) => {
  const { navigation } = props;

  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  const useAppSelector = useSelector;
  const appState = useAppSelector((state) => state.app);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const deliveryFee = appState.feedelivery;
  const discount = 0;

  const calculateTotal = (cart) => {
    const subtotal = cart.reduce((total, item) => {
      // Kiểm tra xem price và quantity có hợp lệ không
      const itemPrice = isNaN(item.price) ? 0 : item.price;
      const itemQuantity = isNaN(item.quantity) ? 0 : item.quantity;

      return total + itemPrice * itemQuantity;
    }, 0);
    return subtotal;
  };

  const totalAmount = calculateTotal(appState.cart);


  const handleDeepLink = async (url) => {
    if (!url) return;

    try {
      // Get stored orderId
      const storedOrderId = await AsyncStorage.getItem('currentOrderId');
      if (!storedOrderId) {
        console.log('No stored orderId found');
        return;
      }

      setIsProcessingPayment(true);

      const response = await AxiosInstance().post('/payments/transaction-status', {
        orderId: storedOrderId
      });

      if (response.message === "Thành công.") {
        const updateResponse = await AxiosInstance().put(`/carts/update/${storedOrderId}`, {
          paymentStatus: "paid",
        });

        if (!updateResponse.data.status) {
          console.error("Cập nhật trạng thái thất bại:", updateResponse.data.error);
          Alert.alert('Lỗi', 'Không thể cập nhật trạng thái đơn hàng.');
          return;
        }
        // Clear the stored orderId
        await AsyncStorage.removeItem('currentOrderId');
        // Clear cart and navigate to success
        dispatch(clearcart());
        navigation.navigate('SuccessScreen', {
          message: 'Thanh toán thành công!',
        });

      } else {
        Alert.alert('Thanh toán thất bại', 'Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Error handling deep link:', error);
      Alert.alert('Lỗi', 'Không thể xác minh trạng thái thanh toán.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  useEffect(() => {
    // Handle initial URL (app opened via deep link)
    Linking.getInitialURL().then(handleDeepLink);

    // Handle deep link when app is already running
    const linkingSubscription = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });

    return () => {
      linkingSubscription.remove();
    };
  }, []);

  const checkout = async () => {
    if (appState.cart.length === 0) {
      Alert.alert('Giỏ hàng đang trống');
      return;
    }

    try {
      // Create order
      const orderBody = {
        user: {
          _id: appState.user._id,
          name: appState.user.username,
        },
        products: appState.cart.map((item) => {
          if (item && item._id && item.quantity) {
            return {
              _id: item._id,
              quantity: item.quantity,
            };
          } else {
            console.error('item trong gio hang khong hop le:', item);
            return null;
          }
        }).filter(item => item !== null), // Lọc bỏ các phần tử null
      };

      const orderResponse = await AxiosInstance().post('/carts', orderBody);
      console.log('Response Data:', orderResponse.data);  // In ra dữ liệu trả về
      // Kiểm tra nếu response có dữ liệu đơn hàng
      if (!orderResponse.data || !orderResponse.data._id) {
        Alert.alert('Không có dữ liệu đơn hàng');
        return;
      }
      console.log('Order ID:', orderResponse.data._id);  // In ra _id của đơn hàng
      // Kiểm tra _id
      if (!orderResponse.data._id) {
        Alert.alert('Không thể tạo đơn hàng');
        return;
      }
      const orderId = orderResponse.data._id;

      // Store orderId for later verification
      await AsyncStorage.setItem('currentOrderId', orderId);

      // Create MoMo payment
      const momoBody = {
        orderId: orderId,
        amount: totalAmount,
        orderInfo: 'Thanh toán đơn hàng',
        redirectUrl: 'momo://app',
      };

      const paymentResponse = await AxiosInstance().post('/payments/paymentMomo', momoBody);
      console.log('Payment Response:', paymentResponse);
      if (paymentResponse.deeplink) {
        await Linking.openURL(paymentResponse.deeplink);
      } else {
        Alert.alert('Lỗi', 'Không thể tạo giao dịch thanh toán.');
        await AsyncStorage.removeItem('currentOrderId');
      }
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert('Lỗi thanh toán', 'Vui lòng thử lại sau.');
      await AsyncStorage.removeItem('currentOrderId');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../image/left-chevron.png')}
              style={{ flex: 1, marginTop: 10 }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.header}>Thông tin người nhận</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>{appState.user.email}</Text>
          </View>
        </View>
        <View style={{ width: '100%', backgroundColor: 'black', margin: 3 }}>
          <Image source={require('../image/Line.png')} />
        </View>

        <FlatList
          data={appState.cart.filter(item => item && item._id)}
          style={styles.flatlistItem}
          renderItem={({ item }) => <ItemDelivery data={item} />}
          keyExtractor={(item) => item._id.toString()}
          scrollEnabled={false}
        />


        <View style={{ width: '100%', backgroundColor: 'black', margin: 3 }}>
          <Image source={require('../image/Line.png')} />
        </View>

        <Text style={styles.header}>Payment</Text>
        <View style={styles.paymentContainer}>
          {/* payment */}
          <View style={styles.paymentIcons}>
            <View style={{ justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PaymentScreen')}
              >
                <Image source={require('../image/plus.png')} style={{ width: 50, height: 50, marginRight: 15, }} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setPaymentMethod("card")} style={paymentMethod === "card" ? styles.selected : styles.icon}>
              <Text>💳</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentMethod("paypal")} style={paymentMethod === "paypal" ? styles.selected : styles.icon}>
              <Text>💲</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentMethod("stripe")} style={paymentMethod === "stripe" ? styles.selected : styles.icon}>
              <Text>💳</Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={{ width: '100%', backgroundColor: 'black', margin: 1 }}>
          <Image source={require('../image/Line.png')} />
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryR}>
            <Text style={styles.summaryText}>Chi tiết thanh toán</Text>

          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Tổng tiền hàng</Text>
            <Text style={styles.summaryText}>{
              appState.cart.reduce((total, item) => {
                return total + item.price * item.quantity;
              }, 0).toLocaleString('vi-VN')} VNĐ</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Chi phí vận chuyển</Text>
            <Text style={styles.summaryText}>
              0 VNĐ
            </Text>

          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Tổng cộng Voucher giảm giá</Text>
            <Text style={styles.summaryText}>Không áp dụng</Text>
          </View>

          <View style={{ width: '100%', backgroundColor: 'black', margin: 3 }}>
            <Image source={require('../image/Line.png')} />
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Tổng thanh toán</Text>
            <Text style={styles.totalTexts}>{totalAmount.toLocaleString('vi-VN')} VNĐ</Text>
          </View>
        </View>

      </ScrollView>


      <TouchableOpacity style={styles.proceedButton} onPress={() => checkout()}>
        <Text style={styles.proceedButtonText}>Tiến hành thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: '#EEEEEE'
  },
  content: {
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 1,
    marginTop: 30,
    color: 'black'
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  infoText: {
    width: 'auto',
    fontSize: 16,
    color: 'black'
  },
  changeText: {
    color: '#F9881F',
    fontSize: 16,

  },
  paymentContainer: {
    marginBottom: 60,
  },
  paymentIcons: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  icon: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 8,
    margin: 15,
  },
  selected: {
    margin: 15,
    padding: 15,
    backgroundColor: '#ffff',
    borderRadius: 8,
    borderColor: '#F9881F',
    borderWidth: 1,
  },
  paymentOption: {
    marginTop: 10,
    alignItems: 'center',
  },
  payOnArrivalText: {
    fontSize: 16,
    color: '#F54749',
  },
  summaryContainer: {
    marginVertical: 20,
    marginBottom: 60
  },
  summaryR: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black'
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black'
  },
  totalTexts: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black'
  },
  proceedButton: {
    width: '100%',
    height: 51,
    backgroundColor: '#F54749',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    position: 'absolute',
    bottom: 20,
    left: 24,
    right: 24,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  arrivalInfo: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
  flatlistItem: {
    height: 'auto',
    width: '100%',
    marginVertical: 5
  }
});

export default DeliveryMethod;
