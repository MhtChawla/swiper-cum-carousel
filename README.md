# Swiper/Carousel for React Native 
![stack](https://img.shields.io/badge/tech-react%20native-critical) ![license](https://img.shields.io/badge/Licensed-ISC-blue) 
## (swiper-cum-carousel)

### Flexible, lightweight and fully customizable Swiper as well as Carousel wrapper for your React Native app components,images or cards.

# Important

Swiper made for react native, basically a wrapper to wrap around your components/children & use it as a slider/slideshow/swiper, (e.g. best for onboarding screens). It can also be used as carousel displaying multiple components in single view at a time, (e.g. best for product cards of flipkart/ecommerce). Thus, 2 in 1 premade swiper cum carousel for ease in React Native. (examples on git repo)

<div>
  <div style={{flexDirection:'row',alignItems:'center',justifyContent:'center',flex:1}}>
    <img src="https://github.com/MhtChawla/glimpse-of-mywork/blob/main/swiper-cum-carousel/FingerSwipe.gif" width="300" />
    <img src="https://github.com/MhtChawla/glimpse-of-mywork/blob/main/swiper-cum-carousel/CarouselCards.gif" width="500" />
  </div>
   <div>
    <img src="https://github.com/MhtChawla/glimpse-of-mywork/blob/main/swiper-cum-carousel/FadingAnimation.gif" width="250" />
    <img src="https://github.com/MhtChawla/glimpse-of-mywork/blob/main/swiper-cum-carousel/PaginationSwipe.gif" width="250" />
    <img src="https://github.com/MhtChawla/glimpse-of-mywork/blob/main/swiper-cum-carousel/ButtonSwipe.gif" width="250" />
    <img src="https://github.com/MhtChawla/glimpse-of-mywork/blob/main/swiper-cum-carousel/Autoplay.gif" width="250" />
    <img src="https://github.com/MhtChawla/glimpse-of-mywork/blob/main/swiper-cum-carousel/CarouselCardsWithPagingEnabled.gif" width="350" />
  </div>
</div>

# Installation
1. ```npm i swiper-cum-carousel``` </br>
or </br>
```yarn add swiper-cum-carousel```

2. ```cd ios && pod install```

# Use

```sh
import SwiperCumCarousel from 'swiper-cum-carousel'
```

```sh
<SwiperCumCarousel>
..two or more children
</SwiperCumCarousel>
```

# Props

<table>
<tbody>
<tr>
<td><strong>Name&nbsp;</strong></td>
<td><strong>Description&nbsp;</strong></td>
</tr>
<tr>
<td>w</td>
<td>width of the wrapper (give width here {200},{300} etc)</td>
</tr>
<tr>
<td>renderTitle</td>
<td>renders a title to the wrapper's top (give name in '..')</td>
</tr>
<tr>
<td>titleStyle</td>
<td>gives style to title</td>
</tr>
<tr>
<td>autoPlay</td>
<td>autoplays the swiper as slideshow</td>
</tr>
<tr>
<td>autoPlayDuration</td>
<td>duration of autoplay (givr timing here 2000,3000 etc)</td>
</tr>
<tr>
<td>style</td>
<td>styling for the wrapper</td>
</tr>
<tr>
<td>loop</td>
<td>infitive slideshows, works upon button click or autoplay on but doesn't work on manual finger swiper</td>
</tr>
<tr>
<td>pagingEnabled</td>
<td>default it is true, but we can set false</td>
</tr>
<tr>
<td>showsScrollBar</td>
<td>shows a scrollbar at bottom of wrapper</td>
</tr>
<tr>
<td>showsIndex</td> 
<td>shows index (which slide no.) is currently visible to user</td>
</tr>
<tr>
<td>indexStyle</td>
<td>gives styling to index</td>
</tr>
<tr>
<td>showsPagination</td>
<td>render pagination at bottom of wrapper (dots)</td>
</tr>
<tr>
<td>pagingNavigation</td>
<td>navigate to the slide through clicking on pagination dots</td>
</tr>
<tr>
<td>showsButtons</td>
<td>render buttons</td>
</tr>
<tr>
<td>buttonLeftText</td>
<td>give your button title (or component) to change left button label</td>
</tr>
<tr>
<td>buttonGroupStyle</td>
<td>gives styling to group of buttons (collectively)</td>
</tr>
<tr>
<td>buttonStyle</td>
<td>gives styling to every button</td>
</tr>
<tr>
<td>buttonRightText</td>
<td>give your button title (or component) to change right button label</td>
</tr>
<tr>
<td>buttonLeftStyle</td>
<td>gives styling to left button</td>
</tr>
<tr>
<td>buttonRightStyle</td>
<td>gives styling to right button</td>
</tr>
<tr>
<td>renderNextButtonOnly</td>
<td>renders only Next button & make th Previous button invisible (showsButtons prop needs to be stated true along)</td>
</tr>
<tr>
<td>buttonTextStyle</td>
<td>gives common styling to text of all buttons</td>
</tr>
<tr>
<td>disablePrevButton</td>
<td>Both button will be shown but Previous Button won't work</td>
</tr>
<tr>
<td>disableNextButton</td>
<td>Both button will be shown but Next Button won't work</td>
</tr>
<tr>
<td>animate</td>
<td>state is to 'faded' & fading animation will be applied (works good with autoplay,pagination click or button click)</td>
</tr>
<tr>
<td>items</td>
<td>give it a number {2},{3},{4} etc & carousel will be automatically enabled (giving it {1.2},{1.5},{2.5} shows some portion/percentage of view accordingly) - [many props might not work good when using this prop since it changes swiper to carousel]</td>
</tr>
</tbody>
</table>

Contact me at mohit.chawla@workmail.com

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/mohit.chawla)
