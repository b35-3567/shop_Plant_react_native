import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../../Lab/Lab1/CustomHeader';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { setCartDataLength } from '../../API_Redux/actions';
import { API } from '../API_TRUE';
const Plant_Card = (props) => {
  const { navigation } = props;
  const [checked, setChecked] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const userInfo = useSelector(state => state.user.userInfo);
  const [totalPrice, setTotalPrice] = useState(0); // Tổng tiền của giỏ hàng
  //mơi thêm
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://${API}:3000/cart/${userInfo.userId}`);
        const data = await response.json();
        console.log('chiều dài data:', data.length);
        console.log('data:', data);
        // Sử dụng action creator setCartDataLength để tạo action object với giá trị dataLength
        const action = setCartDataLength(data.length);
        dispatch(action);
        // Log giá trị dataLength để kiểm chứng
        console.log('dataLength:', action.payload);

        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userInfo, dispatch]);



  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const promises = cartItems.map(async (item) => {
          const response = await fetch(`http://${API}:3000/products/${item.productId}`);
          return response.json();
        });
        const productsData = await Promise.all(promises);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductInfo();
  }, [cartItems]);


 // Tính tổng tiền của giỏ hàng
 useEffect(() => {
  let total = 0;
  cartItems.forEach((item, index) => {
    if (products[index]) {
      total += products[index].price * item.quantity;
    }
  });
  setTotalPrice(total);
}, [cartItems, products]);


const increaseQuantity = async (item) => {
  try {
    const response = await fetch(`http://${API}:3000/increase_quantity/${item._id}`, {
      method: 'PUT'
    });
    if (response.ok) {
      const updatedItem = { ...item, quantity: item.quantity + 1 };
      const updatedCartItems = cartItems.map(cartItem => cartItem._id === item._id ? updatedItem : cartItem);
      setCartItems(updatedCartItems);
    } else {
      console.error('Failed to increase quantity:', response.statusText);
    }
  } catch (error) {
    console.error('Error increasing quantity:', error);
  }
};

const decreaseQuantity = async (item) => {
  if (item.quantity === 1) {
    // Quantity cannot be decreased further
    return;
  }
  try {
    const response = await fetch(`http://${API}:3000/decrease_quantity/${item._id}`, {
      method: 'PUT'
    });
    if (response.ok) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      const updatedCartItems = cartItems.map(cartItem => cartItem._id === item._id ? updatedItem : cartItem);
      setCartItems(updatedCartItems);
    } else {
      console.error('Failed to decrease quantity:', response.statusText);
    }
  } catch (error) {
    console.error('Error decreasing quantity:', error);
  }
};





  const toggleCheckbox = () => {
    setChecked(!checked);
  };
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleDeleteAllProducts = () => {
    // Xử lý xóa tất cả sản phẩm ở đây
    console.log('Xóa tất cả sản phẩm');
    setShowConfirmationModal(false);
  };
  // Chuẩn bị dữ liệu mẫu
  const data = [
    { id: '1', name: 'Spier Plant', category: 'Ưa bóng', price: '250.000' },
    // Thêm dữ liệu cho các mục khác nếu cần
  ];

  // Render một mục trong FlatList
  const renderItem = ({ item, index }) => {
    if (products[index]) {
      const totalPrice = products[index].price * item.quantity;
      return (

        <TouchableOpacity onPress={ toggleCheckbox } style={ styles.checkboxContainer }>
          { checked ? (
            <Icon name="check-square-o" size={ 30 } color="green" />
          ) : (
            <Icon name="square-o" size={ 30 } color="black" />
          ) }

          { products[index].images && products[index].images.length > 0 ? (
            <Image style={ styles.Img } source={ { uri: products[index].images[0] } } />
          ) : (
            <Text>No image available</Text>
          ) }
          <View style={ { flexDirection: 'column', marginLeft: 15 } }>
            <View style={ { flexDirection: 'row' } }>
              <Text style={ { fontSize: 18, fontStyle: 'normal', fontWeight: '400', color: 'black' } }>{ products[index].name }</Text>
              <Text style={ { fontSize: 18, fontStyle: 'normal', fontWeight: '400', color: 'black' } }>|</Text>
              <Text style={ { fontSize: 18 } }>ưa bóng</Text>
            </View>
            <Text style={ { fontSize: 18, fontStyle: 'normal', fontWeight: '400', color: '#007537' } }>{ products[index].price }</Text>
            <View style={ { flexDirection: 'row', alignItems: 'center', width: 132, height: 30 } }>
              <TouchableOpacity onPress={ () => decreaseQuantity(item) }>
                <Icon1 name="minussquareo" size={ 30 } color="black" />
              </TouchableOpacity>
              <Text style={ { width: 80, height: 30, marginLeft: 23, fontSize: 30, marginTop: -8 } }>{ item.quantity }</Text>

              <TouchableOpacity onPress={ () => increaseQuantity(item) }>
                <Icon1 name="plussquareo" size={ 30 } color="black" style={ { marginLeft: -33 } } />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={ { textDecorationLine: 'underline', fontSize: 17, color: 'black', fontStyle: 'normal', fontWeight: '500', marginLeft: 55 } }>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return <View />;
    }
  };

  return (
    <View style={ { flex: 1 } }>
      <CustomHeader
        leftIcon={ { name: 'arrow-back-ios', onPress: () => navigation.goBack() } }
        centerText="GIỎ HÀNG"
        rightIcon={ { name: 'trash-o', onPress: () => setShowConfirmationModal(true) } }
      />
      {/* Sử dụng FlatList thay vì View */ }
      <FlatList
        data={ cartItems }
        renderItem={ renderItem }
        keyExtractor={ (item) => item._id.toString() }
        ListEmptyComponent={ <Text>Không có sản phẩm nào được chọn</Text> }
      />
      <View style={ { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 } }>
        <Text>Tạm tính</Text>
        <Text>500.000đ</Text>
      </View>
      <TouchableOpacity style={ { paddingVertical: 10, width: 326, height: 50, backgroundColor: '#007537', borderRadius: 8, justifyContent: 'space-evenly', flexDirection: 'row', marginHorizontal: 33 } }>
        <Text style={ { color: 'white', fontSize: 20, fontStyle: 'normal' } }>Tiến hành thanh toán</Text>
        <Icon name="angle-right" size={ 30 } color="white" />
      </TouchableOpacity>

      {/* Modal xác nhận xóa */ }
      <Modal
        animationType="slide"
        transparent={ true }
        visible={ showConfirmationModal }
        onRequestClose={ () => setShowConfirmationModal(false) }
      >
        <View style={ styles.centeredView }>
          <View style={ styles.modalView }>
            <Text style={ { color: 'black', fontStyle: 'normal', fontWeight: '600' } }>Xác nhận xóa tất cả đơn hàng?</Text>
            <Text style={ {} }>Thao tác này không thể khôi phục</Text>
            <View style={ { flexDirection: 'column', marginTop: 20, } }>
              <TouchableOpacity style={ [styles.button, styles.buttonYes] } onPress={ handleDeleteAllProducts }>
                <Text style={ styles.textStyle }>Đồng ý</Text>
              </TouchableOpacity>
              <TouchableOpacity style={ [styles.button, styles.buttonNo] } onPress={ () => setShowConfirmationModal(false) }>
                <Text style={ styles.textStyle1 }>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 35,

  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 18,
  },
  Img: {
    width: 65,
    height: 65,
    marginLeft:5
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu đen với độ trong suốt 0.5
  },
  modalView: {
    margin: 20,
    marginTop: 220,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    // elevation: 2,
    width: 295,
    height: 50,
  },
  buttonYes: {
    backgroundColor: '#007537',
    marginRight: 10,
  },
  buttonNo: {
    //backgroundColor: '#ff0000',
    //marginLeft: 10,


  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',

  },
  textStyle1: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',

  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 6,
  },

});

export default Plant_Card;
