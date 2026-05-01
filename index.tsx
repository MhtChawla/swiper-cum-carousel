import {
    ScrollView,
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    Animated,
    TextStyle,
    StyleProp,
    ViewStyle,
    NativeSyntheticEvent,
    NativeScrollEvent
} from 'react-native';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface SwiperCumCarouselProps {
    renderTitle?: string,
    titleStyle?: TextStyle,
    indexStyle?: TextStyle,
    buttonLeftText?: ReactNode,
    buttonRightText?: ReactNode,
    buttonLeftStyle?: StyleProp<ViewStyle>,
    buttonRightStyle?: StyleProp<ViewStyle>,
    renderNextButtonOnly?: boolean,
    pagingNavigation?: boolean,
    autoPlay?: boolean,
    autoPlayDuration?: number,
    buttonStyle?: StyleProp<ViewStyle>,
    buttonGroupStyle?: StyleProp<ViewStyle>,
    w?: number,
    loop?: boolean,
    animate?: "faded" | null,
    items?: number,
    buttonTextStyle?: TextStyle,
    showsIndex?: boolean,
    children: [ReactNode, ReactNode, ...ReactNode[]],
    showsScrollBar?: boolean,
    showsPagination?: boolean,
    showsButtons?: boolean,
    style?: StyleProp<ViewStyle>,
    pagingEnabled?: boolean,
    disablePrevButton?: boolean,
    disableNextButton?: boolean,
}

interface FadeAnimatedComponentProps {
    item: ReactNode,
    selected?: boolean,
    index?: number,
    ScreenWidth?: number,
    style?: StyleProp<ViewStyle>
}

const debounce = (func: () => void, timeout = 50) => {
    let timer: ReturnType<typeof setTimeout>;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func();
        }, timeout);
    };
};

const FadeAnimatedComponent = ({
    item,
    selected,
    index,
    ScreenWidth,
    style
}: FadeAnimatedComponentProps) => {
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
            fadeIn();
        } else {
            fadeOut();
        }
    }, [selected]);

    return (
        <Animated.View
            key={index}
            style={[{
                flex: 1,
                backgroundColor: 'white',
                alignItems: 'center',
                opacity: fadeAnim,
                width: ScreenWidth,
            }, style]}
        >
            {item}
        </Animated.View>
    );
};

const SwiperCumCarousel = (props: SwiperCumCarouselProps) => {
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
        pagingEnabled = true,
        disablePrevButton,
        disableNextButton
    } = props;

    const ScreenWidth = w ? w : Dimensions.get('window').width;
    const size = Math.ceil(children.length / (items ? items : 1));
    const scroll = React.useRef<ScrollView | null>(null);
    const [currentIndex, setIndex] = useState(1);

    const scrollToNext = useRef(() => {
        setIndex(prev => {
            const next = prev < size ? prev : 1;
            scroll.current?.scrollTo({
                x: (next < size ? next : 0) * ScreenWidth,
                animated: animate !== 'faded'
            });
            return next < size ? next + 1 : 1;
        });
    });

    const autoPlayDebounced = useRef(debounce(scrollToNext.current, autoPlayDuration || 2000));

    useEffect(() => {
        if (autoPlay) {
            autoPlayDebounced.current();
        }
    }, [currentIndex, autoPlay]);

    const ScrollEvent = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const px =
            event && event.nativeEvent && event.nativeEvent.contentOffset;
        setIndex(Math.round(px.x / ScreenWidth + 1));
    };

    const clickHandler = (num: number) => {
        if (currentIndex >= 1 && currentIndex <= size) {
            if (num === 1 && currentIndex < size) {
                scroll.current?.scrollTo({
                    x: currentIndex * ScreenWidth,
                    animated: animate !== 'faded'
                });
            } else if (num === -1 && currentIndex > 1) {
                scroll.current?.scrollTo({
                    x: ScreenWidth * (currentIndex - 2),
                    animated: animate !== 'faded'
                });
            }
        }

        if (loop) {
            if (num === 1 && currentIndex === size) {
                scroll.current?.scrollTo({
                    x: 0,
                    animated: animate !== 'faded'
                });
            } else if (num === -1 && currentIndex === 1) {
                scroll.current?.scrollTo({
                    x: (size - 1) * ScreenWidth,
                    animated: animate !== 'faded'
                });
            }
        }
    };

    const paginationScroll = (index: number) => {
        if (pagingNavigation) {
            scroll.current?.scrollTo({ x: index * ScreenWidth, animated: true });
        }
    };

    return (
        <View style={{ flex: 1, width: ScreenWidth }}>
            {renderTitle && (
                <Text
                    style={
                        {
                            margin: 5,
                            fontSize: 20,
                            color: 'red',
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            ...titleStyle
                        }
                    }
                >
                    {' '}
                    {renderTitle} {' '}
                </Text>
            )}
            {showsIndex && (
                <Text
                    style={
                        {
                            color: 'black',
                            alignSelf: 'center',
                            ...indexStyle
                        }
                    }
                >
                    {currentIndex} / {size}
                </Text>
            )}
            <View style={{ flex: 1, width: ScreenWidth }}>
                <ScrollView
                    style={{ flex: 1 }}
                    onScroll={ScrollEvent}
                    horizontal={true}
                    showsHorizontalScrollIndicator={showsScrollBar ?? false}
                    showsVerticalScrollIndicator={showsScrollBar ?? false}
                    persistentScrollbar={true}
                    pagingEnabled={pagingEnabled}
                    ref={scroll}
                >
                    {children.map((item, i) => {
                        return animate === 'faded' ? (
                            <FadeAnimatedComponent
                                key={i}
                                index={i}
                                item={item}
                                selected={currentIndex === i + 1}
                                ScreenWidth={ScreenWidth}
                                style={style}
                            />
                        ) : (
                            <View
                                key={i}
                                style={[{
                                    flex: 1,
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    opacity: 1,
                                    width: ScreenWidth / (items ? items : 1),
                                }, style]}
                            >
                                {item}
                            </View>
                        );
                    })}
                </ScrollView>
            </View>

            {showsPagination && (
                <View style={{ alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', display: 'flex' }}>
                        {new Array(size).fill("").map((_, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        opacity: index + 1 === currentIndex ? 1 : 0.4,
                                        flexDirection: 'row',
                                        margin: 5,
                                        alignSelf: 'center'
                                    }}
                                >
                                    <TouchableOpacity
                                        activeOpacity={pagingNavigation ? 0.2 : 1}
                                        onPress={() => paginationScroll(index)}
                                        style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: '#030104'
                                        }}
                                    />
                                </View>
                            );
                        })}
                    </View>
                </View>
            )}

            {showsButtons && (
                <View
                    style={[{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        margin: 20,
                    }, buttonGroupStyle]}
                >
                    {!renderNextButtonOnly ? (
                        <TouchableOpacity
                            disabled={!loop && (disablePrevButton || currentIndex === 1)}
                            onPress={() => clickHandler(-1)}
                            style={[{
                                alignSelf: 'center',
                                backgroundColor: 'red',
                                padding: 15,
                                borderRadius: 10,
                                opacity: !loop && (disablePrevButton || currentIndex === 1) ? 0.4 : 1,
                            }, buttonStyle, buttonLeftStyle]}
                            activeOpacity={0.6}
                        >
                            <Text
                                style={
                                    {
                                        textAlign: 'center',
                                        fontSize: 20,
                                        color: 'white',
                                        ...buttonTextStyle
                                    }
                                }
                            >
                                {buttonLeftText ?? 'BACK'}
                            </Text>
                        </TouchableOpacity>
                    ) : null}

                    <View style={{ margin: 10 }} />

                    <TouchableOpacity
                        onPress={() => clickHandler(+1)}
                        style={[{
                            alignSelf: 'center',
                            backgroundColor: 'red',
                            padding: 15,
                            borderRadius: 10,
                            opacity: !loop && (disableNextButton || currentIndex === size) ? 0.4 : 1,
                        }, buttonStyle, buttonRightStyle]}
                        activeOpacity={0.6}
                        disabled={!loop && (disableNextButton || currentIndex === size)}
                    >
                        <Text
                            style={
                                {
                                    textAlign: 'center',
                                    fontSize: 20,
                                    color: 'white',
                                    ...buttonTextStyle
                                }
                            }
                        >
                            {buttonRightText ?? 'NEXT'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default SwiperCumCarousel;
