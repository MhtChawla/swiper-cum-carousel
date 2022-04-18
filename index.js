import { ScrollView, View, Dimensions, Text, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

const FadeAnimatedComponent = ({ item, selected, index, ScreenWidth, style }) => {

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start();
    };
    useEffect(() => {
        if (selected) {
            fadeIn()
        }
        else if (!selected)
            fadeOut()
    }, [selected])

    return (
        <Animated.View key={index} style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', scrollSnapAlign: 'start', transition: '0.6s ease', opacity: fadeAnim, width: ScreenWidth, ...style }} >
            {item}
        </Animated.View>
    );
}

const SwiperCumCarousel = (props) => {

    const {
        renderTitle,
        titleStyle,
        indexStyle,
        buttonLeftText,
        buttonRightText,
        buttonLeftStyle,
        buttonRightStyle,
        renderNextButtonOnly,
        pagingNavigation,
        autoPlay,
        autoPlayDuration,
        buttonStyle,
        buttonGroupStyle,
        w,
        loop,
        animate,
        items,
        buttonTextStyle,
        showsIndex,
        children,
        showsScrollBar,
        showsPagination,
        showsButtons,
        style,
        pagingEnabled,
        disablePrevButton,
        disableNextButton } = props;

    const ScreenWidth = w ? w : (Dimensions.get('window').width);
    const size = Math.ceil((children.length) / (items ? items : 1));
    const scroll = React.useRef();
    const [currentIndex, setIndex] = useState(1);

    const autoPlayFunc = debounce((e) => f1(e), autoPlayDuration ? autoPlayDuration : 2000);
    useEffect(() => {
        autoPlay && autoPlayFunc()
    }, [currentIndex])
    const f1 = () => {

        if (currentIndex < size)
            scroll.current?.scrollTo({ x: (currentIndex * ScreenWidth), animated: animate == 'faded' ? false : true })
        else if (currentIndex == size) {
            scroll.current?.scrollTo({ x: 0, animated: animate == 'faded' ? false : true })
        }
    }
    function debounce(func, timeout = 50) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }


    const ScrollEvent = (event) => {
        const px = (event && event.nativeEvent && event.nativeEvent.contentOffset);
        setIndex(Math.round((px.x / ScreenWidth) + 1));
    }

    const clickHandler = (num) => {
        currentIndex >= 1 && currentIndex <= size ?
            ((num == 1) && (currentIndex < size) ?
                (scroll.current.scrollTo({ x: (currentIndex * ScreenWidth), animated: animate == 'faded' ? false : true })) :
                (num == -1) && (currentIndex > 1) ?
                    (scroll.current.scrollTo({ x: (ScreenWidth * (currentIndex - 2)), animated: animate == 'faded' ? false : true })) : null) : null

        loop ?
            (num == 1 && currentIndex == size ? scroll.current.scrollTo({ x: 0, animated: animate == 'faded' ? false : true }) :
                num == -1 && currentIndex == 1 ? scroll.current.scrollTo({ x: (size - 1) * ScreenWidth, animated: animate == 'faded' ? false : true }) : null)
            : null
    }

    const paginationScroll = (index) => {
        console.log(index);
        console.log(currentIndex)
        pagingNavigation && scroll.current.scrollTo({ x: (index * ScreenWidth), animated: true });
    }

    return (
        <View style={{ flex: 1, width: ScreenWidth }} >
            {renderTitle && <Text style={{ margin: 5, fontSize: 20, color: 'red', alignSelf: 'center', fontWeight: 'bold', fontFamily: 'urbanist', textTransform: 'uppercase', ...titleStyle }}> {renderTitle} </Text>}
            {showsIndex &&
                <Text style={{ color: 'black', alignSelf: 'center', ...indexStyle }}>{currentIndex}/{size}</Text>}
            <View style={{ flex: 1, width: ScreenWidth }}>
                <ScrollView
                    style={{ flex: 1, scrollBehavior: animate == 'faded' ? null : 'smooth' }}
                    onScroll={ScrollEvent} horizontal={true}
                    showsHorizontalScrollIndicator={showsScrollBar ? showsScrollBar : false}
                    showsVerticalScrollIndicator={showsScrollBar ? showsScrollBar : false}
                    persistentScrollbar={true} pagingEnabled={pagingEnabled ? pagingEnabled : true} ref={scroll}>
                    {children.map((item, i) => {
                        return (
                            animate == 'faded' ?
                                <FadeAnimatedComponent index={i} item={item} selected={currentIndex === (i + 1)} key={i} ScreenWidth={ScreenWidth} style={style} />
                                : <View key={i} index={i} style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', opacity: 1, width: ((ScreenWidth) / (items ? items : 1)), ...style }}>
                                    {item}
                                </View>)
                    })}
                </ScrollView>
            </View>

            {showsPagination && (<View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', display: 'flex', }}>
                    {new Array(size).fill().map((_, index) => {
                        return <View key={index} style={{ opacity: index + 1 == currentIndex ? 1 : 0.4, flexDirection: 'row', margin: 5, alignSelf: 'center' }}>
                            <TouchableOpacity activeOpacity={!pagingNavigation ? 1 : null} onPress={() => paginationScroll(index)} style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#030104' }} />
                        </View>
                    })}
                </View>
            </View>)}

            {showsButtons && (
                <View style={{ flexDirection: 'row', alignSelf: 'center', margin: 20, ...buttonGroupStyle }} >
                    {!renderNextButtonOnly ? <TouchableOpacity disabled={!loop && (disablePrevButton || currentIndex) == 1 ? true : false} onPress={() => clickHandler(-1)} style={{
                        alignSelf: 'center', backgroundColor: 'red', padding: 15, borderRadius: 10, opacity: (!loop && (disablePrevButton || currentIndex == 1) ? 0.4 : 1), ...
                        buttonStyle, ...buttonLeftStyle
                    }} activeOpacity={0.6}  >
                        <Text style={{ textAlign: 'center', fontSize: 20, color: 'white', ...buttonTextStyle }}>
                            {buttonLeftText ? buttonLeftText : 'BACK'}
                        </Text>
                    </TouchableOpacity> : null}

                    <View style={{ margin: 10 }} />

                    <TouchableOpacity onPress={() => clickHandler(+1)} style={{
                        alignSelf: 'center', backgroundColor: 'red', padding: 15, borderRadius: 10, opacity: (!loop && (disableNextButton || currentIndex == size) ? 0.4 : 1), ...
                        buttonStyle, ...buttonRightStyle
                    }} activeOpacity={0.6} disabled={!loop && (disableNextButton || currentIndex == size) ? true : false} >
                        <Text style={{ textAlign: 'center', fontSize: 20, color: 'white', ...buttonTextStyle }}>
                            {buttonRightText ? buttonRightText : 'NEXT'}
                        </Text>
                    </TouchableOpacity></View>)
            }
        </View >
    )
}

export default SwiperCumCarousel