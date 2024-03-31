/*
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const MyCarousel = () => {
  const data = [
    { id: '1', imageUrl: 'https://picsum.photos/200/310' },
    { id: '2', imageUrl: 'https://picsum.photos/200/314' },
    { id: '3', imageUrl: 'https://picsum.photos/200/315' },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        layout="default"
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default MyCarousel;
*/
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ImageSlider from 'react-native-image-slider';


const MyCarousel = () => {
    const images = [
        'https://picsum.photos/200/310',
        'https://picsum.photos/200/320',
        'https://picsum.photos/200/330'
    ];

    return (
        <View style={{flex:1,}}>
        <View style={ styles.container }>
            <ImageSlider
                loopBothSides
                autoPlayWithInterval={ 3000 }
                images={ images }
            />
        </View>
        <Text>gggg</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 94,
        borderColor: 'red',
        borderWidth: 1
    },
});
export default MyCarousel;