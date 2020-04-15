import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {View, Image} from 'react-native';
import Colors from '../constants/Colors';


const iconMapOn = {
  home: require('../assets/Icons/homeIconOn.png'),
  analytics: require('../assets/Icons/analyticsIconOn.png'),
  leaderboard: require('../assets/Icons/leaderboardIconOn.png'),
  profile: require('../assets/Icons/profileIconOn.png'),
};


const iconMapOff = {
  home: require('../assets/Icons/homeIconOff.png'),
  analytics: require('../assets/Icons/analyticsIconOff.png'),
  leaderboard: require('../assets/Icons/leaderboardIconOff.png'),
  profile: require('../assets/Icons/profileIconOff.png'),
};




export default function TabBarIcon(props) {
    var image = ""
    
    renderIconColor = () => {
        if(props.focused){
            return(
            <View style={{
                     width: 24,
                     height: 24,
                     justifyContent: 'center',
                     alignItems: 'center'
                   }}>
                   <Image source={iconMapOn[props.name]} style={{
                         width: 18,
                         height: 18,
                         boxShadow: '0 8px 16px 0 rgba(13,176,159,0.2)',
                         shadowOffset:{  width: 0,  height: 0,  },
                         shadowColor: '#0DB09F',
                         shadowOpacity: .2,
                         shadowRadius: 80,
                         elevation: 5
                  }}/>
            </View>
            )
        }else{
            return(
            <View style={{
                             width: 24,
                             height: 24,
                             justifyContent: 'center',
                             alignItems: 'center'
                   }}>
                  <Image source={iconMapOff[props.name]} style={{
                         width: 18,
                         height: 18,
                  }}/>
            </View>
          )
        }
    }
    
  return (
  
        renderIconColor()
    
  );
}

