import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-virtualized-view';
import Detail from '../../demo/Context/Detail';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API } from '../API_TRUE';
const Home_Plant = (props) => {
  const { navigation } = props;
  const userInfo = useSelector(state => state.user.userInfo);
  console.log('userInfo', userInfo);
  const [products, setProducts] = useState([]);
  const [pots, setPots] = useState([]);
  useEffect(() => {
    // Gửi yêu cầu GET đến API để lấy danh sách sản phẩm dựa trên parentCategory
    axios.get(`http://${API}:3001/products-by-parent-category/65f9673765e44ff8a55f6121`)
      .then(response => {
        setProducts(response.data);
        console.log('products', products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);
  //65f9675a65e44ff8a55f6123
  useEffect(() => {
    // Gửi yêu cầu GET đến API để lấy danh sách sản phẩm dựa trên parentCategory
    axios.get(`http://${API}:3001/products-by-parent-category/65f9675a65e44ff8a55f6123`)
      .then(response => {
        setPots(response.data);
        console.log('products', products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);
  const dataPots = [
    { name: 'Plant Trắng', description: 'Ưa bóng', image: require('../../../assets/All/image1.png'), price: '250' },
    { name: 'Xẻng cuốc', description: 'Ưa bóng', image: require('../../../assets/All/image6.png'), price: '650' },
    { name: 'Bình tưới', description: 'Ưa bóng', image: require('../../../assets/UaBong/image3.png'), price: '150' },
    { name: 'Bình xịt', description: 'Ưa bóng', image: require('../../../assets/UaBong/image5.png'), price: '750' },
  ];

  const renderItem = ({ item }) => (
    <View style={ styles.item }>
      <TouchableOpacity onPress={ () => navigation.navigate('Detail', { itemId: item._id }) }>
        { item.images && item.images.length > 0 && <Image source={ { uri: item.images[0] } } style={ styles.itemImage } /> }
        <Text style={ { fontStyle: 'normal', fontWeight: '700', color: 'black' } }>{ item.name }</Text>
        <Text style={ { color: 'black' } }>{ item.description }</Text>
        <Text style={ { fontSize: 16, fontWeight: '500', fontStyle: 'normal', color: '#007537' } }>{ item.price }đ</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView>
      <View style={ styles.container }>
        <Image source={ require('../../../assets/Plant_header.png') } style={ styles.imageBackground } />
        <View style={ styles.overlay }>
          <View style={ styles.titleContainer }>
            <Text style={ styles.text } numberOfLines={ 2 }>
              Planta - toả sáng không gian nhà bạn
            </Text>
            <View style={ styles.cartIcon }>
              <Icon name='cart-plus' size={ 30 } color={ 'black' } onPress={ () => navigation.navigate('cart') } />
            </View>
          </View>

          <View style={ styles.arrowIcon }>
            <Text style={ styles.newItemsText }>
              Xem hàng mới về
            </Text>
            <Icon1 name="arrowright" size={ 24 } color="#007537" />
          </View>
        </View>
        <Text style={ { fontSize: 34, color: 'black', fontWeight: "bold", marginTop: 99, marginLeft: 19 } }>Cây Trồng</Text>
        <FlatList
          data={ products }
          renderItem={ renderItem }
          keyExtractor={ (item) => item._id }
          numColumns={ 2 }
          contentContainerStyle={ styles.flatListContent }
        />
        <View style={ { flexDirection: 'row', marginTop: 17.5, left: 234 } }>
          <TouchableOpacity onPress={ () => navigation.navigate('category') }>
            <Text style={ { fontSize: 16, color: 'black', fontWeight: 'bold', position: 'relative' } }>Xem thêm cây trồng</Text>
          </TouchableOpacity>
          <View style={ { width: 149, height: 1, backgroundColor: 'green', alignSelf: 'flex-end', position: 'absolute' } } />
        </View>

        <Text style={ { fontSize: 34, color: 'black', fontWeight: "bold", marginTop: 2.5, marginBottom: 23, marginLeft: 19 } }>Chậu Cây</Text>
        <FlatList
          data={ pots }
          renderItem={ renderItem }
          keyExtractor={ (item) => item._id }
          numColumns={ 2 }
          contentContainerStyle={ styles.flatListContent }
        />
        <View style={ { flexDirection: 'row', marginTop: 17.5, left: 234 } }>
          <Text style={ { fontSize: 16, color: 'black', fontWeight: 'bold', position: 'relative' } }>Xem thêm chậu cây </Text>
          <View style={ { width: 149, height: 1, backgroundColor: 'green', alignSelf: 'flex-end', position: 'absolute' } } />
        </View>
        <Text style={ { height: 49, alignSelf: 'stretch', color: 'black', fontSize: 24, fontWeight: '500', marginLeft: 15 } }>Combo chăm sóc (mới)</Text>
        <View style={ { flexDirection: 'row', backgroundColor: '#F5F5F5', width: 354, marginHorizontal: 26, borderRadius: 20 } }>
          <View style={ { flexDirection: 'column', flex: 1 } }>
            <Text style={ { fontStyle: 'normal', fontWeight: '500', color: 'black' } }>Lemon Balm Grow Kit </Text>
            <Text>Gồm: hạt giống Lemon Balm, gói đất hữu cơ, chậu Planta, marker đánh dấu...</Text>
          </View>
          <Image source={ require('../../../assets/grow_kit_main_54.png') } style={ { borderBottomRightRadius: 20, borderTopRightRadius: 20 } } />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  imageBackground: {
    width: '100%',
    height: 205,
    top: 83
  },
  overlay: {
    position: 'absolute',
    top: -202,
    left: 43,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 364
  },
  text: {
    width: 250,
    fontSize: 24,
    fontWeight: '500',
    color: '#221F1F',
    marginRight: 10,
    top: -300
  },
  cartIcon: {
    backgroundColor: 'white',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    top: -320
  },
  newItemsText: {
    fontSize: 16,
    color: '#007537',
  },
  arrowIcon: {
    flexDirection: 'row',
    top: -653
  },
  item: {
    width: 155,
    margin: 25,
    backgroundColor: '#fff',
    //  alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 2,
    elevation: 5,
  },
  itemImage: {
    width: 155,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'rgba(125, 123, 123, 0.10)', // Màu xám nhạt trong suốt, alpha thêm mờ mờ
  },
  flatListContent: {
    flexGrow: 1,
  },
});

export default Home_Plant;
