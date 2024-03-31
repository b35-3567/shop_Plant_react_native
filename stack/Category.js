import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import CustomHeader from '../../Lab/Lab1/CustomHeader';
const Category = (props) => {
  const { navigation } = props;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0); // Index của danh mục được chọn
  const data = [
    {
      category: 'All',
      products: [
        {
          id: 1,
          name: 'spdier Pant',
          price: '250',
          imge: require('../../../assets/All/image1.png')

        },
        {
          id: 2,
          name: 'Plant Flower',
          price: '250',
          imge: require('../../../assets/All/image2.png')
        },
        {
          id: 3,
          name: 'Plant Flo',
          price: '350',
          imge: require('../../../assets/All/image3.png')
        },
        {
          id: 4,
          name: 'spider Flower',
          price: '650',
          imge: require('../../../assets/All/image4.png')
        },
        {
          id: 5,
          name: 'Plant Flower',
          price: '950',
          imge: require('../../../assets/All/image5.png')
        },
        {
          id: 6,
          name: ' Flower',
          price: '150',
          imge: require('../../../assets/All/image6.png')
        },
      ]
    },



    {
      category: 'Ưa tối',
      products: [
        {
          id: 1,
          name: 'Pant',
          price: '250',
          imge: require('../../../assets/All/image1.png')

        },
        {
          id: 2,
          name: 'Plant Flower',
          price: '250',
          imge: require('../../../assets/All/image6.png')
        },
        {
          id: 3,
          name: 'Plant Flo',
          price: '350',
          imge: require('../../../assets/All/image5.png')
        },
        {
          id: 4,
          name: 'spider Flower',
          price: '650',
          imge: require('../../../assets/All/image3.png')
        },
        {
          id: 5,
          name: 'Plant Flower',
          price: '950',
          imge: require('../../../assets/All/image4.png')
        },

      ]
    },
    {
      category: 'Hàng mới về',
      products: [
        {
          id: 1,
          name: 'Pant',
          price: '250',
          imge: require('../../../assets/All/image1.png')

        },
        {
          id: 2,
          name: 'Plant Flower',
          price: '250',
          imge: require('../../../assets/UaBong/image3.png')
        },
        {
          id: 3,
          name: 'Plant Flo',
          price: '350',
          imge: require('../../../assets/UaBong/image5.png')
        },
        {
          id: 4,
          name: 'spider Flower',
          price: '650',
          imge: require('../../../assets/UaBong/image6.png')
        },

      ]
    },
    {
      category: 'Ưa sáng',
      products: [
        {
          id: 1,
          name: 'Pant',
          price: '250',
          imge: require('../../../assets/UaBong/image3.png')

        },
        {
          id: 2,
          name: 'Plant Flower',
          price: '250',
          imge: require('../../../assets/UaBong/image6.png')
        },
        {
          id: 3,
          name: 'Plant Flo',
          price: '350',
          imge: require('../../../assets/UaBong/image5.png')
        },

      ]
    },

    {
      category: 'Ưa bóng',
      products: [
        {
          id: 1,
          name: 'Pant',
          price: '250',
          imge: require('../../../assets/All/image6.png')

        },
        {
          id: 2,
          name: 'Plant Flower',
          price: '250',
          imge: require('../../../assets/UaBong/image5.png')
        },
        {
          id: 3,
          name: 'Plant Flo',
          price: '350',
          imge: require('../../../assets/UaBong/image3.png')
        },
        {
          id: 4,
          name: 'spider Flower',
          price: '650',
          imge: require('../../../assets/UaBong/image6.png')
        },
        {
          id: 5,
          name: 'Plant Flower',
          price: '950',
          imge: require('../../../assets/UaBong/image5.png')
        },
        {
          id: 6,
          name: ' Flower',
          price: '150',
          imge: require('../../../assets/UaBong/image5.png')
        },

      ]
    }


  ]
  // Render một mục danh mục
  const renderCategoryItem = ({ item, index }) => (
    <View style={ { marginLeft: 8 } }>
      <TouchableOpacity
        style={ [styles.categoryItem, index === selectedCategoryIndex && styles.selectedCategoryItem] }
        onPress={ () => setSelectedCategoryIndex(index) }
      >
        <Text style={ [styles.categoryItem, index === selectedCategoryIndex && styles.selectedTextItem] }>{ item.category }</Text>
      </TouchableOpacity>
    </View>
  );

  // Render một mục sản phẩm
  const renderProductItem = ({ item }) => {
    console.log("Image path:", item.imge);
    return (
      <View style={ styles.productItem }>
        <Image source={ item.imge } style={ styles.productImage } />
        <Text style={ { fontStyle: 'normal', fontWeight: '700', color: 'black' } }>{ item.name }</Text>
        <Text>Ưa bóng</Text>
        <Text style={ { fontSize: 16, fontWeight: '500', fontStyle: 'normal', color: '#007537' } }>{ item.price }.000đ</Text>
      </View>

    )
  };
  return (
    <ScrollView style={ styles.productContainer }>
      <CustomHeader
        leftIcon={ { name: 'arrow-back-ios', onPress: () =>  navigation.goBack() } }
        centerText="Cây Trồng"
        rightIcon={ { name: 'shopping-cart', onPress: () => console.log('Right icon pressed') } }
      />
      <View style={ styles.container }>
        {/* FlatList danh mục */ }
        <View style={ { marginLeft: 24, marginTop: 30, marginRight: 24 } }>
          <FlatList
            data={ data }
            horizontal
            renderItem={ renderCategoryItem }
            keyExtractor={ (item, index) => index.toString() }
          />
        </View>
        {/* FlatList sản phẩm */ }
        <FlatList
          data={ data[selectedCategoryIndex].products }
          numColumns={ 2 }
          renderItem={ renderProductItem }
          keyExtractor={ (item) => item.id.toString() }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // paddingTop: 50,
  },
  categoryItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    //borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    maxHeight: 150, // Giới hạn chiều rộng của mỗi mục danh mục
    flexShrink: 1, // Co giãn mục danh mục khi không đủ không gian

  },
  selectedCategoryItem: {
    backgroundColor: '#009245',

  },
  selectedTextItem: {
    color: 'white',
    fontWeight: '500',
    fontStyle: 'normal'
  },
  productItem: {
    width: 155,
    // alignItems: 'center',
    //justifyContent: 'center',
    // borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    margin: 25,
    height: 210,
  },
  productImage: {
    width: 155,
    height: 134,
    marginBottom: 10,
    backgroundColor: 'rgba(125, 123, 123, 0.10)', // Màu xám nhạt trong suốt, alpha thêm mờ mờ

  },
});

export default Category