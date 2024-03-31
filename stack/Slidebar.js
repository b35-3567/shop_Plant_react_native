import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Slidebar = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showDots, setShowDots] = useState(false);
    const images = [
        'https://picsum.photos/200/310',
        'https://picsum.photos/200/320',
        'https://picsum.photos/200/330'
    ];

    useEffect(() => {
        setShowDots(true);
    }, []);

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleSelectImage = (index) => {
        setCurrentIndex(index);
    };

    return (
        <View style={ styles.container }>
            <TouchableOpacity onPress={ handlePrevious } style={ styles.navigation }>
                <Icon name="angle-left" size={ 30 } color="black" />
            </TouchableOpacity>
            <ScrollView horizontal showsHorizontalScrollIndicator={ false } contentContainerStyle={ styles.scrollViewContent } >
                <TouchableOpacity
                    onPress={ () => handleSelectImage(currentIndex) }
                >
                    <Image source={ { uri: images[currentIndex] } } style={ styles.image } />
                </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity onPress={ handleNext } style={ styles.navigation }>
                <Icon name="angle-right" size={ 30 } color="black" />
            </TouchableOpacity>
            { showDots && (
                <View style={ styles.dotsContainer }>
                    { images.map((_, index) => (
                        <TouchableOpacity
                            key={ index }
                            onPress={ () => handleSelectImage(index) }
                        >
                            <View style={ [styles.dot, index === currentIndex && styles.activeDot] } />
                        </TouchableOpacity>
                    )) }
                </View>
            ) }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        // justifyContent: 'center'
    },
    navigation: {
        paddingHorizontal: 10,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center', // Đảm bảo ảnh nằm giữa theo chiều ngang
    },
    image: {
        width: 337,
        height: 270,
        marginRight: 10,
        borderRadius: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'gray',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: 'blue',
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        justifyContent: 'center',
    },
});

export default Slidebar;
