import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from 'react-native-elements';
import VideoPlayer from 'react-native-video-player';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { withNavigation } from 'react-navigation';
import { Searchbar } from 'react-native-paper';
import { Video } from 'expo-av';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native';
import CountryPicker, { getAllCountries, getCallingCode } from 'react-native-country-picker-modal';
import Modal from 'react-native-modal';
import SwitchToggle from '@dooboo-ui/native-switch-toggle';
import ToggleSwitch from 'toggle-switch-react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FlashcardScreen from '../screens/FlashcardScreen';

import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Dimensions,
    ImageBackground,
    Picker,
    StatusBar
} from 'react-native';

function * range (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

const MAX_POINTS = 500;

export default class TestResultsScreen extends React.Component {
    constructor (props) {
       super(props)
        
       this.state = {
         cards: [...range(1, 15)],
         swipedAllCards: false,
         swipeDirection: [],
         cardIndex: 0,
         correctCards: 0,
         incorrectCards: 0,
         points: 325,
         reset: false,
         cardLength: 0,
         score: 0
        }
     }
    

    
    returnBack() {
        const { navigation } = this.props
               console.log(navigation);
        navigation.state.params.onResetCards();
        this.props.navigation.goBack()
    }
    
    data=[{
        imageUrl: require('../assets/images/testResultsImage.png'),
        description: 'Retro occupy organic, stump town shabby chic pour-over roof party DIY normcore.',
        },
        {
        imageUrl: require('../assets/images/testResultsImage.png'),
        description: 'Retro occupy organic, stump town shabby chic pour-over roof party DIY normcore.',
        },
        {
        imageUrl: require('../assets/images/testResultsImage.png'),
        description: 'Retro occupy organic, stump town shabby chic pour-over roof party DIY normcore.',
        },
        {
        imageUrl: require('../assets/images/testResultsImage.png'),
        description: 'Retro occupy organic, stump town shabby chic pour-over roof party DIY normcore.',
        },
        {
        imageUrl: require('../assets/images/testResultsImage.png'),
        description: 'Retro occupy organic, stump town shabby chic pour-over roof party DIY normcore.',
        },]

    
    renderItem = ({item}) => (
                              
                            <View style={{
                                top: 0,
                                position: 'relative',
                                boxSizing: 'border-box',
                                height: '100%',
                                width: 239,
                                border: '0.5px solid #EF4036',
                                borderRadius: 5,
                                backgroundColor: '#FFFFFF',
                                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                                borderWidth: .5,
                                borderColor: '#EF4036',
                                marginRight: 28,
                            }}>
                              <View style={{
                                  flexDirection: 'column',
                                  top: 27.25,
                                    width: '100%',
                                  position: 'absolute',
                                  height: 190,
                                  alignItems: 'center',
                              }}>
                              <Image style={{
                               height: 113.96,
                               width: 194.53,
                               
                               borderRadius: 5,
                               top: 0
                               }} source={item.imageUrl}/>
                              <Text style={{
                                 
                                  width: 185.27,
                                  color: '#A9ABB8',
                                  fontFamily: 'SFNSDisplay',
                                  fontSize: 12,
                                  lineHeight: 18,
                                  textAlign: 'justify',
                                  top: 13,
                              }}
                              numberOfLines={3}>Retro occupy organic, stump town shabby chic pour-over roof party DIY normcore.</Text>
                              
                              <View style={{
                              height: 39,
                              width: 188.98,
                              top: 13+25.94,
                              }}>
                              <TouchableOpacity style={{
                                  height: 39,
                                  width: 72,
                                  top: 0,
                                  left: 0,
                                  position: 'absolute',
                                  alignItems: 'center',
                                   flexDirection: 'column',
                              }}>
                              <Image style={{
                                           top: 0,
                                           width: 18.53,
                                           height: 15,
                                           }}
                                           source={require('../assets/Icons/correct-symbol.png')}/>
                              <Text style={{
                                  height: 18,
                                  color: '#0DB09F',
                                  fontFamily: 'SFNSDisplay',
                                  fontSize: 12,
                                  lineHeight: 18,
                                  textAlign: 'center',
                                  top: 5.65
                              }}>
                              Retro occupy
                              </Text>
                              </TouchableOpacity>
                              
                              <TouchableOpacity style={{
                                                      height: 39,
                                                      width: 67,
                                                      top: 0,
                                                      right: 0,
                                                      position: 'absolute',
                                                      alignItems: 'center',
                                                      flexDirection: 'column',
                                                  }}>
                                                  <Image style={{
                                                               top: 0,
                                                               width: 17,
                                                               height: 17,
                                                               }}
                                                               source={require('../assets/Icons/cancel-mark.png')}/>
                                                  <Text style={{
                                                      height: 18,
                                                      color: '#EF4036',
                                                      fontFamily: 'SFNSDisplay',
                                                      fontSize: 12,
                                                      lineHeight: 18,
                                                      textAlign: 'center',
                                                      top: 3.65
                                                  }}>
                                                  Portland ug.
                                                  </Text>
                                                  </TouchableOpacity>
                              </View>
                            </View>
                        </View>
                    );
    
      
    


    render() {
        const { width } = Dimensions.get('window');
        const height = Dimensions.get('window').height
        const fill = (this.state.points / MAX_POINTS) * 100;

        return (
                <SafeAreaView>
                  <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Subjects')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 17}} activeOpacity={0}>
                  <Image style={{height: 11.67, width: 11.67, position: 'relative', top: 4.17, left: 4.17, zIndex: 0}} source={require('../assets/Icons/cancel_left.png')}/>
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row', position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center', top: Platform.OS === 'android' ? 25+18 : 18}}>
                  <Text style={{
                  
                  width: '44.93%',
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay-Bold',
                  fontSize: 16,
                  lineHeight: 18,
                  textAlign: 'center'}}>
                  Test results
                  </Text>
                  </View>
                
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: height * .3798,
                    width: width,
                    flexDirection: 'row',
                    position: 'absolute',
                top: Platform.OS === 'android' ? 25+(height * .0946) : height * .0946
                }}>
          
                <AnimatedCircularProgress
                  size={width * .4187}
                  width={9}
                  backgroundWidth={9}
                  fill={(100-(((this.props.navigation.state.params.incorrectCards/this.props.navigation.state.params.cardLength).toFixed(2))*100))}
                  tintColor="#0DB09F"
                  tintColorSecondary="#0DB09F"
                  backgroundColor="#E1E1E1"
                  arcSweepAngle={270}
                  rotation={225}
                  lineCap="round"
                style={{
                top: 0,
                position: 'absolute'
                }}
                />
                
                <Text style={{
                    height: (height * .0182)+1,
                    color: '#A9ABB8',
                    fontFamily: 'SFNSDisplay',
                    fontSize: 14,
                    lineHeight: 17,
                    top: height * .0513,
                    textAlign: 'center',
                    position: 'absolute'
                }}>Your score
                </Text>
                
                <Text style={{
                    height: height * .0627,
                    color: '#0DB09F',
                    fontFamily: 'SFNSDisplay-Bold',
                    fontSize: 48,/*height * .0547,*/
                    top: height * .0825,
                    lineHeight: 52,/*height * .0639,*/
                    textAlign: 'center',
                    position: 'absolute'
                }}>
                {(100-(((this.props.navigation.state.params.incorrectCards/this.props.navigation.state.params.cardLength).toFixed(2))*100))}
                </Text>
                
                <Text style={{
                    height: (height * .0319)+3,
                    color: '#1A1C36',
                    fontFamily: 'SFNSDisplay-Bold',
                    fontSize: height * .0274,
                    lineHeight: height * .0319,
                    textAlign: 'center',
                    top: height * .2167,
                    position: 'absolute'
                }}>
                Keep studying!
                </Text>
                
                <Text style={{
                    height: height * .0205,
                    color: '#A9ABB8',
                    fontFamily: 'SFNSDisplay',
                    fontSize: height * .0182,
                    lineHeight: height * .0205,
                    textAlign: 'center',
                    top: height * .26847,
                    position: 'absolute'
                }}>
                You missed {this.props.navigation.state.params.incorrectCards} out of {this.props.navigation.state.params.cardLength} questions
                </Text>
                
                <TouchableOpacity style={{
                    height: height * .0616,
                    width: '73.33%',
                    borderRadius: 27,
                    backgroundColor: '#0DB09F',
                    top: height * .31896,
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={ () => {this.returnBack()/*navigate('Flashcard'); new FlashcardScreen().onResetCards();*/}}>

                <Text style={{
                    height: height * .0205,
                    color: '#FFFFFF',
                    fontFamily: 'SFNSDisplay-Bold',
                    fontsize: 15,
                    lineHeight: 18,
                    textAlign: 'center',
                    position: 'absolute',
                    /*top: height * .0217,*/
                }}>
                RETAKE
                </Text>
                </TouchableOpacity>
                
                <View style={{
                    shadowOffset:{  width: 0,  height: 0,  },
                    shadowColor: '#000000',
                    shadowOpacity: .1,
                    shadowRadius: 70,
                    elevation: 5,
                    top: height * .4273,
                    height: height * .3575,
                    width: width,
                    position: 'absolute'
                }}>
                <FlatList style={{
                    top: 0,
                    width: '100%',
                    position: 'absolute',
                    height: 291,
                    paddingHorizontal: 28,
                  }}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={this.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
              />
                </View>
                </View>
                </View>
              </SafeAreaView>
                );
    }
}

TestResultsScreen.navigationOptions = {
    title: '',
    header: null,
    tabBarVisible: false,
};

const RootStack = createStackNavigator(
                                       {
                                            TestResults: TestResultsScreen
                                       },{
                                            initialRouteName: 'Subjects',
                                       },{
                                            defaultNavigationOptions: {
                                                header: {
                                                    style: {
                                                        elevation: 0,
                                                        shadowOpacity: 0,
                                                        borderBottomWidth: 0,
                                                        },
                                                    },
                                                },
                                            }
                                       );



/*export default RootStack;*/
/*const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}*/


const styles = StyleSheet.create({
                                 container: {
                                 
                                 /*backgroundColor: '#fff',*/
                                 backgroundColor: '#fff',
                                 },
                                 container2: {
                                 
                                 backgroundColor: 'green',
                                 
                                 }, card: {
                                    flex: 1,
                                    borderRadius: 4,
                                    borderWidth: 2,
                                    borderColor: '#E8E8E8',
                                    justifyContent: 'center',
                                    backgroundColor: 'white'
                                  },
                                  text: {
                                    textAlign: 'center',
                                    fontSize: 50,
                                    backgroundColor: 'transparent'
                                  },
                                  done: {
                                    textAlign: 'center',
                                    fontSize: 30,
                                    color: 'white',
                                    backgroundColor: 'transparent'
                                  },
                                 
                                 viewContainer: {
                                 flexDirection:'row',
                                 flexWrap: 'wrap',
                                 alignItems: 'flex-start',
                                 flex: 1
                                 },
                                 developmentModeText: {
                                 marginBottom: 20,
                                 color: 'rgba(0,0,0,0.4)',
                                 fontSize: 14,
                                 lineHeight: 19,
                                 textAlign: 'center',
                                 },
                                 contentContainer: {
                                 paddingTop: 0,
                                 },
                                 welcomeContainer: {
                                 alignItems: 'center',
                                 marginTop: 10,
                                 marginBottom: 20,
                                 },
                                 welcomeImage: {
                                 width: 100,
                                 height: 80,
                                 resizeMode: 'contain',
                                 marginTop: 3,
                                 marginLeft: -10,
                                 },
                                 getStartedContainer: {
                                 alignItems: 'center',
                                 marginHorizontal: 50,
                                 },
                                 homeScreenFilename: {
                                 marginVertical: 7,
                                 },
                                 codeHighlightText: {
                                 color: 'rgba(96,100,109, 0.8)',
                                 },
                                 codeHighlightContainer: {
                                 backgroundColor: 'rgba(0,0,0,0.05)',
                                 borderRadius: 3,
                                 paddingHorizontal: 4,
                                 },
                                 getStartedText: {
                                 fontSize: 17,
                                 color: 'rgba(96,100,109, 1)',
                                 lineHeight: 24,
                                 textAlign: 'center',
                                 },
                                 subjects: {
                                 height: 31,
                                 top: 34,
                                 left: '6.67%',
                                 width: '30%',
                                 color: '#1A1C36',
                                 fontFamily: 'SFNSDisplay-Bold',
                                 fontSize: 24,
                                 lineHeight: 28,
                                 },
                                 info: {
                                 height: 104,
                                 width: 155,
                                 left: 54,
                                 },
                                 videoPlayer: {
                                 width: 320,
                                 height: 186,
                                 position: 'relative',
                                 left: 28,
                                 top: 192.8,
                                 },
                                 whatYouWantToLearn: {
                                 height: 22,
                                 width: '88.13%',
                                 color: '#A9ABB8',
                                 fontFamily: 'SFNSDisplay',
                                 fontSize: 14,
                                 lineHeight: 17,
                                 position: 'relative',
                                 height: 22,
                                 left: 27,
                                 top: 37,
                                 },
                                 tabBarInfoContainer: {
                                 position: 'relative',
                                 bottom: 0,
                                 left: 0,
                                 right: 0,
                                 ...Platform.select({
                                                    ios: {
                                                    shadowColor: 'black',
                                                    shadowOffset: { width: 0, height: -3 },
                                                    shadowOpacity: 0.1,
                                                    shadowRadius: 3,
                                                    },
                                                    android: {
                                                    elevation: 20,
                                                    },
                                                    }),
                                 alignItems: 'center',
                                 backgroundColor: '#fbfbfb',
                                 paddingVertical: 20,
                                 },
                                 tabBarInfoText: {
                                 fontSize: 17,
                                 color: 'rgba(96,100,109, 1)',
                                 textAlign: 'center',
                                 },
                                 navigationFilename: {
                                 marginTop: 5,
                                 },
                                 helpContainer: {
                                 marginTop: 15,
                                 alignItems: 'center',
                                 },
                                 helpLink: {
                                 paddingVertical: 15,
                                 },
                                 helpLinkText: {
                                 fontSize: 14,
                                 color: '#2e78b7',
                                 },
                                 });

