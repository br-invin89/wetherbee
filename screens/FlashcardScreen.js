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
import Swiper from 'react-native-deck-swiper';
import TestResultsScreen from '../screens/TestResultsScreen';
import Functions from '../functions';

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
    StatusBar,
    AsyncStorage
} from 'react-native';

function * range (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

function incrementIndex(questions) {
    return (previousState, currentProps) => {
        console.log(previousState.currentIndex + " - " + questions.length)
        if (previousState.currentIndex < questions.length-1){

                      return { ...previousState,
                                    currentIndex: previousState.currentIndex + 1,
                                    currentQuestion: questions[previousState.currentIndex + 1].DESCRIPTION,
                                    currentAnswer: questions[previousState.currentIndex + 1].ANSWER,
                                    currentImage: questions[previousState.currentIndex + 1].IMAGE,
                                    currentQuestionId: questions[previousState.currentIndex + 1].ID,
                                    currentQuestionType: questions[previousState.currentIndex + 1].TYPE
                                };
        }
    };
}


function decrementIndex(questions) {
    return (previousState, currentProps) => {
        console.log(previousState.currentIndex + " - " + questions.length)
        if (previousState.currentIndex > 0){

                      return { ...previousState,
                                    currentIndex: previousState.currentIndex - 1,
                                    currentQuestion: questions[previousState.currentIndex - 1].DESCRIPTION,
                                    currentImage: questions[previousState.currentIndex - 1].IMAGE,
                                };
        }
    };
}

function initialLoad(questions) {
    return (previousState, currentProps) => {
        console.log(previousState.currentIndex + " - " + questions.length)
    

                      return { ...previousState,
                                    currentIndex: 0,
                                    questions: questions,
                                    currentQuestion: questions[0].DESCRIPTION,
                                    currentAnswer: questions[0].ANSWER,
                                    currentImage: questions[0].IMAGE,
                                    currentQuestionId: questions[0].ID,
                                    currentQuestionType: questions[0].TYPE
                                };
        
    };
}


export default class FlashcardScreen extends React.Component {
    constructor (props) {
       super(props)
        
       this.state = {
         swipedAllCards: false,
         swipeDirection: [],
         cardIndex: 0,
         correctCards: 0,
         incorrectCards: 0,
         reset: false,
         answer: '',
         questions: [],
         cards: [...range(1, 4)],
         currentIndex: 0,
         currentQuestion: '',
         currentAnswer: '',
         currentImage: '',
         currentQuestionType: null
        }
        this.onResetCards = this.onResetCards.bind(this);
     }
    
    componentDidMount(){
        console.log(this.props.navigation.state.params.currentTerm)
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
        console.log("******")
        AsyncStorage.getItem('access_token').then((token) => {
        console.log("******")
        console.log("CURRENT TERM => " + this.props.navigation.state.params.currentTerm)
        Functions.fetchQuestions(token, this.updateQuestions, this.props.navigation.state.params.currentTerm)
     })
   });
   }
    
    updateQuestions = (questions) => {
         this.setState(initialLoad(questions))
         console.log(this.state.questions)
    }
     
    nextCard = () => {
         this.setState(incrementIndex(this.state.questions))
    }
    
    previousCard = () => {
        this.setState(decrementIndex(this.state.questions))
    }
     
 
   
    
    renderCard = (questions, index) => {
        console.log("index => " + index)
        var question = ''
       console.log("questions => " + questions)

       return (
                       <View style={{
                               top: 0,
                               left: 0,
                               position: 'absolute',
                               width: '100%',
                               borderRadius: 5,
                               backgroundColor: 'rgba(26,28,54,0.31)',
                               height: 380,
                            }}>
                       <Image style={{height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, borderRadius: 5,}} source={require('../assets/images/cardBG.png')}/>
                       <Text style={{
                               height: 82,
                               width: '87.74%',
                               color: '#FFFFFF',
                               fontFamily: 'SFNSDisplay',
                               fontSize: 12,
                               lineHeight: 18,
                               textAlign: 'justify',
                               left: '6.13%',
                               top: 223,
                               position: 'absolute'
               }}>{questions}</Text>
                       <View style={{
                                height: 56,
                                width: '100%',
                                backgroundColor: '#FFFFFF',
                                bottom: 0,
                                position: 'absolute',
                                borderBottomLeftRadius: 5,
                                borderBottomRightRadius: 5,
                           }}>
                       <View style={{top: 17, width: '100%', position: 'absolute', flexDirection: 'row', height: 24}}>
                       <TouchableOpacity onPress={() => this.props.navigation.navigate('')} style={{height: 24, width: 24, position: 'absolute', left: 23, zIndex:1, top: 0}} activeOpacity={0}>
                        <Image style={{height: 17.54, width: 18, position: 'relative', top: 3.23, left: 3, zIndex: 0}} source={require('../assets/Icons/cardAudio.png')}/>
                        </TouchableOpacity>
                       
                       <TouchableOpacity onPress={() => this.props.navigation.navigate('')} style={{height: 20, width: 20, position: 'absolute', left: 200, zIndex:1, top: 1}} activeOpacity={0}>
                      <Image style={{height: 20, width: 20, position: 'relative', top: 0, left: 0, zIndex: 0}} source={require('../assets/Icons/cardStar.png')}/>
                      </TouchableOpacity>
                       </View>
                       </View>
                    {this.updateCard(index)}
                 </View>
               )
     };

     onSwiped = (type) => {
         if(type == 'right'){
             this.nextCard();
             this.setState({swipeDirection: [...this.state.swipeDirection, 'right']})
             this.setState({ correctCards: this.state.correctCards + 1})
             console.log(`on swiped ${type}`)
             console.log(`swipeDirections ${this.state.swipeDirection}`)
             console.log("right>"+ this.state.correctCards + " left> " + this.state.incorrectCards + ",index" + this.state.cardIndex + "length"  + this.state.cards.length )
             if(this.state.currentIndex == this.state.questions.length-1){
               this.props.navigation.navigate('TestResults', {
               incorrectCards: this.state.incorrectCards, cardLength: this.state.questions.length, onResetCards: this.onResetCards.bind(this) })
             }
         }else if(type == 'left'){
             this.nextCard();
             this.setState({swipeDirection: [...this.state.swipeDirection, 'left']})
             this.setState({ incorrectCards: this.state.incorrectCards + 1})
             console.log(`on swiped ${type}`)
             console.log(`swipeDirections ${this.state.swipeDirection}`)
             console.log("right>"+ this.state.correctCards + " left> " + this.state.incorrectCards + ",index" + this.state.cardIndex + "length"  + this.state.cards.length )

             if(this.state.currentIndex == this.state.questions.length-1){
                this.props.navigation.navigate('TestResults', {
               incorrectCards: this.state.incorrectCards, cardLength: this.state.questions.length, onResetCards: this.onResetCards.bind(this) })
             }
         }
     }

     onSwipedAllCards = () => {
       this.setState({
         swipedAllCards: true
       })
     };

     swipeLeft = () => {
       this.swiper.swipeLeft()
     };
    
    
     updateCard = (index) => {
           this.setState({cardIndex: index})
       };
       
     onSwipeBack = () => {
         console.log('swipeBack')
         this.previousCard();
         let swipeDirection = this.state.swipeDirection.pop()
         
           if(swipeDirection == 'right'){
               this.setState({ correctCards: this.state.correctCards - 1})
           }else if(swipeDirection == 'left'){
               this.setState({ incorrectCards: this.state.incorrectCards - 1})
           }
       };

    onResetCards() {
        console.log("====> onResetCard")
        this.swiper.jumpToCardIndex(0);
        this.setState({cardIndex: 0})
        this.setState({correctCards: 0})
        this.setState({incorrectCards: 0})
        this.setState({swipeDirection: []})
        this.setState({swipedAllCards: false})
    }
    
 
    
    render() {
        const { width } = Dimensions.get('window');
        const height = Dimensions.get('window').height
        console.log('aaa')
        console.log(this.state.questions)
        var temp = [];
        
        for (var i = 0; i < this.state.questions.length; i ++) {
                console.log("test " + this.state.questions[i])
                temp.push(this.state.questions[i].DESCRIPTION)
        }
        
        console.log(this.state.cards)
        console.log(temp.length)
        console.log(temp)
                
                  /*<ImageBackground source={require('../assets/images/cardScreenBG.png')} style={{
                                  height: height,
                                  width: width,
                                  resizeMode: "contain",
                                  overflow: "hidden",
                     flex: 1}}>*/
               return (
                       
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Subjects')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 17}} activeOpacity={0}>
                <Image style={{height: 11.67, width: 11.67, position: 'relative', top: 4.17, left: 4.17, zIndex: 0}} source={require('../assets/Icons/cancel_left.png')}/>
                </TouchableOpacity>
        
                <View style={{
                left: 0,
                width: '100%',
                height: 18,
                position: 'absolute',
                top: Platform.OS === 'android' ? 25+19 : 19,
                }}>
                <Image style={{
                left: '23.46%',
                top: 0,
                width: 20,
                height: 16,
                position: 'absolute'
                }}
                source={require('../assets/Icons/correct-symbol.png')}/>
                
                <Text style={{
                height: 18,
                color: '#0DB09F',
                fontFamily: 'SFNSDisplay',
                fontSize: 16,
                lineHeight: 18,
                left: '30.67%',
                top: 1,
                position: 'absolute'
                }}>
                {this.state.correctCards}
                </Text>
                <Text style={{
                height: 18,
                color: '#0DB09F',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 14,
                lineHeight: 17,
                left: '39.47%',
                top: 1,
                position: 'absolute'
                }}>({this.state.currentIndex} out of {this.state.questions.length-1})
                </Text>
                <Text style={{
                height: 18,
                color: '#EF4036',
                fontFamily: 'SFNSDisplay',
                fontSize: 16,
                lineHeight: 18,
                left: '68.27%',
                top: 1,
                position: 'absolute'
                }}>
                {this.state.incorrectCards}
                </Text>
                <Image style={{
                left: '72%',
                top: 0,
                width: 18,
                height: 18,
                position: 'absolute'
                }}
                source={require('../assets/Icons/cancel-mark.png')}/>
                </View>
                
                <Image style={{
                          left: width * 0.104,
                          top: height * .1674,
                          width: width * .7946,
                          height: 412,
                          position: 'absolute',
                          resizeMode: 'stretch'
                          }}
                          source={require('../assets/images/cardScreenBG2.png')}/>
                
                <View style={{width: width, top: height * .1872, position: 'absolute', flexDirection: 'column', height: 380+(height*.1181)+56.2}}>
                <View style={{
                    height: 380,
                    width: width * .656,
                    borderRadius: 5,
                    backgroundColor: 'rgba(26,28,54,0.31)',
                    top: 0,
                    left: width * .1733,
                    borderRadius: 5,
                    backgroundColor: 'clear',
                    position: 'absolute'}}>
                <Swiper
                         ref={swiper => {
                           this.swiper = swiper
                         }}
                       
                         onSwiped={() => this.onSwiped('general')}
                         onSwipedLeft={() => this.onSwiped('left')}
                         onSwipedRight={() => this.onSwiped('right')}
                         onSwipedTop={() => this.onSwiped('top')}
                         onSwipedBottom={() => this.onSwiped('bottom')}
                         swipeAnimationDuration={150}
                         /*onTapCard={this.swipeLeft}*/
                         cards={temp}
                         cardIndex={this.state.cardIndex}
                         cardVerticalMargin={0}
                         marginTop={0}
                      
                       cardStyle={{
                          top: 0,
                          left: 0,
                          position: 'absolute',
                          width: '100%',
                          borderRadius: 5,
                          backgroundColor: 'rgba(26,28,54,0.31)',
                          height: 380,
                       }}
                
                         useViewOverflow={false}
                         cardHorizontalMargin={0}
                         renderCard={this.renderCard}
                         disableBottomSwipe={true}
                         disableTopSwipe={true}
                         onSwipedAll={this.onSwipedAllCards}
                         stackSize={3}
                         showSecondCard={false}
                         style={{top: 0, left: 0, right: 0, bottom: 0, padding: 0, margin: 0, position: 'absolute', backgroundColor: 'clear'}}
                         containerStyle={{top: 0, left: 0, right: 0, bottom: 0, padding: 0, margin: 0, position: 'absolute', backgroundColor: 'clear'}}
                         stackSeparation={15}
                         overlayLabels={{
                           bottom: {
                             title: 'BLEAH',
                             style: {
                               label: {
                                 backgroundColor: 'black',
                                 borderColor: 'black',
                                 color: 'white',
                                 borderWidth: 1
                               },
                               wrapper: {
                                 flexDirection: 'column',
                                 alignItems: 'center',
                                 justifyContent: 'center'
                               }
                             }
                           },
                           left: {
                             title: 'Study again',
                             style: {
                               label: {
                                 textAlign: 'center',
                                 color: '#FFFFFF',
                                 fontSize: 12,
                                 lineHeight: 15,
                                 height: 16,
                                 fontFamily: 'SFNSDisplay'
                               },
                               wrapper: {
                                 /*flexDirection: 'column',
                                 alignItems: 'flex-end',
                                 justifyContent: 'flex-start',
                                 marginTop: 30,
                                 marginLeft: -30*/
                                height: 56,
                                width: '100%',
                                borderRadius: 5,
                                backgroundColor: '#DFC728',
                                justifyContent: 'center',
                                alignItems: 'center'
                
                               }
                             }
                           },
                           right: {
                                title: 'Got it',
                                style: {
                                  label: {
                                    color: '#FFFFFF',
                                    fontSize: 12,
                                    lineHeight: 15,
                                    height: 16,
                                    fontFamily: 'SFNSDisplay',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                  },
                                  wrapper: {
                                    /*flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: -30*/
                                   height: 56,
                                   width: '100%',
                                   borderRadius: 5,
                                   backgroundColor: '#0DB09F',
                                   justifyContent: 'center',
                                   alignItems: 'center'
                                    }
                                }
                              },
                           top: {
                             title: 'SUPER LIKE',
                             style: {
                               label: {
                                 backgroundColor: 'black',
                                 borderColor: 'black',
                                 color: 'white',
                                 borderWidth: 1
                               },
                               wrapper: {
                                 flexDirection: 'column',
                                 alignItems: 'center',
                                 justifyContent: 'center'
                               }
                             }
                           }
                         }}
                         
                         animateCardOpacity
                         swipeBackCard
                       >
                       </Swiper>
                </View>
                
                
                
                <View style={{
                    bottom: 0,
                    width: width,
                    height: 56.2,
                    position: 'absolute'
                }}>
                <TouchableOpacity style={{
                        boxSizing: 'border-box',
                        height: 56.2,
                        width: 56.2,
                        top: 0,
                        border: '0.2px solid #0DB09F',
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                        left: '9.04%',
                        borderRadius: 56.2/2,
                        borderWidth: .3,
                        borderColor: '#0DB09F',
                        position: 'absolute',
                        shadowOffset:{  width: 0,  height: 0,  },
                        shadowColor: '#000000',
                        shadowOpacity: .3,
                        shadowRadius: 70,
                        elevation: 5,
                    }}
                onPress={ () => {this.swiper.swipeBack(); this.onSwipeBack(); }}>
                <Image style={{height: 15, width: 18, position: 'absolute', top: 21.1, left: 19.1, zIndex: 0}} source={require('../assets/Icons/backCardIcon.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    boxSizing: 'border-box',
                    height: 56.2,
                    width: 56.2,
                    top: 0,
                    border: '0.2px solid #0DB09F',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                    left: '75.79%',
                    borderRadius: 56.2/2,
                    borderWidth: .3,
                    borderColor: '#0DB09F',
                    position: 'absolute',
                    shadowOffset:{  width: 0,  height: 0,  },
                    shadowColor: '#000000',
                    shadowOpacity: .3,
                    shadowRadius: 70,
                    elevation: 5,
                }} onPress={() => {this.onResetCards();}}>

                <Image style={{height: 15, width: 24, position: 'absolute', top: 21.1, left: 16.1, zIndex: 0}} source={require('../assets/Icons/startOverCardIcon.png')}/>
                </TouchableOpacity>
                </View>
            
                </View>
                </View>
                </SafeAreaView>
               /* </ImageBackground>*/
                );
    }
}

FlashcardScreen.navigationOptions = {
    title: '',
    header: null,
    tabBarVisible: false,
};

const RootStack = createStackNavigator(
                                       {
                                            TestResults: TestResultsScreen,
                                            Flashcard: FlashcardScreen
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

