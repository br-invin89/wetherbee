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
import FlashcardScreens from '../screens/FlashcardScreen';
import TestResultsScreen from '../screens/TestResultsScreen';
import Functions from '../functions'

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


class SubjectsScreen extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
        showEnglish: true,
        subject: '',
        termCount: '',
        examType: '',
        visibleShare: false,
        visibleLearn: false,
        isOn1: true,
        isOn2: true,
        isOn3: true,
        isOn4: true,
        terms: [],
        };
    }

    updateTerms = (terms) => {
        this.setState({terms: terms})
        this.setState({subject: terms[0].SUBJECT})
        this.setState({termCount: terms[0].TERM_COUNT + ' Terms'})
        this.setState({examType: terms[0].EXAM_TYPE})
        this.setState({currentTerm: terms[0].ID})
    }
    
    componentDidMount(){
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
        AsyncStorage.getItem('access_token').then((token) => {
         Functions.fetchTerms(token, this.updateTerms)    })
          });
    }
    
        
    
    _dataEnglishCards=[{
                       word: 'Internet',
                       description: 'Retro occupy organic, stump town shabby chic pour-over roof party DIY normcore. Actually arti san organic occupy',
                       },{
                       word: 'Internet',
                       description: 'Retro occupy organic, stump town shabby chic pour-over roof party DIY normcore. Actually arti san organic occupy',
                       }]
    
    _dataMathCards=[{
                    word: 'Perfect square',
                    description: 'Product of a rational number multiplied by itself',
                    },{
                    word: 'Perfect square',
                    description: 'Product of a rational number multiplied by itself',
                    }]
    
    _dataEnglishTerms=[{
                       subject: 'English',
                       terms: '59 terms',
                       exam: 'AST',
                       imageUrl: require('../assets/images/subjectTerms.png'),
                       },{
                       subject: 'Math',
                       terms: '59 terms',
                       exam: 'PSAT',
                       imageUrl: require('../assets/images/subjectTerms.png'),
                       },{
                       subject: 'Math',
                       terms: '59 terms',
                       exam: 'ACT',
                       imageUrl: require('../assets/images/subjectTerms.png'),
                       }]
    
    _dataMathTerms=[{
                    subject: 'English',
                    terms: '59 terms',
                    exam: 'AST',
                    imageUrl: require('../assets/images/subjectTerms.png'),
                    },{
                    word: 'Math',
                    terms: '59 terms',
                    imageUrl: require('../assets/images/subjectTerms.png'),
                    },{
                    word: 'Math',
                    terms: '59 terms',
                    imageUrl: require('../assets/images/subjectTerms.png'),
                    }]
    
    _renderEnglishCards = ({item}) => (
                                       <View style={{
                                       boxSizing: 'border-box',
                                       height: 175.5,
                                       width: 306,
                                       border: '0.5px solid #0DB09F',
                                       borderRadius: 10,
                                       backgroundColor: '#FFFFFF',
                                       boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',
                                       borderColor: '#0DB09F',
                                       borderWidth: 0.5,
                                       padding: 0,
                                       left: 0,
                                       top: 0,
                                       marginRight: 24,
                                       position: 'relative',
                                       }}>
                                       <Text style={{
                                       height: 28,
                                       color: '#0DB09F',
                                       fontFamily: 'SFNSDisplay-Bold',
                                       fontSize: 24,
                                       top: 31.25,
                                       left: '7.27%',
                                       lineHeight: 28}}>
                                       {item.word}</Text>
                                       <Text style={{
                                       height: 73,
                                       width: 243,
                                       color: '#A9ABB8',
                                       fontFamily: 'SFNSDisplay',
                                       fontSize: 12,
                                       lineHeight: 18,
                                       top: 31.25+21,
                                       left: '7.27%',
                                       textAlign: 'justify',
                                       }}
                                       numberOfLines={3}>
                                       {item.description}</Text>
                                       <TouchableOpacity style={{height: 20, width: 20, position: 'absolute', top: 21.25, right: '5.67%', zIndex: 1}} activeOpacity={0}>
                                       <Image style={{height: 13.33, width: 11.25, position: 'absolute', top: 3.33, left: 4.17, zIndex: 0}} source={require('../assets/images/soundSubject.png')}/>
                                       </TouchableOpacity>
                                       
                                       <TouchableOpacity style={{height: 16, width: 16, position: 'absolute', bottom: 14.25, right: '6.2%', zIndex: 1}} activeOpacity={0}>
                                       <Image style={{height: 12, width: 12, position: 'absolute', top: 2, left: 2, zIndex: 0}} source={require('../assets/images/expandSubject.png')}/>
                                       </TouchableOpacity>
                                       </View>
                                       );
    
    
    _renderMathCards = ({item}) => (
                                    <View style={{
                                    boxSizing: 'border-box',
                                    height: 161.5,
                                    width: 306,
                                    border: '0.5px solid #0DB09F',
                                    borderRadius: 10,
                                    backgroundColor: '#FFFFFF',
                                    boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',
                                    borderColor: '#0DB09F',
                                    borderWidth: 0.5,
                                    padding: 0,
                                    left: 0,
                                    top: 0,
                                    marginRight: 24,
                                    position: 'relative',

                                    }}>
                                    <Text style={{
                                    height: 28,
                                    color: '#0DB09F',
                                    fontFamily: 'SFNSDisplay-Bold',
                                    fontSize: 24,
                                    top: 31.25,
                                    left: '7.27%',
                                    lineHeight: 28}}>
                                    {item.word}</Text>
                                    <Text style={{
                                    height: 73,
                                    width: 243,
                                    color: '#A9ABB8',
                                    fontFamily: 'SFNSDisplay',
                                    fontSize: 12,
                                    lineHeight: 18,
                                    top: 31.25+21,
                                    left: '7.27%',
                                    textAlign: 'justify',
                                    }}
                                    numberOfLines={3}>
                                    {item.description}</Text>
                                    <TouchableOpacity style={{height: 20, width: 20, position: 'absolute', top: 21.25, right: '5.67%', zIndex: 1}} activeOpacity={0}>
                                    <Image style={{height: 13.33, width: 11.25, position: 'absolute', top: 3.33, left: 4.17, zIndex: 0}} source={require('../assets/images/soundSubject.png')}/>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={{height: 16, width: 16, position: 'absolute', bottom: 20.25, right: '6.2%', zIndex: 1}} activeOpacity={0}>
                                    <Image style={{height: 12, width: 12, position: 'absolute', top: 2, left: 2, zIndex: 0}} source={require('../assets/images/expandSubject.png')}/>
                                    </TouchableOpacity>
                                    </View>
                                    );
    
    _englishTerms = ({item}) => (
                                 <View style={{
                                 boxSizing: 'border-box',
                                 height: 109,
                                 width: '86.72%',
                                 border: '0.2px solid #0DB09F',
                                 borderRadius: 10,
                                 backgroundColor: '#FFFFFF',
                                 boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',
                                 borderWidth: .3,
                                 borderColor: '#0DB09F',
                                 left: '6.64%',
                                 top: 0,
                                 marginBottom: 14.9,
                             
                                 }}
                                 /*onPress={() => this.props.navigation.navigate('Detail', {
                                                                               subject: item.subject, terms: item.terms, exam: item.exam})}*/>
                                 <Text style={{
                                 height: 25,
                                 color: '#1A1C36',
                                 fontFamily: 'SFNSDisplay-Bold',
                                 fontSize: 18,
                                 lineHeight: 21,
                                 left: '6.16%',
                                 top: 18.1,
                                 }}>
                                 {item.SUBJECT}
                                 </Text>
                                 <Text style={{
                                 height: 16,
                                 color: '#A9ABB8',
                                 fontFamily: 'SFNSDisplay',
                                 fontSize: 12,
                                 lineHeight: 15,
                                 left: '6.16%',
                                 top: 18.1+6-3,
                                 }}>
                                 {item.TERM_COUNT} Terms
                                 </Text>
                                 <Text style={{
                                 height: 16,
                                 color: '#0DB09F',
                                 fontFamily: 'SFNSDisplay-Bold',
                                 fontSize: 14,
                                 lineHeight: 17,
                                 top: 18.1+6+17-3,
                                 left: '6.16%',
                                 }}>
                                 {item.EXAM_TYPE}
                                 </Text>
                                 <Image style={{height: 78, width: 78, borderRadius: 5, top: 16, right: '6.16%', position: 'absolute'}} source={require('../assets/images/subjectTerms.png')}/>
                                 
                                 </View>
                                 );
    
    _mathTerms = ({item}) => (
                              <View style={{
                              boxSizing: 'border-box',
                              height: 109,
                              width: '86.72%',
                              border: '0.2px solid #0DB09F',
                              borderRadius: 10,
                              backgroundColor: '#FFFFFF',
                              boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',
                              borderWidth: .3,
                              borderColor: '#0DB09F',
                              left: '6.64%',
                              top: 0,
                              marginBottom: 14.9,
                    
                              }}
                              /*onPress={() => this.props.navigation.navigate('Detail', {
                                                                            subject: item.subject, terms: item.terms, exam: item.exam})}*/>
                              <Text style={{
                              height: 25,
                              color: '#1A1C36',
                              fontFamily: 'SFNSDisplay-Bold',
                              fontSize: 18,
                              lineHeight: 21,
                              left: '6.16%',
                              top: 18.1,
                              }}>
                              {item.subject}
                              </Text>
                              <Text style={{
                              height: 16,
                              color: '#A9ABB8',
                              fontFamily: 'SFNSDisplay',
                              fontSize: 12,
                              lineHeight: 15,
                              left: '6.16%',
                              top: 18.1+6-3,
                              }}>
                              {item.terms}
                              </Text>
                              <Text style={{
                              height: 16,
                              color: '#0DB09F',
                              fontFamily: 'SFNSDisplay-Bold',
                              fontSize: 14,
                              lineHeight: 17,
                              top: 18.1+6+17-3,
                              left: '6.16%',
                              }}>
                              {item.exam}
                              </Text>
                              <Image style={{height: 78, width: 78, borderRadius: 5, top: 16, right: '6.16%', position: 'absolute'}} source={{uri: item.IMAGE}}/>
                              </View>
                              );
    
    _englishBttn() {
        if (this.state.subject == 'English') {
            return (
                    <View style={{boxSizing: 'border-box', left: '7.33%', height: 55, width: 164, border: '1px solid #0DB09F', borderRadius: 27, position: 'absolute', backgroundColor: '#FFFFFF', borderColor: '#0DB09F', borderWidth: 1, justifyContent: 'center', alignItems: 'center', shadowOffset:{  width: 0,  height: 0,  },
                                  shadowColor: '#000000',
                                  shadowOpacity: .1,
                                  shadowRadius: 70,
                                  elevation: 5,}}>
                    
                    <Text style={{height: 20, color: '#0DB09F',    fontFamily: 'SFNSDisplay-Bold', fontSize: 14, lineHeight: 17, textAlign: 'center'}}>
                    English
                    </Text>
                    </View>
                    )
        } else {
            return (
                    <TouchableOpacity style={{boxSizing: 'border-box', left: '7.33%', height: 55, width: 164, border: '1px solid #0DB09F', borderRadius: 27, position: 'absolute', justifyContent: 'center', alignItems: 'center',}}
                    onPress={() => this.setState({subject: 'English'})}>
                    <Text style={{height: 20, position: 'absolute', color: '#A9ABB8', top: 19.5, fontFamily: 'SFNSDisplay-Bold', fontSize: 14, lineHeight: 17, textAlign: 'center'}}>
                    English
                    </Text>
                    </TouchableOpacity>
                    )
        }
    }
    
    _mathBttn() {
        if (this.state.subject == 'Math') {
            return (
                    <View style={{boxSizing: 'border-box', left: '49.73%', height: 55, width: 164, border: '1px solid #0DB09F', borderRadius: 27, position: 'absolute', backgroundColor: '#FFFFFF', borderColor: '#0DB09F', borderWidth: 1, justifyContent: 'center', alignItems: 'center',   shadowOffset:{  width: 0,  height: 0,  },
                                  shadowColor: '#000000',
                                  shadowOpacity: .1,
                                  shadowRadius: 70,
                                  elevation: 5,}}>
                    
                    <Text style={{height: 20, color: '#0DB09F', fontFamily: 'SFNSDisplay-Bold', fontSize: 14, lineHeight: 17, textAlign: 'center'}}>
                    Math
                    </Text>
                    </View>
                    )
        } else {
            return (
                    <TouchableOpacity style={{boxSizing: 'border-box', left: '49.73%', height: 55, width: 164, border: '1px solid #0DB09F', borderRadius: 27, position: 'absolute', justifyContent: 'center', alignItems: 'center',}}
                    onPress={() => this.setState({subject: 'Math'})}>
                    <Text style={{height: 20, position: 'absolute', color: '#A9ABB8', top: 19.5, fontFamily: 'SFNSDisplay-Bold', fontSize: 14, lineHeight: 17, textAlign: 'center'}}>
                    Math
                    </Text>
                    </TouchableOpacity>
                    )
        }
    }
    
    renderCards() {
        if (this.state.subject == 'English') {
            return (
                    <View>
                    <Text style={{height: 26, color: '#1A1C36', fontFamily: 'SFNSDisplay-Bold', left: '9.07%', fontSize: 21, lineHeight: 24, top: 0}}>Word of the day</Text>
                    <FlatList
                    style={{height: 175.5, position: 'relative', width: '100%', top: 17, left: 0, paddingLeft: '6.6%', paddingRight: '6.6%', boxSizing: 'border-box'}}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={this._dataEnglishCards}
                    renderItem={this._renderEnglishCards}
                    keyExtractor={(item, index) => index}
                    />
                    </View>
                    )
        } else {
            return (
                    <View>
                    <Text style={{height: 26, color: '#1A1C36', fontFamily: 'SFNSDisplay-Bold', left: '9.07%', fontSize: 21, lineHeight: 24, top: 0}}>Word of the day</Text>
                    <FlatList
                    style={{height: 161.5, position: 'relative', width: '100%', top: 17, left: 0, paddingLeft: '6.6%', paddingRight: '6.6%',}}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={this._dataMathCards}
                    renderItem={this._renderMathCards}
                    keyExtractor={(item, index) => index}
                    />
                    </View>
                    )
        }
    }
    
    renderTerms(){
        if (this.state.subject == 'English') {
            return (
                    <View>
                    <Text style={{height: 26, color: '#1A1C36', fontFamily: 'SFNSDisplay-Bold', left: '9.07%', fontSize: 21, lineHeight: 24, top: 0}}>Available terms</Text>
                    <Text style={{height: 16, width: 44, color: '#A9ABB8', fontFamily: 'SFNSDisplay', fontSize: 14, lineHeight: 17, top: 7, left: '78.93%', position: 'absolute'
                    }} onPress={() => this.props.navigation.navigate('details')}>See all</Text>
                    <FlatList
                    style={{flex: 1, position: 'relative', width: '100%', top: 17, left: 0,}}
                    showsHorizontalScrollIndicator={false}
                    vertical
                    data={this.state.terms.filter(function (terms) {
                      return terms.SUBJECT === "English"
                    })}
                    renderItem={this._englishTerms}
                    keyExtractor={(item, index) => index}
                    />
                    </View>
                    )
        } else {
            return (
                    <View>
                    <Text style={{height: 26, color: '#1A1C36', fontFamily: 'SFNSDisplay-Bold', left: '9.07%', fontSize: 21, lineHeight: 24, top: 0}}>Available terms</Text>
                    <Text style={{height: 16, width: 44, color: '#A9ABB8', fontFamily: 'SFNSDisplay', fontSize: 14, lineHeight: 17, top: 7, left: '78.93%', position: 'absolute'
                    }} onPress={() => this.props.navigation.navigate('details')}>See all</Text>
                    <FlatList
                    style={{flex: 1, position: 'relative', width: '100%', top: 17, left: 0,}}
                    showsHorizontalScrollIndicator={false}
                    vertical
                    data={this.state.terms.filter(function (terms) {
                      return terms.SUBJECT === "Math"
                    })}
                    renderItem={this._englishTerms}
                    keyExtractor={(item, index) => index}
                    />
                    </View>
                    )
        }
    }
    
    renderModalShare(){
         this.setState({ visibleShare: true })
         console.log(this.state.visibleShare)
     }
     
     renderModalLearn(){
         this.setState({ visibleLearn: true })
     }
     
     handleStartTest(){
         this.setState({ visibleTest: false })
         this.props.navigation.navigate('Test')
     }
     
    
    _dataContacts=[{
                   name: 'Sandy Wilder Cheng',
                   headshot: require('../assets/Icons/contact1.png'),
                   smsIcon: require('../assets/Icons/contactSMS.png'),
                   },{
                   name: 'Chris Angelotti',
                   headshot: require('../assets/Icons/contact2.png'),
                   smsIcon: require('../assets/Icons/contactSMS.png'),
                   },{
                   name: 'Sandy and Tony',
                   headshot: require('../assets/Icons/contact3.png'),
                   smsIcon: require('../assets/Icons/contactSMS.png'),
                   },{
                   name: 'Stephanie Vidal',
                   headshot: require('../assets/Icons/contact4.png'),
                   smsIcon: require('../assets/Icons/contactSMS.png'),
                   },{
                   name: 'John Anderson',
                   headshot: require('../assets/Icons/contact5.png'),
                   smsIcon: require('../assets/Icons/contactSMS.png'),
                   }]
    
    _dataApps=[{
                name: 'Airdrop',
                app: require('../assets/Icons/airDrop.png'),
                },{
                name: 'Messages',
                app: require('../assets/Icons/messages.png'),
                },{
                name: 'Mail',
                app: require('../assets/Icons/mail.png'),
                },{
                name: 'Notes',
                app: require('../assets/Icons/notes.png'),
                },{
                name: 'Reminder',
                app: require('../assets/Icons/reminders.png'),
                }]
    
    _renderContacts  = ({item}) => (
                                    <View style={{
                                    height: '100%',
                                    width: 74,
                                    top: 0,
                                    left: 0,
                                    marginRight: 11.5
                                    }}>
                               
                                    <Image style={{height: 62, width: 62, top: 0, left: 6, position: 'absolute', resizeMode: 'contain'}} source={item.headshot}/>
                                    <Image style={{height: 20, width: 20 , top: 44, left: 50, position: 'absolute'}} source={item.smsIcon}/>
                                    <Text style={{
                                        height: 35,
                                        color: '#000000',
                                        fontFamily: 'SFNS-Pro',
                                        fontSize: 11,
                                        letterSpacing: 0.07,
                                        lineHeight: 11,
                                        textAlign: 'center',
                                        top: 67,
                                        left: 0,
                                        width: 74,
                                        position: 'absolute',
                                    }}
                                    numberOfLines={2}>
                                    {item.name}
                                    </Text>
                                    </View>
                                       );
    
    _renderApps  = ({item}) => (
                               <View style={{
                               height: '100%',
                               width: 74,
                               top: 0,
                               left: 0,
                               marginRight: 12
                               }}>
                          
                                <View style={{
                                width: 60,
                                top: 0,
                                left: 6,
                                position: 'absolute',
                                alignItems: 'center'
                                }}>
                               <Image style={{height: 60, width: 60, top: 0, position: 'absolute',}} source={item.app}/>
                               <Text style={{
                                       height: 26,
                                       color: '#000000',
                                       fontFamily: 'SFNS-Pro',
                                       fontSize: 11,
                                       letterSpacing: 0.07,
                                       lineHeight: 13,
                                       textAlign: 'center',
                                        top: 67,
                                        position: 'absolute'
                               }}>
                               {item.name}
                               </Text>
                                </View>
                               </View>
                            );
     
    render() {
        const { width } = Dimensions.get('window');
        const  height = Dimensions.get('window').height;
        
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                <ScrollView
                showsVerticalScrollIndicator={false}
                behaviour = "height"
                contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'space-between'
                }}
                style={{
                ...Platform.select({
                                   ios: {
                                   
                                   },
                                   android: {
                                   
                                   },
                                   }),
                }}
                
                scrollEventThrottle={16}>
                <View style={{height: 842+90-175.5-26-17+251}}>
                <Text style={styles.subjects}>Subjects</Text>
                <View style={{flexDirection: 'row', height: 55, top: 93.5, width: width, position: 'absolute'}}>
                {this._englishBttn()}
                {this._mathBttn()}
                </View>
             
                
                
                
         
                             <TouchableOpacity onPress={() => { this.renderModalShare() }} style={{height: 18, width: 18, borderRadius: 4.29, position: 'absolute', right: '17.33%', zIndex:1, top: 180, position: 'absolute'}} activeOpacity={0}>
                             <Image style={{height: 12, width: 10.5, position: 'relative', top: 3, left: 3.75, zIndex: 0}} source={require('../assets/Icons/share.png')}/>
                             </TouchableOpacity>
                             
                             <Modal
                             onBackdropPress={() => this.setState({ visibleShare: false })}
                             isVisible={this.state.visibleShare}
                             backdropColor="#000000"
                             backdropOpacity={0.5}
                             animationIn='slideInUp'
                             animationOut='slideOutDown'
                             style={{marginVertical: 0, marginHorizontal: 0}}>
                             
                             <View style={{
                             boxSizing: 'border-box',
                             height: 489,
                             width: width,
                             border: '0.2px solid #0DB09F',
                             backgroundColor: '#FFFFFF',
                             boxShadow: '0 16px 24px 0 rgba(0,0,0,0.05)',
                             bottom: -0.1,
                             position: 'absolute',
                             borderTopLeftRadius: 15,
                             borderTopRightRadius: 15,
                             }}>
                             
                             <View style={{
                             height: 44,
                             width: width,
                             flexDirection: 'row',
                             top: 13,
                             position: 'absolute'
                             }}>
                             <View style={{
                             height: 40,
                             width: 40,
                             top: 3,
                             left: '4.27%',
                             backgroundColor: '#82efb8',
                             borderRadius: 10,
                             position: 'absolute'
                             }}></View>
                             
                             <Text style={{
                             height: 20,
                             color: '#000000',
                             fontFamily: 'SFNS-Pro',
                             fontSize: 15,
                             letterSxpacing: -0.24,
                             lineHeight: 20,
                             top: 4,
                             left: '17.07%',
                             position: 'absolute'
                             }}>
                             Title
                             </Text>
                             <Text style={{
                             height: 18,
                             color: '#000000',
                             fontFamily: 'SFNS-Pro',
                             fontSize: 13,
                             letterSxpacing: -0.08,
                             lineHeight: 18,
                             top: 23,
                             left: '17.07%',
                             position: 'absolute'
                             }}>
                             Subtitle
                             </Text>
                             <View style={{
                             top: 23,
                             width: 66,
                             height: 18,
                             left: '31.62%',
                             position: 'absolute',
                             flexDirection: 'row',
                             alignItems: 'center',
                             }}>
                             <Text style={{
                             color: '#007AFF',
                             left: 4,
                             }}>
                             Options
                             </Text>
                             <Image style={{
                                 height: 12,
                                 width: 6,
                                 left: 5,
                                 }} source={require('../assets/Icons/optionArrow.png')}/>
                             </View>
                             <TouchableOpacity style={{
                                 height: 30,
                                 width: 30,
                                 top: 7,
                                 left: '87.73%',
                                 borderRadius: 15,
                                 position: 'absolute'}}
                                 onPress={() => this.setState({ visibleShare: false })}>
                             <Image style={{
                                 height: 30,
                                 width: 30,
                                 top: 0,
                                 left: 0,
                                 borderRadius: 15,
                                 position: 'absolute'}} source={require('../assets/Icons/CloseButton.png')}/>
                             </TouchableOpacity>

                             
                             </View>
                             
                             <View style={{
                                 height: 0.5,
                                 width: width,
                                 backgroundColor: 'rgba(60,60,67,0.29)',
                                 position: 'absolute',
                                 top: 72
                             }}></View>
                             
                             <FlatList style={{
                             flexDirection: 'row',
                             position: 'absolute',
                             height: 93,
                             width: width,
                             top: 93,
                             left: 0,
                             paddingHorizontal: '2.67%',
                             }}
                             showsHorizontalScrollIndicator={false}
                             horizontal
                             data={this._dataContacts}
                             renderItem={this._renderContacts}
                             keyExtractor={(item, index) => index}/>
                             
                             <View style={{
                                height: 0.5,
                                width: width,
                                backgroundColor: 'rgba(60,60,67,0.29)',
                                position: 'absolute',
                                top: 199.5
                            }}></View>
                             
                             <FlatList style={{
                                     flexDirection: 'row',
                                     position: 'absolute',
                                     height: 93,
                                     width: width,
                                     top: 221,
                                     left: 0,
                                     paddingHorizontal: '2.67%',
                                     }}
                                     showsHorizontalScrollIndicator={false}
                                     horizontal
                                     data={this._dataApps}
                                     renderItem={this._renderApps}
                                     keyExtractor={(item, index) => index}/>
                                     
                             <TouchableOpacity style={{
                                 height: 51,
                                 width: '91.47%',
                                 borderRadius: 12,
                                 top: 328,
                                 position: 'absolute',
                                 left: '4.27%',
                                 justifyContent: 'center'
                             }}>
                             <Text style={{
                                 height: 22,
                                 width: 225,
                                 color: '#000000',
                                 fontFamily: 'SFNS-Pro',
                                 fontSize: 17,
                                 letterSpacing: -0.41,
                                 lineHeight: 22,
                                 left: '4.27%',
                                 position: 'absolute',
                                 textAlign: 'left'
                             }}>
                             Copy
                             </Text>
                             
                             <Image style={{height: '100%', width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 0}} source={require('../assets/Icons/copyButton.png')}/>
                             </TouchableOpacity>
                             
                             <TouchableOpacity style={{
                                             height: 51,
                                             width: '91.47%',
                                             borderRadius: 12,
                                             top: 390,
                                             position: 'absolute',
                                             left: '4.27%',
                                             justifyContent: 'center'
                                         }}>
                             <Image style={{height: '100%', width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 0}} source={require('../assets/Icons/readingListButton.png')}/>

                                         <Text style={{
                                             height: 24,
                                             width: 225,
                                             color: '#000000',
                                             fontFamily: 'SFNS-Pro',
                                             fontSize: 17,
                                             letterSpacing: -0.41,
                                             lineHeight: 22,
                                             left: '4.27%',
                                             position: 'absolute',
                                             textAlign: 'left'
                                         }}>
                                         Add to Reading List
                                         </Text>
                             
                            
                             </TouchableOpacity>
                             </View>
                             </Modal>
                             
                             
                             <TouchableOpacity onPress={() => this.props.navigation.navigate('AddGroup')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'absolute', right: '8.53%', zIndex:1, top: 180}} activeOpacity={0}>
                             <Image style={{height: 12, width: 16.5, position: 'relative', top: 3, left: .75, zIndex: 0}} source={require('../assets/Icons/addGroup.png')}/>
                             </TouchableOpacity>
                             
                             
                             <View style={{flexDirection: 'row', top: 180, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center'}}>
                             <Text style={{
                             width: '44.93%',
                             color: '#1A1C36',
                             fontFamily: 'SFNSDisplay-Bold',
                             fontSize: 16,
                             lineHeight: 18,
                             textAlign: 'center'}}>
                                {this.state.subject}
                             </Text>
                             </View>
                
                
        
                

                
                <View style={{flexDirection: 'row', top: 72.75+162, width: width, height: 24, position: 'absolute'}}>
                <Text style={{
                height: 24,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 21,
                lineHeight: 24,
                left: '9.07%',
                position: 'absolute',
                top: 0,
                }}>
                {this.state.termCount}
                </Text>
                
                <TouchableOpacity onPress={() => this.props.navigation.navigate('')} style={{height: 24, width: 24, borderRadius: 4.29, position: 'absolute', left: '85.33%', zIndex:1, top: 0}} activeOpacity={0}>
                <Image style={{height: 16, width: 24, position: 'relative', top: 4, left: 0, zIndex: 0}} source={require('../assets/Icons/download.png')}/>
                </TouchableOpacity>
                </View>
                
                <Text style={{
                height: 16,
                color: '#0DB09F',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 14,
                lineHeight: 17,
                top: 72.75+162+7+24,
                position: 'absolute',
                left: '9.07%',
                }}>
                {this.state.examType}
                </Text>
                
                <View style={{
                boxSizing: 'border-box',
                height: 54.5,
                width: width,
                top: 72.75+162+7+24+17.75+16,
                position: 'absolute'
                }}>
                
                {/*1*/}
                <TouchableOpacity style={{
                boxSizing: 'border-box',
                height: 54.5,
                width: width * .4013,
                border: '0.5px solid #0DB09F',
                borderWidth: .5,
                borderColor: '#0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',
                top: 0,
                left: width * .066,
                position: 'absolute',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .1,
                shadowRadius: 70,
                elevation: 5,
                }}
                /*onPress={() => { this.renderModalLearn() }}*/
                onPress={() => this.props.navigation.navigate('Learn', {currentTerm: this.state.currentTerm})}>

                <Image style={{height: 30, width: 32, position: 'relative', top: 3.33, left: width * .0407, zIndex: 0, top: 12.25,}} source={require('../assets/Icons/learn.png')}/>
                <Text style={{
                height: 16,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 14,
                lineHeight: 17,
                top: 19.25,
                left: width * .1693,
                position: 'absolute',
                }}>
                Learn
                </Text>
                </TouchableOpacity>
                <Modal
                
                onBackdropPress={() => this.setState({ visibleLearn: false })}
                
                isVisible={this.state.visibleLearn}
                backdropColor="#000000"
                backdropOpacity={0.5}
                animationIn='slideInUp'
                animationOut='slideOutDown'
                style={{marginVertical: 0, marginHorizontal: 0}}>
                
                <View style={{
                boxSizing: 'border-box',
                height: 485,
                width: width,
                border: '0.2px solid #0DB09F',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.05)',
                bottom: -0.1,
                position: 'absolute',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                }}>
                <View style={{
                height: 4,
                width: '29.87%',
                opacity: 0.2,
                borderRadius: 100,
                backgroundColor: '#000000',
                top: 8,
                left: '35.2%',
                position: 'absolute'
                }}>
                </View>
                
                <View style={{
                left: 0,
                top: 37,
                width: '100%',
                height: 18
                }}>
                <Image style={{
                left: '9.89%',
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
                left: '16.8%',
                top: 1,
                position: 'absolute'
                }}>
                1
                </Text>
                <Text style={{
                height: 18,
                color: '#0DB09F',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 14,
                lineHeight: 17,
                left: '39.2%',
                top: 1,
                position: 'absolute'
                }}>( 1 out of 56 )
                </Text>
                <Text style={{
                height: 18,
                color: '#EF4036',
                fontFamily: 'SFNSDisplay',
                fontSize: 16,
                lineHeight: 18,
                left: '81.87%',
                top: 1,
                position: 'absolute'
                }}>
                0
                </Text>
                <Image style={{
                left: '85.6%',
                top: 0,
                width: 18,
                height: 18,
                position: 'absolute'
                }}
                source={require('../assets/Icons/cancel-mark.png')}/>
                </View>
                
                <View style={{
                boxSizing: 'border-box',
                height: 1,
                width: '80.8%',
                left: '9.6%',
                backgroundColor: '#ebebeb',
                borderWidth: .2,
                borderColor: '#979797',
                border: '0.2px solid #ebebeb',
                top: 71,
                position: 'absolute',
                }}></View>
                
                <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                top: 97,
                position: 'absolute',
                height: 26,
                width: '100%'
                }}>
                <Text style={{
                height: 26,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 18,
                lineHeight: 21,
                textAlign: 'center'
                }}>
                Keytar McSweeney's Williamsburg
                </Text>
                </View>
                
                <TouchableOpacity style={{
                boxSizing: 'border-box',
                height: 52.2,
                width: '86.72%',
                border: '0.2px solid #0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                left: '6.64%',
                borderWidth: .3,
                borderColor: '#0DB09F',
                top: 146.9,
                position: 'absolute',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .2,
                shadowRadius: 200,
                elevation: 5,
                }}>
                <Text style={{
                height: 14,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay',
                fontSize: 12,
                lineHeight: 15,
                top: 20.1,
                left: '5.36%',
                }}>
                Terms & Conditions
                </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{
                boxSizing: 'border-box',
                height: 52.2,
                width: '86.72%',
                border: '0.2px solid #0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                left: '6.64%',
                borderWidth: .3,
                borderColor: '#0DB09F',
                top: 210.9,
                position: 'absolute',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .2,
                shadowRadius: 200,
                elevation: 5,
                }}>
                <Text style={{
                height: 16,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay',
                fontSize: 12,
                lineHeight: 15,
                top: 20.1,
                left: '5.36%',
                }}>
                Privacy Policy
                </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{
                boxSizing: 'border-box',
                height: 52.2,
                width: '86.72%',
                border: '0.2px solid #0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                left: '6.64%',
                borderWidth: .3,
                borderColor: '#0DB09F',
                top: 274.9,
                position: 'absolute',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .2,
                shadowRadius: 200,
                elevation: 5,
                }}>
                <Text style={{
                height: 14,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay',
                fontSize: 12,
                lineHeight: 15,
                top: 20.1,
                left: '5.36%',
                }}>
                FAQs
                </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{
                boxSizing: 'border-box',
                height: 52.2,
                width: '86.72%',
                border: '0.2px solid #0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                left: '6.64%',
                borderWidth: .3,
                borderColor: '#0DB09F',
                top: 338.9,
                position: 'absolute',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .2,
                shadowRadius: 200,
                elevation: 5,
                }}>
                <Text style={{
                height: 14,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay',
                fontSize: 12,
                lineHeight: 15,
                top: 20.1,
                left: '5.36%',
                }}>
                About
                </Text>
                </TouchableOpacity>
                
                </View>
                <View style={{
                flexDirection: 'row',
                top: height * .1232,
                width: width,
                height: 40,
                position: 'absolute',
                }}>
                
                </View>
                </Modal>
                
                
                {/*2*/}
                <TouchableOpacity style={{
                boxSizing: 'border-box',
                height: 54.5,
                width: width * .4013,
                border: '0.5px solid #0DB09F',
                borderWidth: .5,
                borderColor: '#0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',
                top: 0,
                left: width * .5327,
                position: 'absolute',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .1,
                shadowRadius: 70,
                elevation: 5,
                }}
                onPress={() => this.props.navigation.navigate('Flashcard', {reset: false, currentTerm: this.state.currentTerm})}>
                <Image style={{height: 30, width: 32, position: 'relative', top: 3.33, left: width * .0353, zIndex: 0, top: 12.25,}} source={require('../assets/Icons/flashcard.png')}/>
                <Text style={{
                height: 16,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 14,
                lineHeight: 17,
                top: 19.25,
                left: width * .164,
                position: 'absolute',
                }}>
                Flashcards
                </Text>
                </TouchableOpacity>
                </View>
                
                <View style={{
                boxSizing: 'border-box',
                height: 54.5,
                width: width,
                top: 72.75+162+7+24+17.75+16+54.5+16.5,
                position: 'absolute'
                }}>
                
                {/*3*/}
                <TouchableOpacity style={{
                boxSizing: 'border-box',
                height: 54.5,
                width: width * .4013,
                border: '0.5px solid #0DB09F',
                borderWidth: .5,
                borderColor: '#0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',
                top: 0,
                left: width * .066,
                position: 'absolute',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .1,
                shadowRadius: 70,
                elevation: 5,
                }}
                onPress={() => this.props.navigation.navigate('Write', {currentTerm: this.state.currentTerm})}>
                <Image style={{height: 31, width: 28, position: 'relative', top: 3.33, left: width * .0407, zIndex: 0, top: 12.25,}} source={require('../assets/Icons/write.png')}/>
                <Text style={{
                height: 16,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 14,
                lineHeight: 17,
                top: 19.25,
                left: width * .1693,
                position: 'absolute',
                }}>
                Write
                </Text>
                </TouchableOpacity>
                
                {/*4*/}
                <TouchableOpacity style={{
                boxSizing: 'border-box',
                height: 54.5,
                width: width * .4013,
                border: '0.5px solid #0DB09F',
                borderWidth: .5,
                borderColor: '#0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',
                top: 0,
                left: width * .5327,
                position: 'absolute',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .1,
                shadowRadius: 70,
                elevation: 5,
                }}
                onPress={() => this.setState({ visibleTest: true })}>
                <Image style={{height: 30, width: 31, position: 'relative', top: 3.33, left: width * .038, zIndex: 0, top: 12.25,}} source={require('../assets/Icons/test.png')}/>
                <Text style={{
                height: 16,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 14,
                lineHeight: 17,
                top: 19.25,
                left: width * .1693,
                position: 'absolute',
                }}>
                Test
                </Text>
                </TouchableOpacity>
                
                </View>
                
                <Modal
                onBackdropPress={() => this.setState({ visibleTest: false })}
                
                isVisible={this.state.visibleTest}
                backdropColor="#000000"
                backdropOpacity={0.5}
                animationIn='slideInUp'
                animationOut='slideOutDown'
                style={{marginVertical: 0, marginHorizontal: 0}}>
                
                <View style={{
                boxSizing: 'border-box',
                height: 507,
                width: width,
                border: '0.2px solid #0DB09F',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.05)',
                bottom: -0.1,
                position: 'absolute',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                }}>
                
                <View style={{
                height: 4,
                width: '29.87%',
                opacity: 0.2,
                borderRadius: 100,
                backgroundColor: '#000000',
                top: 8,
                left: '35.2%',
                position: 'absolute'
                }}>
                </View>
                
                <Text style={{
                height: 14,
                color: '#A9ABB8',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 12,
                lineHeight: 15,
                left: '8.53%',
                position: 'absolute',
                top: 52,
                }}>
                General
                </Text>
                
                <View style={{
                top: 92,
                width: width,
                height: 18,
                flexDirection: 'row'
                }}>
                
                <Text style={{
                height: 18,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                left: '8.53%',
                position: 'absolute',
                }}>
                Question count
                </Text>
                
                <Text style={{
                height: 18,
                color: '#0DB09F',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                textAlign: 'right',
                left: '82.4%',
                position: 'absolute'
                }}>
                20
                </Text>
                
                
                <TouchableOpacity onPress={() => this.props.navigation.navigate('')} style={{height: 20, width: 20, position: 'absolute', left: '88.27%', zIndex:1, top: 0}} activeOpacity={0}>
                <Image style={{height: 10, width: 6.18, position: 'relative', top: 5, left: 7.16, zIndex: 0}} source={require('../assets/images/keyboard_arrow_left2.png')}/>
                </TouchableOpacity>
                
                
                </View>
                
                
                
                
                
                <View style={{
                boxSizing: 'border-box',
                height: 1,
                width: '80.8%',
                left: '9.6%',
                backgroundColor: '#ebebeb',
                borderWidth: .2,
                borderColor: '#979797',
                border: '0.2px solid #ebebeb',
                top: 126,
                position: 'absolute',
                }}></View>
                
                <View style={{
                top: 145,
                flexDirection: 'row',
                width: width,
                height: 18,
                }}>
                
                <Text style={{
                height: 18,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                left: '8.53%',
                top: 3,
                position: 'absolute',
                }}>
                Instant feedback
                </Text>
                
                <View style={{
                position: 'absolute',
                left: '76%',
                height: 24,
                width: 48,
                justifyContent: 'center',
                alignItems: 'center',
                top: 0
                }}>
                <SwitchToggle
                style={{
                top: 0,
                zIndex: 1,
                }}
                
                containerStyle={{
                width: 48,
                height: 24,
                borderRadius: 12,
                padding: 0,
                }}
                
                circleStyle={{
                width: 26,
                height: 26,
                borderRadius: 12,
                borderColor:'#FFFFFF',
                borderWidth: 2,
                backgroundColor: 'white', // rgb(102,134,205)
                }}
                
                switchOn={this.state.isOn1}
                /*onPress={(): void => {
                 this.setState({ isOn: !this.state.isOn });
                 }isOn => console.log("changed to : ", isOn)}*/
                backgroundColorOn='#0DB09F'
                circleColorOff='#0DB09F'
                circleColorOn='#0DB09F'
                duration={500}
                />
                </View>
                <TouchableOpacity
                style={{
                position: 'absolute',
                top: 0,
                width: 48,
                height: 24,
                left: '76%',
                }}
                onPress={(): void => {
                this.setState({ isOn1: !this.state.isOn1 });
                }}></TouchableOpacity>
                </View>
                
                <Text style={{
                height: 16,
                color: '#A9ABB8',
                fontFamily: 'SFNSDisplay',
                fontSize: 12,
                lineHeight: 15,
                left: '8.53%',
                top: 210,
                position: 'absolute',
                }}>
                Question types
                </Text>
                
                <View style={{
                top: 247,
                width: width,
                position: 'absolute',
                flexDirection: 'row'
                }}>
                <Text style={{
                height: 18,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                top: 3,
                left: '8.53%',
                position: 'absolute',
                }}>
                True/False
                </Text>
                <View style={{
                position: 'absolute',
                left: '76%',
                height: 24,
                width: 48,
                justifyContent: 'center',
                alignItems: 'center',
                top: 0
                }}>
                <SwitchToggle
                style={{
                top: 0,
                zIndex: 1,
                }}
                
                containerStyle={{
                width: 48,
                height: 24,
                borderRadius: 12,
                padding: 0,
                }}
                
                circleStyle={{
                width: 26,
                height: 26,
                borderRadius: 12,
                borderColor:'#FFFFFF',
                borderWidth: 2,
                backgroundColor: 'white', // rgb(102,134,205)
                }}
                
                switchOn={this.state.isOn2}
                /*onPress={(): void => {
                 this.setState({ isOn: !this.state.isOn });
                 }isOn => console.log("changed to : ", isOn)}*/
                backgroundColorOn='#0DB09F'
                circleColorOff='#0DB09F'
                circleColorOn='#0DB09F'
                duration={500}
                />
                </View>
                <TouchableOpacity
                style={{
                position: 'absolute',
                top: 0,
                width: 48,
                height: 24,
                left: '76%',
                }}
                onPress={(): void => {
                this.setState({ isOn2: !this.state.isOn2 });
                }}></TouchableOpacity>
                </View>
                
                
                
                <View style={{
                top: 293,
                width: width,
                position: 'absolute',
                flexDirection: 'row'
                }}>
                <Text style={{
                height: 18,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                top: 3,
                left: '8.53%',
                position: 'absolute',
                }}>
                Multiple choice
                </Text>
                <View style={{
                position: 'absolute',
                left: '76%',
                height: 24,
                width: 48,
                justifyContent: 'center',
                alignItems: 'center',
                top: 0
                }}>
                <SwitchToggle
                style={{
                top: 0,
                zIndex: 1,
                }}
                
                containerStyle={{
                width: 48,
                height: 24,
                borderRadius: 12,
                padding: 0,
                }}
                
                circleStyle={{
                width: 26,
                height: 26,
                borderRadius: 12,
                borderColor:'#FFFFFF',
                borderWidth: 2,
                backgroundColor: 'white', // rgb(102,134,205)
                }}
                
                switchOn={this.state.isOn3}
                /*onPress={(): void => {
                 this.setState({ isOn: !this.state.isOn });
                 }isOn => console.log("changed to : ", isOn)}*/
                backgroundColorOn='#0DB09F'
                circleColorOff='#0DB09F'
                circleColorOn='#0DB09F'
                duration={500}
                />
                </View>
                <TouchableOpacity
                style={{
                position: 'absolute',
                top: 0,
                width: 48,
                height: 24,
                left: '76%',
                }}
                onPress={(): void => {
                this.setState({ isOn3: !this.state.isOn3 });
                }}></TouchableOpacity>
                </View>
                
                
                <View style={{
                top: 342,
                width: width,
                position: 'absolute',
                flexDirection: 'row'
                }}>
                <Text style={{
                height: 18,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                top: 3,
                left: '8.53%',
                position: 'absolute',
                }}>
                Written
                </Text>
                <View style={{
                position: 'absolute',
                left: '76%',
                height: 24,
                width: 48,
                justifyContent: 'center',
                alignItems: 'center',
                top: 0
                }}>
                <SwitchToggle
                style={{
                top: 0,
                zIndex: 1,
                }}
                
                containerStyle={{
                width: 48,
                height: 24,
                borderRadius: 12,
                padding: 0,
                }}
                
                circleStyle={{
                width: 26,
                height: 26,
                borderRadius: 12,
                borderColor:'#FFFFFF',
                borderWidth: 2,
                backgroundColor: 'white', // rgb(102,134,205)
                }}
                
                switchOn={this.state.isOn4}
                /*onPress={(): void => {
                 this.setState({ isOn: !this.state.isOn });
                 }isOn => console.log("changed to : ", isOn)}*/
                backgroundColorOn='#0DB09F'
                circleColorOff='#0DB09F'
                circleColorOn='#0DB09F'
                duration={500}
                />
                </View>
                <TouchableOpacity
                style={{
                position: 'absolute',
                top: 0,
                width: 48,
                height: 24,
                left: '76%',
                }}
                onPress={(): void => {
                this.setState({ isOn4: !this.state.isOn4 });
                }}></TouchableOpacity>
                </View>
                
                
                <TouchableOpacity style={{
                height: 54,
                width: '73.33%',
                borderRadius: 27,
                backgroundColor: '#0DB09F',
                left: '13.33%',
                justifyContent: 'center',
                alignItems: 'center',
                top: 407,
                position: 'absolute'
                }}
                onPress={() => { this.handleStartTest() }}>
                <Text style={{
                height: 18,
                color: '#FFFFFF',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 15,
                lineHeight: 18,
                textAlign: 'center'
                }}>
                Start test
                </Text>
                </TouchableOpacity>
                
                </View>
                <View style={{
                flexDirection: 'row',
                top: height * .1232,
                width: width,
                height: 40,
                position: 'absolute',
                }}>
                </View>
                </Modal>
                
                
                
                <View style={{
                boxSizing: 'border-box',
                flex: 1,
                width: width,
                top: 72.75+162+7+24+17.75+16+54.5+16.5+35.75+54.5,
                position: 'absolute',
                backgroundColor: 'red',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .05,
                shadowRadius: 70,
                elevation: 5,
                }}>
                {this.renderTerms()}
                </View>
                </View>
                </ScrollView>
                </View>
                </SafeAreaView>
                );
    }
}


class DetailScreen extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
        subject: this.props.navigation.state.params.subject,
        terms: '',
        exam: this.props.navigation.state.params.exam,
        isOn1: true,
        isOn2: true,
        isOn3: true,
        isOn4: true,
        };
    }
    _dataEnglishCards=[{
                       word: 'Internet',
                       description: 'Retro occupy organic, stump town shabby chic pour-over roof party DIY normcore. Actually arti san organic occupy',
                       },{
                       word: 'Internet',
                       description: 'Retro occupy organic, stump town shabby chic pour-over roof party DIY normcore. Actually arti san organic occupy',
                       }]
    
    _dataMathCards=[{
                    word: 'Perfect square',
                    description: 'Product of a rational number multiplied by itself',
                    },{
                    word: 'Perfect square',
                    description: 'Product of a rational number multiplied by itself',
                    }]
    
    _dataContacts=[{
                   name: 'Sandy Wilder Cheng',
                   headshot: require('../assets/Icons/contact1.png'),
                   smsIcon: require('../assets/Icons/contactSMS.png'),
                   },{
                   name: 'Chris Angelotti',
                   headshot: require('../assets/Icons/contact2.png'),
                   smsIcon: require('../assets/Icons/contactSMS.png'),
                   },{
                   name: 'Sandy and Tony',
                   headshot: require('../assets/Icons/contact3.png'),
                   smsIcon: require('../assets/Icons/contactSMS.png'),
                   },{
                   name: 'Stephanie Vidal',
                   headshot: require('../assets/Icons/contact4.png'),
                   smsIcon: require('../assets/Icons/contactSMS.png'),
                   },{
                   name: 'John Anderson',
                   headshot: require('../assets/Icons/contact5.png'),
                   smsIcon: require('../assets/Icons/contactSMS.png'),
                   }]
    
    _dataApps=[{
                name: 'Airdrop',
                app: require('../assets/Icons/airDrop.png'),
                },{
                name: 'Messages',
                app: require('../assets/Icons/messages.png'),
                },{
                name: 'Mail',
                app: require('../assets/Icons/mail.png'),
                },{
                name: 'Notes',
                app: require('../assets/Icons/notes.png'),
                },{
                name: 'Reminder',
                app: require('../assets/Icons/reminders.png'),
                }]
    
    _renderContacts  = ({item}) => (
                                    <View style={{
                                    height: '100%',
                                    width: 74,
                                    top: 0,
                                    left: 0,
                                    marginRight: 11.5
                                    }}>
                               
                                    <Image style={{height: 62, width: 62, top: 0, left: 6, position: 'absolute', resizeMode: 'contain'}} source={item.headshot}/>
                                    <Image style={{height: 20, width: 20 , top: 44, left: 50, position: 'absolute'}} source={item.smsIcon}/>
                                    <Text style={{
                                        height: 35,
                                        color: '#000000',
                                        fontFamily: 'SFNS-Pro',
                                        fontSize: 11,
                                        letterSpacing: 0.07,
                                        lineHeight: 11,
                                        textAlign: 'center',
                                        top: 67,
                                        left: 0,
                                        width: 74,
                                        position: 'absolute',
                                    }}
                                    numberOfLines={2}>
                                    {item.name}
                                    </Text>
                                    </View>
                                       );
    
    _renderApps  = ({item}) => (
                               <View style={{
                               height: '100%',
                               width: 74,
                               top: 0,
                               left: 0,
                               marginRight: 12
                               }}>
                          
                                <View style={{
                                width: 60,
                                top: 0,
                                left: 6,
                                position: 'absolute',
                                alignItems: 'center'
                                }}>
                               <Image style={{height: 60, width: 60, top: 0, position: 'absolute',}} source={item.app}/>
                               <Text style={{
                                       height: 26,
                                       color: '#000000',
                                       fontFamily: 'SFNS-Pro',
                                       fontSize: 11,
                                       letterSpacing: 0.07,
                                       lineHeight: 13,
                                       textAlign: 'center',
                                        top: 67,
                                        position: 'absolute'
                               }}>
                               {item.name}
                               </Text>
                                </View>
                               </View>
                            );
    
    _terms = ({item}) => (
                          <TouchableOpacity style={{
                          boxSizing: 'border-box',
                          height: 109,
                          width: '86.72%',
                          border: '0.2px solid #0DB09F',
                          borderRadius: 10,
                          backgroundColor: '#FFFFFF',
                          boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',
                          borderWidth: .3,
                          borderColor: '#0DB09F',
                          left: '6.64%',
                          top: 0,
                          marginBottom: 14.9,
                       
                          }}
                          onPress={() => this.props.navigation.navigate('Detail', {
                                                                        subject: item.subject, terms: item.terms, exam: item.exam})}>
                          <Text style={{
                          height: 25,
                          color: '#1A1C36',
                          fontFamily: 'SFNSDisplay-Bold',
                          fontSize: 18,
                          lineHeight: 21,
                          left: '6.16%',
                          top: 18.1,
                          }}>
                          {item.subject}
                          </Text>
                          <Text style={{
                          height: 16,
                          color: '#A9ABB8',
                          fontFamily: 'SFNSDisplay',
                          fontSize: 12,
                          lineHeight: 15,
                          left: '6.16%',
                          top: 18.1+6-3,
                          }}>
                          {item.terms}
                          </Text>
                          <Text style={{
                          height: 16,
                          color: '#0DB09F',
                          fontFamily: 'SFNSDisplay-Bold',
                          fontSize: 14,
                          lineHeight: 17,
                          top: 18.1+6+17-3,
                          left: '6.16%',
                          }}>
                          {item.exam}
                          </Text>
                          <Image style={{height: 78, width: 78, borderRadius: 5, top: 16, right: '6.16%', position: 'absolute'}} source={item.imageUrl}/>
                          
                          </TouchableOpacity>
                          );
    
    
    _dataTerms=[{
                subject: 'English',
                terms: '59 terms',
                exam: 'AST',
                imageUrl: require('../assets/images/subjectTerms.png'),
                },{
                subject: 'Math',
                terms: '59 terms',
                exam: 'PSAT',
                imageUrl: require('../assets/images/subjectTerms.png'),
                },{
                subject: 'Math',
                terms: '59 terms',
                exam: 'ACT',
                imageUrl: require('../assets/images/subjectTerms.png'),
                }]
    
    
    renderEnglishCards = ({item}) => (
                                      <View style={{
                                      boxSizing: 'border-box',
                                      height: 175.5,
                                      width: 306,
                                      border: '0.5px solid #0DB09F',
                                      borderRadius: 10,
                                      backgroundColor: '#FFFFFF',
                                      boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',
                                      borderColor: '#0DB09F',
                                      borderWidth: 0.5,
                                      padding: 0,
                                      left: 0,
                                      top: 0,
                                      marginRight: 24,
                                      position: 'relative',

                                      }}>
                                      <Text style={{
                                      height: 28,
                                      color: '#0DB09F',
                                      fontFamily: 'SFNSDisplay-Bold',
                                      fontSize: 24,
                                      top: 31.25,
                                      left: '7.27%',
                                      lineHeight: 28}}>
                                      {item.word}</Text>
                                      <Text style={{
                                      height: 73,
                                      width: 243,
                                      color: '#A9ABB8',
                                      fontFamily: 'SFNSDisplay',
                                      fontSize: 12,
                                      lineHeight: 18,
                                      top: 31.25+21,
                                      left: '7.27%',
                                      textAlign: 'justify',
                                      }}
                                      numberOfLines={3}>
                                      {item.description}</Text>
                                      <TouchableOpacity style={{height: 20, width: 20, position: 'absolute', top: 21.25, right: '5.67%', zIndex: 1}} activeOpacity={0}>
                                      <Image style={{height: 13.33, width: 11.25, position: 'absolute', top: 3.33, left: 4.17, zIndex: 0}} source={require('../assets/images/soundSubject.png')}/>
                                      </TouchableOpacity>
                                      
                                      <TouchableOpacity style={{height: 16, width: 16, position: 'absolute', bottom: 14.25, right: '6.2%', zIndex: 1}} activeOpacity={0}>
                                      <Image style={{height: 12, width: 12, position: 'absolute', top: 2, left: 2, zIndex: 0}} source={require('../assets/images/expandSubject.png')}/>
                                      </TouchableOpacity>
                                      </View>
                                      );
    
    
    renderMathCards = ({item}) => (
                                   <View style={{
                                   boxSizing: 'border-box',
                                   height: 161.5,
                                   width: 306,
                                   border: '0.5px solid #0DB09F',
                                   borderRadius: 10,
                                   backgroundColor: '#FFFFFF',
                                   boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',
                                   borderColor: '#0DB09F',
                                   borderWidth: 0.5,
                                   padding: 0,
                                   left: 0,
                                   top: 0,
                                   marginRight: 24,
                                   position: 'relative',
                                   }}>
                                   <Text style={{
                                   height: 28,
                                   color: '#0DB09F',
                                   fontFamily: 'SFNSDisplay-Bold',
                                   fontSize: 24,
                                   top: 31.25,
                                   left: '7.27%',
                                   lineHeight: 28}}>
                                   {item.word}</Text>
                                   <Text style={{
                                   height: 73,
                                   width: 243,
                                   color: '#A9ABB8',
                                   fontFamily: 'SFNSDisplay',
                                   fontSize: 12,
                                   lineHeight: 18,
                                   top: 31.25+21,
                                   left: '7.27%',
                                   textAlign: 'justify',
                                   }}
                                   numberOfLines={3}>
                                   {item.description}</Text>
                                   <TouchableOpacity style={{height: 20, width: 20, position: 'absolute', top: 21.25, right: '5.67%', zIndex: 1}} activeOpacity={0}>
                                   <Image style={{height: 13.33, width: 11.25, position: 'absolute', top: 3.33, left: 4.17, zIndex: 0}} source={require('../assets/images/soundSubject.png')}/>
                                   </TouchableOpacity>
                                   
                                   <TouchableOpacity style={{height: 16, width: 16, position: 'absolute', bottom: 20.25, right: '6.2%', zIndex: 1}} activeOpacity={0}>
                                   <Image style={{height: 12, width: 12, position: 'absolute', top: 2, left: 2, zIndex: 0}} source={require('../assets/images/expandSubject.png')}/>
                                   </TouchableOpacity>
                                   </View>
                                   );
    
    renderTerms(){
        return (
                <View>
                <Text style={{height: 26, color: '#1A1C36', fontFamily: 'SFNSDisplay-Bold', left: '9.07%', fontSize: 21, lineHeight: 24, top: 0}}>Available terms</Text>
                <Text style={{height: 16, width: 44, color: '#A9ABB8', fontFamily: 'SFNSDisplay', fontSize: 14, lineHeight: 17, top: 7, left: '78.93%', position: 'absolute'
                }} onPress={() => this.props.navigation.navigate('details')}>See all</Text>
                <FlatList
                style={{flex: 1, position: 'relative', width: '100%', top: 17, left: 0,}}
                showsHorizontalScrollIndicator={false}
                vertical
                data={this._dataTerms}
                renderItem={this._terms}
                keyExtractor={(item, index) => index}
                />
                </View>
                )
    }
    
    renderCards() {
        if (this.state.subject == 'English') {
            return (
                    <View>
                    <FlatList
                    style={{height: 175.5, position: 'relative', width: '100%', top: 17, left: 0, paddingHorizontal: '6.6%'}}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={this._dataEnglishCards}
                    renderItem={this.renderEnglishCards}
                    keyExtractor={(item, index) => index}
                    />
                    </View>
                    )
        } else {
            return (
                    <View>
                    <FlatList
                    style={{height: 161.5, position: 'relative', width: '100%', top: 17, left: 0, paddingHorizontal: '6.6%'}}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={this._dataMathCards}
                    renderItem={this.renderMathCards}
                    keyExtractor={(item, index) => index}
                    />
                    </View>
                    )
        }
    }
    
    renderModalShare(){
        this.setState({ visibleShare: true })
        console.log(this.state.visibleShare)
    }
    
    renderModalLearn(){
        this.setState({ visibleLearn: true })
    }
    
    handleStartTest(){
        this.setState({ visibleTest: false })
        this.props.navigation.navigate('Test')
    }
    
    
    render() {
        const { width } = Dimensions.get('window');
        const height = Dimensions.get('window').height
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                
                
                             <TouchableOpacity onPress={() => this.props.navigation.navigate('Subjects')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'absolute', left: 25, zIndex:1, top: 17}} activeOpacity={0}>
                             <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                             </TouchableOpacity>
                             
                             <TouchableOpacity onPress={() => { this.renderModalShare() }} style={{height: 18, width: 18, borderRadius: 4.29, position: 'absolute', right: '17.33%', zIndex:1, top: 18}} activeOpacity={0}>
                             <Image style={{height: 12, width: 10.5, position: 'relative', top: 3, left: 3.75, zIndex: 0}} source={require('../assets/Icons/share.png')}/>
                             </TouchableOpacity>
                             
                             <Modal
                             onBackdropPress={() => this.setState({ visibleShare: false })}
                             isVisible={this.state.visibleShare}
                             backdropColor="#000000"
                             backdropOpacity={0.5}
                             animationIn='slideInUp'
                             animationOut='slideOutDown'
                             style={{marginVertical: 0, marginHorizontal: 0}}>
                             
                             <View style={{
                             boxSizing: 'border-box',
                             height: 489,
                             width: width,
                             border: '0.2px solid #0DB09F',
                             backgroundColor: '#FFFFFF',
                             boxShadow: '0 16px 24px 0 rgba(0,0,0,0.05)',
                             bottom: -0.1,
                             position: 'absolute',
                             borderTopLeftRadius: 15,
                             borderTopRightRadius: 15,
                             }}>
                             
                             <View style={{
                             height: 44,
                             width: width,
                             flexDirection: 'row',
                             top: 13,
                             position: 'absolute'
                             }}>
                             <View style={{
                             height: 40,
                             width: 40,
                             top: 3,
                             left: '4.27%',
                             backgroundColor: '#82efb8',
                             borderRadius: 10,
                             position: 'absolute'
                             }}></View>
                             
                             <Text style={{
                             height: 20,
                             color: '#000000',
                             fontFamily: 'SFNS-Pro',
                             fontSize: 15,
                             letterSxpacing: -0.24,
                             lineHeight: 20,
                             top: 4,
                             left: '17.07%',
                             position: 'absolute'
                             }}>
                             Title
                             </Text>
                             <Text style={{
                             height: 18,
                             color: '#000000',
                             fontFamily: 'SFNS-Pro',
                             fontSize: 13,
                             letterSxpacing: -0.08,
                             lineHeight: 18,
                             top: 23,
                             left: '17.07%',
                             position: 'absolute'
                             }}>
                             Subtitle
                             </Text>
                             <View style={{
                             top: 23,
                             width: 66,
                             height: 18,
                             left: '31.62%',
                             position: 'absolute',
                             flexDirection: 'row',
                             alignItems: 'center',
                             }}>
                             <Text style={{
                             color: '#007AFF',
                             left: 4,
                             }}>
                             Options
                             </Text>
                             <Image style={{
                                 height: 12,
                                 width: 6,
                                 left: 5,
                                 }} source={require('../assets/Icons/optionArrow.png')}/>
                             </View>
                             <TouchableOpacity style={{
                                 height: 30,
                                 width: 30,
                                 top: 7,
                                 left: '87.73%',
                                 borderRadius: 15,
                                 position: 'absolute'}}
                                 onPress={() => this.setState({ visibleShare: false })}>
                             <Image style={{
                                 height: 30,
                                 width: 30,
                                 top: 0,
                                 left: 0,
                                 borderRadius: 15,
                                 position: 'absolute'}} source={require('../assets/Icons/CloseButton.png')}/>
                             </TouchableOpacity>

                             
                             </View>
                             
                             <View style={{
                                 height: 0.5,
                                 width: width,
                                 backgroundColor: 'rgba(60,60,67,0.29)',
                                 position: 'absolute',
                                 top: 72
                             }}></View>
                             
                             <FlatList style={{
                             flexDirection: 'row',
                             position: 'absolute',
                             height: 93,
                             width: width,
                             top: 93,
                             left: 0,
                             paddingHorizontal: '2.67%',
                             }}
                             showsHorizontalScrollIndicator={false}
                             horizontal
                             data={this._dataContacts}
                             renderItem={this._renderContacts}
                             keyExtractor={(item, index) => index}/>
                             
                             <View style={{
                                height: 0.5,
                                width: width,
                                backgroundColor: 'rgba(60,60,67,0.29)',
                                position: 'absolute',
                                top: 199.5
                            }}></View>
                             
                             <FlatList style={{
                                     flexDirection: 'row',
                                     position: 'absolute',
                                     height: 93,
                                     width: width,
                                     top: 221,
                                     left: 0,
                                     paddingHorizontal: '2.67%',
                                     }}
                                     showsHorizontalScrollIndicator={false}
                                     horizontal
                                     data={this._dataApps}
                                     renderItem={this._renderApps}
                                     keyExtractor={(item, index) => index}/>
                                     
                             <TouchableOpacity style={{
                                 height: 51,
                                 width: '91.47%',
                                 borderRadius: 12,
                                 top: 328,
                                 position: 'absolute',
                                 left: '4.27%',
                                 justifyContent: 'center'
                             }}>
                             <Text style={{
                                 height: 22,
                                 width: 225,
                                 color: '#000000',
                                 fontFamily: 'SFNS-Pro',
                                 fontSize: 17,
                                 letterSpacing: -0.41,
                                 lineHeight: 22,
                                 left: '4.27%',
                                 position: 'absolute',
                                 textAlign: 'left'
                             }}>
                             Copy
                             </Text>
                             
                             <Image style={{height: '100%', width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 0}} source={require('../assets/Icons/copyButton.png')}/>
                             </TouchableOpacity>
                             
                             <TouchableOpacity style={{
                                             height: 51,
                                             width: '91.47%',
                                             borderRadius: 12,
                                             top: 390,
                                             position: 'absolute',
                                             left: '4.27%',
                                             justifyContent: 'center'
                                         }}>
                             <Image style={{height: '100%', width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 0}} source={require('../assets/Icons/readingListButton.png')}/>

                                         <Text style={{
                                             height: 24,
                                             width: 225,
                                             color: '#000000',
                                             fontFamily: 'SFNS-Pro',
                                             fontSize: 17,
                                             letterSpacing: -0.41,
                                             lineHeight: 22,
                                             left: '4.27%',
                                             position: 'absolute',
                                             textAlign: 'left'
                                         }}>
                                         Add to Reading List
                                         </Text>
                             
                            
                             </TouchableOpacity>
                             </View>
                             </Modal>
                             
                             
                             
                             <TouchableOpacity onPress={() => this.props.navigation.navigate('AddGroup')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'absolute', right: '8.53%', zIndex:1, top: 18}} activeOpacity={0}>
                             <Image style={{height: 12, width: 16.5, position: 'relative', top: 3, left: .75, zIndex: 0}} source={require('../assets/Icons/addGroup.png')}/>
                             </TouchableOpacity>
                             
                             
                             <View style={{flexDirection: 'row', top: 18, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center'}}>
                             <Text style={{
                             width: '44.93%',
                             color: '#1A1C36',
                             fontFamily: 'SFNSDisplay-Bold',
                             fontSize: 16,
                             lineHeight: 18,
                             textAlign: 'center'}}>
                             {this.props.navigation.state.params.subject}
                             </Text>
                             </View>
                
                
                <ScrollView
                showsVerticalScrollIndicator={false}
                behaviour = "height"
                contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'space-between'
                }}
                style={{
                top: 72.75,
                ...Platform.select({
                                   ios: {
                                   
                                   },
                                   android: {
                                   
                                   },
                                   }),
                }}
                
                scrollEventThrottle={16}>
                <View style={{height: 929+66-175.5-19}}>
                

                
                <View style={{flexDirection: 'row', top: 0, width: width, height: 24, position: 'absolute'}}>
                <Text style={{
                height: 24,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 21,
                lineHeight: 24,
                left: '9.07%',
                position: 'absolute',
                top: 0,
                }}>
                {this.props.navigation.state.params.terms}
                </Text>
                
                <TouchableOpacity onPress={() => this.props.navigation.navigate('')} style={{height: 24, width: 24, borderRadius: 4.29, position: 'absolute', left: '85.33%', zIndex:1, top: 0}} activeOpacity={0}>
                <Image style={{height: 16, width: 24, position: 'relative', top: 4, left: 0, zIndex: 0}} source={require('../assets/Icons/download.png')}/>
                </TouchableOpacity>
                </View>
                
                <Text style={{
                height: 16,
                color: '#0DB09F',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 14,
                lineHeight: 17,
                top: 315-211.25-72.75,
                position: 'absolute',
                left: '9.07%',
                }}>
                {this.props.navigation.state.params.exam}
                </Text>
                
                <View style={{
                boxSizing: 'border-box',
                height: 54.5,
                width: width,
                top: 348.75-211.25-72.75,
                position: 'absolute'
                }}>
                
                {/*1*/}
                <TouchableOpacity style={{
                boxSizing: 'border-box',
                height: 54.5,
                width: width * .4013,
                border: '0.5px solid #0DB09F',
                borderWidth: .5,
                borderColor: '#0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',
                top: 0,
                left: width * .066,
                position: 'absolute',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .1,
                shadowRadius: 70,
                elevation: 5,
                }}
                /*onPress={() => { this.renderModalLearn() }}*/
                onPress={() => this.props.navigation.navigate('Learn')}>

                <Image style={{height: 30, width: 32, position: 'relative', top: 3.33, left: width * .0407, zIndex: 0, top: 12.25,}} source={require('../assets/Icons/learn.png')}/>
                <Text style={{
                height: 16,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 14,
                lineHeight: 17,
                top: 19.25,
                left: width * .1693,
                position: 'absolute',
                }}>
                Learn
                </Text>
                </TouchableOpacity>
                <Modal
                
                onBackdropPress={() => this.setState({ visibleLearn: false })}
                
                isVisible={this.state.visibleLearn}
                backdropColor="#000000"
                backdropOpacity={0.5}
                animationIn='slideInUp'
                animationOut='slideOutDown'
                style={{marginVertical: 0, marginHorizontal: 0}}>
                
                <View style={{
                boxSizing: 'border-box',
                height: 485,
                width: width,
                border: '0.2px solid #0DB09F',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.05)',
                bottom: -0.1,
                position: 'absolute',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                }}>
                <View style={{
                height: 4,
                width: '29.87%',
                opacity: 0.2,
                borderRadius: 100,
                backgroundColor: '#000000',
                top: 8,
                left: '35.2%',
                position: 'absolute'
                }}>
                </View>
                
                <View style={{
                left: 0,
                top: 37,
                width: '100%',
                height: 18
                }}>
                <Image style={{
                left: '9.89%',
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
                left: '16.8%',
                top: 1,
                position: 'absolute'
                }}>
                1
                </Text>
                <Text style={{
                height: 18,
                color: '#0DB09F',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 14,
                lineHeight: 17,
                left: '39.2%',
                top: 1,
                position: 'absolute'
                }}>( 1 out of 56 )
                </Text>
                <Text style={{
                height: 18,
                color: '#EF4036',
                fontFamily: 'SFNSDisplay',
                fontSize: 16,
                lineHeight: 18,
                left: '81.87%',
                top: 1,
                position: 'absolute'
                }}>
                0
                </Text>
                <Image style={{
                left: '85.6%',
                top: 0,
                width: 18,
                height: 18,
                position: 'absolute'
                }}
                source={require('../assets/Icons/cancel-mark.png')}/>
                </View>
                
                <View style={{
                boxSizing: 'border-box',
                height: 1,
                width: '80.8%',
                left: '9.6%',
                backgroundColor: '#ebebeb',
                borderWidth: .2,
                borderColor: '#979797',
                border: '0.2px solid #ebebeb',
                top: 71,
                position: 'absolute',
                }}></View>
                
                <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                top: 97,
                position: 'absolute',
                height: 26,
                width: '100%'
                }}>
                <Text style={{
                height: 26,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 18,
                lineHeight: 21,
                textAlign: 'center'
                }}>
                Keytar McSweeney's Williamsburg
                </Text>
                </View>
                
                <TouchableOpacity style={{
                boxSizing: 'border-box',
                height: 52.2,
                width: '86.72%',
                border: '0.2px solid #0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                left: '6.64%',
                borderWidth: .3,
                borderColor: '#0DB09F',
                top: 146.9,
                position: 'absolute',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .2,
                shadowRadius: 200,
                elevation: 5,
                }}>
                <Text style={{
                height: 14,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay',
                fontSize: 12,
                lineHeight: 15,
                top: 20.1,
                left: '5.36%',
                }}>
                Terms & Conditions
                </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{
                boxSizing: 'border-box',
                height: 52.2,
                width: '86.72%',
                border: '0.2px solid #0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                left: '6.64%',
                borderWidth: .3,
                borderColor: '#0DB09F',
                top: 210.9,
                position: 'absolute',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .2,
                shadowRadius: 200,
                elevation: 5,
                }}>
                <Text style={{
                height: 16,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay',
                fontSize: 12,
                lineHeight: 15,
                top: 20.1,
                left: '5.36%',
                }}>
                Privacy Policy
                </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{
                boxSizing: 'border-box',
                height: 52.2,
                width: '86.72%',
                border: '0.2px solid #0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                left: '6.64%',
                borderWidth: .3,
                borderColor: '#0DB09F',
                top: 274.9,
                position: 'absolute',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .2,
                shadowRadius: 200,
                elevation: 5,
                }}>
                <Text style={{
                height: 14,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay',
                fontSize: 12,
                lineHeight: 15,
                top: 20.1,
                left: '5.36%',
                }}>
                FAQs
                </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{
                boxSizing: 'border-box',
                height: 52.2,
                width: '86.72%',
                border: '0.2px solid #0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                left: '6.64%',
                borderWidth: .3,
                borderColor: '#0DB09F',
                top: 338.9,
                position: 'absolute',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .2,
                shadowRadius: 200,
                elevation: 5,
                }}>
                <Text style={{
                height: 14,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay',
                fontSize: 12,
                lineHeight: 15,
                top: 20.1,
                left: '5.36%',
                }}>
                About
                </Text>
                </TouchableOpacity>
                
                </View>
                <View style={{
                flexDirection: 'row',
                top: height * .1232,
                width: width,
                height: 40,
                position: 'absolute',
                }}>
                
                </View>
                </Modal>
                
                
                {/*2*/}
                <TouchableOpacity style={{
                boxSizing: 'border-box',
                height: 54.5,
                width: width * .4013,
                border: '0.5px solid #0DB09F',
                borderWidth: .5,
                borderColor: '#0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',
                top: 0,
                left: width * .5327,
                position: 'absolute',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .1,
                shadowRadius: 70,
                elevation: 5,
                }}
                onPress={() => this.props.navigation.navigate('Flashcard', {reset: false, currentTerm: this.state.currentTerm})}>
                <Image style={{height: 30, width: 32, position: 'relative', top: 3.33, left: width * .0353, zIndex: 0, top: 12.25,}} source={require('../assets/Icons/flashcard.png')}/>
                <Text style={{
                height: 16,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 14,
                lineHeight: 17,
                top: 19.25,
                left: width * .164,
                position: 'absolute',
                }}>
                Flashcards
                </Text>
                </TouchableOpacity>
                </View>
                
                <View style={{
                boxSizing: 'border-box',
                height: 54.5,
                width: width,
                top: 419.75-211.25-72.75,
                position: 'absolute'
                }}>
                
                {/*3*/}
                <TouchableOpacity style={{
                boxSizing: 'border-box',
                height: 54.5,
                width: width * .4013,
                border: '0.5px solid #0DB09F',
                borderWidth: .5,
                borderColor: '#0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',
                top: 0,
                left: width * .066,
                position: 'absolute',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .1,
                shadowRadius: 70,
                elevation: 5,
                }}
                onPress={() => this.props.navigation.navigate('Write')}>
                <Image style={{height: 31, width: 28, position: 'relative', top: 3.33, left: width * .0407, zIndex: 0, top: 12.25,}} source={require('../assets/Icons/write.png')}/>
                <Text style={{
                height: 16,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 14,
                lineHeight: 17,
                top: 19.25,
                left: width * .1693,
                position: 'absolute',
                }}>
                Write
                </Text>
                </TouchableOpacity>
                
                {/*4*/}
                <TouchableOpacity style={{
                boxSizing: 'border-box',
                height: 54.5,
                width: width * .4013,
                border: '0.5px solid #0DB09F',
                borderWidth: .5,
                borderColor: '#0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',
                top: 0,
                left: width * .5327,
                position: 'absolute',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .1,
                shadowRadius: 70,
                elevation: 5,
                }}
                onPress={() => this.setState({ visibleTest: true })}>
                <Image style={{height: 30, width: 31, position: 'relative', top: 3.33, left: width * .038, zIndex: 0, top: 12.25,}} source={require('../assets/Icons/test.png')}/>
                <Text style={{
                height: 16,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 14,
                lineHeight: 17,
                top: 19.25,
                left: width * .1693,
                position: 'absolute',
                }}>
                Test
                </Text>
                </TouchableOpacity>
                
                </View>
                
                <Modal
                onBackdropPress={() => this.setState({ visibleTest: false })}
                
                isVisible={this.state.visibleTest}
                backdropColor="#000000"
                backdropOpacity={0.5}
                animationIn='slideInUp'
                animationOut='slideOutDown'
                style={{marginVertical: 0, marginHorizontal: 0}}>
                
                <View style={{
                boxSizing: 'border-box',
                height: 507,
                width: width,
                border: '0.2px solid #0DB09F',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.05)',
                bottom: -0.1,
                position: 'absolute',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                }}>
                
                <View style={{
                height: 4,
                width: '29.87%',
                opacity: 0.2,
                borderRadius: 100,
                backgroundColor: '#000000',
                top: 8,
                left: '35.2%',
                position: 'absolute'
                }}>
                </View>
                
                <Text style={{
                height: 14,
                color: '#A9ABB8',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 12,
                lineHeight: 15,
                left: '8.53%',
                position: 'absolute',
                top: 52,
                }}>
                General
                </Text>
                
                <View style={{
                top: 92,
                width: width,
                height: 18,
                flexDirection: 'row'
                }}>
                
                <Text style={{
                height: 18,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                left: '8.53%',
                position: 'absolute',
                }}>
                Question count
                </Text>
                
                <Text style={{
                height: 18,
                color: '#0DB09F',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                textAlign: 'right',
                left: '82.4%',
                position: 'absolute'
                }}>
                20
                </Text>
                
                
                <TouchableOpacity onPress={() => this.props.navigation.navigate('')} style={{height: 20, width: 20, position: 'absolute', left: '88.27%', zIndex:1, top: 0}} activeOpacity={0}>
                <Image style={{height: 10, width: 6.18, position: 'relative', top: 5, left: 7.16, zIndex: 0}} source={require('../assets/images/keyboard_arrow_left2.png')}/>
                </TouchableOpacity>
                
                
                </View>
                
                
                
                
                
                <View style={{
                boxSizing: 'border-box',
                height: 1,
                width: '80.8%',
                left: '9.6%',
                backgroundColor: '#ebebeb',
                borderWidth: .2,
                borderColor: '#979797',
                border: '0.2px solid #ebebeb',
                top: 126,
                position: 'absolute',
                }}></View>
                
                <View style={{
                top: 145,
                flexDirection: 'row',
                width: width,
                height: 18,
                }}>
                
                <Text style={{
                height: 18,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                left: '8.53%',
                top: 3,
                position: 'absolute',
                }}>
                Instant feedback
                </Text>
                
                <View style={{
                position: 'absolute',
                left: '76%',
                height: 24,
                width: 48,
                justifyContent: 'center',
                alignItems: 'center',
                top: 0
                }}>
                <SwitchToggle
                style={{
                top: 0,
                zIndex: 1,
                }}
                
                containerStyle={{
                width: 48,
                height: 24,
                borderRadius: 12,
                padding: 0,
                }}
                
                circleStyle={{
                width: 26,
                height: 26,
                borderRadius: 12,
                borderColor:'#FFFFFF',
                borderWidth: 2,
                backgroundColor: 'white', // rgb(102,134,205)
                }}
                
                switchOn={this.state.isOn1}
                /*onPress={(): void => {
                 this.setState({ isOn: !this.state.isOn });
                 }isOn => console.log("changed to : ", isOn)}*/
                backgroundColorOn='#0DB09F'
                circleColorOff='#0DB09F'
                circleColorOn='#0DB09F'
                duration={500}
                />
                </View>
                <TouchableOpacity
                style={{
                position: 'absolute',
                top: 0,
                width: 48,
                height: 24,
                left: '76%',
                }}
                onPress={(): void => {
                this.setState({ isOn1: !this.state.isOn1 });
                }}></TouchableOpacity>
                </View>
                
                <Text style={{
                height: 16,
                color: '#A9ABB8',
                fontFamily: 'SFNSDisplay',
                fontSize: 12,
                lineHeight: 15,
                left: '8.53%',
                top: 210,
                position: 'absolute',
                }}>
                Question types
                </Text>
                
                <View style={{
                top: 247,
                width: width,
                position: 'absolute',
                flexDirection: 'row'
                }}>
                <Text style={{
                height: 18,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                top: 3,
                left: '8.53%',
                position: 'absolute',
                }}>
                True/False
                </Text>
                <View style={{
                position: 'absolute',
                left: '76%',
                height: 24,
                width: 48,
                justifyContent: 'center',
                alignItems: 'center',
                top: 0
                }}>
                <SwitchToggle
                style={{
                top: 0,
                zIndex: 1,
                }}
                
                containerStyle={{
                width: 48,
                height: 24,
                borderRadius: 12,
                padding: 0,
                }}
                
                circleStyle={{
                width: 26,
                height: 26,
                borderRadius: 12,
                borderColor:'#FFFFFF',
                borderWidth: 2,
                backgroundColor: 'white', // rgb(102,134,205)
                }}
                
                switchOn={this.state.isOn2}
                /*onPress={(): void => {
                 this.setState({ isOn: !this.state.isOn });
                 }isOn => console.log("changed to : ", isOn)}*/
                backgroundColorOn='#0DB09F'
                circleColorOff='#0DB09F'
                circleColorOn='#0DB09F'
                duration={500}
                />
                </View>
                <TouchableOpacity
                style={{
                position: 'absolute',
                top: 0,
                width: 48,
                height: 24,
                left: '76%',
                }}
                onPress={(): void => {
                this.setState({ isOn2: !this.state.isOn2 });
                }}></TouchableOpacity>
                </View>
                
                
                
                <View style={{
                top: 293,
                width: width,
                position: 'absolute',
                flexDirection: 'row'
                }}>
                <Text style={{
                height: 18,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                top: 3,
                left: '8.53%',
                position: 'absolute',
                }}>
                Multiple choice
                </Text>
                <View style={{
                position: 'absolute',
                left: '76%',
                height: 24,
                width: 48,
                justifyContent: 'center',
                alignItems: 'center',
                top: 0
                }}>
                <SwitchToggle
                style={{
                top: 0,
                zIndex: 1,
                }}
                
                containerStyle={{
                width: 48,
                height: 24,
                borderRadius: 12,
                padding: 0,
                }}
                
                circleStyle={{
                width: 26,
                height: 26,
                borderRadius: 12,
                borderColor:'#FFFFFF',
                borderWidth: 2,
                backgroundColor: 'white', // rgb(102,134,205)
                }}
                
                switchOn={this.state.isOn3}
                /*onPress={(): void => {
                 this.setState({ isOn: !this.state.isOn });
                 }isOn => console.log("changed to : ", isOn)}*/
                backgroundColorOn='#0DB09F'
                circleColorOff='#0DB09F'
                circleColorOn='#0DB09F'
                duration={500}
                />
                </View>
                <TouchableOpacity
                style={{
                position: 'absolute',
                top: 0,
                width: 48,
                height: 24,
                left: '76%',
                }}
                onPress={(): void => {
                this.setState({ isOn3: !this.state.isOn3 });
                }}></TouchableOpacity>
                </View>
                
                
                <View style={{
                top: 342,
                width: width,
                position: 'absolute',
                flexDirection: 'row'
                }}>
                <Text style={{
                height: 18,
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                top: 3,
                left: '8.53%',
                position: 'absolute',
                }}>
                Written
                </Text>
                <View style={{
                position: 'absolute',
                left: '76%',
                height: 24,
                width: 48,
                justifyContent: 'center',
                alignItems: 'center',
                top: 0
                }}>
                <SwitchToggle
                style={{
                top: 0,
                zIndex: 1,
                }}
                
                containerStyle={{
                width: 48,
                height: 24,
                borderRadius: 12,
                padding: 0,
                }}
                
                circleStyle={{
                width: 26,
                height: 26,
                borderRadius: 12,
                borderColor:'#FFFFFF',
                borderWidth: 2,
                backgroundColor: 'white', // rgb(102,134,205)
                }}
                
                switchOn={this.state.isOn4}
                /*onPress={(): void => {
                 this.setState({ isOn: !this.state.isOn });
                 }isOn => console.log("changed to : ", isOn)}*/
                backgroundColorOn='#0DB09F'
                circleColorOff='#0DB09F'
                circleColorOn='#0DB09F'
                duration={500}
                />
                </View>
                <TouchableOpacity
                style={{
                position: 'absolute',
                top: 0,
                width: 48,
                height: 24,
                left: '76%',
                }}
                onPress={(): void => {
                this.setState({ isOn4: !this.state.isOn4 });
                }}></TouchableOpacity>
                </View>
                
                
                <TouchableOpacity style={{
                height: 54,
                width: '73.33%',
                borderRadius: 27,
                backgroundColor: '#0DB09F',
                left: '13.33%',
                justifyContent: 'center',
                alignItems: 'center',
                top: 407,
                position: 'absolute'
                }}
                onPress={() => { this.handleStartTest() }}>
                <Text style={{
                height: 18,
                color: '#FFFFFF',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 15,
                lineHeight: 18,
                textAlign: 'center'
                }}>
                Start test
                </Text>
                </TouchableOpacity>
                
                </View>
                
                <View style={{
                flexDirection: 'row',
                top: height * .1232,
                width: width,
                height: 40,
                position: 'absolute',
                }}>
                
                
                
                </View>
                </Modal>
                
                
                
                <View style={{
                boxSizing: 'border-box',
                flex: 1,
                width: width,
                top: 510-211.25-72.75,
                position: 'absolute',
                shadowOffset:{  width: 0,  height: 0,  },
                                       shadowColor: '#000000',
                                       shadowOpacity: .05,
                                       shadowRadius: 70,
                                       elevation: 5,
                
                }}>
                {this.renderTerms()}
                </View>         
                </View>
                </ScrollView>
                </View>
                </SafeAreaView>
                )
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

class LearnScreen extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
        answer: '',
        questions: [],
        currentIndex: 0,
        currentQuestion: '',
        currentAnswer: '',
        currentImage: '',
        currentQuestionType: null,
        };
    }
    
    onTextChangeAnswer(text) {
        this.setState({answer: text });
    }
  
    updateQuestions = (questions) => {
        this.setState({questions: questions})
        console.log(this.state.questions)
        this.setState({currentQuestion: questions[0].DESCRIPTION})
        this.setState({currentAnswer: questions[0].ANSWER})
        this.setState({currentImage: questions[0].IMAGE})
        this.setState({currentQuestionId: questions[0].ID})
        this.setState({currentQuestionType: questions[0].TYPE})
    }
    
    nextCard = () => {
        this.setState(incrementIndex(this.state.questions))
    }
    
    componentDidMount(){
         this._subscribe = this.props.navigation.addListener('didFocus', () => {
         AsyncStorage.getItem('access_token').then((token) => {
         Functions.fetchQuestions(token, this.updateQuestions, this.props.navigation.state.params.currentTerm)
         })
    });
    }
        
    render() {
        const { width } = Dimensions.get('window');
        const height = Dimensions.get('window').height
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
                top: Platform.OS === 'android' ? 25+19 : 19
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
                1
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
                }}>( {this.state.currentIndex} out of {this.state.questions.length-1} )
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
                0
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
                height: (width * .6773) * .583,
                width: width * .6773,
                top: Platform.OS === 'android' ? 25+92 : 92,
                left: '16.27%',
                position: 'absolute',
                }}
                source={require('../assets/images/writeImage.png')}/>
                
                <View style={{
                top: Platform.OS === 'android' ? 25+92+((width * .6773) * .583)+19 : 92+((width * .6773) * .583)+19,
                width: width,
                flex: 1,
                flexDirection: 'column'
                }}>
                <Text style={{
                height: 60,
                width: '69.6%',
                color: '#A9ABB8',
                fontFamily: 'SFNSDisplay',
                fontSize: 12,
                lineHeight: 20,
                textAlign: 'center',
                top: 0,
                left: '15.2%',
                }}>
                {this.state.currentQuestion}
                </Text>
                
                <View style={{top: 19, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{
                height: 14,
                color: '#0DB09F',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 12,
                lineHeight: 15,
                textAlign: 'center',
                top: 0,
                }}
                onPress={() => this.nextCard()}>Next
                </Text>
                </View>
                </View>
                </View>
                
                </SafeAreaView>
                );
    }
}


function submitText(questions) {
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


class WriteScreen extends React.Component {
    constructor(props) {
          super(props);
          
          this.state = {
          answer: '',
          questions: [],
          currentIndex: 0,
          currentQuestion: '',
          currentAnswer: '',
          currentImage: '',
          currentQuestionType: null,
          correctCount: 0,
          inCorrectCount: 0,
          };
      }
      
      onTextChangeAnswer(text) {
          this.setState({answer: text });
      }
        
        updateQuestions = (questions) => {
            this.setState({questions: questions})
            console.log(this.state.questions)
            this.setState({currentQuestion: questions[0].DESCRIPTION})
            this.setState({currentAnswer: questions[0].ANSWER})
            this.setState({currentImage: questions[0].IMAGE})
            this.setState({currentQuestionId: questions[0].ID})
            this.setState({currentQuestionType: questions[0].TYPE})
        }
        
        nextCard = () => {
            this.setState(incrementIndex(this.state.questions))
        }
        
        componentDidMount(){
            this._subscribe = this.props.navigation.addListener('didFocus', () => {
             AsyncStorage.getItem('access_token').then((token) => {
             Functions.fetchQuestions(token, this.updateQuestions, this.props.navigation.state.params.currentTerm)
            })
        });
        }
        
    
     onSubmit(text){
        console.log(text+':on submit=> '+this.state.currentAnswer)
        this.setState(submitText(this.state.questions))

         if (this.state.currentIndex+1 < this.state.questions.length){

             if(text == this.state.currentAnswer){
                 this.setState({correctCount: this.state.correctCount + 1})
             }else{
                 this.setState({inCorrectCount: this.state.inCorrectCount + 1})
             }
             
           this.setState({
                 currentIndex: this.state.currentIndex + 1,
                 currentQuestion: this.state.questions[this.state.currentIndex + 1].DESCRIPTION,
                 currentAnswer: this.state.questions[this.state.currentIndex + 1].ANSWER,
                 currentImage: this.state.questions[this.state.currentIndex + 1].IMAGE,
                 currentQuestionId: this.state.questions[this.state.currentIndex + 1].ID,
                 currentQuestionType: this.state.questions[this.state.currentIndex + 1].TYPE
             })
           }else{
               console.log('DONE')
           }
         
     }
    
      updateQuestions = (questions) => {
          this.setState({questions: questions})
          console.log(this.state.questions)
          this.setState({currentQuestion: questions[0].DESCRIPTION})
          this.setState({currentAnswer: questions[0].ANSWER})
          this.setState({currentImage: questions[0].IMAGE})
          this.setState({currentQuestionId: questions[0].ID})
          this.setState({currentQuestionType: questions[0].TYPE})
      }
      
      nextCard = () => {
          console.log(this.state.currentIndex + "-" + this.state.questions.length)
          if (this.state.currentIndex+1 < this.state.questions.length){
              this.setState({
                    currentIndex: this.state.currentIndex + 1,
                    currentQuestion: this.state.questions[this.state.currentIndex + 1].DESCRIPTION,
                    currentAnswer: this.state.questions[this.state.currentIndex + 1].ANSWER,
                    currentImage: this.state.questions[this.state.currentIndex + 1].IMAGE,
                    currentQuestionId: this.state.questions[this.state.currentIndex + 1].ID,
                    currentQuestionType: this.state.questions[this.state.currentIndex + 1].TYPE
                })
          }else{
              console.log('DONE')
          }
      }
      
    
    onTextChangeAnswer(text) {
        this.setState({ answer: text });
        console.log(text)
    }
    render() {
        const { width } = Dimensions.get('window');
        const height = Dimensions.get('window').height
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
                top: Platform.OS === 'android' ? 25+19 : 19
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
                {this.state.correctCount}
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
                }}>( {this.state.currentIndex} out of {this.state.questions.length-1} )
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
                {this.state.inCorrectCount}
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
                height: (width * .6773) * .583,
                width: width * .6773,
                top: Platform.OS === 'android' ? 25+92 : 92,
                left: '16.27%',
                position: 'absolute',
                }}
                source={require('../assets/images/writeImage.png')}/>
                
                <View style={{
                top: Platform.OS === 'android' ? 25+92+((width * .6773) * .583)+19 : 92+((width * .6773) * .583)+19,
                width: width,
                flex: 1,
                flexDirection: 'column'
                }}>
                <Text style={{
                height: 60,
                width: '69.6%',
                color: '#A9ABB8',
                fontFamily: 'SFNSDisplay',
                fontSize: 12,
                lineHeight: 20,
                textAlign: 'center',
                top: 0,
                left: '15.2%',
                }}>
                {this.state.currentQuestion}
                </Text>
                <View style={{
                boxSizing: 'border-box',
                height: 60.2,
                width: '86.72%',
                border: '0.2px solid #0DB09F',
                borderWidth: .3,
                borderColor: '#0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                top: 19,
                left: '6.64%',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .2,
                shadowRadius: 70,
                elevation: 5,
                paddingHorizontal: '5.89%',
                justifyContent: 'center'
                }}>
                <TextInput style={{
                color: '##A9ABB8'
                }}
                placeholderTextColor='#A9ABB8'
                placeholder='Type your answer'
                textContentType='password'
                keyboardType={'default'}
                onChangeText={(text) => this.onTextChangeAnswer(text) }
                onSubmitEditing={(event) => this.onSubmit( event.nativeEvent.text )}
                value={this.state.answer}
                placeholder='Type your answer'
                returnKeyType={'go'}/>
                </View>
                <View style={{top: 19+22.9, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{
                height: 14,
                color: '#EF4036',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 12,
                lineHeight: 15,
                textAlign: 'center',
                top: 0,
                }} onPress={() => this.nextCard()}>I don’t know
                </Text>
                </View>
                </View>
                </View>
                
                </SafeAreaView>
                );
    }
}

class TestScreen extends React.Component {
    state = {answer: ''};
    
    onTextChangeAnswer(text) {
        this.setState({ answer: text });
    }
    render() {
        const { width } = Dimensions.get('window');
        const height = Dimensions.get('window').height
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
                1
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
                }}>( 1 out of 56 )
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
                0
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
                height: (width * .6773) * .583,
                width: width * .6773,
                top: Platform.OS === 'android' ? 25+92 : 92,
                left: '16.27%',
                position: 'absolute',
                }}
                source={require('../assets/images/writeImage.png')}/>
                
                <View style={{
                top: Platform.OS === 'android' ? 25+92+((width * .6773) * .583)+19 : 92+((width * .6773) * .583)+19,
                width: width,
                flex: 1,
                flexDirection: 'column'
                }}>
                
                <Text style={{
                height: 60,
                width: '69.6%',
                color: '#A9ABB8',
                fontFamily: 'SFNSDisplay',
                fontSize: 12,
                lineHeight: 20,
                textAlign: 'center',
                top: 0,
                left: '15.2%',
                }}>
                Retro occupy organic, stump town shabby chic pour-over roof party DIY normcore. Actually arti san organic occupy
                </Text>
                <View style={{
                boxSizing: 'border-box',
                height: 60.2,
                width: '86.72%',
                border: '0.2px solid #0DB09F',
                borderWidth: .3,
                borderColor: '#0DB09F',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                top: 19,
                left: '6.64%',
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .2,
                shadowRadius: 70,
                elevation: 5,
                paddingHorizontal: '5.89%',
                justifyContent: 'center'
                }}>
                <TextInput style={{
                color: '##A9ABB8'
                }}
                placeholderTextColor='#A9ABB8'
                placeholder='Type your answer'
                textContentType='password'
                keyboardType={'default'}
                onChangeText={(text) => this.onTextChangeAnswer(text) }
                value={this.state.answer}
                placeholder='Type your answer'
                returnKeyType={'go'}/>
                </View>
                <View style={{top: 19+22.9, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{
                height: 14,
                color: '#EF4036',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 12,
                lineHeight: 15,
                textAlign: 'center',
                top: 0,
                }}>I don’t know
                </Text>
                </View>
                </View>
                </View>
                
                </SafeAreaView>
                );
    }
}

function * range (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

class FlashcardScreen extends React.Component {
    constructor (props) {
       super(props)
       this.state = {
         cards: [...range(1, 50)],
         swipedAllCards: false,
         swipeDirection: '',
         cardIndex: 0
       }
     }
    
    renderCard = (card, index) => {
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
                       <Image style={{height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0}} source={require('../assets/images/cardBG.png')}/>
                       <Text style={{
                               height: 72,
                               width: '87.74%',
                               color: '#FFFFFF',
                               fontFamily: 'SFNSDisplay',
                               fontSize: 12,
                               lineHeight: 18,
                               textAlign: 'justify',
                               left: '6.13%',
                               top: 223,
                               position: 'absolute'
                           }}>Retro occupy organic, stump town shabby chic pour-over roof party DIY normcore. Actually arti san organic occupy</Text>
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
                   <Text style={styles.text}>{card} - {index}</Text>
                 </View>
               )
     };

     onSwiped = (type) => {
       console.log(`on swiped ${type}`)
     }

     onSwipedAllCards = () => {
       this.setState({
         swipedAllCards: true
       })
     };

     swipeLeft = () => {
       this.swiper.swipeLeft()
     };

    render() {
        const { width } = Dimensions.get('window');
        const height = Dimensions.get('window').height
        return (
                
        /*        <ImageBackground source={require('../assets/images/cardScreenBG.png')} style={{
                                  height: height,
                                  width: width,
                                  resizeMode: "contain",
                                  overflow: "hidden",
                              flex: 1}}>*/
                
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 17}} activeOpacity={0}>
                <Image style={{height: 11.67, width: 11.67, position: 'relative', top: 4.17, left: 4.17, zIndex: 0}} source={require('../assets/Icons/cancel_left.png')}/>
                </TouchableOpacity>
                
                
                <View style={{
                left: 0,
                top: 19,
                width: '100%',
                height: 18,
                position: 'absolute'
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
                1
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
                }}>( 1 out of 56 )
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
                0
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
                <View style={{
                    height: 380,
                    width: width * .656,
                    borderRadius: 5,
                    backgroundColor: 'rgba(26,28,54,0.31)',
                    top: height * .1872,
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
                         /*onTapCard={this.swipeLeft}*/
                         cards={this.state.cards}
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
                          height: 380,}}
                
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
                             title: 'NOPE',
                             style: {
                               label: {
                                 backgroundColor: 'black',
                                 borderColor: 'black',
                                 color: 'white',
                                 borderWidth: 1
                               },
                               wrapper: {
                                 flexDirection: 'column',
                                 alignItems: 'flex-end',
                                 justifyContent: 'flex-start',
                                 marginTop: 30,
                                 marginLeft: -30
                               }
                             }
                           },
                           right: {
                             title: 'LIKE',
                             style: {
                               label: {
                                 backgroundColor: 'black',
                                 borderColor: 'black',
                                 color: 'white',
                                 borderWidth: 1
                               },
                               wrapper: {
                                 flexDirection: 'column',
                                 alignItems: 'flex-start',
                                 justifyContent: 'flex-start',
                                 marginTop: 30,
                                 marginLeft: 30
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
                         animateOverlayLabelsOpacity
                         animateCardOpacity
                         swipeBackCard
                       >
                         <Button onPress={() => this.swiper.swipeBack()} title='Swipe Back' />
                       </Swiper>
                </View>
                <View style={{
                    bottom: 83.9,
                    width: width,
                    height: 56.2,
                    position: 'absolute'
                }}>
                <View style={{
                        boxSizing: 'border-box',
                        height: 56.2,
                        width: 56.2,
                        top: 0,
                        border: '0.2px solid #0DB09F',
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                        left: '9.04%',
                        borderRadius: 56.2/2,
                        borderWidth: .2,
                        borderColor: '#0DB09F',
                    }}></View>
                </View>
                </View>
                
                </SafeAreaView>
               /* </ImageBackground>*/
                );
    }
}

SubjectsScreen.navigationOptions = {
title: '',
header: null,
};

DetailScreen.navigationOptions = {
title: '',
header: null,
};

WriteScreen.navigationOptions = {
title: '',
header: null,
};

LearnScreen.navigationOptions = {
title: '',
header: null,
};

TestScreen.navigationOptions = {
title: '',
header: null,
};

FlashcardScreens.navigationOptions = {
title: '',
header: null,
tabBarVisible: false,
};


const RootStack = createStackNavigator(
                                       {
                                           Subjects: SubjectsScreen,
                                           Detail: DetailScreen,
                                           Write: WriteScreen,
                                           Learn: LearnScreen,
                                           Test: TestScreen,
                                           Flashcard: FlashcardScreens,
                                           TestResults: TestResultsScreen,
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

RootStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "Flashcard") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible
  };
};

export default RootStack;


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

