import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Modal, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { logout } from '../redux/Reducer';
import { useDispatch } from 'react-redux';
import OrderStepItem from '../commons/OrderStepItem';
import ComposSeting from '../commons/ComposSeting';
import BottomButton from '../commons/BottomButton';
import { useSelector } from 'react-redux';

const User = (props) => {

  const { navigation } = props;

  const [imageLocal, setImageLocal] = useState('');
  const [imageOnline, setImageOnline] = useState('');

  const useAppDispatch = () => useDispatch();
  const useAppSelector = useSelector;
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.app);

  const checkRole = () => {
    const role = Number(appState.user.role);
    if (role === 1) {
      return 'Thành viên';
    } else if (role === 2) {
      return 'Admin';
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.template}>

          <View style={styles.templatechild}>
            <Image
              source={{ uri: 'https://i.pinimg.com/enabled_lo_mid/736x/ee/8f/bd/ee8fbd1d731637de6904438a1fcb3798.jpg' }}
              style={styles.imageAvatar}
            />
            <View>
              <Text style={styles.displayEmail}>{appState.user.email}</Text>
              {checkRole() && (
                <Text style={styles.displayMember}>{checkRole()}</Text>
              )}
            </View>


          </View>
        </View>

        <View style={styles.option1}>
          <Text style={styles.option1text} s>Đơn mua</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderHistory')}
          >
            <Text style={styles.option1text}>Xem lịch sử mua hàng {'\u2192'}</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.OrderStep}>
          <OrderStepItem icon={require('../image/wallet-solid.png')} label="Chờ xác nhận" eventPress={() => console.log('Chờ xác nhận')} />
          <OrderStepItem icon={require('../image/box-solid.png')} label="Chờ lấy hàng" eventPress={() => console.log('Chờ lấy hàng')} />
          <OrderStepItem icon={require('../image/truck-solid.png')} label="Chờ giao hàng" eventPress={() => console.log('Chờ giao hàng')} />
          <OrderStepItem icon={require('../image/star-solid.png')} label="Đánh giá" eventPress={() => console.log('Đánh giá')} />

        </View>


        <View>
          <ComposSeting
            icons={require('../image/profile.png')}
            customstyle={styles.customStyle}
            title={'Đổi mật khẩu'}
            pressEvent={() => navigation.navigate('ChangePasswordScreen')}
          />

          <ComposSeting
            icons={require('../image/settings.png')}
            customstyle={styles.customStyle}
            title={'Cài đặt'}
            pressEvent={() => console.log('Settings')}
          />
          <ComposSeting
            icons={require('../image/chat.png')}
            customstyle={styles.customStyle}
            title={'Hỗ trợ'}
            pressEvent={() => navigation.navigate('Hepl')}
          />
          <ComposSeting
            icons={require('../image/Paper.png')}
            customstyle={styles.customStyle}
            title={'Chính sách dành cho khách hàng'}
            pressEvent={() => console.log('Privacy policy')}
          />
          <ComposSeting
            icons={require('../image/forgot.png')}
            customstyle={styles.customStyle}
            title={'Quên mật khẩu'}
            pressEvent={() => navigation.navigate('ForgetPassword')}
          />
        </View>
      </View>

      <BottomButton
        title={'Đăng xuất'}
        press={() => dispatch(logout())}
      />


    </View>
  )
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,

  },
  content: {
    flexGrow: 1,
  },
  template: {
    width: 416,
    height: 137,
    backgroundColor: '#F54749',
    marginLeft: -24,
    paddingTop: 30
  },
  templatechild: {
    width: '100%',
    flexDirection: 'row',
  },
  imageAvatar: {
    width: 74,
    height: 74,
    borderRadius: 77.5,
    marginLeft: 20,
    marginRight: 31
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  displayEmail: {
    width: 190,
    fontSize: 16,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginTop: 5
  },
  displayMember: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 5
  },
  option1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  option1text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3D3D3D'
  },
  OrderStep: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  }
});
