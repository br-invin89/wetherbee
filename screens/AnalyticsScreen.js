import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from 'react-native-elements';
import VideoPlayer from 'react-native-video-player';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { withNavigation } from 'react-navigation';
import ProfileScreen from '../screens/ProfileScreen';
import { Searchbar } from 'react-native-paper';
import { Video } from 'expo-av';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Functions from '../functions';
import Moment from 'moment';

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
    Button,
    AsyncStorage
} from 'react-native'; 


function setUser(user) {
    console.log("********")
    console.log(user)
    return (previousState, currentProps) => {
      return { ...previousState,
                    allowParents: user.ALLOW_PARENTS
                };
    };
}

class AnalyticsScreen extends React.Component {
    constructor(props) {
          super(props);
          
          this.state = {
          score: [55, 27, 46, 67, 12, 46, 27],
          visibleClose: false,
          visibleCalendar: false,
          selected: '',
          segmentControl: 1,
          subject: 1,
          response: [],
          allowParents: 0,
          };
        this.onDayPress = this.onDayPress.bind(this);

      }
    
    async saveUser(user){
        try {
            console.log("USER===> ")
            console.log(user)
            await AsyncStorage.setItem('user', JSON.stringify(user[0]));
            this.setState(setUser(user[0]));
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }
    
    renderModalCalender(){
        this.setState({ visibleCalendar: true })
        console.log(this.state.visibleCalendar)
    }
    
    renderModalClose() {
        this.setState({ visibleClose: true })
        console.log(this.state.visibleClose)
    }

    onDayPress(day) {
        this.setState({ selected: day.dateString})
    }
    
    

    updateAllowParents = (response) => {
        this.saveUser(response)
          this.setState({response: response})
          console.log(this.state.response)
        }
    
    allowParents(){
        AsyncStorage.getItem('access_token').then((token) => {
            AsyncStorage.getItem('user').then((user) => {
            Functions.allowParents(token, this.updateAllowParents, JSON.parse(user).ID)
            })
        })
    }
    
    componentDidMount(){
              this._subscribe = this.props.navigation.addListener('didFocus', () => {
                   AsyncStorage.getItem('user').then((user) => {
                      this.setState(setUser(JSON.parse(user)));
                   });
               });
           }
    
    _lastWeek() {
    if (this.state.segmentControl == 1) {
    return (
                    <View
                     style={{
                     boxSizing: 'border-box',
                     height: 40,
                     width: 104,
                     border: '1px solid #0DB09F',
                     borderRadius: 20,
                     backgroundColor: '#FFFFFF',
                     borderColor: '#0DB09F',
                     borderWidth: 1,
                     alignItems: 'center',
                     left: '6%',
                     position: 'absolute',
                 }}>
                 
                    <Text style={{
                     height: 16,
                     width: 84,
                     color: '#0DB09F',
                     fontFamily: 'SFNSDisplay',
                     fontsize: 14,
                     lineHeight: 17,
                     top: 10,
                     textAlign: 'center'}}>
                 Last Week
                    </Text>
                   </View>
            )
            } else {
        return (
         
                <TouchableOpacity
                    style={{
                    boxSizing: 'border-box',
                    height: 40,
                    width: 104,
                    border: '1px solid #0DB09F',
                    borderRadius: 20,
                    alignItems: 'center',
                    left: '6%',
                    position: 'absolute',
                }}
                onPress={() => this.setState({ segmentControl: 1})}>
                  <Text style={{
                     height: 16,
                     width: 84,
                     color: '#A9ABB8',
                     fontFamily: 'SFNSDisplay',
                     fontsize: 14,
                     lineHeight: 17,
                     textAlign: 'center',
                     top: 11,
                    }}
                >
                 Last Week
                </Text>
                </TouchableOpacity>
                )
        }
    }
    
    _lastMonth() {
        if (this.state.segmentControl == 2) {
         return (
                         <View
                          style={{
                          boxSizing: 'border-box',
                          height: 40,
                          width: 104,
                          border: '1px solid #0DB09F',
                          borderRadius: 20,
                          backgroundColor: '#FFFFFF',
                          borderColor: '#0DB09F',
                          borderWidth: 1,
                          alignItems: 'center',
                          left: '37%',
                          position: 'absolute',
                      }}>
                      
                      <Text style={{
                          height: 16,
                          width: 84,
                          color: '#0DB09F',
                          fontFamily: 'SFNSDisplay',
                          fontsize: 14,
                          lineHeight: 17,
                          textAlign: 'center',
                          top: 10
                 }}>
                    Last Month
                        </Text>
                        </View>
                 )
                 } else {
             return (
                     <TouchableOpacity
                        style={{
                        boxSizing: 'border-box',
                        height: 40,
                        width: 104,
                        border: '1px solid #0DB09F',
                        borderRadius: 20,
                        alignItems: 'center',
                        left: '37%',
                        position: 'absolute',
                    }}
                     onPress={() => this.setState({ segmentControl: 2})}>
                    <Text style={{
                         height: 16,
                         width: 84,
                         color: '#A9ABB8',
                         fontFamily: 'SFNSDisplay',
                         fontSize: 14,
                         lineHeight: 17,
                         textAlign: 'center',
                         top: 11,
                     }}>
                           Last Month
                     </Text>
                     </TouchableOpacity>
                     )
             }
    }
    

    _allTime() {
        if (this.state.segmentControl == 3) {
              return (
                    
                              <View
                               style={{
                               boxSizing: 'border-box',
                               height: 40,
                               width: 104,
                               border: '1px solid #0DB09F',
                               borderRadius: 20,
                               backgroundColor: '#FFFFFF',
                               borderColor: '#0DB09F',
                               borderWidth: 1,
                               alignItems: 'center',
                               left: '65.8%',
                               position: 'absolute',
                           }}>
                           
                           <Text style={{
                               height: 16,
                               width: 84,
                               color: '#0DB09F',
                               fontFamily: 'SFNSDisplay',
                               fontsize: 14,
                               top: 10,
                               lineHeight: 17,
                               textAlign: 'center'}}>
                         All time
                             </Text>
                             </View>
                      )
                      } else {
                  return (
                       
                    

                        <TouchableOpacity
                              style={{
                              boxSizing: 'border-box',
                              height: 40,
                              width: 104,
                              border: '1px solid #0DB09F',
                              borderRadius: 20,
                              alignItems: 'center',
                              left: '65.8%',
                              position: 'absolute',
                          }}
                           onPress={() => this.setState({ segmentControl: 3})}>
                          
                          <Text style={{
                              height: 16,
                              width: 84,
                              color: '#A9ABB8',
                              fontFamily: 'SFNSDisplay',
                              fontSize: 14,
                              lineHeight: 17,
                              textAlign: 'center',
                              top: 11,
                          }}>
                                All time
                          </Text>
                          </TouchableOpacity>
                  
                          )
                  }
    }
    
    
    _english() {
    if (this.state.subject == 1) {
    return (
                    <View
                     style={{
                     boxSizing: 'border-box',
                     height: 40,
                     width: 104,
                     border: '1px solid #0DB09F',
                     borderRadius: 20,
                     backgroundColor: '#0DB09F',
                     alignItems: 'center',
                     left: '6%',
                     position: 'absolute',
                 }}>
                 
                    <Text style={{
                     height: 18,
                     width: 84,
                     color: '#FFFFFF',
                     fontFamily: 'SFNSDisplay',
                     fontsize: 14,
                     lineHeight: 17,
                     top: 10,
                     textAlign: 'center'}}>
                 English
                    </Text>
                   </View>
            )
            } else {
        return (
         
                <TouchableOpacity
                    style={{
                    boxSizing: 'border-box',
                    height: 40,
                    width: 104,
                    border: '1px solid #0DB09F',
                    borderRadius: 20,
                    alignItems: 'center',
                    left: '6%',
                    position: 'absolute',
                }}
                onPress={() => this.setState({ subject: 1})}>
                  <Text style={{
                     height: 18,
                     width: 84,
                     color: '#A9ABB8',
                     fontFamily: 'SFNSDisplay',
                     fontsize: 14,
                     lineHeight: 17,
                     textAlign: 'center',
                     top: 11,
                    }}
                >
                 English
                </Text>
                </TouchableOpacity>
                )
        }
    }
    
    _math() {
        if (this.state.subject == 2) {
         return (
                         <View
                          style={{
                          boxSizing: 'border-box',
                          height: 40,
                          width: 104,
                          border: '1px solid #0DB09F',
                          borderRadius: 20,
                          backgroundColor: '#0DB09F',
                          alignItems: 'center',
                          left: '37%',
                          position: 'absolute',
                      }}>
                      
                      <Text style={{
                          height: 18,
                          width: 84,
                          color: '#FFFFFF',
                          fontFamily: 'SFNSDisplay',
                          fontsize: 14,
                          lineHeight: 17,
                          textAlign: 'center',
                          top: 10
                 }}>
                    Math
                        </Text>
                        </View>
                 )
                 } else {
             return (
                     <TouchableOpacity
                        style={{
                        boxSizing: 'border-box',
                        height: 40,
                        width: 104,
                        border: '1px solid #0DB09F',
                        borderRadius: 20,
                        alignItems: 'center',
                        left: '37%',
                        position: 'absolute',
                    }}
                     onPress={() => this.setState({ subject: 2})}>
                    <Text style={{
                         height: 18,
                         width: 84,
                         color: '#A9ABB8',
                         fontFamily: 'SFNSDisplay',
                         fontSize: 14,
                         lineHeight: 17,
                         textAlign: 'center',
                         top: 11,
                     }}>
                           Math
                     </Text>
                     </TouchableOpacity>
                     )
             }
    }
    

    _all() {
        if (this.state.subject == 3) {
              return (
                    
                              <View
                               style={{
                               boxSizing: 'border-box',
                               height: 40,
                               width: 104,
                               border: '1px solid #0DB09F',
                               borderRadius: 20,
                               backgroundColor: '#0DB09F',
                               alignItems: 'center',
                               left: '65.8%',
                               position: 'absolute',
                           }}>
                           
                           <Text style={{
                               height: 18,
                               width: 84,
                               color: '#FFFFFF',
                               fontFamily: 'SFNSDisplay',
                               fontsize: 14,
                               top: 10,
                               lineHeight: 17,
                               textAlign: 'center'}}>
                         All Subjects
                             </Text>
                             </View>
                      )
                      } else {
                  return (
                       
                    

                        <TouchableOpacity
                              style={{
                              boxSizing: 'border-box',
                              height: 40,
                              width: 104,
                              border: '1px solid #0DB09F',
                              borderRadius: 20,
                              alignItems: 'center',
                              left: '65.8%',
                              position: 'absolute',
                          }}
                           onPress={() => this.setState({ subject: 3})}>
                          
                          <Text style={{
                              height: 18,
                              width: 84,
                              color: '#A9ABB8',
                              fontFamily: 'SFNSDisplay',
                              fontSize: 14,
                              lineHeight: 17,
                              textAlign: 'center',
                              top: 11,
                          }}>
                                All Subjects
                          </Text>
                          </TouchableOpacity>
                  
                          )
                  }
    }
    
    
    render() {
        
        const { width } = Dimensions.get('window');
        const  height = Dimensions.get('window').height;
        
        const ratio = width*2.624
        console.log(height);
        console.log(width*.8667*.4276923077)
        console.log("..."+width*.8667*.4276923077*.618705036)
        console.log(Dimensions.get('screen'))
        console.log("width="+width+", height="+height+", ratio (width/height)="+(width/height))
                                                                                 console.log("ALLOWPARENTS ==> " + this.state.allowParents)
      return (
              <SafeAreaView>
              <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              behaviour = "height"
              contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
              
              }}
              scrollEventThrottle={16}>
             
              <View style={{flexDirection: 'column', height: (this.state.allowParents == 1) ? 831-139+(ratio * .1413)-163+(ratio * .1657)+70 - (ratio * .1413) : 831-139+(ratio * .1413)-163+(ratio * .1657)+70}}>
              <View style={{flexDirection: 'row', height: ratio * .0285, top: ratio * .0346, width: width}}>
              <Text style={styles.AnalyticsText}>My Analytics</Text>
              <TouchableOpacity style={{height: 20, width: 20, left: '75.46%', top: 2, position: 'absolute',}}
           onPress={() => { this.renderModalClose() }}>
              <Image style={{height: 20, width: 20, top: 2, position: 'absolute'}} source={require('../assets/Icons/close.png')}/>
              </TouchableOpacity>
             

                        <Modal
                         
                            onBackdropPress={() => this.setState({ visibleClose: false })}
                            isVisible={this.state.visibleClose}
                            backdropColor="#000000"
                            backdropOpacity={0.5}
                            animationIn='slideInDown'
                            animationOut='slideOutUp'
                            style={{marginVertical: 0, marginHorizontal: 0}}>
                         
                         <View style={{
                          boxSizing: 'border-box',
                          height: height * .2059,
                          width: width,
                          border: '0.2px solid #0DB09F',
                          backgroundColor: '#FFFFFF',
                          boxShadow: '0 16px 24px 0 rgba(0,0,0,0.05)',
                          top: -0.1,
                          position: 'absolute',
                          borderBottomLeftRadius: 15,
                          borderBottomRightRadius: 15,
                          }}>
                        
                        <TouchableOpacity style={{
                        height: 24,
                        width: 24,
                        left: '6.16%',
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        ...Platform.select({
                                 ios: {
                                  top: height * .069,
                                 },
                                 android: {
                                  top: height * .0148,
                                 },
                                 }),
                        }}
                        onPress={() => {this.setState({ visibleClose: false })}}>
                          <Image style={{height: 13.19, width: 13.19, }} source={require('../assets/Icons/cancel.png')}/>
                        </TouchableOpacity>
              
              <View style={{
              flexDirection: 'row',
              top: height * .1232,
              width: width,
              height: 40,
              position: 'absolute',
              }}>
              {this._english()}
              {this._math()}
              {this._all()}
              </View>
            </View>
            </Modal>
              
              
              <TouchableOpacity style={{height: 20, width: 20, left: '86.4%', top: 2, position: 'absolute',}}
              onPress={/*() => navigate('Search')*/() => {
                         this.renderModalCalender()
                         }}>
              <Image style={{height: 20, width: 20, top: 2, position: 'absolute'}} source={require('../assets/Icons/calendar_today-24px.png')}/>
              </TouchableOpacity>

           <Modal
           
              onBackdropPress={() => this.setState({ visibleCalendar: false })}

               isVisible={this.state.visibleCalendar}
               backdropColor="#000000"
               backdropOpacity={0.5}
               animationIn='slideInDown'
               animationOut='slideOutUp'
             style={{marginVertical: 0, marginHorizontal: 0}}>
       
            
            <View style={{
             boxSizing: 'border-box',
             height: height * .536,
             width: width,
             border: '0.2px solid #0DB09F',
             backgroundColor: '#FFFFFF',
             boxShadow: '0 16px 24px 0 rgba(0,0,0,0.05)',
             top: -0.1,
             position: 'absolute',
             borderBottomLeftRadius: 15,
             borderBottomRightRadius: 15,
             }}>
              
           <SafeAreaView>
              <TouchableOpacity style={{
           height: 24,
           width: 24,
           left: '89.33%',
           justifyContent: 'center',
           alignItems: 'center',
           top: height * .0148,
           }}
           onPress={() => {this.setState({ visibleCalendar: false })}}>
             <Image style={{height: 13.19, width: 13.19, }} source={require('../assets/Icons/cancel.png')}/>
           </TouchableOpacity>
           
           <Calendar
             style={{
             
             
             width: '82.4%',
             left: '8.8%',
             top: (height * .0148) + (height * .0135) - 10,
             }}
           onDayPress={this.onDayPress}
           markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}

           firstDay={1}
             theme={{
               backgroundColor: '#ffffff',
               calendarBackground: '#ffffff',
               textSectionTitleColor: '#1A1C36',
               selectedDayBackgroundColor: '#0DB09F',
               selectedDayTextColor: '#ffffff',
               todayTextColor: '#0DB09F',
               dayTextColor: '#2d4150',
               textDisabledColor: '#d9e1e8',
               dotColor: '#0DB09F',
               selectedDotColor: '#ffffff',
               arrowColor: '#0DB09F',
               monthTextColor: '#989898',
               indicatorColor: '0DB09F',
               textDayFontFamily: 'SFNSDisplay',
               textMonthFontFamily: 'SFNSDisplay-Bold',
               textDayHeaderFontFamily: 'SFNSDisplay-Bold',
               textDayFontSize: 13.2,
               textMonthFontSize: 16,
               textDayHeaderFontSize: 13.2
             }}
           />
          
 
            </SafeAreaView>
            </View>
            </Modal>

           
              </View>
              
              <View
              style={{
                  flexDirection: 'row',
                  top: 30+30-3,
                  height: 40,
                  width: width,
                  position: 'relative'}}>
     
              {this._lastWeek()}
              {this._lastMonth()}
              {this._allTime()}
              
              </View>
              
              <View style={{
                                     top: 21+30+9+21-3,
                                     left: '6.67%',
                                     width: '86.67%',
                                     height: (this.state.allowParents == 1) ? 0 : ratio * .1413,
                                     /*shadowOffset:{  width: 0,  height: 0,  },
                                     shadowColor: '#000000',
                                     shadowOpacity: .2,
                                     shadowRadius: 200,
                                     elevation: 5,
                                     boxSizing: 'border-box',*/
                                 }}>
                                 
                                 <Image style={{height: '100%', top: 0, left: 0, width: '100%',}} source={require('../assets/images/allowParents.png')}/>
                                 
                                 <TouchableOpacity style={{
                                     height: (this.state.allowParents == 1) ? 0 : 32,
                                     width: 70,
                                     borderRadius: 16,
                                     backgroundColor: '#0DB09F',
                                     left: width*.0693,
                                     top: /*width*.8667*.4276923077*.618705036*/ratio*.0874,
                                     position: 'absolute',
                                     justifyContent: 'center',
                                     alignItems: 'center',
                                 }}
                                 
                                  onPress={() => this.allowParents()}>
                                 
                                 <Text style={{
                                     height: 12,
                                     width: 46,
                                     color: '#FFFFFF',
                                     fontFamily: 'SFNSDisplay-Bold',
                                     fontSize: 12,
                                     lineHeight: 12,
                                 }}>
                                 ALLOW
                                 </Text>
                                 </TouchableOpacity>
                                 </View>
              <Text style={{
                  height: 14,
                  top: 21+30+9+21-3+33,
                  width: 60,
                  color: '#AEB1B8',
                  fontFamily: 'SFNSDisplay',
                  fontSize: 12,
                  lineHeight: 15,
                  left: '8%'
              }}>
              Your chart
              </Text>
              
              <View style={{
              flexDirection: 'row',
              top: 21+30+9+21-3+33,
              width: width,
              height: 26,
              }}>
              
              <Text style={{
              height: ratio * .0264,
              color: '#1C202E',
              fontFamily: 'SFNSDisplay-Bold',
              fontSize: 24,
              lineHeight: 26,
              left: width * .08,
              }}>
              Position :
              </Text>
              <Text style={{
              color: '#0DB09F',
              height: ratio * .0264,
              fontFamily: 'SFNSDisplay-Bold',
              fontSize: 24,
              lineHeight: 26,
              left: width * .08,}}>
              {" "}6th
              </Text>
              <View style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              left: width * .1013
              }}>
              <Image style={{height: 20, width: 20,}} source={require('../assets/images/star.png')}/>
              </View>
              
              </View>
              
              <View style={{
              height: ratio * .1657,
              width: '100%',
              top: 21+30+9+21-3+33+31,
              left: 0,
              }}>
              
              
              
              
              <Image style={{height: ratio * .0297, width: '17.6%', boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)', top: 0,  left: '41.33%', position: 'absolute'}} source={require('../assets/images/combinedShape.png')}/>
              
                    <Text
                      style={{
                      height: ratio * .0112,
                      width: '100%',
                      color: '#0DB09F',
                      fontFamily: 'SFNSDisplay-Bold',
                      fontSize: 10,
                      lineHeight: 12,
                      top: ratio * .0081,
                      textAlign: 'center',
                      }}>
                        Score : 67
                    </Text>
              
              <View
              style={{
              height: ratio * 0.001365671642 * this.state.score[0],
              width: '7.47%',
              borderRadius: 5,
              backgroundColor: '#EEF0EE',
              left: '8%',
              bottom: ratio * .0346,
              position: 'absolute',
              }}>
              </View>
              
              <View
              style={{
              height: ratio * 0.001365671642 * this.state.score[1],
              width: '7.47%',
              borderRadius: 5,
              backgroundColor: '#EEF0EE',
              left: '20.8%',
              bottom: ratio * .0346,
              position: 'absolute',
              }}>
              </View>
              
              <View
              style={{
              height: ratio * 0.001365671642 * this.state.score[2],
              width: '7.47%',
              borderRadius: 5,
              backgroundColor: '#EEF0EE',
              left: '33.6%',
              bottom: ratio * .0346,
              position: 'absolute',
              }}>
              </View>
              
              <View
              style={{
              height: ratio * 0.001365671642 * this.state.score[3],
              width: '7.47%',
              borderRadius: 5,
              backgroundColor: '#0DB09F',
              left: '46.4%',
              bottom: ratio * .0346,
              position: 'absolute',
              }}>
              </View>
              
              <View
              style={{
              height: ratio * 0.001365671642 * this.state.score[4],
              width: '7.47%',
              borderRadius: 5,
              backgroundColor: '#EEF0EE',
              left: '58.93%',
              bottom: ratio * .0346,
              position: 'absolute',
              }}>
              </View>
              
              <View
              style={{
              height: ratio * 0.001365671642 * this.state.score[5],
              width: '7.47%',
              borderRadius: 5,
              backgroundColor: '#EEF0EE',
              left: '71.73%',
              bottom: ratio * .0346,
              position: 'absolute',
              }}>
              </View>
              
              <View
              style={{
              height: ratio * 0.001365671642 * this.state.score[6],
              width: '7.47%',
              borderRadius: 5,
              backgroundColor: '#EEF0EE',
              left: '84.53%',
              bottom: ratio * .0346,
              position: 'absolute',
              }}>
              </View>
              
              <View  style={{
              flexDirection: 'row',
              width: '100%',
              height: ratio * .0142,
              top: ratio * .1514,
              position: 'absolute',
              }}>
             
              <Text style={{
              height: ratio * .0142,
              width: '8%',
              color: '#A9ABB8',
              fontFamily: 'SFNSDisplay',
              fontSize: 12,
              lineHeight: 15,
              textAlign: 'center',
              left: '7.47%',
              position: 'absolute',
              }}>
              Mon
              </Text>
              
              <Text style={{
              height: ratio * .0142,
              width: '8%',
              color: '#A9ABB8',
              fontFamily: 'SFNSDisplay',
              fontSize: 12,
              lineHeight: 15,
              textAlign: 'center',
              left: '20.27%',
              position: 'absolute',
              }}>
              Tue
              </Text>
              
              <Text style={{
              height: ratio * .0142,
              width: '8%',
              color: '#A9ABB8',
              fontFamily: 'SFNSDisplay',
              fontSize: 12,
              lineHeight: 15,
              textAlign: 'center',
              left: '33.07%',
              position: 'absolute',
              }}>
              Wed
              </Text>
              
              <Text style={{
              height: ratio * .0142,
              width: '8%',
              color: '#0DB09F',
              fontFamily: 'SFNSDisplay',
              fontSize: 12,
              lineHeight: 15,
              textAlign: 'center',
              left: '45.87%',
              position: 'absolute',
              }}>
              Thu
              </Text>
              
              <Text style={{
              height: ratio * .0142,
              width: '8%',
              color: '#A9ABB8',
              fontFamily: 'SFNSDisplay',
              fontSize: 12,
              lineHeight: 15,
              textAlign: 'center',
              left: '58.93%',
              position: 'absolute',
              }}>
              Fri
              </Text>
              
              <Text style={{
              height: ratio * .0142,
              width: '8%',
              color: '#A9ABB8',
              fontFamily: 'SFNSDisplay',
              fontSize: 12,
              lineHeight: 15,
              textAlign: 'center',
              left: '71.73%',
              position: 'absolute',
              }}>
              Sat
              </Text>
              
              <Text style={{
              height: ratio * .0142,
              width: '8%',
              color: '#A9ABB8',
              fontFamily: 'SFNSDisplay',
              fontSize: 12,
              lineHeight: 15,
              textAlign: 'center',
              left: '84.53%',
              position: 'absolute',
              }}>
              Sun
              </Text>
              </View>
              
              </View>

              <TouchableOpacity style={{
              boxSizing: 'border-box',
              height: ratio * .0856,
              width: '86.72%',
              border: '0.2px solid #0DB09F',
              borderRadius: 10,
              backgroundColor: '#FFFFFF',
              borderColor: '#0DB09F',
              borderWidth: .3,
              boxShadow: '0 16px 24px 0 rgba(0,0,0,0.05)',
              shadowOffset:{  width: 0,  height: 0,  },
              shadowColor: '#000000',
              shadowOpacity: .2,
              shadowRadius: 200,
              elevation: 5,
              top: 21+30+9+21-3+33+31+39,
              left: '6.64%',
              }} onPress={/*() => navigate('Search')*/() => this.props.navigation.navigate('TotalQuestions')}>
              
              
              <Image style={{height: ratio * .0407, width: width * .1067, left: '6.16%', top: ratio * .0225, position: 'absolute'}} source={require('../assets/images/totQ.png')}/>
              <Text style={{
              height: ratio * .0142,
              color: '#A9ABB8',
              fontFamily: 'SFNSDisplay',
              fontSize: 12,
              lineHeight: 15,
              top: ratio * .0194,
              position: 'absolute',
              left: '21.89%',
              }}>Total questions</Text>
              
              <Text style={{
              height: ratio * .0203,
              color: '#1A1C36',
              fontFamily: 'SFNSDisplay-Bold',
              fontSize: 18,
              letterSpacing: -0.3,
              lineHeight: 21,
              top: ratio * .0428,
              position: 'absolute',
              left: '21.89%',
              }}>34 Questions</Text>
              </TouchableOpacity>

              
              <TouchableOpacity style={{
              boxSizing: 'border-box',
              height: ratio * .0856,
              width: '86.72%',
              border: '0.2px solid #0DB09F',
              borderRadius: 10,
              backgroundColor: '#FFFFFF',
              borderColor: '#0DB09F',
              borderWidth: .3,
              boxShadow: '0 16px 24px 0 rgba(0,0,0,0.05)',
              shadowOffset:{  width: 0,  height: 0,  },
              shadowColor: '#000000',
              shadowOpacity: .2,
              shadowRadius: 200,
              elevation: 5,
              top: 21+30+9+21-3+33+31+39+18,
              left: '6.64%',
              }} onPress={/*() => navigate('Search')*/() => this.props.navigation.navigate('TotalAnswers')}>

              
              <Image style={{height: ratio * .0407, width: width * .1067, left: '6.16%', top: ratio * .0225, position: 'absolute'}} source={require('../assets/images/totA.png')}/>
              <Text style={{
              height: ratio * .0142,
              color: '#A9ABB8',
              fontFamily: 'SFNSDisplay',
              fontSize: 12,
              lineHeight: 15,
              top: ratio * .0194,
              position: 'absolute',
              left: '21.89%',
              }}>Total answers</Text>
              
              <Text style={{
              height: ratio * .0203,
              color: '#1A1C36',
              fontFamily: 'SFNSDisplay-Bold',
              fontSize: 18,
              letterSpacing: -0.3,
              lineHeight: 21,
              top: ratio * .0428,
              position: 'absolute',
              left: '21.89%',
              }}>22 Answers</Text>
              </TouchableOpacity>
              
              </View>
            </ScrollView>
              </View>
        </SafeAreaView>
      );
    }
}


class TotalQuestionsScreen extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
        score: [55, 27, 46, 67, 12, 46, 27],
            showCorrect: true,
            englishQuestions: [],
            mathQuestions: [],
           };
    }
     
     componentDidMount(){
       this._subscribe = this.props.navigation.addListener('didFocus', () => {
           AsyncStorage.getItem('access_token').then((token) => {
            AsyncStorage.getItem('user').then((user) => {
             Functions.fetchQuestionsAnalytics(token, this.updateQuestionsAnalyitcs, JSON.parse(user).ID)
                 })
              })
          });
       }
                                                                                 
     
      updateQuestionsAnalyitcs = (questions) => {
         var i = 0;
         
         for (i = 0; i < questions.length; i++){
             if (questions[i].SUBJECT_ID == 1) {
                var joined = this.state.englishQuestions.concat(questions[i]);
                 this.setState({ englishQuestions: joined })
             }else{
                var joined = this.state.mathQuestions.concat(questions[i]);
                   this.setState({ mathQuestions: joined })
             }
         }
      
        console.log(this.state.englishQuestions)
        console.log(this.state.mathQuestions)

      }
   
    englishData=[{
          question1: 'Alan Turing was, among other',
          question2: 'things a computer scientist',
          question3: 'who is often credited as the father of artificial intelligence.',
          answer1: 'NO CHANGE',
          answer2: 'things a computer scientist,',
          answer3: 'things, a computer scientist,',
          answer4: 'things, a computer scientist',
          correctAnswer: 'D',
                 type: 1

                 },{
               question1: 'On the plane’s ascent, passengers feel twice Earth’s gravitational pull, but for brief periods at the peak of the trajectory,',
               question2: '“weightlessness” or  microgravity similar to what is experienced in space,',
               question3: 'is achieved.',
               answer1: 'NO CHANGE',
               answer2: '"weightlessness” or microgravity, similar to what is experienced, in space',
               answer3: '"weightlessness” or, microgravity, similar to what is experienced in space',
               answer4: '"weightlessness,” or microgravity similar to what is experienced in space,',
               correctAnswer: 'D',
                 type: 1

                 },{
                question1: 'The creator of the Game of Thrones anthology',
                question2: 'series George R.R. Martin',
                question3: 'has received numerous accolades for his work.',
                answer1: 'NO CHANGE',
                answer2: 'series George R.R. Martin,',
                answer3: 'series, George R.R. Martin,',
                answer4: 'series, George R.R. Martin',
                correctAnswer: 'C',
                 type: 1

                 },{
                question1: 'Heisman Trophy',
                question2: 'winner, Cam Newton',
                question3: 'went on to play professionally for the Carolina Panthers.',
                answer1: 'NO CHANGE',
                answer2: 'winner Cam Newton',
                answer3: 'winner Cam Newton,',
                answer4: 'winner, Cam Newton',
                correctAnswer: 'B',
                 type: 1

                 },{
                 question1: 'Along with help from the Calculus teacher',
                question2: 'Ms. Garcia, Geometry teacher Mrs. Pawlak',
                question3: 'led a field trip to the Museum of Math and Science.',
                answer1: 'NO CHANGE',
                answer2: 'Ms. Garcia, Geometry teacher, Mrs. Pawlak,',
                answer3: 'Ms. Garcia, Geometry teacher Mrs. Pawlak,',
                answer4: 'Ms. Garcia, Geometry teacher, Mrs. Pawlak',
                correctAnswer: 'A',
                 type: 1

                 },{
                 question1: 'The company Airbnb’s initial business model initially allowed customers to simply rent rooms in shared',
                question2: 'homes, however, its',
                question3: 'current business model allows customers to rent an entire vacation home.',
                answer1: 'NO CHANGE',
                answer2: 'homes, similarly, its',
                answer3: 'homes, similarly its',
                answer4: 'homes, however its',
                correctAnswer: 'D',
                 type: 1

                 },{
                 question1: 'Ciara enjoyed improv theater and',
                question2: 'painting.',
                question3: 'I preferred hockey and hiking.',
                answer1: 'painting, while I',
                answer2: 'painting; I',
                answer3: 'painting. I, on the other hand,',
                answer4: 'painting I',
                correctAnswer: 'D',
                type: 2
                 },{
                 question1: 'The stadium opens at 6 this',
                question2: 'evening, this is when fans',
                question3: 'start to arrive.',
                answer1: 'NO CHANGE',
                answer2: 'evening. When fans',
                answer3: 'evening; when fans',
                answer4: 'evening; this is when fans',
                correctAnswer: 'D',
                 type: 1
                },
          ]
    
     _answerCircle(answer, item) {
         if (answer == item) {
             return (
       <TouchableOpacity style={{
                        boxSizing: 'border-box',
                        height: 42,
                        width: 42,
                        border: '1px solid #0DB09',
                        borderRadius: 42/2,
                        backgroundColor: '#0DB09F',
                        borderColor: '#0DB09F',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: 0,
                        left: 0,
                        }}>
                        <Text style={{
                            height: 14,
                            width: 54,
                            color: '#FFFFFF',
                            fontFamily: 'SFNSDisplay-Bold',
                            fontSize: 12,
                            lineHeight: 15,
                            textAlign: 'center'
                     }}>{item}</Text>
                    </TouchableOpacity>
                     )
         } else {
             return (
        <TouchableOpacity style={{
                            boxSizing: 'border-box',
                            height: 42,
                            width: 42,
                            border: '1px solid #0DB09',
                            borderRadius: 42/2,
                            backgroundColor: '#FFFFFF',
                            borderColor: '#0DB09F',
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            top: 0,
                            left: 0,
                            }}>
                            <Text style={{
                                height: 14,
                                width: 54,
                                color: '#0DB09F',
                                fontFamily: 'SFNSDisplay-Bold',
                                fontSize: 12,
                                lineHeight: 15,
                                textAlign: 'center'
                         }}>{item}</Text>
                        </TouchableOpacity>
                     )
         }
     }
             questionType(type){
             if (type == 2) {
                 return (
                         <Text style={{height: 70, textAlign: 'center', color: '#1A1C36', width: '70%', fontFamily: 'SFNSDisplay', fontSize: 11, lineHeight: 16, position: 'absolute', top: 17}} numberOfLines={3}>
                             Which of the following alternatives to
                             the underlined portion would NOT
                             be acceptable?
                         </Text>
                         );
             }
         }
    renderEnglishItems = ({item}) => (
                              
                         <View
                             style={{left: '6.6%', width: '86.8%', top: '0%', height: 390+27.25,  backgroundColor: '#FFFFFF', marginBottom: 19.75, paddingBottom: 0, paddingTop: 0, paddingLeft: 0, borderWidth: .5, borderRadius: 10,
                                 borderColor: '#0DB09F',
                                 boxSizing: 'border-box',
                                 boxSizing: 'border-box',
                                 border: '0.2px solid #0DB09F',
                                 boxShadow: '0 16px 24px 0 rgba(0,0,0,0.05)',
                                elevation: 5,
                             }}>
                           
                             <View style={{
                                 flexDirection: 'column',
                                 flex: 1,
                                 width: '100%',
                                 left: 20.25
                             }}>
                             
                           
                             <Text style={{height: 170, color: '#1A1C36', width: '90%', fontFamily: 'SFNSDisplay-Bold', fontSize: 14, lineHeight: 19, left: 0, top: 27.25,}} numberOfLines={7}>{item.NAME.split("-")[0]} <Text style={{fontFamily: 'SFNSDisplay-Bold', textDecorationLine: 'underline'}}>{item.NAME.split("-")[1]}</Text> {item.NAME.split("-")[2]}</Text>
                                      
                              <View style={{position: 'absolute', top: 27.25+53, width: '90%', alignItems: 'center', justifyContent: 'center', height: 70}}>
                                {this.questionType(item.SUBJECT_ID)}
                            </View>
                        <View style={{
                              flexDirection: 'row',
                              width: '90%',
                              left: 0,
                              top: 17,
                              alignItems: 'center',
                              height: 33
                          }}>
                          
                         {this._answerCircle(item.CORRECT_ANSWER, 'A')}
                                                                
                                      
                      <Text style={{color: '#1A1C36', width: '80%', fontFamily: 'SFNSDisplay', fontSize: 13, lineHeight: 15, left: 10.5, top: 0,}} numberOfLines={2}>{item.ANSWER1}</Text>

                    </View>

                      <View style={{
                                  flexDirection: 'row',
                                  width: '90%',
                                  left: 0,
                                  top: 17+17,
                                  alignItems: 'center',
                                  height: 42
                              }}>
                              
                        {this._answerCircle(item.CORRECT_ANSWER, 'B')}

                                          
                          <Text style={{color: '#1A1C36', width: '80%', fontFamily: 'SFNSDisplay', fontSize: 13, lineHeight: 15, left: 10.5, top: 0,}} numberOfLines={2}>{item.ANSWER2}</Text>

                            </View>
                              <View style={{
                                  flexDirection: 'row',
                                  width: '90%',
                                  left: 0,
                                  top: 17+17+17,
                                  alignItems: 'center',
                                  height: 33
                              }}>
                              
                                                                    
                            {this._answerCircle(item.CORRECT_ANSWER, 'C')}

                                          
                          <Text style={{color: '#1A1C36', width: '80%', fontFamily: 'SFNSDisplay', fontSize: 13, lineHeight: 15, left: 10.5, top: 0,}} numberOfLines={6}>{item.ANSWER3}</Text>

                            </View>
                                      
                            <View style={{
                                     flexDirection: 'row',
                                     width: '90%',
                                     left: 0,
                                     top: 17+17+17+17,
                                     alignItems: 'center',
                                     height: 42
                                 }}>
                                 
                                                                       
                                      {this._answerCircle(item.CORRECT_ANSWER, 'D')}

                                             
                             <Text style={{ color: '#1A1C36', width: '80%', fontFamily: 'SFNSDisplay', fontSize: 13, lineHeight: 15, left: 10.5, top: 0,}} numberOfLines={2}>{item.ANSWER4}</Text>
                               </View>
                             </View>
                           </View>
                              );
                                                                                 
                                                                                 
                                                                                 mathData=[{
                                                                                          question1: 'Each side on a six-sided die has its own distinct number between 1 and 6. If you were to roll two dice, what is the probability of rolling the same number?',
                                                                                         
                                                                                          answer1: '1/2',
                                                                                          answer2: '1/6',
                                                                                          answer3: '1/12',
                                                                                          answer4: '1/36',
                                                                                          correctAnswer: 'B',
                                                                                                 },{
                                                                                               question1: 'Each side on a six-sided die has its own distinct number between 1 and 6. If you were to roll two dice, what is the probability of both being 3?',
                                                                                                answer1: '1/3',
                                                                                               answer2: '1/6',
                                                                                               answer3: '1/9',
                                                                                               answer4: '1/36',
                                                                                               correctAnswer: 'D',

                                                                                                 },{
                                                                                                question1: 'Each side on a six-sided die has its own distinct number between 1 and 6. What is the probability of rolling either a 1, 5 or 6?',
                                                                                                answer1: '1/6',
                                                                                                answer2: '1/3',
                                                                                                answer3: '1/2',
                                                                                                answer4: '2/3',
                                                                                                correctAnswer: 'C',

                                                                                                 },{
                                                                                                question1: 'Each side on a six-sided die has its own distinct number between 1 and 6. What is the probability of rolling either a 2 or 4?',
                                                                                                              answer1: '1/3',
                                                                                                answer2: '1/2',
                                                                                                answer3: '2/3,',
                                                                                                answer4: '5/6',
                                                                                                correctAnswer: 'A',

                                                                                                 },{
                                                                                                 question1: 'A coin is equally weighted and has one side with heads and the other with tails. What is the probability of getting 3 of the same side in a row?',
                                                                                                answer1: '1/2',
                                                                                                answer2: '1/4',
                                                                                                answer3: '1/8',
                                                                                                answer4: '1/16',
                                                                                                correctAnswer: 'B',

                                                                                                 },{
                                                                                                 question1: 'A coin is equally weighted and has one side with heads and the other with tails. What is the probability of getting 3 heads in a row?',
                                                                                                answer1: '1/2',
                                                                                                answer2: '1/4',
                                                                                                answer3: '1/8',
                                                                                                answer4: '1/16',
                                                                                                correctAnswer: 'C',

                                                                                                 },{
                                                                                                 question1: 'A coin is equally weighted and has one side with heads and the other with tails. If the last two times the coin was flipped it landed on heads, what is the probability it lands on heads on the next flip?',
                                                          
                                                                                                answer1: '1/2',
                                                                                                answer2: '1/4',
                                                                                                answer3: '1/8',
                                                                                                answer4: '1/16',
                                                                                                correctAnswer: 'A',
                                                                                                 },{
                                                                                                 question1: 'There are 3 blue balls, 16 green balls and 8 yellow balls in a bag. What is the probability of selecting a blue ball first?',
                                                                                                answer1: '1/81',
                                                                                                answer2: '1/27',
                                                                                                answer3: '1/9',
                                                                                                answer4: '1/3',
                                                                                                correctAnswer: 'A',
                                                                                                 
                                                                                                },{
                                                                                                 question1: 'There are initially 56 balls in a bag and the probability of selecting a blue ball is 1/8. If 36 balls take out of the bag and the probability of selecting a blue ball from the bag is now 1/4, how many of the balls taken out of the bag were blue.',
                                                                                                answer1: '2',
                                                                                                answer2: '3',
                                                                                                answer3: '5',
                                                                                                answer4: '7',
                                                                                                correctAnswer: 'A',
                                                                                                 }]
    

    
    
    renderMathItems = ({item}) => (
                                      
                                                            <View
                                                                  style={{left: '6.6%', width: '86.8%', backgroundColor: 'red', top: '0%', height: 390+27.25,  backgroundColor: '#FFFFFF', marginBottom: 19.75, paddingBottom: 0, paddingTop: 0, paddingLeft: 0, borderWidth: .5, borderRadius: 10,
                                                                      borderColor: '#0DB09F',
                                                                      boxSizing: 'border-box',
                                                                      boxSizing: 'border-box',
                                                                      border: '0.2px solid #0DB09F',
                                                                      boxShadow: '0 16px 24px 0 rgba(0,0,0,0.05)',
                                                                     elevation: 5,
                                                                  }}>
                                                                
                                                                  <View style={{
                                                                      flexDirection: 'column',
                                                                      flex: 1,
                                                                      width: '100%',
                                                                      left: 20.25
                                                                  }}>
                                                                  
                                                                
                                                                  <Text style={{height: 170, color: '#1A1C36', width: '90%', fontFamily: 'SFNSDisplay-Bold', fontSize: 14, lineHeight: 19, left: 0, top: 27.25,}} numberOfLines={8}>{item.NAME}</Text>
                                                                           
                                                               
                                                             <View style={{
                                                                   flexDirection: 'row',
                                                                   width: '90%',
                                                                   left: 0,
                                                                   top: 17,
                                                                   alignItems: 'center',
                                                                   height: 33
                                                               }}>
                                                               
                                                              {this._answerCircle(item.CORRECT_ANSWER, 'A')}
                                                                                                     
                                                                           
                                                           <Text style={{color: '#1A1C36', width: '80%', fontFamily: 'SFNSDisplay', fontSize: 13, lineHeight: 15, left: 10.5, top: 0,}} numberOfLines={2}>{item.ANSWER1}</Text>

                                                         </View>

                                                           <View style={{
                                                                       flexDirection: 'row',
                                                                       width: '90%',
                                                                       left: 0,
                                                                       top: 17+17,
                                                                       alignItems: 'center',
                                                                       height: 42
                                                                   }}>
                                                                   
                                                             {this._answerCircle(item.CORRECT_ANSWER, 'B')}

                                                                               
                                                               <Text style={{color: '#1A1C36', width: '80%', fontFamily: 'SFNSDisplay', fontSize: 13, lineHeight: 15, left: 10.5, top: 0,}} numberOfLines={2}>{item.ANSWER2}</Text>

                                                                 </View>
                                                                   <View style={{
                                                                       flexDirection: 'row',
                                                                       width: '90%',
                                                                       left: 0,
                                                                       top: 17+17+17,
                                                                       alignItems: 'center',
                                                                       height: 33
                                                                   }}>
                                                                   
                                                                                                         
                                                                 {this._answerCircle(item.CORRECT_ANSWER, 'C')}

                                                                               
                                                               <Text style={{color: '#1A1C36', width: '80%', fontFamily: 'SFNSDisplay', fontSize: 13, lineHeight: 15, left: 10.5, top: 0,}} numberOfLines={6}>{item.ANSWER3}</Text>

                                                                 </View>
                                                                           
                                                                 <View style={{
                                                                          flexDirection: 'row',
                                                                          width: '90%',
                                                                          left: 0,
                                                                          top: 17+17+17+17,
                                                                          alignItems: 'center',
                                                                          height: 42
                                                                      }}>
                                                                      
                                                                                                            
                                                                           {this._answerCircle(item.CORRECT_ANSWER, 'D')}

                                                                                  
                                                                  <Text style={{ color: '#1A1C36', width: '80%', fontFamily: 'SFNSDisplay', fontSize: 13, lineHeight: 15, left: 10.5, top: 0,}} numberOfLines={2}>{item.ANSWER4}</Text>
                                                                    </View>
                                                                  </View>
                                                                </View>
                                      );
    
    _renderQuestions() {
        console.log('renderQuestions' + this.state.showCorrect)
        if (this.state.showCorrect) {
            return (
                        <FlatList
                        style={{height: '81%', width: '100%', top: 18+34.5+29.5, left: '0%', paddingBottom: '50%'}} contentInset= {{bottom: 60}}
                        vertical
                        showsVerticalScrollIndicator={false}
                        data={this.state.englishQuestions}
                        renderItem={this.renderEnglishItems}
                        keyExtractor={(item, index) => index}
                        />
                    )
        } else {
            return (
                        <FlatList
                        style={{height: '81%', width: '100%', top: 18+34.5+29.5, left: '0%',  paddingBottom: '50%',
                        }} contentInset= {{bottom: 60}}
                        vertical
                        showsVerticalScrollIndicator={false}
                        data={this.state.mathQuestions}
                        renderItem={this.renderMathItems}
                        keyExtractor={(item, index) => index}
                        />
                    )
        }
    }
    
    _englishBttn() {
        if (this.state.showCorrect) {
            return (
                    <TouchableOpacity style={{boxSizing: 'border-box', left: '7.33%', height: 55, width: 164, border: '1px solid #0DB09F', borderRadius: 27, position: 'absolute', backgroundColor: '#FFFFFF', borderColor: '#0DB09F', borderWidth: 1, justifyContent: 'center', alignItems: 'center',}}
                    onPress={() => this.setState({showCorrect: true})}>
                    
                    <Text style={{height: 20, color: '#0DB09F',    fontFamily: 'SFNSDisplay-Bold', fontSize: 14, lineHeight: 17, textAlign: 'center'}}>
                    English
                    </Text>
                    </TouchableOpacity>
                    )
        } else {
            return (
                    <TouchableOpacity style={{boxSizing: 'border-box', left: '7.33%', height: 55, width: 164, border: '1px solid #0DB09F', borderRadius: 27, position: 'absolute', justifyContent: 'center', alignItems: 'center',}}
                    onPress={() => this.setState({showCorrect: true})}>
                    <Text style={{height: 20, position: 'absolute', color: '#A9ABB8', top: 19.5, fontFamily: 'SFNSDisplay-Bold', fontSize: 14, lineHeight: 17, textAlign: 'center'}}>
                    English
                    </Text>
                    </TouchableOpacity>
                    )
        } 
    }
                    
        _mathBttn() {
        if (!this.state.showCorrect) {
        return (
                <TouchableOpacity style={{boxSizing: 'border-box', left: '49.73%', height: 55, width: 164, border: '1px solid #0DB09F', borderRadius: 27, position: 'absolute', backgroundColor: '#FFFFFF', borderColor: '#0DB09F', borderWidth: 1, justifyContent: 'center', alignItems: 'center',}}
                onPress={() => this.setState({showCorrect: false})}>
                
                <Text style={{height: 20, color: '#0DB09F', fontFamily: 'SFNSDisplay-Bold', fontSize: 14, lineHeight: 17, textAlign: 'center'}}>
                Math
                </Text>
                </TouchableOpacity>
                )
                } else {
            return (
                    <TouchableOpacity style={{boxSizing: 'border-box', left: '49.73%', height: 55, width: 164, border: '1px solid #0DB09F', borderRadius: 27, position: 'absolute', justifyContent: 'center', alignItems: 'center',}}
                    onPress={() => this.setState({showCorrect: false})}>
                    <Text style={{height: 20, position: 'absolute', color: '#A9ABB8', top: 19.5, fontFamily: 'SFNSDisplay-Bold', fontSize: 14, lineHeight: 17, textAlign: 'center'}}>
                    Math
                    </Text>
                    </TouchableOpacity>
                    )
            }
        }
    
    render() {
        const { width } = Dimensions.get('window');
        const  height = Dimensions.get('window').height;
        
      
        
        const ratio = width*2.624
        console.log(height);
        console.log(width*.8667*.4276923077)
        console.log("..."+width*.8667*.4276923077*.618705036)
        console.log(Dimensions.get('screen'))
        console.log("width="+width+", height="+height+", ratio (width/height)="+(width/height))
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0, shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000',  shadowOpacity: .06, shadowRadius: 70, }}>
                
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Analytics')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 18}} activeOpacity={0}>
                <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', top: 18, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center', paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                <Text style={{
                    width: '44.93%',
                    color: '#1A1C36',
                    fontFamily: 'SFNSDisplay-Bold',
                    fontSize: 16,
                    lineHeight: 18,
                    textAlign: 'center'}}>
                    Total Questions
                </Text>
                </View>
                
                <View style={{flexDirection: 'row', height: 55, top: 18+34.5, width: width,}}>
                {this._englishBttn()}
                {this._mathBttn()}

            
                
                </View>
                {this._renderQuestions()}

                </View>
                </SafeAreaView>
                )
    }
}

class TotalAnswersScreen extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
        score: [55, 27, 46, 67, 12, 46, 27],
            showCorrect: true,
            answers: [],
            correctAnswers: [],
            incorrectAnswers: []
         };
    }
                         
        updateAnswersAnalyitcs = (answers) => {
            this.setState({answers: answers})
            var i = 0;

            for (i = 0; i < answers.length; i++){
             if (answers[i].TYPE == 1) {
                var joined = this.state.correctAnswers.concat(answers[i]);
                this.setState({ correctAnswers: joined })
             }else{
                var joined = this.state.incorrectAnswers.concat(answers[i]);
                this.setState({ incorrectAnswers: joined })
             }
            }

            console.log(this.state.correctAnswers)
            console.log(this.state.incorrectAnswers)
        }
          
        componentDidMount(){
         this._subscribe = this.props.navigation.addListener('didFocus', () => {
         AsyncStorage.getItem('access_token').then((token) => {
         AsyncStorage.getItem('user').then((user) => {
          Functions.fetchAnswersAnalytics(token, this.updateAnswersAnalyitcs, JSON.parse(user).ID)
                   })
                })
            });
         }
                                                                                 
    correctData=[{
          imageUrl: require('../assets/images/question1.png'),
          questionType: 'ACT',
          title: 'I have hinted that I would often.',
          date: 'Posted on near 1 week ago',
          },
          {
          imageUrl: require('../assets/images/question2.png'),
          questionType: 'SAT',
          title: 'Kogi Cosby sweater ethical squid.',
          date: 'Posted on September 03, 2019',
          },
          {
          imageUrl: require('../assets/images/question3.png'),
          questionType: 'PSAT',
          title: 'Banjo tote bag bicycle rights.',
          date: 'Posted on September 03, 2019',
          },
          {
          imageUrl: require('../assets/images/question4.png'),
          questionType: 'HS Entrance',
          title: 'Keytar Mc weeney\'s Williamsburg.',
          date: 'Posted on September 03, 2019',
          },
          {
          imageUrl: require('../assets/images/question5.png'),
          questionType: 'SAT',
          title: 'Hella narwhal Cosby sweater McSw.',
          date: 'Posted on September 03, 2019',
          }]
    
    
    renderCorrectItems = ({item}) => (
                              
                              <View
                              style={{left: '7.47%', width: '79.47%', top: '0%', elevation:0, shadowOpacity: 0, shadowColor: '', marginBottom: 30, paddingBottom: 0, paddingTop: 0, paddingLeft: 0, borderWidth: 0}}>
                              
                              <View style={{
                                      flexDirection: 'row',
                                      width: '100%',
                                      flex: 1,
                              }}>
                            
                                      <Image style={{height: 85, width: 85, borderRadius: 10, top: 0, left: 0,}} source={{uri: item.IMAGE}}/>
                             
                            <View style={{
                              flexDirection: 'column',
                            left: 20,
                              }}>
                                      
                                      <Text style={{height: 14, color: '#0DB09F', width: 90, fontFamily: 'SFNSDisplay-Bold', fontSize: 12, lineHeight: 15, top: 4, }}>{item.EXAM_TYPE}</Text>
                              
                              
                                      <Text numberOfLines={2} style={{height: 48, width: 193, color: '#1A1C36', fontFamily: 'SFNSDisplay-Bold', fontSize: 16, lineHeight: 20, top: 4+5,}}>{item.NAME}</Text>
                              
                                      <Text style ={{height: 14, width: 177, color: '#A9ABB8', fontFamily: 'SFNSDisplay', fontSize: 12, lineHeight: 15, top: 8,}}>Posted on {Moment(item.DATE).format('LL')}</Text>
                            </View>
                            </View>
                              </View>
                              );
    
    incorrectData=[{
                 imageUrl: require('../assets/images/incorrectQuestion.png'),
                 questionType: 'AST',
                 subject: 'English',
                 terms: '59 Terms',
                 },
                 {
                 imageUrl: require('../assets/images/incorrectQuestion.png'),
                 questionType: 'AST',
                 subject: 'English',
                 terms: '59 Terms',
                 },
                 {
                 imageUrl: require('../assets/images/incorrectQuestion.png'),
                 questionType: 'AST',
                 subject: 'English',
                 terms: '59 Terms',
                 }]
    
    
    renderIncorrectItems = ({item}) => (
                                      
                                      <View
                                        style={{
                                        left: '6.6%',
                                        width: '86.8%',
                                        top: '0%',
                                        height: 166.5,
                                        elevation:0,
                                        shadowOpacity: 0,
                                        backgroundColor: '#FFFFFF',
                                        shadowColor: '',
                                        marginBottom: 19.75,
                                        paddingBottom: 0,
                                        paddingTop: 0,
                                        paddingLeft: 0,
                                        borderWidth: .5,
                                        borderRadius: 10,
                                        borderColor: '#EF4036',
                                        borderWidth: 1,
                                        boxSizing: 'border-box',
                                        elevation: 5,
                                        boxSizing: 'border-box',
                                        border: '0.2px solid #0DB09F',
                                        boxShadow: '0 16px 24px 0 rgba(0,0,0,0.05)',
                                        }}>
                                      
                                        <View style={{
                                        flexDirection: 'row',
                                        flex: 1,
                                        width: '100%',
                                        }}>
                                        
                                        <Image style={{height: 126, width: 126, borderRadius: 10, top: 19.25, left: 20.25,}} source={{uri: item.IMAGE}}/>
                                      
                                        <View style={{
                                        flexDirection: 'column',
                                        left: 20.25+30,
                                        }}>
                             
                                        
                                        <Text style={{height: 25, color: '#1A1C36', width: 70, fontFamily: 'SFNSDisplay-Bold', fontSize: 18, lineHeight: 21, left: 0, top: 27.25,}}>{item.NAME}</Text>
                                        
                                        <Text style={{height: 14, color: '#A9ABB8', fontFamily: 'SFNSDisplay', fontSize: 12, lineHeight: 15, width: 53, top: 27.25+1, left: 0,}}>{item.TERMS}</Text>
                                    
                                        <Text style={{height: 14, color: '#0DB09F', fontFamily: 'SFNSDisplay-Bold', fontSize: 12, width: 28, lineHeight: 15, top: 27.25+6+2, left: 0,}}>{item.EXAM_TYPE}</Text>
                                   
                                    <TouchableOpacity style={{
                                        boxSizing: 'border-box',
                                        height: 33,
                                        width: 98,
                                        border: '1px solid #0DB09',
                                        borderRadius: 16,
                                        backgroundColor: '#FFFFFF',
                                        borderColor: '#0DB09F',
                                        borderWidth: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        top: 22.5+27.25+6+7,
                                        left: 29.5,
                                        }}>
                                        <Text style={{
                                            height: 14,
                                            width: 54,
                                            color: '#0DB09F',
                                            fontFamily: 'SFNSDisplay',
                                            fontSize: 12,
                                            lineHeight: 15
                                        }}>Read now</Text>
                                    </TouchableOpacity>
                                 
                                        </View>
                                        </View>
                                      </View>
                                      );
    
    _renderAnswers() {

        console.log('renderQuestions' + this.state.showCorrect)
        if (this.state.showCorrect) {
            return (
                        <FlatList
                        style={{height: '81%', width: '100%', top: 18+34.5+29.5, left: '0%',}}
                        contentInset= {{bottom: 60}}
                        vertical
                        showsVerticalScrollIndicator={false}
                        data={this.state.correctAnswers}
                        renderItem={this.renderCorrectItems}
                        keyExtractor={(item, index) => index}
                        />
                    )
        } else {
            return (
                        <FlatList
                        style={{height: '81%', width: '100%', top: 18+34.5+29.5, left: '0%',}}
                        contentInset= {{bottom: 60}}
                        vertical
                        showsVerticalScrollIndicator={false}
                        data={this.state.incorrectAnswers}
                        renderItem={this.renderIncorrectItems}
                        keyExtractor={(item, index) => index}
                        />
                    )
        }
    }
    
    _correctBttn() {
        if (this.state.showCorrect) {
            return (
                    <TouchableOpacity style={{boxSizing: 'border-box', left: '7.33%', height: 55, width: 164, border: '1px solid #0DB09F', borderRadius: 27, position: 'absolute', backgroundColor: '#FFFFFF', borderColor: '#0DB09F', borderWidth: 1, justifyContent: 'center', alignItems: 'center',}}
                    onPress={() => this.setState({showCorrect: true})}>
                    
                    <Text style={{height: 16, color: '#0DB09F',    fontFamily: 'SFNSDisplay-Bold', fontSize: 14, lineHeight: 17, textAlign: 'center'}}>
                    Correct
                    </Text>
                    </TouchableOpacity>
                    )
        } else {
            return (
                    <TouchableOpacity style={{boxSizing: 'border-box', left: '7.33%', height: 55, width: 164, border: '1px solid #0DB09F', borderRadius: 27, position: 'absolute', justifyContent: 'center', alignItems: 'center',}}
                    onPress={() => this.setState({showCorrect: true})}>
                    <Text style={{height: 18, position: 'absolute', color: '#A9ABB8', top: 19.5, fontFamily: 'SFNSDisplay-Bold', fontSize: 14, lineHeight: 17, textAlign: 'center'}}>
                    Correct
                    </Text>
                    </TouchableOpacity>
                    )
        }
    }
                    
        _inCorrectBttn() {
        if (!this.state.showCorrect) {
        return (
                <TouchableOpacity style={{boxSizing: 'border-box', left: '49.73%', height: 55, width: 164, border: '1px solid #0DB09F', borderRadius: 27, position: 'absolute', backgroundColor: '#FFFFFF', borderColor: '#EF4036', borderWidth: 1, justifyContent: 'center', alignItems: 'center',}}
                onPress={() => this.setState({showCorrect: false})}>
                
                <Text style={{height: 16, color: '#EF4036', fontFamily: 'SFNSDisplay-Bold', fontSize: 14, lineHeight: 17, textAlign: 'center'}}>
                Incorrect
                </Text>
                </TouchableOpacity>
                )
                } else {
            return (
                    <TouchableOpacity style={{boxSizing: 'border-box', left: '49.73%', height: 55, width: 164, border: '1px solid #0DB09F', borderRadius: 27, position: 'absolute', justifyContent: 'center', alignItems: 'center',}}
                    onPress={() => this.setState({showCorrect: false})}>
                    <Text style={{height: 18, position: 'absolute', color: '#A9ABB8', top: 19.5, fontFamily: 'SFNSDisplay-Bold', fontSize: 14, lineHeight: 17, textAlign: 'center'}}>
                    Incorrect
                    </Text>
                    </TouchableOpacity>
                    )
            }
        }
    
    render() {
        const { width } = Dimensions.get('window');
        const  height = Dimensions.get('window').height;
        
      
        
        const ratio = width*2.624
        console.log(height);
        console.log(width*.8667*.4276923077)
        console.log("..."+width*.8667*.4276923077*.618705036)
        console.log(Dimensions.get('screen'))
        console.log("width="+width+", height="+height+", ratio (width/height)="+(width/height))
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0, shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000',  shadowOpacity: .06, shadowRadius: 70, elevation: 5,}}>
                
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Analytics')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 18}} activeOpacity={0}>
                <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', top: 18, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center', paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                <Text style={{
                    width: '44.93%',
                    color: '#1A1C36',
                    fontFamily: 'SFNSDisplay-Bold',
                    fontSize: 16,
                    lineHeight: 18,
                    textAlign: 'center'}}>
                    Total Answers
                </Text>
                </View>
                
                <View style={{flexDirection: 'row', height: 55, top: 18+34.5, width: width,}}>
                {this._correctBttn()}
                {this._inCorrectBttn()}

            
                
                </View>

                {this._renderAnswers()}

                </View>
                </SafeAreaView>
                )
    }
}

AnalyticsScreen.navigationOptions = {
    header: null,
    headerStyle: {display:"none"},
    headerLeft: null,
    navigationOptions: {
    header: null,
 }
};

TotalQuestionsScreen.navigationOptions = {
    header: null,
    headerStyle: {display:"none"},
    headerLeft: null
};

TotalAnswersScreen.navigationOptions = {
    header: null,
    headerStyle: {display:"none"},
    headerLeft: null
};

const RootStack = createStackNavigator(
                                       {
                                        Analytics: AnalyticsScreen,
                                        TotalQuestions: TotalQuestionsScreen,
                                        TotalAnswers: TotalAnswersScreen,
                                       },
                                       {
                                        initialRouteName: 'Analytics',
                                       },{
                                        defaultNavigationOptions: {
                                            header: null,
                                        },
                                       });


const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}



const styles = StyleSheet.create({
                                 container: {
                                 flex: 1,
                                 /*backgroundColor: '#fff',*/
                                 backgroundColor: '#fff',
                                 },
                                 container2: {
                                 flex: 1,
                                 backgroundColor: 'green',
                                 
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
                                 AnalyticsText: {
                                 height: 31,
                                 position: 'absolute',
                                 width: 163,
                                 color: '#1A1C36',
                                 fontFamily: 'SFNSDisplay-Bold',
                                 fontSize: 24,
                                 lineHeight: 28,
                                 left: 28,
                                 left: '6.67%',
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

