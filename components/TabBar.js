/*import React, { Component } from 'react';
import { View, Platform, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import {SafeAreaView} from 'react-navigation';
import IconTab from "./IconTab";

class TabBar extends Component {
  render() {
    const {
      navigation,
      jumpToIndex,
    } = this.props;
    const {
      routes
    } = navigation.state;
    return (
     
        <SafeAreaView style={{zIndex: 10}} forceInset={{ top: 'never',
        bottom: 'always' }}>
            <ImageBackground
                     style={{bottom: 34, position: 'absolute',
                     width: 376,
                     height: 44,
                     alignSelf: 'center',

                     }}
                                source={require('../assets/images/tabBar.png')}
                                 
                                >
          <View style={styles.tabbarcontainer}>
              
            <View style={styles.tabbar}>
          
              {routes && routes.map((route, index) => {
                const focused = index === navigation.state.index;
                const tabKey = route.key;
                return <View key={route.key} style={{ alignItems: 'center' }}>
                  <IconTab
                    press={() => jumpToIndex(index)}
                    key={route.key}
                    index={index}
                    focused={focused}
                  />
                  {focused && <Image source= {require('../assets/Icons/homeIconOn.png')}
                                     style={{ position: 'absolute', top: 38 }} />}
                </View>;
              })}
            </View>
          </View>
            </ImageBackground>

      </SafeAreaView>
       );
    }
}

const styles = StyleSheet.create({
  tabbarcontainer: {
    height: 44,
    backgroundColor: 'transparent',
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: 44,
    alignSelf: 'center',

    
  },
  tabbar: {
    margin: 5,
    height: 34,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    borderTopColor: 'transparent',
  },

});

export default TabBar;
*/
