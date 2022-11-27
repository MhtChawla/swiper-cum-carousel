import {View, Text, Image} from 'react-native';
import React from 'react';
import {Images} from '../assets/images'; //use your own images
import SwiperCumCarousel from 'swiper-cum-carousel'; 

const HomeScreen = () => {
  const Card = ({src, title, subtitle}) => {
    return (
      <View style={{alignItems: 'center', margin: 40, marginTop: 10}}>
        <Image source={src} style={{height: 300, width: 300}} />
        <Text
          style={{
            fontSize: 28,
            padding: 10,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {title}
        </Text>
        <Text style={{fontSize: 20, padding: 10, textAlign: 'center'}}>
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
      }}>
      <SwiperCumCarousel
        pagingNavigation
        buttonRightStyle={{paddingLeft: 80, paddingRight: 80}}
        buttonLeftStyle={{paddingLeft: 20, paddingRight: 20}}
        buttonRightText={<Text style={{fontWeight: '600'}}>Next</Text>}
        buttonLeftText={<Text style={{fontWeight: '600'}}>{'<'}</Text>}
        buttonStyle={{
          backgroundColor: 'purple',
          fontWeight: '700',
          backgroundColor: 'black',
        }}
        showsButtons
        showsPagination
        showsIndex
        titleStyle={{color: 'purple', fontStyle: 'italic', fontSize: 23}}
        renderTitle={"Let's get started"}>
        <Card
          src={Images.onboarding1}
          title="Select favorite font"
          subtitle="Quisque lobortis ultrices dolor, fringilla venenatis leo sodales at.
          Nam suscipit felis"
        />
        <Card
          src={Images.onboarding2}
          title="Copy/Paste your text"
          subtitle="Quisque lobortis ultrices dolor, fringilla venenatis leo sodales at.
        Nam suscipit felis"
        />
      </SwiperCumCarousel>
    </View>
  );
};

export default HomeScreen;
