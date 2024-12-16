import { Image, Pressable, StyleSheet, Text, View, Animated, Modal, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Textinput from '../commons/Textinput'
import ButtonCompo from '../commons/ButtonCompo'
import Textcom from '../commons/Textcom'
import { login, verifyOTP } from '../redux/UserAPI'
import { useDispatch, useSelector } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Signin = (props) => {

    const [email, setEmail] = useState('ttranbinh45@gmail.com');
    const [Password, setPassword] = useState('');
    const [OTP, setOTP] = useState('6152');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [scaleValue] = useState(new Animated.Value(0));

    const useAppDispatch = () => useDispatch();
    const useAppSelector = useSelector;
    const dispatch = useAppDispatch();
    const appState = useAppSelector((state) => state.app);

    const getText1 = () => {
        return {
            width: 250,
            height: 45,
            marginTop: 30,
            fontSize: 30,
            fontFamily: 'Poppins',
            fontWeight: 'bold',
            color: 'black',
            marginLeft: 30
        }
    }
    const getContainerStyle2 = () => {
        return {
            width: 360,
            height: 50,
            borderRadius: 20,
            borderWidth: 1,
            alignSelf: 'center',
            marginTop: 70,

        }
    }
    const getContainerStyle3 = () => {
        return {
            width: 360,
            height: 50,
            borderRadius: 20,
            borderWidth: 1,
            alignSelf: 'center',
            marginTop: 10,

        }
    }
    const getContainerStyle4 = () => {
        return {
            width: 360,
            height: 50,
            borderRadius: 20,
            borderWidth: 1,
            alignSelf: 'center',
            marginTop: 10,
            backgroundColor: 'white'

        }
    }
    const getInputStyeOTP = () => {
        return {

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
            borderRadius: 15,
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

    const { navigation } = props;

    const ClickHomeScreen = async () => {
        try {
            // Kiểm tra từng trường nhập liệu
            if (!email) {
                ToastAndroid.show('Vui lòng nhập email!', ToastAndroid.SHORT);
                return;
            }

            if (!Password) {
                ToastAndroid.show('Vui lòng nhập mật khẩu!', ToastAndroid.SHORT);
                return;
            }

            const body = {
                email: email,
                password: Password,
            };

            const result = await dispatch(login(body)).unwrap();
            ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
            navigation.navigate('HomeScreen');
            return result;
        } catch (error) {
            console.log(error);

            if (error.status === false && error.data === "Tài khoản chưa được xác thực") {
                showAlert();
            }
            if (error.status === false && error.data === "Không đúng mật khẩu!") {
                ToastAndroid.show('Mật khẩu không đúng !!!', ToastAndroid.SHORT);
            }
        }
    }


    //hiển thị alert để nhập otp 
    const showAlert = () => {
        setIsModalVisible(true);
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    //validate otp
    const handleVerifyOtp = async () => {
        try {
            const body = { email: email, otp: OTP };
            const result = await dispatch(verifyOTP(body)).unwrap();
            ToastAndroid.show('Xác thực thành công', ToastAndroid.SHORT);
            setIsModalVisible(false);
            navigation.navigate('HomeScreen');
        } catch (error) {
            console.log(error);
            ToastAndroid.show('Mã OTP không hợp lệ. Vui lòng thử lại.', ToastAndroid.SHORT);
        }
    };

    const SignupScreen = () => {
        navigation.navigate('Signup');
    }
    const quen = () => {
        console.log('Navigating to ForgetPassword...');
        navigation.navigate('ForgetPassword');
    }


    return (
        <KeyboardAwareScrollView enableOnAndroid={true}>
            <View>
                <Textcom
                    text={'Sign In'}
                    styles={{
                        text: getText1(),
                    }}
                />

                <Image
                    source={require('../image/logofast1.png')}
                    style={{ width: 160, height: 100, alignSelf: 'center', marginTop: 10 }}
                />

                <Textinput
                    styles={{
                        container: getContainerStyle2(),
                        input: getInputStye(),
                    }}
                    placeholder={'Email'}
                    value={email}
                    onchangetext={setEmail}
                    iconRight={null}
                />
                <Textinput

                    styles={{
                        container: getContainerStyle3(),
                        input: getInputStye(),
                    }}
                    placeholder={'Password'}
                    value={Password}
                    onchangetext={setPassword}
                    iconRight={null}
                    secureTextEntry
                />

                <Pressable onPress={() => navigation.navigate('ForgetPassword')}>
                    <Text style={styles.getText2}>Forgot Password?</Text>
                </Pressable>


                <ButtonCompo
                    styles={{
                        Buttonstyle: getStyleButton(),
                        title: getStyleTitle()
                    }}
                    title={appState.loading ? 'Loading...' : 'Sign In.'}
                    onprees={ClickHomeScreen}
                />


                <Text style={styles.textStyle}>Don't have an account? </Text>
                <Pressable onPress={SignupScreen}>
                    <Text style={{ color: '#F54749', fontSize: 16, marginLeft: 270, marginTop: -36 }}> Sign Up. </Text>
                </Pressable>



                <View style={{ width: 300, flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginTop: 60, alignSelf: 'center' }}>
                    <Image
                        source={require('../image/facebook.png')}
                    />
                    <Image
                        source={require('../image/twitter.png')}
                        style={{ marginLeft: 15, marginRight: 15 }}
                    />
                    <Image
                        source={require('../image/google.png')}
                    />
                </View>

                {/* giao dien hien thi de nhap otp */}
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.nhapotp}>
                        <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleValue }] }]}>
                            <Text style={{ marginTop: 50, marginLeft: 20, fontWeight: 'bold', fontSize: 20, color: 'black' }}>Nhập mã OTP</Text>
                            <Textinput
                                styles={{
                                    container: getContainerStyle4(),
                                    input: getInputStyeOTP(),
                                }}
                                placeholder={'Nhập mã OTP'}
                                value={OTP}
                                onchangetext={setOTP}
                            />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.yesButton} onPress={handleVerifyOtp}>
                                    <Text style={styles.buttonText}>Xác nhận</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.noButton} onPress={() => setIsModalVisible(false)}>
                                    <Text style={styles.buttonText}>Hủy</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>
                </Modal>
            </View>
        </KeyboardAwareScrollView>
    )
}


export default Signin

const styles = StyleSheet.create({
    textStyle: {
        width: 290,
        height: 36,
        textAlign: 'center',
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 20,
        marginRight: 60
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    getText2: {
        width: 250,
        height: 45,
        marginTop: 10,
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#F54749',
        marginLeft: 250
    },
    nhapotp: {
        backgroundColor: '#33CCFF',
        alignSelf: 'center',
        marginTop: 300,
        width: 380,
        height: 250,
        borderRadius: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    yesButton: {
        padding: 10,
        backgroundColor: '#F54749',
        padding: 10,
        borderRadius: 20,
        marginLeft: 70,
        width: 100,
        height: 45,

    },
    noButton: {
        padding: 10,
        backgroundColor: '#F54749',
        padding: 10,
        borderRadius: 20,
        marginLeft: 30,
        width: 100,
        height: 45,

    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        alignContent: 'center'
    }
})