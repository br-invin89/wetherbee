import React, {Component} from 'react';
import {
     Image,
     TouchableOpacity,
     View
} from 'react-native';

class IconTab extends Component {
    render() {
        let icon = require('../assets/Icons/homeIconOn.png');
        const {press, focused, index} = this.props;
        if (index === 0) {
           icon = require('../assets/Icons/homeIconOn.png');
        } else if (index === 1) {
           icon = require('../assets/Icons/homeIconOn.png');
        } else if (index === 2) {
           icon = require('../assets/Icons/homeIconOn.png');
        } else if (index === 3) {
          icon = require('../assets/Icons/homeIconOn.png');
        } else {
          icon = require ('../assets/Icons/homeIconOn.png');
        }
        return (
            <TouchableOpacity onPress={press}>
                <Image source={icon} resizeMode={'contain'}/>
            </TouchableOpacity>
        );
     }
  }
 export default IconTab;
