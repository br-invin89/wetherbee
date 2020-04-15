import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from 'react-native-elements';
import VideoPlayer from 'react-native-video-player';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { withNavigation } from 'react-navigation';




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
    Button
} from 'react-native';

export default function SearchScreen() {

  return (
          <View style={{flex: 1,}}>
          <Text style={{height: '4.22%', width: '13.6%', color: '#1A1C36', fontFamily: 'SFNSDisplay-Bold', fontSize: 16, position: 'absolute', lineHeight: 18, textAlign: 'center', top: '2.22%', left: '43.2%'}}>
              Search
          </Text>
          
          
          <Image style={{height: 14, width: 7, position: 'absolute', top: '2.39%', left: '7.97%', zIndex: 1}} source={require('../assets/Icons/keyboard_arrow_left.png')}/>
          
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={{height: 20, width: 20, borderRadius: 4.29, backgroundColor: '#F2F2F2', position: 'absolute', top: '2.09%', left: '6.67%', zIndex:0}} activeOpacity={0.5}>
          </TouchableOpacity>
          </View>
          
          )
}

SearchScreen.navigationOptions = {
  title: '',
    header: null,
};
