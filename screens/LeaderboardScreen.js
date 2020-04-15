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
import SlidingUpPanel from 'rn-sliding-up-panel';



import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Dimensions,
    ImageBackground,
    Picker,
    SafeAreaView,
    StatusBar,
    Animated,
    AsyncStorage
} from 'react-native';

class LeaderboardScreen extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
        filter: 1
        };

    }
    
    data=[{
           index: "4",
           imageUrl: require('../assets/images/4place.png'),
           fullName: 'Sijmen Immens',
           userName: 'Silhma0986',
           star: require('../assets/images/starOff.png'),
           score: '75',
           },
           {
            index: "5",
            imageUrl: require('../assets/images/5place.png'),
            fullName: 'Elise Beverley',
            userName: 'Silhma0986',
            star: require('../assets/images/starOff.png'),
            score: '73',
           },
           {
            index: "6",
            imageUrl: require('../assets/images/6place.png'),
            fullName: 'Andries Grootoonk',
            userName: 'Silhma0986',
            star: require('../assets/images/starOff.png'),
            score: '70',
           },
           {
            index: "7",
            imageUrl: require('../assets/images/7place.png'),
            fullName: 'Samuil Sadovsky',
            userName: 'Silhma0986',
            star: require('../assets/images/starOn.png'),
            score: '70',
           },
           {
            index: "8",
            imageUrl: require('../assets/images/8place.png'),
            fullName: 'Olivia Arribas',
            userName: 'Silhma0986',
            star: require('../assets/images/starOff.png'),
            score: '70',
           },
           {
            index: "9",
            imageUrl: require('../assets/images/9place.png'),
            fullName: 'Irene Sotelo',
            userName: 'Silhma0986',
            star: require('../assets/images/starOff.png'),
            score: '70',
            },
            {
            index: "10",
            imageUrl: require('../assets/images/10place.png'),
            fullName: 'Sammy Lawson',
            userName: 'Silhma0986',
            star: require('../assets/images/starOff.png'),
            score: '70',
           }]
    
    
    renderItem = ({item}) => (
          
          <View
          style={{width: '100%', height: 48, left: '0%', top: '0%', elevation:0, shadowOpacity: 0, shadowColor: '', paddingLeft: 0, borderWidth: 0, marginBottom: 34}}>
        
          <View style={{flexDirection: 'row', width: '100%', flex: 1,}}>
          
          <Text style={{top: 15.63, left: '7.73%', height: 18,
              color: '#1A1C36', fontFamily: 'SFNSDisplay-Bold', fontSize: 16, position: 'absolute', lineHeight: 18,}}>{item.index}</Text>
                            
          <TouchableOpacity style={{height: 48, width: 48, top: 0, left: '13.6%', position: 'absolute',}}
          onPress={() => this.props.navigation.navigate('Details')}>
          <Image style={{height: 48, width: 48, top: 0, left: 0, position: 'absolute'}} source={item.imageUrl}/>
          </TouchableOpacity>
          <Text style={{height: 20, position: 'absolute', color: '#1A1C36', fontFamily: 'SFNSDisplay-Bold', fontSize: 16, lineHeight: 18, top: 7, left: '31.2%',}}>{item.fullName}</Text>
          
           <Text style={{height: 14, position: 'absolute', color: '#A9ABB8', fontFamily: 'SFNSDisplay', fontSize: 12, lineHeight: 15, top: 29, left: '31.2%',}}>{item.userName}</Text>

           <Image style={{height: 20, width: 20, top: 14, left: '80.27%', position: 'absolute'}} source={item.star}/>

           <Text style={{left: '88%', height: 18, color: '#1A1C36',    fontFamily: 'SFNSDisplay-Bold', fontSize: 16, lineHeight: 18, position: 'absolute', top: 15}}>{item.score}</Text>
            </View>
          </View>
          );
    
    _today() {
       if (this.state.filter == 1) {
       return (
                       <View
                        style={{
                        boxSizing: 'border-box',
                        height: 44,
                        width: 116,
                        border: '1px solid #0DB09F',
                        borderRadius: 22,
                        backgroundColor: '#0DB09F',
                        alignItems: 'center',
                        justifyContent: 'center',
                        left: '7.47%',
                        position: 'absolute',
                    }}>
                    
                       <Text style={{
                        height: 20,
                        width: 84,
                        color: '#FFFFFF',
                        fontFamily: 'SFNSDisplay-Bold',
                        fontsize: 14,
                        lineHeight: 17,
                        /*top: 10,*/
                        textAlign: 'center'}}>
                    Today
                       </Text>
                      </View>
               )
               } else {
           return (
            
                   <TouchableOpacity
                       style={{
                       boxSizing: 'border-box',
                       height: 44,
                       width: 116,
                       border: '1px solid #0DB09F',
                       borderRadius: 22,
                       alignItems: 'center',
                       left: '7.47%',
                       position: 'absolute',
                   }}
                   onPress={() => this.setState({ filter: 1})}>
                     <Text style={{
                        height: 20,
                        width: 84,
                        color: '#A9ABB8',
                        fontFamily: 'SFNSDisplay',
                        fontsize: 14,
                        lineHeight: 17,
                        textAlign: 'center',
                        top: 11,
                       }}
                   >
                    Today
                   </Text>
                   </TouchableOpacity>
                   )
           }
       }
       
       _monthly() {
           if (this.state.filter == 2) {
            return (
                            <View
                             style={{
                             boxSizing: 'border-box',
                             height: 44,
                             width: 116,
                             border: '1px solid #0DB09F',
                             borderRadius: 22,
                             backgroundColor: '#0DB09F',
                             alignItems: 'center',
                             justifyContent: 'center',
                             left: '37%',
                             position: 'absolute',
                         }}>
                         
                         <Text style={{
                             height: 20,
                             width: 84,
                             color: '#FFFFFF',
                             fontFamily: 'SFNSDisplay-Bold',
                             fontsize: 14,
                             lineHeight: 17,
                             textAlign: 'center',
                             /*top: 10*/
                    }}>
                       Monthly
                           </Text>
                           </View>
                    )
                    } else {
                return (
                        <TouchableOpacity
                           style={{
                           boxSizing: 'border-box',
                           height: 44,
                           width: 116,
                           border: '1px solid #0DB09F',
                           borderRadius: 22,
                           alignItems: 'center',
                           justifyContent: 'center',
                           left: '37%',
                           position: 'absolute',
                       }}
                        onPress={() => this.setState({ filter: 2})}>
                       <Text style={{
                            height: 20,
                            width: 84,
                            color: '#A9ABB8',
                            fontFamily: 'SFNSDisplay',
                            fontSize: 14,
                            lineHeight: 17,
                            textAlign: 'center',
                            /*top: 11,*/
                        }}>
                              Monthly
                        </Text>
                        </TouchableOpacity>
                        )
                }
       }
       

       _allTime() {
           if (this.state.filter == 3) {
                 return (
                       
                                 <View
                                  style={{
                                  boxSizing: 'border-box',
                                  height: 44,
                                  width: 116,
                                  border: '1px solid #0DB09F',
                                  borderRadius: 22,
                                  backgroundColor: '#0DB09F',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  left: '65.8%',
                                  position: 'absolute',
                              }}>
                              
                              <Text style={{
                                  height: 20,
                                  width: 84,
                                  color: '#FFFFFF',
                                  fontFamily: 'SFNSDisplay-Bold',
                                  fontsize: 14,
                                  /*top: 10,*/
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
                                 height: 44,
                                 width: 116,
                                 border: '1px solid #0DB09F',
                                 borderRadius: 22,
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 left: '65.8%',
                                 position: 'absolute',
                             }}
                              onPress={() => this.setState({ filter: 3})}>
                             
                             <Text style={{
                                 height: 20,
                                 width: 84,
                                 color: '#A9ABB8',
                                 fontFamily: 'SFNSDisplay',
                                 fontSize: 14,
                                 lineHeight: 17,
                                 textAlign: 'center',
                                 /*top: 11,*/
                             }}>
                                   All time
                             </Text>
                             </TouchableOpacity>
                     
                             )
                     }
       }
    render() {
        
        const { width } = Dimensions.get('window');
        const height = Dimensions.get('window').height
   
        
        return (
             <ImageBackground source={require('../assets/images/leaderboardBG.png')} style={{
                    height: height * .484,
                    width: width,
                    resizeMode: "center",
                    overflow: "hidden",
                flex: 1}}>
                <SafeAreaView>
                    <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                
                    <Text style={{
                      height: 28,
                      color: '#FFFFFF',
                      fontFamily: 'SFNSDisplay-Bold',
                      fontSize: 24,
                      lineHeight: 28,
                      left: '6.67%',
                      top: height * .0419
                    }}>
                        Leaderboard
                    </Text>
                
                
                <Image style={{boxSizing: 'border-box', height: (width * .088)*0.904, width: '8.8%', position: 'absolute', left: '54.59%', top: height * .0764, border: '4px solid #0DB09F'}}
                source={require('../assets/images/crown.png')}/>
                
                <View style={{flexDirection: 'row', top: height * .0948, left: '40.08%', position: 'absolute', width: '20.8%',}}>
                <TouchableOpacity style={{boxSizing: 'border-box', height: width * .208, width: '100%', position: 'absolute', top: 0, left: 0, position: 'absolute', border: '4px solid #0DB09F', borderRadius: (width * .208)/2}}
                onPress={() => this.props.navigation.navigate('Details')}>
                <Image style={{boxSizing: 'border-box', height: width * .208, width: '100%', position: 'absolute', left: 0, top: 0, border: '4px solid #0DB09F', borderRadius: (width * .208)/2,}} source={require('../assets/images/1place.png')}/>
                </TouchableOpacity>
                <View style={{
                    height: width * .0693,
                    width: width * .0693,
                    backgroundColor: '#FFFFFF',
                    top: (width * .1307) * 1.125,
                    left: width * .1307,
                    borderRadius: (width * .693)/2,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text style={{
                textAlign: 'center',
                color: '#0DB09F',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 12,
                lineHeight: 15
                }}>92</Text>
                </View>
                
                <View style={{top: ((width * .1307) * 1.125) + (width * .0693) + 6, height: 14, left: 0, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <Text style={{
                   height: 14,
                   color: '#FFFFFF',
                   fontFamily: 'SFNSDisplay',
                   fontSize: 12,
                   position: 'absolute',
                   lineHeight: 15,
                   top: 0,
                   textAlign: 'center'
               }}>
               Tsutsui I.
               </Text>
               </View>
               </View>
                
                <View style={{flexDirection: 'row', top: height * .1416, left: '17.07%', position: 'absolute', width: width * .1813,}}>
                <TouchableOpacity style={{boxSizing: 'border-box', height: width * .1813, width: '100%', position: 'absolute', top: 0, left: 0, position: 'absolute', border: '4px solid #0DB09F', borderRadius: (width * .1813)/2}}
                           onPress={() => this.props.navigation.navigate('Details')}>
                <Image style={{boxSizing: 'border-box', height: width * .1813, width: '100%', position: 'absolute', left: 0, top: 0, border: '4px solid #0DB09F',                     borderRadius: (width * .1813)/2,}} source={require('../assets/images/2place.png')}/>
                </TouchableOpacity>
                <View style={{
                  height: width * .0693,
                  width: width * .0693,
                  backgroundColor: '#FFFFFF',
                  top: (width * .1147) * 1.02,
                  left: width * .1147,
                  borderRadius: (width * .693)/2,
                 position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center'
                }}>
                <Text style={{
                textAlign: 'center',
                color: '#0DB09F',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 12,
                lineHeight: 15
                }}>89</Text>
                </View>
                
                <View style={{top: ((width * .1147) * 1.02) + (width * .0693) + 4, height: 14, left: 0, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <Text style={{
                    height: 14,
                    color: '#FFFFFF',
                    fontFamily: 'SFNSDisplay',
                    fontSize: 12,
                    lineHeight: 15,
                    position: 'absolute',
                    top: 0,
                    textAlign: 'center'
                }}>
                Alfie Wood
                </Text>
                </View>
                </View>
                
                <View style={{flexDirection: 'row', top: height * .1478, left: '66.67%', position: 'absolute', width: width * .1813,}}>
                <TouchableOpacity style={{boxSizing: 'border-box', height: width * .1813, width: '100%', position: 'absolute', top: 0, left: 0, position: 'absolute', border: '4px solid #0DB09F', borderRadius: (width * .1813)/2}}
                                          onPress={() => this.props.navigation.navigate('Details')}>
                <Image style={{boxSizing: 'border-box', height: width * .1813, width: '100%', position: 'absolute', left: 0, top: 0, border: '4px solid #0DB09F', borderRadius: (width * .1813)/2,}} source={require('../assets/images/3place.png')}/>
                </TouchableOpacity>
                <View style={{
                  height: width * .0693,
                  width: width * .0693,
                  backgroundColor: '#FFFFFF',
                  top: (width * .12) * 0.98,
                  left: width * .12,
                  borderRadius: (width * .693)/2,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center'
                    }}>
                    <Text style={{
                    textAlign: 'center',
                    color: '#0DB09F',
                    fontFamily: 'SFNSDisplay-Bold',
                    fontSize: 12,
                    lineHeight: 15
                    }}>79</Text>
                </View>
                
                <View style={{top: ((width * .12) * 0.98) + (width * .0693) + 4, left: 0, height: 14, alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                <Text style={{
                    height: 14,
                    color: '#FFFFFF',
                    fontFamily: 'SFNSDisplay',
                    fontSize: 12,
                    position: 'absolute',
                    lineHeight: 15,
                    top: 0,
                    textAlign: 'center'
                }}>
                Lungelo N.
                </Text>
                </View>
</View>
                <SafeAreaView
                           pointerEvents="box-none"
                        style={{position: 'absolute',
                           bottom: 0,
                           width: '100%',
                           justifyContent: 'flex-end',
                           minHeight: 160,}}
                           forceInset={{
                             top: 'always',
                             bottom: 'always',
                           }}>
                               
                   <SafeAreaView
                     style={{
                        position: 'absolute',
                        width: '100%',
                    }}
                     forceInset={{
                       top: 'always',
                       bottom: 'always'
                     }}>
                <View style={{ height: 49,}}/>
                <SlidingUpPanel
                  ref={c => (this._panel = c)}
                  draggableRange={{top: height / 1.95, bottom: 120}}
                  animatedValue={this._draggedValue}
                  showBackdrop={false}
                  containerStyle={{top: 165,}}>
              <View style={{
                    ...Platform.select({
                    ios: {
                     borderRadius: '30px 30px 0 0',
                    },
                    android: {
                     borderRadius: 30,
                    },
                    }),
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    position: 'absolute',
                    width: width,
                    height: 3000,
                    zIndex: 3,
                    top: height * .3485,
                  }}>
                <View style={{height: 4, width: '29.87%', opacity: 0.1, backgroundColor: '#000000', borderRadius: 100, left: '35.2%', top: height * .0099, position: 'absolute'}}>
                </View>
                <View style={{
                flexDirection: 'row',
                top: height * .0419,
                width: width,
                height: 44,
                position: 'absolute',
                }}>
                {this._today()}
                {this._monthly()}
                {this._allTime()}
                </View>
                <View style={{
                    boxSizing: 'border-box',
                    height: 1,
                    width: '84.8%',
                    border: '0.5px solid #EEEEEE',
                    top: height * .1224,
                    left: '7.73%',
                    backgroundColor: '#D8D8D8',
                }}></View>
                <FlatList
                    style={{width: '100%', position: 'absolute', top: height * .1515,left: '0%',}}
                    vertical
                    data={this.data}
                    renderItem={this.renderItem}
                    scrollEnabled={false}
                    keyExtractor={(item, index) => index}/>
                </View>
                
           
                </SlidingUpPanel>
                </SafeAreaView>

                </SafeAreaView>
                </View>
                </SafeAreaView>
                </ImageBackground>
          );
    }
}


class DetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
        filter: 1
        };

    }
    render() {
        const { width } = Dimensions.get('window');
        const height = Dimensions.get('window').height
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Leaderboard')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 17}} activeOpacity={0}>
                <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', top: 17, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                
                width: '44.93%',
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                textAlign: 'center'}}>
                Details
                </Text>
                </View>

                <View style={{
                    boxSizing: 'border-box', height: 499, width: '86.93%', border: '1px solid #0DB09F', borderRadius: 10, backgroundColor: '#FFFFFF', boxShadow: '0 15px 47px 0 rgba(0,0,0,0.05)', borderColor: '#0DB09F', borderWidth: 1, shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000', shadowOpacity: .2, shadowRadius: 70, elevation: 5, left: '6.53%', top: height * .0881
                }}>
                <View style={{flexDirection: 'column', height: 123,  alignItems: 'center', top: height * .0505,}}>
                <Image style={{
                    boxSizing: 'border-box', height: 123, width: 123, border: '1px solid #0DB09F',  borderColor: '#0DB09F', borderWidth: 1, position: 'absolute', borderRadius: (123)/2
                }} source={require('../assets/images/detailHeadshot.png')}/>
                <View style={{
                    height: 34, width: 77, borderRadius: 10, backgroundColor: '#FFFFFF', boxShadow: '0 15px 8px 0 rgba(0,0,0,0.05)', top: 110.5, position: 'absolute', shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000', shadowOpacity: .2, shadowRadius: 25, elevation: 5,
                }}>
                <Image style={{height: 20, width: 20, left: width * .04, top: 7, position: 'absolute'
                }} source={require('../assets/images/detailStar.png')}/>
                <Text style={{height: 18, color: '#1A1C36', fontFamily: 'SFNSDisplay-Bold', fontSize: 16, lineHeight: 18, left: width * .1173, top: 8, position: 'absolute'
                }}>70</Text>
                </View>
                <Text style={{height: 18, color: '#A9ABB8', fontFamily: 'SFNSDisplay', fontSize: 14, lineHeight: 17, top: 158.5, position: 'absolute'}}>
                Current position :
                <Text style={{height: 16, color: '#0DB09F', fontFamily: 'SFNSDisplay-Bold', fontSize: 14, lineHeight: 17,}}>{" "} 6th</Text></Text>
                
                <Text style={{height: 20, color: '#1A1C36', fontFamily: 'SFNSDisplay-Bold', fontSize: 16, lineHeight: 18, top: 123+59.5}}>Samuil Sadovsky</Text>
                <Text style={{height: 14, color: '#A9ABB8', fontFamily: 'SFNSDisplay', fontSize: 12, lineHeight: 15, top: 123+85.5, position: 'absolute'}}>Silhma0986</Text>
           
                </View>
                <View style={{boxSizing: 'border-box', height: 1, width: '99%', border: '0.5px solid #0DB09F', top: 123 + 120.5, borderColor: '#0DB09F', borderWidth: .5, position: 'absolute', backgroundColor: '#0DB09F', left: width * .004, top: 284.5}}>
                </View>
                
                <Text style={{height: 13, color: '#A9ABB8', fontFamily: 'SFNSDisplay', fontSize: 10, lineHeight: 12, left: width * .1373, top: 307.5, position: 'absolute'
                }}>Exams passed:</Text>
                <Text style={{height: 39, color: '#1A1C36', fontFamily: 'SFNSDisplay', fontSize: 32, lineHeight: 38, left: width * .1373, top: 330.5, position: 'absolute'
                 }}>36</Text>
                
                
                
                <View style={{boxSizing: 'border-box', height: 63, width: 1, backgroundColor: '#0DB09F', border: '0.5px solid #0DB09F', top: 304.5, position: 'absolute', left: width * .4253}}>
                </View>
                
                <Text style={{height: 13, color: '#A9ABB8', fontFamily: 'SFNSDisplay', fontSize: 10, lineHeight: 12, left: width * .5693, top: 307.5, position: 'absolute'
                             }}>Exams failed:</Text>
                 <Text style={{height: 39, color: '#1A1C36', fontFamily: 'SFNSDisplay', fontSize: 32, lineHeight: 38, left: width * .5693, top: 330.5, position: 'absolute'
                  }}>2</Text>
                
                <View style={{boxSizing: 'border-box', height: 1, width: '99%', border: '0.5px solid #0DB09F', top: 123 + 120.5, borderColor: '#0DB09F', borderWidth: .5, position: 'absolute', backgroundColor: '#0DB09F', left: width * .004, top: 388.5}}>
                </View>
                
                <Text style={{height: 13, color: '#A9ABB8', fontFamily: 'SFNSDisplay', fontSize: 10, lineHeight: 12, left: width * .1373, top: 411.5, position: 'absolute'
                }}>Total questions:</Text>
                <Text style={{height: 39, color: '#1A1C36', fontFamily: 'SFNSDisplay', fontSize: 32, lineHeight: 38, left: width * .1373, top: 434.5, position: 'absolute'
                }}>36</Text>
                
                <View style={{boxSizing: 'border-box', height: 63, width: 1, backgroundColor: '#0DB09F', border: '0.5px solid #0DB09F', top: 414, position: 'absolute', left: width * .4253}}>
                </View>
                
                <Text style={{height: 13, color: '#A9ABB8', fontFamily: 'SFNSDisplay', fontSize: 10, lineHeight: 12, left: width * .5693, top: 411.5, position: 'absolute'
                  }}>Total answers:</Text>
                  <Text style={{height: 39, color: '#1A1C36', fontFamily: 'SFNSDisplay', fontSize: 32, lineHeight: 38, left: width * .5693, top: 434.5, position: 'absolute'
                  }}>26</Text>
                
                
                </View>
                
                </View>
                </SafeAreaView>
                );
    }
}

LeaderboardScreen.navigationOptions = {
  title: '',
  header: null,
};

DetailsScreen.navigationOptions = {
  title: '',
  header: null,
};

const RootStack = createStackNavigator(
                                       {
                                       Leaderboard: LeaderboardScreen,
                                       Details: DetailsScreen,
                                       },
                                       {
                                       initialRouteName: 'Leaderboard',
                                       },{
                                       defaultNavigationOptions: {
                                       header: {
                                       style: {
                                           elevation: 0,
                                           shadowOpacity: 0,
                                           borderBottomWidth: 0,
                                       },
                                    },                                            },
                                }
                            );



const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
   panelHeader: {
                                 
     height: 0,
     backgroundColor: '#b197fc',
     alignItems: 'center',
     justifyContent: 'center'
   },
   favoriteIcon: {
     position: 'absolute',
     top: -24,
     right: 24,
     backgroundColor: '#2b8a3e',
     width: 48,
     height: 48,
     padding: 8,
     borderRadius: 24,
     zIndex: 1
   }
});
