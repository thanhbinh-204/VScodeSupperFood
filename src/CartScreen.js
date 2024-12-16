import { StyleSheet, Text, View, Pressable, FlatList, Modal, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AxiosInstance from '../helper/AxiosInstance';
import { clearcart } from '../redux/Reducer';
import Header2 from '../commons/Header2';
import ItemCarts2 from '../commons/IteamCarts2';
import { useState } from 'react';

const CartScreen = (props) => {
  const { navigation } = props;

  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  const useAppSelector = useSelector;
  const appState = useAppSelector((state) => state.app);
  const [modalVisible, setModalVisible] = useState(false);

  const thanhtoan = async () => {
    if (appState.cart.length === 0) {
      // Giỏ hàng đang trống, không thực hiện thanh toán
      alert('Giỏ hàng đang trống');
      return;
    }
    if (appState.cart.length === 0) {
      // Giỏ hàng đang trống, không thực hiện thanh toán
      alert('Giỏ hàng đang trống');
      return;
    }
    try {
      const body = {
        user: {
          _id: appState.user._id,
          name: appState.user.username
        },
        products: appState.cart
          .filter(item => item && item._id && item.price && item.quantity) // Lọc sản phẩm thiếu thông tin
          .map((item) => ({
            _id: item._id,
            quantity: item.quantity
          }))
      };

      const result = await AxiosInstance().post('/carts', body);
      if (result.status == true) {
        // thông báo thành công
        // quay về màn hình chính
        navigation.navigate('SuccessScreen');
        // xóa giỏ hàng
        dispatch(clearcart());
      } else {
        alert('Đã hủy thanh toán');
      }
      console.log(body);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header2
          imgIconleft={require('../image/left-chevron.png')}
          backto={() => navigation.goBack()}
        />
        <View style={styles.body}>
          <Text style={styles.Text1}>Giỏ hàng của bạn</Text>
          <FlatList
            data={appState.cart.filter(item => item && item._id)}
            style={styles.FlatList}
            renderItem={({ item }) => <ItemCarts2 data={item} />}
            keyExtractor={(item) => item._id.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      <View style={styles.containerModal}>
        <TouchableOpacity style={styles.code} onPress={() => setModalVisible(true)}>
          <Text style={{ fontSize: 20, color: 'white', fontWeight: '600' }}>Chọn phương thức thanh toán</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Chọn phương thức thanh toán</Text>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.optionText}>Thanh toán khi nhận hàng</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => navigation.navigate('DeliveryMethod')}
              >
                <Text style={styles.optionText}>Thanh toán MoMo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.PaymentView}>
        <View style={styles.Paymentchild}>
          <Text style={styles.totalStyle}>Total</Text>

          <Text style={styles.priceStyle}>{
            appState.cart.reduce((total, item) => {
              const price = item?.price || 0; // Nếu price bị undefined hoặc null, đặt thành 0
              const quantity = item?.quantity || 0; // Nếu quantity bị undefined hoặc null, đặt thành 0

              return total + price * quantity;
            }, 0).toLocaleString('vi-VN')} VND
          </Text>

        </View>

        <Pressable
          style={styles.ButtonPayment}
          onPress={() => thanhtoan()}
        >
          <Text style={styles.ButtonPaymentText}>Thanh Toán</Text>
        </Pressable>

      </View>

    </View>
  );
};

export default CartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 20
  },
  content: {
    flexGrow: 1,
  },
  body: {
    marginTop: 40
  },
  FlatList: {
    height: 530
  },
  listContainer: {
    paddingBottom: 20,
  },
  Text1: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F54749',
    marginBottom: 20
  },
  PaymentView: {
    width: '100%',
    height: 128,
  },
  Paymentchild: {
    height: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 47
  },
  totalStyle: {
    fontSize: 16,
    color: '#3D3D3D'
  },
  priceStyle: {
    fontSize: 24,
    color: '#3D3D3D',
    fontWeight: 'bold'
  },
  ButtonPayment: {
    width: '100%',
    height: 51,
    backgroundColor: '#F54749',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ButtonPaymentText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  code: {
    marginTop: -60,
    marginBottom: 20,
    width: '100%',
    height: 51,
    backgroundColor: '#F54749',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ khi mở modal
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#F54749',
    borderRadius: 10,
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: '#F54749',
    fontSize: 16,
  },
});
