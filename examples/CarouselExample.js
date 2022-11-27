import {View, Text, Image} from 'react-native';
import React from 'react';
import {Images} from '../assets/images'; //use your own images
import SwiperCumCarousel from 'swiper-cum-carousel';

const HomeScreen = () => {
  const Card = ({src, title, subtitle}) => {
    return (
      <View
        style={{
          // alignItems: 'center',
          // margin: 40,
          marginTop: 10,
          borderWidth: 2,
          borderRadius: 8,
          borderColor: '#e5e5e5',
          width: 150,alignItems:'center'
        }}>
        <Image source={src} style={{height: 150, width: 150,}} />
        <Text
          style={{
            fontSize: 14,
            padding: 5,
            fontWeight: '500',
            textAlign: 'center',
            width: '100%',
          }}>
          {title}
        </Text>
        <Text style={{fontSize: 14, paddingBottom: 5, textAlign: 'center'}}>
          {subtitle}
        </Text>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
        paddingBottom:280
      }}>
      <SwiperCumCarousel
        items={2.2}
        pagingEnabled={false}
        pagingNavigation
        showsPagination
        titleStyle={{color: 'purple', fontStyle: 'italic', fontSize: 23}}
        renderTitle={'Shop shampoo'}
        >
        <Card
          src={Images.product1}
          title="Dry Shampoo"
          subtitle="Quisque lobortis ultrices dolor, fringilla venenatis leo sodales at.
          Nam suscipit felis"
        />
        <Card
          src={Images.product2}
          title="Limcelo Shampoo"
          subtitle="Quisque lobortis ultrices dolor, fringilla venenatis leo sodales at.
          Nam suscipit felis"
        />
        <Card
          src={Images.product3}
          title="Ecoroot Shampoo"
          subtitle="Quisque lobortis ultrices dolor, fringilla venenatis leo sodales at.
          Nam suscipit felis"
        />
        <Card
          src={Images.product4}
          title="ColorMe Shampoo"
          subtitle="Quisque lobortis ultrices dolor, fringilla venenatis leo sodales at.
          Nam suscipit felis"
        />
        <Card
          src={Images.product5}
          title="Facial Kit"
          subtitle="Quisque lobortis ultrices dolor, fringilla venenatis leo sodales at.
          Nam suscipit felis"
        />
        <Card
          src={Images.product6}
          title="Darmadog Haircare"
          subtitle="Quisque lobortis ultrices dolor, fringilla venenatis leo sodales at.
          Nam suscipit felis"
        />
        <Card
          src={Images.product7}
          title="Ucuuba Face Cream"
          subtitle="Quisque lobortis ultrices dolor, fringilla venenatis leo sodales at.
          Nam suscipit felis"
        />
        <Card
          src={Images.product8}
          title="Sunflower Shampoo"
          subtitle="Quisque lobortis ultrices dolor, fringilla venenatis leo sodales at.
          Nam suscipit felis"
        />
      </SwiperCumCarousel>
    </View>
  );
};

export default HomeScreen;
