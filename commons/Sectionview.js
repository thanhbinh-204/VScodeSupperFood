import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getAllProducts, getAllCate } from '../redux/MainAPI';
import AxiosInstance from '../helper/AxiosInstance';

const Sectionview = ({ title }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.app);
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  //fetch cate
  const fetchCategories = async () => {
    try {
      setRefreshing(true)
      dispatch(getAllCate());
    } catch (error) {
      console.log(error);
    }
  };
  //fetch san pham theo cate 
  const fetchProductsByCategory = async (cateId) => {
    try {
      const response = await AxiosInstance().post(`/products/getproductbycate/${cateId}`);
      if (response.status) {
        setProducts(response.data); // Lưu sản phẩm vào state
        console.log(response);
      }
    } catch (error) {
      console.log('Lỗi khi lấy sản phẩm:', error);
    }
  };
  // Fetch sản phẩm từ API
  const fetchProducts = async () => {
    try {
      setRefreshing(true);
      setLoading(true);
      dispatch(getAllProducts());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    return () => { };
  }, []);

  useEffect(() => {
    if (appState.products) {
      setProducts(appState.products);
      setRefreshing(false);
      setLoading(false);
    }
  }, [appState.products]);

  useEffect(() => {
    setCategories(appState.cate);
    setRefreshing(false)
    return () => { }
  }, [appState.cate])

  const handleCategorySelect = (cateId) => {
    setSelectedCategory(cateId); // Cập nhật danh mục đã chọn
    fetchProductsByCategory(cateId); // Lấy sản phẩm theo danh mục
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCategorySelect(item._id)}
      style={[
        styles.categoryContainer,
        selectedCategory === item._id && styles.selectedCategory,
      ]}
    >
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailProductScreen', { id: item._id })}
      style={styles.productContainer}
    >
      <Image
        style={styles.productImage}
        source={{ uri: `${item.images}` }}
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      {/* <Text style={styles.productPrice}>{item.price} VNĐ</Text> */}
      <Text style={styles.productPrice}>
        {item.price && !isNaN(item.price) ? item.price.toLocaleString('vi-VN') : '0'} VNĐ
      </Text>

    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {/* Danh sách danh mục */}
      <FlatList
        style={styles.categoryList}
        data={categories}
        keyExtractor={(item) => item._id.toString()}
        horizontal
        renderItem={renderCategoryItem}
        showsHorizontalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={fetchCategories}
      />

      {/* Danh sách sản phẩm */}
      {loading ? (
        <ActivityIndicator size="large" color="#F54749" />
      ) : (
        <FlatList
          style={styles.productList}
          data={products}
          keyExtractor={(item) => item._id.toString()}
          numColumns={2}
          renderItem={renderProductItem}
          refreshing={refreshing}
          onRefresh={fetchProducts}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#F54749',
    marginLeft: 20,
    marginBottom: 10,
  },
  categoryList: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  categoryContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#F54749',
  },
  categoryName: {
    color: '#333',
    fontWeight: 'bold',
  },
  productList: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  productContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  productImage: {
    width: 126,
    height: 126,
    borderRadius: 20,
    marginBottom: 10,
    borderColor: '#CDC9C9',
    borderWidth: 1,
  },
  productName: {
    color: '#F54749',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productDescription: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
  },
  productPrice: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
});

export default Sectionview;
