import { Text,Image } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Signup from '../src/Signup';
import Signin from '../src/Signin';
import Qc2 from '../src/Qc2';
import Qc1 from '../src/Qc1';
import Qc3 from '../src/Qc3';
import HomeScreen from '../src/HomeScreen';
import CartScreen from '../src/CartScreen';
import DetailProductScreen from '../src/detail/DetailProductScreen';
import SearchScreen from '../src/SearchScreen';
import Bell from '../src/Bell';
import User from '../src/User';
import OrderHistory from '../src/OrderHistory';
import ChangePasswordScreen from '../src/ChangePasswordScreen';
import Hepl from '../src/Hepl';
import DeliveryMethod from '../src/deliveryMethod';
import SuccessScreen from '../src/SuccessScreen';
import ForgetPassword from '../src/ForgetPassword';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabScreenOptions = ({ route }) => {
    return {
        headerShown: false,
        tabBarStyle: {
        backgroundColor: 'white'
        },

        tabBarIcon: ({ focused }) => {
        
            if (route.name =='Home'){
                if(focused){
                    return <Image source={require('../image/hometab.png')} />
                }
                    return <Image source={require('../image/hometab.png')} />
            }
            else if (route.name =='Search'){
                if(focused){
                    return <Image source={require('../image/searchtab.png')} />
                }
                    return <Image source={require('../image/searchtab.png')} />
            }
            else if (route.name =='Notification'){
                if(focused){
                    return <Image source={require('../image/belltab.png')} />
                }
                    return <Image source={require('../image/belltab.png')} />
            }
            else if (route.name == 'Person') {
                if (focused) {
                    return <Image source={require('../image/usertab.png')} />
                }
                    return <Image source={require('../image/usertab.png')} />
            }
        },

        tabBarLabel: ({ focused }) => {
            if (route.name == 'Home') {
                if (focused) {
                    return <Text style={{ color: '#D17842' }}>Home</Text>
                }
            } else if (route.name == 'Search') {
                if (focused) {
                    return (<Text style={{ color: '#D17842' }}>Search</Text>
                    );
                }
            }
            else if (route.name == 'Notification') {
                if (focused) {
                    return <Text style={{ color: '#D17842' }}>History</Text>
                }
            }
            else if (route.name == 'Person') {
                if (focused) {
                    return <Text style={{ color: '#D17842' }}>Profile</Text>
                }
            }
        }
    }
}

// tab này hiển thị ở trang home gồm 4 trang 
const MainTabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={tabScreenOptions}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Notification" component={Bell} />
            <Tab.Screen name="Person" component={User} />
        </Tab.Navigator>
    )
}



const MainStackNavigation = () =>{
    return(
   
        <Stack.Navigator  screenOptions={{headerShown:false}}>
             <Stack.Screen name="MainTabNavigation" component={MainTabNavigation} /> 
             <Stack.Screen name="Qc1"component={Qc1}/>
             <Stack.Screen name="Qc2"component={Qc2} />
             <Stack.Screen name="Qc3"component={Qc3} />
             <Stack.Screen name="Signin"component={Signin} />
             <Stack.Screen name='Signup'component={Signup}/>
             <Stack.Screen name='HomeScreen'component={HomeScreen}/>
             <Stack.Screen name='CartScreen'component={CartScreen}/>
             <Stack.Screen name='DetailProductScreen'component={DetailProductScreen}/>
             <Stack.Screen name='ForgetPassword'component={ForgetPassword}/>
             <Stack.Screen name='OrderHistory'component={OrderHistory}/>
             <Stack.Screen name='ChangePasswordScreen'component={ChangePasswordScreen}/>
             <Stack.Screen name='Hepl'component={Hepl}/>
             <Stack.Screen name='DeliveryMethod'component={DeliveryMethod}/>
             <Stack.Screen name='SuccessScreen'component={SuccessScreen}/>
        </Stack.Navigator>
       
    )
}



export default MainStackNavigation