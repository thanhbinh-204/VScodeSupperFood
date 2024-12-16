import { Image, Pressable, StyleSheet, Text, View, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Textinput from '../commons/Textinput'
import ButtonCompo from '../commons/ButtonCompo'
import Textcom from '../commons/Textcom'
import { register } from '../redux/UserAPI'
import { useDispatch, useSelector } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Signup = (props) => {
    const [name, setname] = useState('binh');
    const [email, setEmail] = useState('ttranbinh45@gmail.com');
    const [Password, setPassword] = useState('');

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

    const getContainerStyle = () => {
        return {
            width: 360,
            height: 50,
            borderRadius: 20,
            borderWidth: 1,
            alignSelf: 'center',
            marginTop: 50,

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

    const SigninScreen = () => {
        navigation.navigate('Signin');
    }

    const dangky = async () => {
        try {
            if (!name) {
                ToastAndroid.show('Vui lòng nhập họ tên!', ToastAndroid.SHORT);
                return;
            }
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
                name: name
            };
    
            const actionResult = await dispatch(register(body));
            const response = actionResult.payload; 
    
            if (actionResult.type === register.fulfilled.type) {
                // Đăng ký thành công
                ToastAndroid.show('Đăng ký thành công!', ToastAndroid.SHORT);
                navigation.navigate('Login');
            } else {
                if (response && response.message === "Email đã tồn tại") {
                    ToastAndroid.show('Email đã tồn tại. Vui lòng sử dụng email khác!', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Đăng ký thất bại. Vui lòng thử lại!', ToastAndroid.SHORT);
                }
                console.log('Đăng ký thất bại:', response);
            }
        } catch (error) {
            console.log('Đăng ký thất bại:', error);
        }
    }
    



    return (
        <KeyboardAwareScrollView>
            <View>
                <Textcom
                    text={'Sign Up'}
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
                        container: getContainerStyle(),
                        input: getInputStye(),
                    }}
                    placeholder={'Name'}
                    value={name}
                    onchangetext={setname}
                    iconRight={null}

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
                        container: getContainerStyle2(),
                        input: getInputStye(),
                    }}
                    placeholder={'Password'}
                    value={Password}
                    onchangetext={setPassword}
                    iconRight={null}
                    secureTextentry
                />
                <Textinput
                    styles={{
                        container: getContainerStyle2(),
                        input: getInputStye(),
                    }}
                    placeholder={'Confirm Password'}
                    value={Password}
                    onchangetext={setPassword}
                    iconRight={null}
                    secureTextentry
                />

                <ButtonCompo
                    styles={{
                        Buttonstyle: getStyleButton(),
                        title: getStyleTitle()
                    }}
                    title={'SIGN UP'}
                    onprees={dangky}
                />



                <Text style={styles.textStyle}>Already have an account?  </Text>
                <Pressable onPress={SigninScreen}>
                    <Text style={{ color: '#F54749', fontSize: 16, marginLeft: 280, marginTop: -36 }}> Sign In. </Text>
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
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Signup

const styles = StyleSheet.create({
    textStyle: {
        width: 290,
        height: 36,
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 20,
        marginLeft: 20
    }

})