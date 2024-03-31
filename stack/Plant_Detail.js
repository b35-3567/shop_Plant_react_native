import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../../Lab/Lab1/CustomHeader'
import Slidebar from './Slidebar'
import CustomTextIn from './CustomTextIn'
import Icon from 'react-native-vector-icons/AntDesign';
import ImageSlider from 'react-native-image-slider';
import { useNavigation } from '@react-navigation/native'; // Import hook useNavigation
import axios from 'axios';
import { API } from '../API_TRUE'
import { addToCart } from '../../Demo_Redux_true/CartReducer';
import { useDispatch, useSelector } from 'react-redux';
const Plant_Detail = ({ route }) => {
  const navigation = useNavigation(); // Sử dụng hook useNavigation để lấy đối tượng navigation
  const userInfo = useSelector(state => state.user.userInfo);
  console.log('userInfo', userInfo);
  const { itemId } = route.params;
  console.log('itemid', itemId);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  // Function to fetch product data from API
  const fetchProductData = async () => {
    try {
      const response = await axios.get(`http://${API}:3001/products/${itemId}`);
      setProduct(response.data);
      console.log('response.data:', response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [itemId]); // Fetch product data when component mounts
  console.log('product:', product);

  // Function to handle increasing quantity
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Function to handle decreasing quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  // Calculate total price
  const totalPrice = product ? product.price * quantity : 0;

  const images = [
    'https://picsum.photos/200/310',
    'https://picsum.photos/200/320',
    'https://picsum.photos/200/330'
  ];

  const addToCart =async()=>{
    try {
       setLoading(true);
      const response=await axios.post(`http://${API}:3001/add_cart`,{
        userId: userInfo.userId,
        productId:itemId,
        quantity:quantity
      })
      setLoading(false);
      Alert.alert('thêm sản phẩm thành công');
      console.log('thêm vô resopne',response.data);
    } catch (error) {
      
    }
  }
 
  return (
    <View>
      <CustomHeader
        leftIcon={ { name: 'arrow-back-ios', onPress: () => navigation.goBack() } }
        centerText={ product ? product.name : null }
        rightIcon={ { name: 'shopping-cart', onPress: () => console.log('Right icon pressed') } }
      />
      <View style={ {
        width: 387,
        height: 270,
        borderColor: 'red',
        borderWidth: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12

      } }>
        <ImageSlider
          loopBothSides
          autoPlayWithInterval={ 3000 }
          images={ product ? product.images : [] } // Sử dụng product.images nếu product không null, nếu không sử dụng mảng rỗng []
        />
      </View>

      <View style={ { flexDirection: 'row', marginHorizontal: 48, marginVertical: 15 } }>
        <Text style={ {
          backgroundColor: '#007537', width: 90, height: 30, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4,
          fontSize: 19, fontStyle: 'normal', fontWeight: '400', color: 'white'
        } }>Ưa Sáng</Text>
        <Text style={ {
          backgroundColor: '#007537', width: 90, height: 30, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4,
          fontSize: 19, fontStyle: 'normal', fontWeight: '400', color: 'white', marginLeft: 13
        } }>Ưa Sáng</Text>

      </View>
      { product && (
        <Text style={ {
          marginHorizontal: 48, fontSize: 34, fontStyle: 'normal', fontWeight: '500',
          color: '#007537', marginBottom: 15
        } }>{ product.price } vnđ</Text>
      ) }


      <View style={ { marginHorizontal: 58 } }>
        { product && (
          <Text style={ { fontSize: 18 } }>{ product.description }</Text>
        ) }
        <View style={ { backgroundColor: 'black', width: 299, height: 1, marginBottom: 15 } }></View>
        { product && (
          <View style={ { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } }>
            <Text style={ { fontSize: 18 } }>Kích thước</Text>
            <Text style={ { fontSize: 18 } }>{ product.size }</Text>
          </View>
        ) }
        <View style={ { backgroundColor: 'black', width: 299, height: 1, marginBottom: 15 } }></View>
        { product && (
          <View style={ { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } }>
            <Text style={ { fontSize: 18 } }>Xuất xứ</Text>
            <Text style={ { fontSize: 18 } }>{ product.origin }</Text>
          </View>
        ) }

        <View style={ { backgroundColor: 'black', width: 299, height: 1, marginBottom: 15 } }></View>

        <View style={ { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } }>
          <Text style={ { fontSize: 18 } }>Tình trạng</Text>
          <Text style={ { fontSize: 18, color: '#007537' } }>Còn 156 sp</Text>
        </View>

        <View style={ { backgroundColor: 'black', width: 299, height: 1, marginBottom: 15 } }></View>
      </View>





      <View style={ { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 29, marginVertical: 10 } }>
        <Text style={ { fontSize: 14 } }>Đã chọn { quantity } sản phẩm</Text>
        <Text style={ { fontSize: 14, } }>Tạm tính</Text>
      </View>


      <View style={ { flexDirection: 'row', justifyContent: 'space-between' } }>
        <View style={ { flexDirection: 'row', marginHorizontal: 29, alignItems: 'center', width: 132, height: 30 } }>
          <TouchableOpacity onPress={ decreaseQuantity }>
            <Icon name="minussquareo" size={ 30 } color="black" />
          </TouchableOpacity>
          <Text style={ { width: 80, height: 30, marginLeft: 23, fontSize: 30, marginTop: -8 } }>{ quantity }</Text>
          <TouchableOpacity onPress={ increaseQuantity }>
            <Icon name="plussquareo" size={ 30 } color="black" style={ { marginLeft: -33 } } />
          </TouchableOpacity>
        </View>
        <Text style={ { marginRight: 30, fontSize: 23, color: 'black', fontStyle: 'normal', fontWeight: '500' } }>{ totalPrice }đ</Text>
      </View>
      <TouchableOpacity onPress={ addToCart }
        style={ { marginVertical: 32, borderRadius: 9, width: 327, height: 50, backgroundColor: '#007537', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' } }>
        <Text style={ { color: 'white', fontSize: 24 } }>Chọn mua</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Plant_Detail