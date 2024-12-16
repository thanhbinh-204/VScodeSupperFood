import { Text, View,Image,TouchableOpacity, } from 'react-native'
import React from 'react'
import styles from '../commons/style/styles'
import Sectionview from '../commons/Sectionview'
import { ScrollView } from 'react-native';

const Home = (props) => {
  const {navigation} = props;

    const HomegoCart = () =>{
      navigation.navigate('CartScreen');
    }

  return (
    <ScrollView
    style={{width: '100%', height: '100%'}}
    showsHorizontalScrollIndicator={false}>
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.mainHeader}>

        <Text style={styles.title}>
            Chi phí thấp - Chất lượng cao {`\n`}Đồ ăn ngon - Tâm trạng tốt 
          </Text>

          <Image
            source={require('../image/logodaubep.png')}
            style={styles.imgMainHeader}
          />
        </View>

        <View style={styles.topHeader}>
        
          <TouchableOpacity
            style={styles.imgHeader}
            onPress={()=>HomegoCart()}
           >
            <Image source={require('../image/cart.png')} 
            style={{width:30,height:30,marginLeft:-4}}
            />
          </TouchableOpacity>
          
        </View>
      </View>

      <Sectionview title="" />

      {/* phần cuối */}
      <View style={styles.contaics}>
        <Text style={styles.textcs}>Thông tin về chúng tôi</Text>
      </View>
      <View style={styles.contaifooter}>
        <View style={styles.contenfooter}>
          <Text style={styles.textfooter}>Liên hệ hỗ trợ : 0374204107 </Text>
          <Text style={styles.textfooter2}>
          Công ty Thức ăn nhanh FAST FOOD NO.1 
          </Text>
        </View>
        <Image
          style={styles.imagefooter}
          source={require('../image/logofast1.png')}
        />
      </View>
    </View>
  </ScrollView>
  )
}

export default Home;



