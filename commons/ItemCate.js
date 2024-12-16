import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { getAllCate } from '../redux/MainAPI';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector, } from 'react-redux'
import { useState, useEffect } from 'react';
import CategoryItem from './CategoryItem';
import AxiosInstance from '../helper/AxiosInstance';

const ItemCate = ({ title,onSelectCategory }) => {

  const useAppDispatch = () => useDispatch();
  const useAppSelector = useSelector;
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.app);
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (cateId) => {
    setSelectedId(cateId);
    onSelectCategory(cateId); // Gọi hàm từ props khi chọn danh mục
  };

  //sanpham theo cate
  // const fetchProductsByCategory = async (cateId) => {
  //   try {
  //     setRefreshing(true);
  //     const response = await AxiosInstance().post(`/products/getproductbycate/${cateId}`);
  //     if (response.status) {
  //       setProducts(response.data);
  //     }
  //     setRefreshing(false);
  //   } catch (error) {
  //     console.log(error);
  //     setRefreshing(false);
  //   }
  // };

  const fetchCategories = async () => {
    try {
      setRefreshing(true)
      dispatch(getAllCate());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
    return () => { }
  }, [])

  useEffect(() => {
    setCategories(appState.cate);
    setRefreshing(false)
    return () => { }
  }, [appState.cate])


  return (
    <View>
      {title && <Text>{title}</Text>}
      <FlatList
        style={{
          width: '100%', height: 40, alignContent: 'center', alignSelf: 'center', borderRadius: 20, marginTop: 5
        }}
        data={categories}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <CategoryItem
            dataCate={item}
            isSelected={item._id.toString() === selectedId}
            onSelect={() => handleSelect(item._id.toString())}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        extraData={selectedId}
        refreshing={refreshing}
        onRefresh={fetchCategories}
      />
    </View>
  )
}

export default ItemCate

const styles = StyleSheet.create({

})
