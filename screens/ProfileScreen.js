import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from 'react-native-elements';
import VideoPlayer from 'react-native-video-player';
import { createAppContainer, NavigationActions } from 'react-navigation';
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
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import AuthStacks from '../navigation/AuthStack';
import NavigationService from '../navigationService';
import Functions from '../functions';
import Moment from 'moment';
import { RNS3 } from 'react-native-aws3';

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
    Alert,
    AsyncStorage
} from 'react-native';

const options = {
  keyPrefix: "images/users/",
  bucket: "elasticbeanstalk-us-east-2-560941559211",
  region: "us-east-2",
  accessKey: "AKIAJ7MJAPPP45V3UHHA",
  secretKey: "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",
  successActionStatus: 201
}
 
function setUser(user) {
    console.log(user)
    let phoneNum = formatPhoneNumber(user.PHONE_NUMBER);
    return (previousState, currentProps) => {
      return { ...previousState,
                    user: user,
                    phoneNum: phoneNum,
                    username: user.USERNAME,
                    grade: user.GRADE,
                    firstName: user.FIRST_NAME,
                    lastName: user.LAST_NAME,
                    name: user.FIRST_NAME + " " + user.LAST_NAME,
                    id: user.ID,
                    image: user.IMAGE,
                    isOn: (user.READ_OFFLINE == 1) ? true : false,
                    readOfflineState: user.READ_OFFLINE
                };
    };
}



function formatPhoneNumber(text) {
        var cleaned = ('' + text).replace(/\D/g, '')
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        let number = [ '(', match[2], ') ', match[3], '-', match[4]].join('');
       return number
    }

const createFormData = (photo, body) => {
  const data = new FormData();

  data.append("photo", {
    name: "file",
    type: photo.type,
    uri:
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};


class ProfileScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isOn: false,
            phoneNum: '',
            firstName: '',
            lastName: '',
            username: '',
            grade: '',
            name: '',
            id: 0,
            imageDefault: require('../assets/images/Oval.png'),
            image: '',
            readOfflineState: 0,
        };
    }
    async saveUser(user){
        console.log(user)
        try {
            await AsyncStorage.setItem('user', JSON.stringify(user[0]));
            //this.setState(setUser(user[0]));
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }
    
    updateReadOffline = (response) => {
        this.saveUser(response)
        console.log(this.state.readOfflineState)
    }
    
    async logout() {
      try {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('user');
           NavigationService.logout();
      } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
      }
    }
    
   componentDidMount() {
          this.getPermissionAsync();
             this._subscribe = this.props.navigation.addListener('didFocus', () => {
                 AsyncStorage.getItem('user').then((user) => {
                                                   console.log("USER ===> " + user)
                     this.setState(setUser(JSON.parse(user)));
                                                                            console.log(this.state.image)
                    })
                                        
             });
      }
    
      getPermissionAsync = async () => {
         if (Constants.platform.ios) {
           const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
           if (status !== 'granted') {
             alert('Sorry, we need camera roll permissions to make this work!');
           }
         }
       }

    updateImage = (response) => {
        console.log("    updateImage = (response) => {")
        console.log(response)
        console.log("    updateImage = (response) => {")

          this.saveUser(response)
      }
  
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true
        });
        
        if (!result.cancelled) {
            this.setState({image: result.uri})
            let now = Moment().format('MM-DD-YYYY')
            const file = {
                    uri: result.uri,
                    name: this.state.firstName+'_'+this.state.lastName+"_("+now+").png",
                    type: "image/png"
                  }
            RNS3.put(file, options).then(response => {
              if (response.status !== 201)
                throw new Error("Failed to upload image to S3");
               AsyncStorage.getItem('access_token').then((token) => {
               Functions.updateImage(token, this.updateImage, response.body.postResponse.location, this.state.id);
             });
            });
        }
      };

    render() {
     
        const { width } = Dimensions.get('window');
        const screenHeight = Dimensions.get('window').height
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
                  <View style={{height: 1591-44-109+66}}>
                  <Text style={styles.profile}>Profile</Text>
                  <View style={{flexDirection: 'row', top: 50, position: 'relative', width: width,}}>
                  <TouchableOpacity style={{boxSizing: 'border-box', height: 104, width: 104, borderRadius: 52, position: 'relative', left: 30, border: '4px solid #0DB09F',}}
                  onPress={() => { this._pickImage() }}>
                  
                  <Image style={{boxSizing: 'border-box', height: 104, width: 104, position: 'relative', left: 0, border: '4px solid #0DB09F', borderRadius: 52, borderWidth: 4, borderColor: '#0DB09F' }} source={{uri: this.state.image}}/>
                  
                  </TouchableOpacity>
                  <View style={styles.info}>
                  
                  <Text numberOfLines={2} style={{height: 54, position: 'relative', color: '#1A1C36', fontFamily: 'SFNSDisplay-Bold',  fontSize: 22, lineHeight: 24, }}>{this.state.name}</Text>
                  <Text style={{height: 15, top: 6, width: 115, position: 'relative', color: '#A9ABB8', fontFamily: 'SFNSDisplay',  fontSize: 12, lineHeight: 15,}}>Current position: 6th</Text>
                  <Text style={{height: 22, top: 16, width: 102, position: 'relative', color: '#0DB09F', fontFamily: 'SFNSDisplay',  fontSize: 14, lineHeight: 17,}} onPress={/*() => navigate('Search')*/() => this.props.navigation.navigate('ViewProfile')}>View profile</Text>
                  </View>
                  </View>
                  
                  <TouchableOpacity style={{borderColor: '#0DB09F', borderWidth: .3, borderRadius: 5, width: '86.72%', backgroundColor: '#FFFFFF', position: 'relative', top: 42+35, left: '6.64%', height: 53.2, boxSizing: 'border-box', boxShadow: '0 16px 24px 0 #000000',  shadowOffset:{  width: 0,  height: 0,  },
                  shadowColor: '#000000',
                  shadowOpacity: .2,
                  shadowRadius: 200,
                  elevation: 5
                  }}
                   onPress={/*() => navigate('Search')*/() => this.props.navigation.navigate('CompletedTopicList')}>
                  
                      <Text style={{
                      height: 19,
                      width: 160,
                      top: 19.1,
                      left: '5.36%',
                      color: '#1A1C36',
                      fontFamily: 'SFNSDisplay-Bold',
                      fontSize: 14,
                      lineHeight: 17}}>
                        Completed topic lists
                      </Text>
                  
                       <Image style={{height: 8, width: 4.94, position: 'absolute', top: 23.1, right: '6.25%', zIndex: 0}} source={require('../assets/Icons/arrow2.png')}/>

                  </TouchableOpacity>
                  
                  <TouchableOpacity style={{borderColor: '#0DB09F', borderWidth: .3, borderRadius: 5, width: '86.72%', position: 'relative', top: 42+35+11.9, left: '6.64%', height: 53.2, boxSizing: 'border-box', boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)', shadowOffset:{  width: 0,  height: 0,  },
                  shadowColor: '#000000', shadowOpacity: .2, shadowRadius: 200, elevation: 5,
                    backgroundColor: '#FFFFFF',
                  }} onPress={/*() => navigate('Search')*/() => this.props.navigation.navigate('MyPrizes')}>
                  <Text style={{
                  height: 19,
                  width: 155,
                  top: 19.1,
                  left: '5.36%',
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay-Bold',
                  fontSize: 14,
                  lineHeight: 17}}>
                  My prizes
                  </Text>
                  
                        <Image style={{height: 8, width: 4.94, position: 'absolute', top: 23.1, right: '6.25%', zIndex: 0}} source={require('../assets/Icons/arrow2.png')}/>
                  
                  </TouchableOpacity>
                  
                  
                  
                  
                  <TouchableOpacity style={{borderColor: '#0DB09F', borderWidth: .3, borderRadius: 5, width: '86.72%', position: 'relative', top: 42+35+11.9+12, left: '6.64%', height: 53.2, boxSizing: 'border-box', boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)', shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000', shadowOpacity: .2, shadowRadius: 200, elevation: 5, backgroundColor: '#FFFFFF',
                  }} onPress={/*() => navigate('Search')*/() => this.props.navigation.navigate('Offline')}>
                  <Text style={{
                  height: 16,
                  width: 155,
                  top: 19.1,
                  left: '5.36%',
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay-Bold',
                  fontSize: 14,
                  lineHeight: 17}}>
                  Offline
                  </Text>
                        <Image style={{height: 8, width: 4.94, position: 'absolute', top: 23.1, right: '6.25%', zIndex: 0}} source={require('../assets/Icons/arrow2.png')}/>
                  </TouchableOpacity>
                  
                  
                  <Text
                  style={{height: 24,
                  top: 42+35+12+12+35,
                  left: '8.27%',
                  position: 'relative',
                  width: 132,
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay-Bold',
                  fontSize: 21,
                  lineHeight: 24,}}>My account</Text>
                  
                  
                  <TouchableOpacity style={{borderColor: '#0DB09F', borderWidth: .3, borderRadius: 5, width: '86.72%', position: 'relative', top: 42+35+12+12+35+12, left: '6.64%', height: 53.2, boxSizing: 'border-box', boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)', shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000', shadowOpacity: .2, shadowRadius: 200, elevation: 5, backgroundColor: '#FFFFFF',
                  }} onPress={/*() => navigate('Search')*/() => this.props.navigation.navigate('PhoneNumber')}>
                 
                  
                  <Text style={{
                  height: 16,
                  width: 155,
                  top: 19.1,
                  left: '5.36%',
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay',
                  fontSize: 12,
                  lineHeight: 17}}>
                  Phone number
                  </Text>
                  
                  <Text
                  style={{
                  height: 14,
                  position: 'absolute',
                  top: 19.1,
                  right: '10.69%',
                  color: '#0DB09F',
                  fontFamily: 'SFNSDisplay-Bold',
                  fontSize: 12,
                  lineHeight: 15,
                  textAlign: 'right'}}>{this.state.phoneNum}</Text>
                  
                        <Image style={{height: 8, width: 4.94, position: 'absolute', top: 23.1, right: '6.25%', zIndex: 0}} source={require('../assets/Icons/arrow2.png')}/>
                  </TouchableOpacity>
                  
         
                  <TouchableOpacity style={{borderColor: '#0DB09F', borderWidth: .3, borderRadius: 5, width: '86.72%', position: 'relative', top: 42+35+12+12+35+12+12, left: '6.64%', height: 53.2, boxSizing: 'border-box', boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)', shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000', shadowOpacity: .2, shadowRadius: 200, elevation: 5, backgroundColor: '#FFFFFF',
                  }} onPress={/*() => navigate('Search')*/() => this.props.navigation.navigate('Username', {updateUsername: this.updateUsername})}>
                  <Text style={{
                  height: 16,
                  width: 155,
                  top: 19.1,
                  left: '5.36%',
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay',
                  fontSize: 12,
                  lineHeight: 17}}>
                  Username
                  </Text>
                  
                  <Text
                  style={{
                  height: 14,
                  position: 'absolute',
                  top: 19.1,
                  right: '10.69%',
                  width: 112,
                  color: '#0DB09F',
                  fontFamily: 'SFNSDisplay-Bold',
                  fontSize: 12,
                  lineHeight: 15,
                  textAlign: 'right'}}>{this.state.username}</Text>
                  
                          <Image style={{height: 8, width: 4.94, position: 'absolute', top: 23.1, right: '6.25%', zIndex: 0}} source={require('../assets/Icons/arrow2.png')}/>
                  </TouchableOpacity>
                  
                  
                  
                  <TouchableOpacity style={{borderColor: '#0DB09F', borderWidth: .3, borderRadius: 5, width: '86.72%', position: 'relative', top: 42+35+12+12+35+12+12+12, left: '6.64%', height: 53.2, boxSizing: 'border-box', boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)', shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000', shadowOpacity: .2, shadowRadius: 200, elevation: 5, backgroundColor: '#FFFFFF',
                  }} onPress={() => this.props.navigation.navigate('Grade')}>
                  <Text style={{
                  height: 16,
                  width: 155,
                  top: 19.1,
                  left: '5.36%',
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay',
                  fontSize: 12,
                  lineHeight: 17}}>
                  Grade
                  </Text>
                  
                  <Text
                  style={{
                  height: 14,
                  position: 'absolute',
                  top: 19.1,
                  right: '10.69%',
                  width: 112,
                  color: '#0DB09F',
                  fontFamily: 'SFNSDisplay-Bold',
                  fontSize: 12,
                  lineHeight: 15,
                  textAlign: 'right'}}>{this.state.grade}</Text>
                  <Image style={{height: 8, width: 4.94, position: 'absolute', top: 23.1, right: '6.25%', zIndex: 0}} source={require('../assets/Icons/arrow2.png')}/>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={{borderColor: '#0DB09F', borderWidth: .3, borderRadius: 5, width: '86.72%', position: 'relative', top: 42+35+12+12+35+12+12+12+12, left: '6.64%', height: 53.2, boxSizing: 'border-box', boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)', shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000', shadowOpacity: .2, shadowRadius: 200, elevation: 5, backgroundColor: '#FFFFFF',
                  }} onPress={/*() => navigate('Search')*/() => this.props.navigation.navigate('AddPassword')}>
                  <Text style={{
                  height: 16,
                  width: 155,
                  top: 19.1,
                  left: '5.36%',
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay',
                  fontSize: 12,
                  lineHeight: 17}}>
                  Add password
                  </Text>
                        <Image style={{height: 8, width: 4.94, position: 'absolute', top: 23.1, right: '6.25%', zIndex: 0}} source={require('../assets/Icons/arrow2.png')}/>
                  </TouchableOpacity>
                  
               
                  
                  <Text
                  style={{height: 29,
                  top: 42+35+12+12+35+12+12+12+12+30,
                  left: '8.27%',
                  position: 'relative',
                  width: 132,
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay-Bold',
                  fontSize: 21,
                  lineHeight: 24,}}>My settings</Text>
                  
                  
                  
                  <TouchableOpacity style={{borderColor: '#0DB09F', borderWidth: .3, borderRadius: 5, width: '86.72%', position: 'relative', top: 42+35+12+12+35+12+12+12+12+30+17, left: '6.64%', height: 53.2, boxSizing: 'border-box', boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)', shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000', shadowOpacity: .2, shadowRadius: 200, elevation: 5, backgroundColor: '#FFFFFF',
                  }} onPress={/*() => navigate('Search')*/() => this.props.navigation.navigate('Notifications')}>
                  <Text style={{
                  height: 16,
                  width: 155,
                  top: 19.1,
                  left: '5.36%',
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay',
                  fontSize: 12,
                  lineHeight: 17}}>
                  Notifications
                  </Text>
                       <Image style={{height: 8, width: 4.94, position: 'absolute', top: 23.1, right: '6.25%', zIndex: 0}} source={require('../assets/Icons/arrow2.png')}/>
                  </TouchableOpacity>
                  
                  
                  <View style={{borderColor: '#0DB09F', borderWidth: .3, borderRadius: 5, width: '86.72%', position: 'relative', top: 42+35+12+12+35+12+12+12+12+30+17+9.9, left: '6.64%', height: 53.2, boxSizing: 'border-box', boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)', shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000', shadowOpacity: .2, shadowRadius: 200, elevation: 5, backgroundColor: '#FFFFFF', zIndex: 0
                  }} onPress={/*() => navigate('Search')*/() => this.props.navigation.navigate('ReadOffline')}>
                  <Text style={{
                  height: 16,
                  width: 155,
                  top: 19.1,
                  left: '5.36%',
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay',
                  fontSize: 12,
                  lineHeight: 17}}>
                  Read Offline
                  </Text>
         
                  <SwitchToggle
                  style={{
                  top: 14.1,
                  zIndex: 1,
                  }}
                  
                  containerStyle={{
                  position: 'absolute',
                  right: '6.43%',
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
                  
                  switchOn={this.state.isOn}
                  /*onPress={(): void => {
                  this.setState({ isOn: !this.state.isOn });
                  }isOn => console.log("changed to : ", isOn)}*/
                  backgroundColorOn='#0DB09F'
                  circleColorOff='#0DB09F'
                  circleColorOn='#0DB09F'
                  duration={500}
                  />
                
                  <TouchableOpacity
                  style={{
                  position: 'absolute',
                  top: 14.1,
                  width: 48,
                  height: 24,
                  right: '6.43%',
                  }}
                  onPress={(): void => {
                  this.setState({ isOn: !this.state.isOn });
                  AsyncStorage.getItem('access_token').then((token) => {
                  Functions.updateReadOffline(token, this.updateReadOffline, this.state.id)
                                                            })
                  }}
                  ></TouchableOpacity>
                  

                  
                  </View>
                  
                  <TouchableOpacity style={{borderColor: '#0DB09F', borderWidth: .3, borderRadius: 5, width: '86.72%', position: 'relative', top: 42+35+12+12+35+12+12+12+12+30+17+9.9+11.8, left: '6.64%', height: 53.2, boxSizing: 'border-box', boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)', shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000',  shadowOpacity: .2, shadowRadius: 200, elevation: 5, backgroundColor: '#FFFFFF',
                  }} onPress={/*() => navigate('Search')*/() => this.props.navigation.navigate('Language')}>
                  <Text style={{
                  height: 19,
                  width: 160,
                  top: 19.1,
                  left: '5.36%',
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay',
                  fontSize: 12,
                  lineHeight: 17}}>
                  Language
                  </Text>
                  
                  <View
                  style={{
                  flexDirection: 'row-reverse',
                  top: 20.1,
                  width: 62,
                  position: 'absolute',
                  right: '7.49%',

                  justifyContent: 'center',
                  alignItems: 'center',
                  }}>
              
                  <Text
                  style={{
                  height: 16,
                  flex: 1,
                  right: 0,
                  position: 'relative',
                  color: '#A9ABB8',
                  fontFamily: 'SFNSDisplay',
                  fontSize: 12,
                  lineHeight: 15,
                  textAlign: 'right'}}>English</Text>
                  
                  <Image style={{height: 13, left: 0, position: 'relative', width: 18, zIndex: 0, }} source={require('../assets/Icons/english-language.png')}/>
                  
          
                 
                  </View>
                  
                  </TouchableOpacity>

                  <Text
                  style={{height: 29,
                  top: 42+35+12+12+35+12+12+12+12+30+17+9.9+11.8+29.9,
                  left: '8.27%',
                  position: 'relative',
                  width: 132,
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay-Bold',
                  fontSize: 21,
                  lineHeight: 24,}}>Support</Text>
                  
                  <TouchableOpacity style={{borderColor: '#0DB09F', borderWidth: .3, borderRadius: 5, width: '86.72%', position: 'relative', top: 42+35+12+12+35+12+12+12+12+30+17+9.9+11.8+29.9+16.9, left: '6.64%', height: 53.2, boxSizing: 'border-box', boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)', shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000', shadowOpacity: .2, shadowRadius: 200, elevation: 5,  backgroundColor: '#FFFFFF',
                  }} onPress={/*() => navigate('Search')*/() => this.props.navigation.navigate('TermsAndConditions')}>
                  <Text style={{
                  height: 16,
                  width: 155,
                  top: 19.1,
                  left: '5.36%',
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay',
                  fontSize: 12,
                  lineHeight: 17}}>
                  Terms & Conditions
                  </Text>
                        <Image style={{height: 8, width: 4.94, position: 'absolute', top: 23.1, right: '6.25%', zIndex: 0}} source={require('../assets/Icons/arrow2.png')}/>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={{borderColor: '#0DB09F', borderWidth: .3, borderRadius: 5, width: '86.72%', position: 'relative', top: 42+35+12+12+35+12+12+12+12+30+17+9.9+11.8+29.9+16.9+11.8, left: '6.64%', height: 53.2, boxSizing: 'border-box', boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)', shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000', shadowOpacity: .2, shadowRadius: 200, elevation: 5,  backgroundColor: '#FFFFFF',
                  }} onPress={/*() => navigate('Search')*/() => this.props.navigation.navigate('PrivacyPolicy')}>
                  <Text style={{
                  height: 17,
                  width: 155,
                  top: 19.1,
                  left: '5.36%',
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay',
                  fontSize: 12,
                  lineHeight: 17}}>
                  Privacy Policy
                  </Text>
                        <Image style={{height: 8, width: 4.94, position: 'absolute', top: 23.1, right: '6.25%', zIndex: 0}} source={require('../assets/Icons/arrow2.png')}/>
                  </TouchableOpacity>
                  
       
                  <TouchableOpacity style={{borderColor: '#0DB09F', borderWidth: .3, borderRadius: 5, width: '86.72%', position: 'relative', top: 42+35+12+12+35+12+12+12+12+30+17+9.9+11.8+29.9+16.9+11.8+11.8, left: '6.64%', height: 53.2, boxSizing: 'border-box', boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)', shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000', shadowOpacity: .2, shadowRadius: 200, elevation: 5,  backgroundColor: '#FFFFFF',
                  }} onPress={/*() => navigate('Search')*/() => this.props.navigation.navigate('FAQs')}>
                  <Text style={{
                  height: 16,
                  width: 155,
                  top: 19.1,
                  left: '5.36%',
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay',
                  fontSize: 12,
                  lineHeight: 17}}>
                  FAQs
                  </Text>
                        <Image style={{height: 8, width: 4.94, position: 'absolute', top: 23.1, right: '6.25%', zIndex: 0}} source={require('../assets/Icons/arrow2.png')}/>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={{borderColor: '#0DB09F', borderWidth: .3, borderRadius: 5, width: '86.72%', position: 'relative', top: 42+35+12+12+35+12+12+12+12+30+17+9.9+11.8+29.9+16.9+11.8+11.8+11.8, left: '6.64%', height: 53.2, boxSizing: 'border-box', boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)', shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000', shadowOpacity: .2, shadowRadius: 200, elevation: 5,  backgroundColor: '#FFFFFF',
                  }} onPress={/*() => navigate('Search')*/() => this.props.navigation.navigate('About')}>
                  <Text style={{
                  height: 16,
                  width: 155,
                  top: 19.1,
                  left: '5.36%',
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay',
                  fontSize: 12,
                  lineHeight: 17}}>
                  About
                  </Text>
                        <Image style={{height: 8, width: 4.94, position: 'absolute', top: 23.1, right: '6.25%', zIndex: 0}} source={require('../assets/Icons/arrow2.png')}/>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={{borderColor: '#EF4036', borderWidth: 1, borderRadius: 5, width: '86.72%', position: 'relative', top: 42+35+12+12+35+12+12+12+12+30+17+9.9+11.8+29.9+16.9+11.8+11.8+11.8+50, left: '6.64%', height: 56, boxSizing: 'border-box', boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)', justifyContent: 'center', alignItems: 'center', shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000',  shadowOpacity: .2, shadowRadius: 200, elevation: 5, backgroundColor: '#FFFFFF',
                  }} onPress={/*() => navigate('Search')*/() => {
                  this.setState({ visible: true });
                  }}>
                  
                  
                  <Modal
                      visible={this.state.visible}
                      onBackdropPress={() => this.setState({ visible: false })}>
                  
                  <View style={{height: screenHeight, width: '150%', top: 0, left: -40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000', opacity: 0.5}}>
                  </View>
                  <View style={{
                  position: 'absolute',
                  boxSizing: 'border-box',
                  height: 179,
                  width: '85.33%',
                  border: '1px solid #0DB09F',
                  borderRadius: 5,
                  backgroundColor: '#FFFFFF',
                  borderColor: '#0DB09F',
                  left: '7.33%',
                  marginVertical: 8,
                  borderWidth: 1,
                  borderRadius: 10,
                  alignItems: 'center'
                  }}>
                  
                  <Text style={{
                  height: 55,
                  width: 177,
                  color: '#1A1C36',
                  fontFamily: 'Helvetica',
                  fontSize: 18,
                  lineHeight: 24,
                  textAlign: 'center',
                  top: 33.5,
                  }}>Are you sure you
                  want to log out?</Text>
                  
                  <View style={{
                  boxSizing: 'border-box',
                  height: 1,
                  width: 264,
                  border: '0.2px solid #0DB09F',
                  marginVertical: 8,
                  borderWidth: .3,
                  borderRadius: 10,
                  borderColor: '#0DB09F',
                  top: 22.5+22.5+3-7,
                  }}></View>
                
                  <View style={{flexDirection: 'row', width: 190, top: 22.5+17.5+22.5-7, height: 18}}>
                  <Text style={{
                  height: 23,
                  width: 57,
                  color: '#EF4036',
                  fontFamily: 'SFNSDisplay',
                  fontSize: 16,
                  lineHeight: 18,
                  textAlign: 'center',}}
                  
                  onPress={() => {this.logout()}}>Log out</Text>
                 
                  <Text style={{
                  height: 18,
                  width: 52,
                  color: '#1A1C36',
                  fontFamily: 'SFNSDisplay',
                  fontSize: 16,
                  lineHeight: 18,
                  left: 77,
                  textAlign: 'center'}}
                  
                  onPress={/*() => navigate('Search')*/() => {
                  this.setState({ visible: false })}}>Cancel</Text>
                  </View>
                  
                  </View>
                  </Modal>
                  
                  <Text style={{
                  height: 19.5,
                  width: 56,
                  color: '#EF4036',
                  fontFamily: 'SFNSDisplay-Bold',
                  fontSize: 14,
                  lineHeight: 18,
                  textAlign: 'center'}}>
                  Log out
                  </Text>
                  
                  </TouchableOpacity>
                  
                  </View>
                  </ScrollView>
                  </View>
                  </SafeAreaView>
                  
                  
            );
        }
}

ProfileScreen.navigationOptions = {
  title: '',
};

class ViewProfileScreen extends React.Component {
    
    constructor(props) {
          super(props);
          
          this.state = {
          name: '',
          response: [],
              
          };
      }
    
    onTextChange(text) {
        this.setState({ name: text });
    }
    
    async saveUser(user){
        try {
            await AsyncStorage.setItem('user', JSON.stringify(user[0]));
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }
   
    updateName = (response) => {
           this.setState({response: response})
           console.log(this.state.response)
           this.saveUser(response)

           
        
           if(this.state.response[0].FIRST_NAME+" "+this.state.response[0].LAST_NAME == this.state.name){
               console.log('SUCCESS!!!')
               Alert.alert(
                 'Name Updated',
                 '',
                 [
                   {
                     text: 'Cancel',
                     onPress: () => console.log('Cancel Pressed'),
                     style: 'cancel',
                   },
                   {text: 'OK', onPress: () => console.log('OK Pressed')},
                 ],
                 {cancelable: false},
               );
           }else{
               Alert.alert(
                    'Error Updating Name',
                    '',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
           }
       }
    
    handlePress = () => {
        var firstName = this.state.name.split(" ")[0]
        var lastName = this.state.name.split(" ")[1]
        
        console.log(firstName + " .. " + lastName)
        console.log(this.state.name.split(" ").length)

        if ((this.state.name.length > 0) && (this.state.name.split(" ").length > 1) && (this.state.name.split(" ")[1].length > 0)){
            AsyncStorage.getItem('access_token').then((token) => {
                                                      AsyncStorage.getItem('user').then((user) => {

                Functions.updateName(token, this.updateName, this.state.name, JSON.parse(user).ID)
                                                                                        })
             })
        }else{
            Alert.alert(
                            'Please Enter a First and Last Name',
                            '',
                            [
                              {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            {cancelable: false},
                          );
        }
    }
       
    render() {
        const { width } = Dimensions.get('window');
        const screenHeight = Dimensions.get('window').height
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 18}} activeOpacity={0}>
                <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center', top: Platform.OS === 'android' ? 25+18 : 18}}>
                <Text style={{
                
                width: '44.93%',
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                textAlign: 'center'}}>
                View Profile
                </Text>
                </View>
                
                <View style={{
                                boxSizing: 'border-box',
                                height: 52.2,
                                width: '78.67%',
                                border: '0.2px solid #0DB09F',
                                borderRadius: 26,
                                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                                backgroundColor: '#FFFFFF',
                                top: 85-37.3,
                                left: '10.67%',
                                borderColor: '#0DB09F',
                                borderWidth: .3,
                                justifyContent: 'center',
                                fontFamily: 'SFNSDisplay',
                                fontSize: 10,
                                lineHeight: 12,
                                paddingHorizontal: 27.1,
                                shadowOffset:{  width: 0,  height: 0,  },
                                shadowColor: '#000000',
                                shadowOpacity: .2,
                                shadowRadius: 70,
                                elevation: 5,
                                backgroundColor: '#FFFFFF',
                               }}>
                            
                           
                           <TextInput style={{
                               backgroundColor: '#FFFFFF',
                               fontFamily: 'SFNSDisplay',
                               fontSize: 10,
                               }}
                               placeholder='Type name'
                               returnKeyType={'done'}
                               maxLength={50}
                               keyboardType={'default'}
                               textContentType='name'
                               dataDetectorTypes='all'
                               onChangeText={(text) => this.onTextChange(text) }
                               value={this.state.name}
                               />
                            </View>
                
                <TouchableOpacity style={{
                           height: 54,
                           width: '73.33%',
                           borderRadius: 27,
                           backgroundColor: '#0DB09F',
                           top: 360-197,
                           left: '13.33%',
                           justifyContent: 'center',
                           alignItems: 'center',
                           }}
                           onPress={() => {this.handlePress()}}>

                           <Text style={{
                           height: 18,
                           width: 41,
                           color: '#FFFFFF',
                           fontFamily: 'SFNSDisplay',
                           fontSize: 15,
                           lineHeight: 18,
                           textAlign: 'center'}}>
                           SAVE
                           </Text>
                   </TouchableOpacity>
                
                </View>
                </SafeAreaView>
                )
    }
}


class CompletedTopicListScreen extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
        completedTopicList: [],
        };
    }
      
    updateCompletedTopicList = (response) => {
        this.setState({completedTopicList: response})
        
        console.log(this.state.completedTopicList)
    }
    
    componentDidMount(){
           this._subscribe = this.props.navigation.addListener('didFocus', () => {
               AsyncStorage.getItem('access_token').then((token) => {
                AsyncStorage.getItem('user').then((user) => {
                Functions.fetchCompletedTopicList(token, this.updateCompletedTopicList, JSON.parse(user).ID)
               })
                                                         })
            });
    }
    
    renderItem = ({item}) => (
                              
          
                              <View
                              style={{
                              boxSizing: 'border-box',
                              height: '13.45%',
                              width: '86.72%',
                              left: '6.64%',
                              top: 0,
                              flex: 1,
                              border: '0.2px solid #0DB09F',
                              borderRadius: 10,
                              backgroundColor: '#FFFFFF',
                              borderColor: '#0DB09F',
                              marginVertical: 8,
                              borderWidth: .3,
                              borderRadius: 10,
                              boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',
                              backgroundColor: '#FFFFFF',
                              }}>
                              
                              <View style={{flexDirection: 'row', position: 'relative',}}>
                              <View style={{flexDirection: 'column', position: 'relative', width: 62, left: 23.1, height: 109.2}}>
                              
                              <Text style={{
                              height: 23,
                              width: 68,
                              position: 'relative',
                              top: 18.1,
                              color: '#1A1C36',
                              fontFamily: 'SFNSDisplay-Bold',
                              fontSize: 18,
                              lineHeight: 21}}>
                              {item.SUBJECT}
                              </Text>
                              
                              <Text style={{
                              height: 14,
                              position: 'relative',
                              top: 26,
                              width: 49,
                              color: '#A9ABB8',
                              fontFamily: 'SFNSDisplay',
                              fontSize: 12,
                              lineHeight: 15}}>
                              {item.TERM_COUNT} Terms
                              </Text>
                              
                              <Text style={{
                              height: 16,
                              position: 'relative',
                              top: 31+12,
                              width: 38,
                              color: '#0DB09F',
                              fontFamily: 'SFNSDisplay-Bold',
                              fontSize: 14,
                              lineHeight: 17}}>
                              {item.EXAM_TYPE}
                              </Text>
                              
                              </View>
                              
                              <Image style={{
                              height: 78,
                              width: 78,
                              position: 'relative',
                              borderRadius: 5,
                              left: 224,
                              position: 'absolute',
                              top: 16.1
                              }} source={{uri: item.IMAGE}}/>
                              </View>
                              
                              </View>
                    
                );
    
    data=[{
          imageUrl: require('../assets/images/ct1.png'),
          subject: 'English',
          terms: '59 terms',
          examType: 'AST',
          },
          {
          imageUrl: require('../assets/images/ct2.png'),
          subject: 'Math',
          terms: '59 terms',
          examType: 'PSAT',
          },
          {
          imageUrl: require('../assets/images/ct3.png'),
          subject: 'English',
          terms: '59 terms',
          examType: 'AST',
          },
          {
          imageUrl: require('../assets/images/ct4.png'),
          subject: 'Math',
          terms: '59 terms',
          examType: 'PSAT',
          }]

    
    render() {
        const { width } = Dimensions.get('window');

        const screenHeight = Dimensions.get('window').height
            return (
                    <SafeAreaView>
                    <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0, shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000',  shadowOpacity: .06, shadowRadius: 70, elevation: 5, }}>
                    
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 18}} activeOpacity={0}>
                    <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', top: Platform.OS === 'android' ? 25+18 : 18, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{
                    
                            width: '44.93%',
                            color: '#1A1C36',
                            fontFamily: 'SFNSDisplay-Bold',
                            fontSize: 16,
                            lineHeight: 18,
                            textAlign: 'center'}}>
                                Completed topic list
                            </Text>
                        </View>
                   
                    
                    <FlatList
                    
                    style={{
                    ...Platform.select({
                           ios: {height: screenHeight,},
                           android: {height: screenHeight-109},
                               }),
                    top: 33.9, }}
                     contentInset= {{bottom: 30}}
                    vertical
                    data={this.state.completedTopicList}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    />
                    </View>
                    </SafeAreaView>
                    )
    }
}

class MyPrizesScreen extends React.Component {  constructor(props) {
          super(props);
          
          this.state = {
          prizes: [],
          totalScore: 0,
          };
      }
    
    updatePrizes = (prizes) => {
        this.setState({prizes: prizes})
        console.log(this.state.prizes)
        
        for (i = 0; i < this.state.prizes.length; i++){          console.log('==> ' + this.state.prizes[i]);
            this.setState({totalScore: this.state.totalScore +  this.state.prizes[i].POINTS});
        }
    }

    componentDidMount(){
           this._subscribe = this.props.navigation.addListener('didFocus', () => {
               AsyncStorage.getItem('access_token').then((token) => {
               AsyncStorage.getItem('user').then((user) => {
                Functions.fetchPrizes(token, this.updatePrizes, JSON.parse(user).ID)
                                                 })
                                                         
                                                         })
            });
    }
    
    
    renderItem = ({item}) => (
                              
                              
                              <View
                              style={{
                              boxSizing: 'border-box',
                              height: 72,
                              width: '86.72%',
                              left: '6.64%',
                              top: 0,
                              flex: 1,
                              border: '0.2px solid #0DB09F',
                              borderRadius: 10,
                              backgroundColor: '#FFFFFF',
                              borderColor: '#0DB09F',
                              marginVertical: 8,
                              shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000',  shadowOpacity: .2, shadowRadius: 200, elevation: 5, backgroundColor: '#FFFFFF',
                              borderWidth: .3,
                              borderRadius: 10,
                              boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)'}}>
                              
                              <View style={{flexDirection: 'row', position: 'relative',}}>
                              <View style={{flexDirection: 'column', position: 'relative', width: 173, left: 29.1,}}>
                              
                              <Text style={{
                              height: 20, width: 173, color: '#1A1C36', fontFamily: 'SFNSDisplay-Bold', fontSize: 14, lineHeight: 17, top: 20.1}}>
                              {item.NAME}
                              </Text>
                              
                              <Text style={{
                              height: 13,
                              position: 'relative',
                              top: 22,
                              width: 118,
                              color: '#A9ABB8',
                              fontFamily: 'SFNSDisplay',
                              fontSize: 10,
                              lineHeight: 13}}>
                              {item.STATUS}
                              </Text>
                              
                            
                              </View>
                              
                              <Image style={{
                              height: 20,
                              width: 20,
                              position: 'relative',
                              borderRadius: 5,
                              left: 48,
                              top: 27.1
                              }} source={require('../assets/images/star.png')}/>
                              
                              <Text style={{
                              height: 18,
                              position: 'relative',
                              width: 23,
                              left: 9+27+21,
                              top: 27.1,
                              color: '#1A1C36',
                              fontFamily: 'SFNSDisplay-Bold',
                              fontSize: 16,
                              lineHeight: 18}}>
                              {item.POINTS}
                              </Text>
                              </View>

                              </View>
                              
                              );
    
    data=[{
          count: '14',
          title: 'Product of a rational',
          status: 'Completed Successfully',
          },
          {
          count: '14',
          title: 'Portland ugh fashion.',
          status: 'Completed Successfully',
          },
          {
          count: '14',
          title: 'Bushwick meh Blue Bo.',
          status: 'Completed Successfully',
          },
          {
          count: '05',
          title: 'Product of a rational',
          status: 'Completed Successfully',
          },{
          count: '14',
          title: 'The monkey-rope is.',
          status: 'Completed Successfully',
          }]
    render() {
        const { width } = Dimensions.get('window');
        const height = Dimensions.get('window').height
        console.log(width)
        return (
                <ImageBackground source={require('../assets/images/bg_prize.png')} style={{
                height: width * .69,
                    width: width,
                    resizeMode: "center",
                    overflow: "hidden",
                flex: 1}}>
                
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>


                <Image style={{position: 'absolute', height: 106, width: 123, left: '57.33%', top: 42}} source={require('../assets/images/bg_img1.png')} activeOpacity={0}/>
                <View style={{boxSizing: 'border-box', height: 48.5, width: 93.5, border: '0.5px solid #0DB09F', position: 'absolute', top: Platform.OS === 'android' ? 25+105 : 105, left: 37, borderRadius: 24, backgroundColor: '#FFFFFF', boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',}}>
                <Image style={{height: 20, width: 20, position: 'absolute', top: 14.25, left: 23.25}} source={require('../assets/images/star.png')}/>
                <Text style={{height: 18, width: 23, color: '#1A1C36', fontFamily: 'SFNSDisplay-Bold', fontSize: 16, lineHeight: 18, position: 'absolute', top: 15.25, left: 52.25}}>{this.state.totalScore}
                </Text>
                </View>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'absolute', left: 25, zIndex:1, top: Platform.OS === 'android' ? 25+17 : 17}} activeOpacity={1}>
                <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left_white.png')}/>
                </TouchableOpacity>
                
    
                <Text style={{height: 41, width: 103, color: '#FFFFFF', fontFamily: 'SFNSDisplay-Bold', position: 'absolute', fontSize: 36, lineHeight: 43, left: 37, top: Platform.OS === 'android' ? 25+54 : 54}} activeOpacity={1}>Prize</Text>
                
                
                <View style={{height: height * .5961, width: width,
                ...Platform.select({
                       ios: {
                        borderRadius: '20px 20px 0 0',
                       },
                       android: {
                        borderRadius: 20,
                       },
                       }),
                backgroundColor: '#FFFFFF', position: 'absolute', top: Platform.OS === 'android' ? 25+175 : 175}} activeOpacity={1}></View>
                <FlatList style={{height: height-(205-30), width: '100%', left: 0, top: Platform.OS === 'android' ? 25+205-30 : 205-30, position: 'absolute', paddingTop: 30}}
                vertical
                contentInset= {{bottom: 140}}
                data={this.state.prizes}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index}/>
                </View>
                </SafeAreaView>
                </ImageBackground>
                )
    }
}

class OfflineScreen extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
        offlineList: [],
        };
    }
    
    updateOffline = (offlineList) => {
        this.setState({offlineList: offlineList})
        console.log(this.state.offlineList)
    }
    
    componentDidMount(){
           this._subscribe = this.props.navigation.addListener('didFocus', () => {
               AsyncStorage.getItem('access_token').then((token) => {
                                                         AsyncStorage.getItem('user').then((user) => {

                Functions.fetchOffline(token, this.updateOffline, JSON.parse(user).ID)
                                                                                           })
                   })
            });
    }

    renderItem = ({item}) => (
                              
                              
                              <View
                              style={{
                              boxSizing: 'border-box',
                              height: 166.2,
                              width: '86.67%',
                              left: '6.64%',
                              top: 0,
                              flex: 1,
                              border: '0.2px solid #0DB09F',
                              backgroundColor: '#FFFFFF',
                              borderColor: '#0DB09F',
                              marginVertical: 8,
                              borderWidth: .3,
                              borderRadius: 10,
                              boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)',
                              backgroundColor: '#FFFFFF',
                              }}>
                              
                              <View style={{flexDirection: 'row', position: 'relative',}}>
                              <Image style={{
                              height: 126,
                              width: 126,
                              position: 'relative',
                              borderRadius: 5,
                              left: 20.1,
                              top: 19.1
                              }} source={{uri: item.IMAGE}}/>
                              
                              
                              <View style={{flexDirection: 'column', position: 'relative', width: 120, left: 50, height: 166.2}}>
                              
                              <Text style={{
                              height: 24,
                              width: 67,
                              position: 'relative',
                              top: 27.1,
                              color: '#1A1C36',
                              fontFamily: 'SFNSDisplay-Bold',
                              fontSize: 18,
                              lineHeight: 21}}>
                              {item.NAME}
                              </Text>
                              
                              <Text style={{
                              height: 14,
                              position: 'relative',
                              top: 26,
                              width: 53,
                              color: '#A9ABB8',
                              fontFamily: 'SFNSDisplay',
                              fontSize: 12,
                              lineHeight: 15}}>
                              {item.TERM_COUNT} Terms
                              </Text>
                              
                              <Text style={{
                              height: 16,
                              position: 'relative',
                              top: 31+12,
                              width: 39,
                              color: '#0DB09F',
                              fontFamily: 'SFNSDisplay-Bold',
                              fontSize: 14,
                              lineHeight: 17}}>
                              {item.EXAM_TYPE}
                              </Text>
                              
                              <TouchableOpacity style={{boxSizing: 'border-box', height: 33, width: 98,    border: '1px solid #0DB09F', borderRadius: 16,    backgroundColor: '#FFFFFF', borderColor: '#0DB09F', borderRadius: 16, borderWidth: 1, justifyContent: 'center', alignItems: 'center', top: 31+12+22.5}}>
                              
                              <Text style={{
                              height: 19,
                              width: 63,
                              color: '#0DB09F',
                              fontFamily: 'SFNSDisplay-Bold',
                              fontSize: 12,
                              lineHeight: 15,
                              textAlign: 'center'}}>
                              Read now
                              </Text>
                              </TouchableOpacity>
                              
                              </View>
                              </View>

                              
                              </View>
                              
                              );
    
    data=[{
          imageUrl: require('../assets/images/ct1.png'),
          subject: 'English',
          terms: '59 terms',
          examType: 'AST',
          },
          {
          imageUrl: require('../assets/images/ct1.png'),
          subject: 'English',
          terms: '59 terms',
          examType: 'PSAT',
          },
          {
          imageUrl: require('../assets/images/ct1.png'),
          subject: 'English',
          terms: '59 terms',
          examType: 'AST',
          }]
    
    
    render() {
        const { width } = Dimensions.get('window');
        
        const screenHeight = Dimensions.get('window').height
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0, shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000',  shadowOpacity: .06, shadowRadius: 70, elevation: 5, }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 18}} activeOpacity={0}>
                <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', top: Platform.OS === 'android' ? 25+18 : 18, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                
                width: '44.93%',
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                textAlign: 'center'}}>
                Offline
                </Text>
                </View>

                
                <FlatList
                
                style={{
                ...Platform.select({
                                   ios: {height: screenHeight,},
                                   android: {height: screenHeight-92},
                                   }),
                top: 33.9,}}
                contentInset= {{bottom: 160}}
                vertical
                data={this.state.offlineList}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index}
                />
                
                </View>
                </SafeAreaView>
                )
    }
}

class PhoneNumberScreen extends React.Component {
    constructor(props) {
          super(props);
          
          this.state = {
          country: null,
          countryCode: 'US',
          phoneNum: '',
          callingCode: '1',
          response: [],
          };
      }

    async saveUser(user){
           try {
               await AsyncStorage.setItem('user', JSON.stringify(user[0]));
           } catch (error) {
               console.error('AsyncStorage error: ' + error.message);
           }
       }
    
    updatePhoneNumber = (response) => {
        console.log("**********: ");
        this.setState({response: response})
        this.saveUser(response)
      
        if(this.state.response[0].PHONE_NUMBER == this.state.phoneNum.replace(/[-+()\s]/g, '')){
            console.log('SUCCESS!!!')
            Alert.alert(
              'Phone Number Updated',
              '',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
        }else{
            Alert.alert(
                 'Error Updating Phone Number',
                 '',
                 [
                   {
                     text: 'Cancel',
                     onPress: () => console.log('Cancel Pressed'),
                     style: 'cancel',
                   },
                   {text: 'OK', onPress: () => console.log('OK Pressed')},
                 ],
                 {cancelable: false},
               );
        }
    }
    
    
    selectCountry(country) {
        console.log(country)
        this.setState({countryCode: country.cca2});
        this.setState({country: country});

        this.state.callingCode = country.callingCode
        console.log(this.state.callingCode[0])
    }
    
      onTextChangePhoneNum(text) {
         var cleaned = ('' + text).replace(/\D/g, '')
         var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
         
         if (match) {
             number = [ '(', match[2], ') ', match[3], '-', match[4]].join('');
             this.setState({ phoneNum: number });
             return;
         }
         
         this.setState({ phoneNum: text });
     }


        
    handlePress = () => {
        if(this.state.phoneNum.length > 9){
            console.log(this.state.phoneNum)
            AsyncStorage.getItem('access_token').then((token) => {
                                                      AsyncStorage.getItem('user').then((user) => {

            console.log(this.state.phoneNum)
            Functions.updatePhoneNumber(token, this.updatePhoneNumber, this.state.phoneNum, JSON.parse(user).ID)
                                                                                        })
            })
        }else{
            Alert.alert(
                            'Please Enter a Valid Phone Number',
                            '',
                            [
                              {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            {cancelable: false},
                          );
        }
    }
    
    render() {
        const {countryCode, country} = this.state;
        const { width } = Dimensions.get('window');
        
        const screenHeight = Dimensions.get('window').height
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 18}} activeOpacity={0}>
                <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', top: Platform.OS === 'android' ? 25+18 : 18, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                
                width: '44.93%',
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                textAlign: 'center'}}>
                Phone number
                </Text>
                </View>
                
                <View style={{flexDirection: 'row', top: 85-37.3, position: 'relative', width: width,}}>

                <View
                style={{
                boxSizing: 'border-box',
                height: 52.2,
                width: '22.45%',
                border: '0.2px solid #0DB09F',
                borderRadius: 10,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                borderColor: '#0DB09F',
                borderRadius: 16,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                left: 35.9,
                shadowOffset:{  width: 0,  height: 0,  },
                shadowColor: '#000000',
                shadowOpacity: .2,
                shadowRadius: 70,
                elevation: 5,
                backgroundColor: '#FFFFFF',
                }}>
                    <CountryPicker
                        withCallingCode
                        withEmoji={true}
                        countryCode={this.state.countryCode}
                        translation='eng'
                        withModal={true}
                        withFlagButton={true}
                        withCallingCodeButton
                        withAlphaFilter
                        withFilter
                        onSelect={(country) => this.selectCountry(country)}
                
                    />
                </View>
                
    
                
                
                <View style={{boxSizing: 'border-box',
                                 height: 52.2,
                                 width: '53.39%',
                                 border: '0.2px solid #0DB09F',
                                 borderRadius: 16,
                                 boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                                 backgroundColor: 'rgba(255,255,255,0.24)',
                                 top: 0,
                                 left: 35.9+19.8,
                                 borderColor: '#0DB09F',
                                 borderWidth: 1,
                                 paddingHorizontal: '6.27%',
                                 justifyContent: 'center',
                                 fontFamily: 'SFNSDisplay',
                                 fontSize: 10,
                                 lineHeight: 12,
                                 paddingHorizontal: 27.1,
                                 shadowOffset:{  width: 0,  height: 0,  },
                                 shadowColor: '#000000',
                                 shadowOpacity: .2,
                                 shadowRadius: 70,
                                 elevation: 5,
                                 backgroundColor: '#FFFFFF',
                                }}>
                             
                            
                            <TextInput style={{
                                backgroundColor: '#FFFFFF',
                                fontFamily: 'SFNSDisplay',
                                fontSize: 10,
                                }}
                                placeholder='Type phone number'
                                returnKeyType={'done'}
                                maxLength={15}
                                keyboardType={'phone-pad'}
                                textContentType='telephoneNumber'
                                dataDetectorTypes='phoneNumber'
                                onChangeText={(text) => this.onTextChangePhoneNum(text) }
                                value={this.state.phoneNum}
                                keyboardType={'phone-pad'}
                                />
                             </View>
                
                
                
                
                
                </View>
                    <TouchableOpacity style={{
                    height: 54,
                    width: '73.33%',
                    borderRadius: 27,
                    backgroundColor: '#0DB09F',
                    top: 360-197,
                    left: '13.33%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}
                onPress={() => {this.handlePress()}}>
                        <Text style={{
                        height: 18,
                        width: 41,
                        color: '#FFFFFF',
                        fontFamily: 'SFNSDisplay',
                        fontSize: 15,
                        lineHeight: 18,
                        textAlign: 'center'}}>
                            SAVE
                        </Text>
                    </TouchableOpacity>
                </View>
                </SafeAreaView>
                )
    }
}

class UsernameScreen extends React.Component {
    constructor(props) {
          super(props);
          
          this.state = {
          username: '',
          response: [],
          };
      }
    
    onTextChange(text) {
        this.setState({ username: text });
    }
       async saveUser(user){
              try {
                  await AsyncStorage.setItem('user', JSON.stringify(user[0]));
              } catch (error) {
                  console.error('AsyncStorage error: ' + error.message);
              }
          }
    
    updateUsername = (response) => {
           this.setState({response: response})
           console.log(this.state.response)
           this.saveUser(response)
           if(this.state.response[0].USERNAME == this.state.username){
               console.log('SUCCESS!!!')
               Alert.alert(
                 'Username Updated',
                 '',
                 [
                   {
                     text: 'Cancel',
                     onPress: () => console.log('Cancel Pressed'),
                     style: 'cancel',
                   },
                   {text: 'OK', onPress: () => console.log('OK Pressed')},
                 ],
                 {cancelable: false},
               );
           }else{
               Alert.alert(
                    'Error Updating Username',
                    '',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
           }
       }
    
    handlePress = () => {
        if(this.state.username.length > 0){
            AsyncStorage.getItem('access_token').then((token) => {
                                                      AsyncStorage.getItem('user').then((user) => {

            Functions.updateUsername(token, this.updateUsername, this.state.username, JSON.parse(user).ID)
                                                                                        })
                                                      })
        }else{
            Alert.alert(
                            'Please Enter a Valid Username',
                            '',
                            [
                              {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            {cancelable: false},
                          );
        }
    }
    
    render() {
        const { width } = Dimensions.get('window');
        
        const screenHeight = Dimensions.get('window').height
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 18}} activeOpacity={0}>
                <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', top: Platform.OS === 'android' ? 25+18 : 18, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                
                width: '44.93%',
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                textAlign: 'center'}}>
                Username
                </Text>
                </View>
                
                
                
                <View style={{
                     boxSizing: 'border-box',
                     height: 52.2,
                     width: '78.67%',
                     border: '0.2px solid #0DB09F',
                     borderRadius: 26,
                     boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                     backgroundColor: '#FFFFFF',
                     top: 85-37.3,
                     left: '10.67%',
                     borderColor: '#0DB09F',
                     borderWidth: .3,
                     justifyContent: 'center',
                     fontFamily: 'SFNSDisplay',
                     fontSize: 10,
                     lineHeight: 12,
                     paddingHorizontal: 27.1,
                     shadowOffset:{  width: 0,  height: 0,  },
                     shadowColor: '#000000',
                     shadowOpacity: .2,
                     shadowRadius: 70,
                     elevation: 5,
                     backgroundColor: '#FFFFFF',
                    }}>
                 
                
                <TextInput style={{
                    backgroundColor: '#FFFFFF',
                    fontFamily: 'SFNSDisplay',
                    fontSize: 10,
                    }}
                    placeholder='Type username'
                    returnKeyType={'done'}
                    maxLength={50}
                    keyboardType={'default'}
                    textContentType='name'
                    dataDetectorTypes='all'
                    onChangeText={(text) => this.onTextChange(text) }
                    value={this.state.username}
                    />
                 </View>
                
                
                
                <TouchableOpacity style={{
                height: 54,
                width: '73.33%',
                borderRadius: 27,
                backgroundColor: '#0DB09F',
                top: 360-197,
                left: '13.33%',
                justifyContent: 'center',
                alignItems: 'center',
                }}
                onPress={() => {this.handlePress()}}>

                <Text style={{
                height: 18,
                width: 41,
                color: '#FFFFFF',
                fontFamily: 'SFNSDisplay',
                fontSize: 15,
                lineHeight: 18,
                textAlign: 'center'}}>
                SAVE
                </Text>
                </TouchableOpacity>
                </View>
                </SafeAreaView>
                )
    }
}


class GradeScreen extends React.Component {
    constructor(props) {
             super(props);
             
             this.state = {
             grade: '',
             response: [],
             };
         }
    
       async saveUser(user){
              try {
                  await AsyncStorage.setItem('user', JSON.stringify(user[0]));
              } catch (error) {
                  console.error('AsyncStorage error: ' + error.message);
              }
          }
    
    updateGrade = (response) => {
        this.setState({response: response})
        this.saveUser(response)
            console.log(".." + this.state.response)
           if(response.affectedRows > 0){
               console.log('SUCCESS!!!')
               Alert.alert(
                 'Grade Updated',
                 '',
                 [{
                     text: 'Cancel',
                     onPress: () => console.log('Cancel Pressed'),
                     style: 'cancel',
                   },
                   {text: 'OK', onPress: () => console.log('OK Pressed')},
                 ],
                 {cancelable: false},
               );
           }else{
               Alert.alert(
                    'Error Updating Grade',
                    '',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
           }
       }
    
    handlePress = () => {
        console.log(this.state.grade.length)
        if((this.state.grade.length > 0) && (this.state.grade.length < 5)){
            
            AsyncStorage.getItem('access_token').then((token) => {
                                                      AsyncStorage.getItem('user').then((user) => {

            Functions.updateGrade(token, this.updateGrade, this.state.grade, JSON.parse(user).ID)
                                                                                        })
          })
        }else{
            Alert.alert(
                            'Please Enter a Valid Grade',
                            '',
                            [{
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            {cancelable: false},
                          );
        }
    }
    
       onTextChange(text) {
           this.setState({ grade: text });
       }

       
       render() {
        const { width } = Dimensions.get('window');
        
        const screenHeight = Dimensions.get('window').height
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 18}} activeOpacity={0}>
                <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', top: Platform.OS === 'android' ? 25+18 : 18, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                
                width: '44.93%',
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                textAlign: 'center'}}>
                Grade
                </Text>
                </View>
                
                
                
                
                <View style={{
                     boxSizing: 'border-box',
                     height: 52.2,
                     width: '78.67%',
                     border: '0.2px solid #0DB09F',
                     borderRadius: 26,
                     boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                     backgroundColor: '#FFFFFF',
                     top: 85-37.3,
                     left: '10.67%',
                     borderColor: '#0DB09F',
                     borderWidth: .3,
                     justifyContent: 'center',
                     fontFamily: 'SFNSDisplay',
                     fontSize: 10,
                     lineHeight: 12,
                     paddingHorizontal: 27.1,
                     shadowOffset:{  width: 0,  height: 0,  },
                     shadowColor: '#000000',
                     shadowOpacity: .2,
                     shadowRadius: 70,
                     elevation: 5,
                     backgroundColor: '#FFFFFF',
                    }}>
                 
                
                <TextInput style={{
                    backgroundColor: '#FFFFFF',
                    fontFamily: 'SFNSDisplay',
                    fontSize: 10,
                    }}
                    placeholder='Type grade'
                    returnKeyType={'done'}
                    maxLength={10}
                    keyboardType={'decimal-pad'}
                    textContentType='none'
                    dataDetectorTypes='all'
                    onChangeText={(text) => this.onTextChange(text) }
                    value={this.state.grade}
                    />
                 </View>
                            
                
                <TouchableOpacity style={{
                    height: 54,
                    width: '73.33%',
                    borderRadius: 27,
                    backgroundColor: '#0DB09F',
                    top: 360-197,
                    left: '13.33%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {this.handlePress()}}>

                
                <Text style={{
                    height: 18,
                    width: 41,
                    color: '#FFFFFF',
                    fontFamily: 'SFNSDisplay',
                    fontSize: 15,
                    lineHeight: 18,
                    textAlign: 'center'}}>
                        SAVE
                    </Text>
                </TouchableOpacity>
                </View>
                </SafeAreaView>
                )
    }
}

class AddPasswordScreen extends React.Component {
    constructor(props) {
           super(props);
           
           this.state = {
            response: [],
            currentPassword: '',
            newPassword: '',
           };
       }
    
    async saveUser(user){
           try {
               await AsyncStorage.setItem('user', JSON.stringify(user[0]));
           } catch (error) {
               console.error('AsyncStorage error: ' + error.message);
           }
       }
    
     updatePassword = (response) => {
         
        this.saveUser(response)
        this.setState({response: response})
             console.log(".." + this.state.response)
            if(response.affectedRows > 0){
                console.log('SUCCESS!!!')
                Alert.alert(
                  'Password Updated',
                  '',
                  [{
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  {cancelable: false},
                );
            }else{
                Alert.alert(
                     'Error Updating Password',
                     '',
                     [
                       {
                         text: 'Cancel',
                         onPress: () => console.log('Cancel Pressed'),
                         style: 'cancel',
                       },
                       {text: 'OK', onPress: () => console.log('OK Pressed')},
                     ],
                     {cancelable: false},
                   );
            }
        }
     
     handlePress = () => {
         if((this.state.currentPassword.length > 0) && (this.state.newPassword.length > 0)){
             AsyncStorage.getItem('access_token').then((token) => {
                                                       AsyncStorage.getItem('user').then((user) => {

             Functions.updatePassword(token, this.updatePassword, this.state.newPassword, JSON.parse(user).ID, this.state.currentPassword)
                                                                                         })
                                                       })
         }else{
             Alert.alert(
                             'Please Enter a Valid Password',
                             '',
                             [{
                                 text: 'Cancel',
                                 onPress: () => console.log('Cancel Pressed'),
                                 style: 'cancel',
                               },
                               {text: 'OK', onPress: () => console.log('OK Pressed')},
                             ],
                             {cancelable: false},
                           );
         }
     }
    
    onTextChangeCurrentPassword(text) {
        this.setState({ currentPassword: text });
    }

    onTextChangeNewPassword(text) {
        this.setState({ newPassword: text });
    }

    render() {
        const { width } = Dimensions.get('window');
        
        const screenHeight = Dimensions.get('window').height
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 18}} activeOpacity={0}>
                <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', top: Platform.OS === 'android' ? 25+18 : 18, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                
                width: '44.93%',
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                textAlign: 'center'}}>
                Password
                </Text>
                </View>
                
                
                <View style={{flexDirection: 'column', top: 85-37.3}}>
                <TextInput style={{
                boxSizing: 'border-box',
                height: 52.2,
                width: '78.67%',
                border: '0.2px solid #0DB09F',
                borderRadius: 26,
                backgroundCcolor: '#FFFFFF',
                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                borderColor: '#0DB09F',
                borderWidth: .3,
                left: 39.9,
                fontFamily: 'SFNSDisplay',
                fontSize: 10,
                lineHeight: 12,
                fontFamily: 'SFNSDisplay',
                fontSize: 10,
                lineHeight: 12,
                paddingHorizontal: 27.1,
                shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000', shadowOpacity: .2, shadowRadius: 200, elevation: 5, backgroundColor: '#FFFFFF',
                }}
                onChangeText={(text) => this.onTextChangeCurrentPassword(text) }
                               value={this.state.currentPassword}
            
                placeholder='Type current password'/>
           
                <TextInput style={{
                boxSizing: 'border-box',
                height: 52.2,
                width: '78.67%',
                border: '0.2px solid #0DB09F',
                borderRadius: 26,
                backgroundCcolor: '#FFFFFF',
                boxShadow: '0 16px 24px 0 rgba(0,0,0,0.02)',
                borderColor: '#0DB09F',
                borderWidth: .3,
                left: 39.9,
                top: 18,
                fontFamily: 'SFNSDisplay',
                fontSize: 10,
                lineHeight: 12,
                paddingHorizontal: 27.1,
                shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000', shadowOpacity: .2, shadowRadius: 200, elevation: 5, backgroundColor: '#FFFFFF',
                }}
                onChangeText={(text) => this.onTextChangeNewPassword(text) }
                value={this.state.newPassword}
                placeholder='Type new password'/>
                </View>
                
                
                
                
                <TouchableOpacity style={{
                height: 54,
                width: '73.33%',
                borderRadius: 27,
                backgroundColor: '#0DB09F',
                top: 360-197,
                left: '13.33%',
                justifyContent: 'center',
                alignItems: 'center',
                }}
                onPress={() => {this.handlePress()}}>
                
                <Text style={{
                height: 18,
                width: 41,
                color: '#FFFFFF',
                fontFamily: 'SFNSDisplay',
                fontSize: 15,
                lineHeight: 18,
                textAlign: 'center'}}>
                SAVE
                </Text>
                </TouchableOpacity>
                </View>
                </SafeAreaView>
                )
    }
}

class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
        notifications: [],
        };
    }
    
    updateNotifications = (notifications) => {
        this.setState({notifications: notifications})
        console.log(this.state.notifications)
    }
    
    componentDidMount(){
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
            AsyncStorage.getItem('access_token').then((token) => {
                                                      AsyncStorage.getItem('user').then((user) => {

            Functions.fetchNotifications(token, this.updateNotifications, JSON.parse(user).ID)
                                                                                        })
                                                                            })
        });
    }

    renderItem = ({item}) => (
                              
                              
                              <View
                              style={{
                              boxSizing: 'border-box',
                              height: 97.2,
                              width: '86.67%',
                              left: '6.64%',
                              top: 0,
                              flex: 1,
                              border: '0.2px solid #0DB09F',
                              backgroundColor: '#FFFFFF',
                              borderColor: '#0DB09F',
                              marginVertical: 8,
                              borderWidth: .3,
                              borderRadius: 10,
                              boxShadow: '0 20px 36px 0 rgba(0,0,0,0.05)', backgroundColor: '#FFFFFF',}}>
                              
                              <View style={{flexDirection: 'row', position: 'relative',}}>
                              <Image style={{
                              height: 68,
                              width: 68,
                              position: 'relative',
                              borderRadius: 5,
                              left: 20.1,
                              top: 15.1
                              }} source={{uri: item.IMAGE}}/>
                              
                              
                              <View style={{flexDirection: 'column', position: 'relative', width: 216, left: 20.1+14, height: 97.2}}>
                              
                              <Text style={{
                              height: 9,
                              width: 69,
                              color: '#A9ABB8',
                              fontFamily: 'SFNSDisplay',
                              fontSize: 8,
                              lineHeight: 10,
                              top: 17.1,
                              }}>
                              {Moment(item.DATE).format('MMMM DD, YYYY')}
                              </Text>
                              
                              <Text style={{
                              height: 16,
                              width: 219,
                              color: '#1A1C36',
                              fontFamily: 'SFNSDisplay-Bold',
                              fontSize: 12,
                              lineHeight: 15,
                              top: 17.1+8,
                              }}>
                              {item.NAME}
                              </Text>
                              
                              <Text style={{
                                height: 36,
                                width: 196,
                                color: '#A9ABB8',
                                fontFamily: 'SFNSDisplay',
                                fontSize: 9,
                                lineHeight: 13,
                                top: 17.1+8+5,
                              }}>
                              {item.DESCRIPTION}
                              </Text>
                              
                              
                              </View>
                              </View>
                              
                              
                              </View>
                              
                              );
    
    data=[{
          imageUrl: require('../assets/images/notification1.png'),
          date: 'October 03, 2019',
          title: 'Keytar McSweeney\'s Williamsburg',
          subTitle: 'Synth polaroid bitters chillwave pickled. Vegan disrupt tousled',
          },
          {
          imageUrl: require('../assets/images/notification2.png'),
          date: 'September 23, 2019',
          title: 'Tousled food truck polaroid',
          subTitle: 'Keytar McSweeney\'s Williamsburg, ready made leggings try-hard.',
          },
          {
          imageUrl: require('../assets/images/notification3.png'),
          date: 'September 23, 2019',
          title: 'It was a humorously perilo.',
          subTitle: 'Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gas.',
          }]
    
    
    render() {
        const { width } = Dimensions.get('window');
        const screenHeight = Dimensions.get('window').height
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0, shadowOffset:{  width: 0,  height: 0,  }, shadowColor: '#000000',  shadowOpacity: .06, shadowRadius: 70, elevation: 5, }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 18}} activeOpacity={0}>
                <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', top: Platform.OS === 'android' ? 25+18 : 18, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                
                width: '44.93%',
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                textAlign: 'center'}}>
                Notifications
                </Text>
                </View>
                
                <FlatList
                
                style={{
                ...Platform.select({
                                   ios: {height: screenHeight,},
                                   android: {height: screenHeight-92},
                                   }),
                top: 33.9,}}
                 contentInset= {{bottom: 30}}
                vertical
                data={this.state.notifications}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index}
                />
                
                </View>
                </SafeAreaView>
                )
    }
}

class ReadOfflineScreen extends React.Component {
    render() {
        const { width } = Dimensions.get('window');
        const screenHeight = Dimensions.get('window').height
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 18}} activeOpacity={0}>
                <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', top: Platform.OS === 'android' ? 25+18 : 18, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                
                width: '44.93%',
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                textAlign: 'center'}}>
                Read offline
                </Text>
                </View>
                </View>
                </SafeAreaView>
                )
    }
}


class LanguageScreen extends React.Component {
    render() {
        const { width } = Dimensions.get('window');
        const screenHeight = Dimensions.get('window').height
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 18}} activeOpacity={0}>
                <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', top: Platform.OS === 'android' ? 25+18 : 18, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                
                width: '44.93%',
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                textAlign: 'center'}}>
                Language
                </Text>
                </View>
                </View>
                </SafeAreaView>
                )
    }
}

class PrivacyPolicyScreen extends React.Component {
    render() {
        const { width } = Dimensions.get('window');
        const screenHeight = Dimensions.get('window').height
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 18}} activeOpacity={0}>
                <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', top: Platform.OS === 'android' ? 25+18 : 18, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                
                width: '44.93%',
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                textAlign: 'center'}}>
                Privacy Policy
                </Text>
                </View>
                </View>
                </SafeAreaView>
                )
    }
}

class FAQScreen extends React.Component {
    render() {
        const { width } = Dimensions.get('window');
        const screenHeight = Dimensions.get('window').height
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 18}} activeOpacity={0}>
                <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', top: Platform.OS === 'android' ? 25+18 : 18, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                
                width: '44.93%',
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                textAlign: 'center'}}>
                FAQs
                </Text>
                </View>
                </View>
                </SafeAreaView>
                )
    }
}

class TermsAndConditionsScreen extends React.Component {
    render() {
        const { width } = Dimensions.get('window');
        const screenHeight = Dimensions.get('window').height
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 18}} activeOpacity={0}>
                <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', top: Platform.OS === 'android' ? 25+18 : 18, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                
                width: '66.93%',
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                textAlign: 'center'}}>
                Terms and Conditions
                </Text>
                </View>
                </View>
                </SafeAreaView>
                )
    }
}

class AboutScreen extends React.Component {
    render() {
        const { width } = Dimensions.get('window');
        const screenHeight = Dimensions.get('window').height
        return (
                <SafeAreaView>
                <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{height: 20, width: 20, borderRadius: 4.29, position: 'relative', left: 25, zIndex:1, top: 18}} activeOpacity={0}>
                <Image style={{height: 14, width: '38.93%', position: 'relative', top: 3.33, left: '6.67%', zIndex: 0}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', top: Platform.OS === 'android' ? 25+18 : 18, position: 'absolute', width: width, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                
                width: '44.93%',
                color: '#1A1C36',
                fontFamily: 'SFNSDisplay-Bold',
                fontSize: 16,
                lineHeight: 18,
                textAlign: 'center'}}>
                About
                </Text>
                </View>
                </View>
                </SafeAreaView>
                )
    }
}

class LogOutScreen extends React.Component {
    render() {
        const { width } = Dimensions.get('window');
        const screenHeight = Dimensions.get('window').height
        return (<Text>aa</Text>);
    }
}
ProfileScreen.navigationOptions = {
title: '',
header: null,
};

ViewProfileScreen.navigationOptions = {
title: '',
header: null,
};

CompletedTopicListScreen.navigationOptions = {
title: '',
header: null,
};

MyPrizesScreen.navigationOptions = {
title: '',
header: null,
};

OfflineScreen.navigationOptions = {
title: '',
header: null,
};

PhoneNumberScreen.navigationOptions = {
title: '',
header: null,
};

UsernameScreen.navigationOptions = {
title: '',
header: null,
};

GradeScreen.navigationOptions = {
title: '',
header: null,
};

AddPasswordScreen.navigationOptions = {
title: '',
header: null,
};

NotificationScreen.navigationOptions = {
title: '',
header: null,
};

ReadOfflineScreen.navigationOptions = {
title: '',
header: null,
};

LanguageScreen.navigationOptions = {
title: '',
header: null,
};

TermsAndConditionsScreen.navigationOptions = {
title: '',
header: null,
};

PrivacyPolicyScreen.navigationOptions = {
title: '',
header: null,
};

FAQScreen.navigationOptions = {
title: '',
header: null,
};

AboutScreen.navigationOptions = {
title: '',
header: null,
};

LogOutScreen.navigationOptions = {
title: '',
header: null,
};

const RootStack = createStackNavigator(
                                       {
                                       Profile: ProfileScreen,
                                       ViewProfile: ViewProfileScreen,
                                       CompletedTopicList: CompletedTopicListScreen,
                                       MyPrizes: MyPrizesScreen,
                                       Offline: OfflineScreen,
                                       PhoneNumber: PhoneNumberScreen,
                                       Username: UsernameScreen,
                                       Grade: GradeScreen,
                                       AddPassword: AddPasswordScreen,
                                       Notifications: NotificationScreen,
                                       ReadOffline: ReadOfflineScreen,
                                       Language: LanguageScreen,
                                       PrivacyPolicy: PrivacyPolicyScreen,
                                       FAQs: FAQScreen,
                                       About: AboutScreen,
                                       LogOut: LogOutScreen,
                                       TermsAndConditions: TermsAndConditionsScreen,
                                       },
                                       {
                                       initialRouteName: 'Profile',
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
                                 
                                 /*backgroundColor: '#fff',*/
                                 backgroundColor: '#fff',
                                 },
                                 container2: {
                                 
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
                                 profile: {
                                     height: 28,
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

