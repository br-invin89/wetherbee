import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {View, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';



export default function SubjectIcon(props) {
    var image = ""
    
    renderIconColor = () => {
        return(
               <View style={{
                                height: 52,
                                width: 52,
                                borderRadius: 52/2,
                                top: -22-11,
                                alignSelf: 'center',
                                position: 'absolute',
                            }}>
               <View style={{
                   height: 52,
                   width: 52,
                   borderRadius: 52/2,
                   backgroundColor: '#0DB09F',
                   top: 0,
                   alignSelf: 'center',
                   position: 'absolute',
                   boxShadow: '0 8px 16px 0 rgba(13,176,159,0.2)',
                   shadowOffset:{  width: 0,  height: 0,  },
                   shadowColor: '#0DB09F',
                   shadowOpacity: .2,
                   shadowRadius: 80,
                   elevation: 5,
                   justifyContent: 'center',
                   alignItems: 'center',
                   left: 2
               }}>
               <Image style={{ height: 16, width: 20, }} source={require('../assets/Icons/subjectIcon.png')} />
               </View>
               </View>
               )
    }
    
  return (
  
        renderIconColor()
    
  );
}

