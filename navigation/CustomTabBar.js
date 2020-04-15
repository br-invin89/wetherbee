import React, { PureComponent } from 'react';
import {
  Animated, SafeAreaView, View, ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { merge } from 'lodash';

import {
  TabIcon, Container, Button, MenuItem, MenuIcons,
} from '..';
import { Menu } from '../../shapes';
import { text } from '../../content';
import { types } from '../../constants';
import { screenHelper, deviceHelper } from '../../helpers';
import actions from '../../modules/settings/settings_actions';

import styles from './styles';

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

class BottomTabBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bottomSheetAnimation: new Animated.Value(),
      bottomItemsAnimation: new Animated.Value(0),
      isMenuToggled: true,
      isMenuToggledOnMount: false,
      menuMinHeight: screenHelper.renderStyle(
        deviceHelper.isIphoneX() ? '$unitSeven' : '$unitFour',
      ),
      menuMaxHeight: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.getMenu());
    // This is to preload the layout to be used for the height of the bottom sheet
    setTimeout(() => {
      this.setState({ isMenuToggled: false, isMenuToggledOnMount: true });
    }, 100);
  }

  setMenuMaxHeight = event => (
    this.setState({ menuMaxHeight: event.nativeEvent.layout.height })
  );

  animateItem = (animation, finalValue, params = {}) => {
    const animationConfig = {
      toValue: finalValue,
      duration: 200,
      velocity: 6,
      tension: 20,
      friction: 8,
    };

    return (
      Animated.spring(
        animation,
        merge(animationConfig, params),
      ).start()
    );
  }

  handleTabIconOnPress = (route = null, navigate = null) => {
    const {
      bottomSheetAnimation, isMenuToggled, menuMinHeight, menuMaxHeight,
    } = this.state;
    const initialValue = isMenuToggled ? menuMaxHeight + menuMinHeight : menuMinHeight;
    const finalValue = isMenuToggled ? menuMinHeight : menuMaxHeight + menuMinHeight;

    bottomSheetAnimation.setValue(initialValue);

    if (route && (!route.params || !route.params.navigationDisabled)) {
      if (isMenuToggled) {
        this.setState({ isMenuToggled: false });
        this.animateItem(bottomSheetAnimation, finalValue);
      }
      navigate(route.key);
    } else {
      this.setState({ isMenuToggled: !isMenuToggled });
      this.animateItem(bottomSheetAnimation, finalValue);
    }
  }

  renderBottomTabBar = () => {
    const { bottomSheetAnimation } = this.state;
    const { style } = this.props;

    return (
      <AnimatedSafeAreaView
        style={[
          styles.background,
          { height: bottomSheetAnimation },
          style,
        ]}
        forceInset={{
          top: 'never',
          bottom: 'always',
        }}
      >
        <View style={styles.tabBar} />
      </AnimatedSafeAreaView>
    );
  }

  renderBottomMenuSheet = () => {
    const { isMenuToggledOnMount, bottomItemsAnimation } = this.state;
    const { menu, navigation } = this.props;
    const opacityInterpolate = bottomItemsAnimation.interpolate({
      inputRange: [0, 0.1, 1],
      outputRange: [0, 1, 1],
    });
    const translateYInterpolate = bottomItemsAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0],
    });

    this.animateItem(
      bottomItemsAnimation,
      isMenuToggledOnMount ? 1 : 0,
      { useNativeDriver: true },
    );

    return (
      <Animated.View
        style={[
          styles.bottomMenuSheet,
          {
            opacity: isMenuToggledOnMount ? opacityInterpolate : 0,
            transform: [{ translateY: translateYInterpolate }],
          },
        ]}
        onLayout={event => this.setMenuMaxHeight(event)}
      >
        {menu && menu.map(item => (
          <MenuItem
            key={item.id}
            title={item.title}
            onPress={() => {
              navigation.navigate(item.action);
              this.handleTabIconOnPress();
            }}
          >
            {MenuIcons[item.icon]}
          </MenuItem>
        ))}
        <View style={styles.menuSeparator} />
        <Button
          text={text.text_book_appraisal}
          onPress={() => {}}
          type={types.button.DEFAULT}
          buttonStyle={styles.buttonBookAppraisal}
        />
        <View style={styles.menuSeparator} />
      </Animated.View>
    );
  }

  renderTabIcons = () => {
    const {
      navigation,
      activeTintColor,
      inactiveTintColor,
      renderIcon,
      jumpTo,
    } = this.props;
    const { index, routes } = navigation.state;
    const { isMenuToggled, isMenuToggledOnMount } = this.state;

    return (
      <View
        pointerEvents="box-none"
        style={styles.content}
      >
        {
          routes.map((route, idx) => {
            const focused = index === idx;
            return (
              <TabIcon
                key={route.key}
                route={route}
                renderIcon={renderIcon}
                focused={focused}
                activeTintColor={activeTintColor}
                inactiveTintColor={inactiveTintColor}
                onPress={() => this.handleTabIconOnPress(route, jumpTo)}
                menuToggled={isMenuToggled && isMenuToggledOnMount}
              />
            );
          })
        }
      </View>
    );
  }

  render() {
    const { isMenuToggled } = this.state;
    return (
      <Container
        style={styles.container}
        pointerEvents="box-none"
        forceInset={{
          top: 'never',
          bottom: 'always',
        }}
      >
        {this.renderBottomTabBar()}
        {isMenuToggled && this.renderBottomMenuSheet()}
        {this.renderTabIcons()}
      </Container>
    );
  }
}

BottomTabBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  menu: PropTypes.arrayOf(Menu).isRequired,
  style: ViewPropTypes.style,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  renderIcon: PropTypes.func.isRequired,
  jumpTo: PropTypes.func.isRequired,
  activeTintColor: PropTypes.string,
  inactiveTintColor: PropTypes.string,
};

BottomTabBar.defaultProps = {
  style: {},
  activeTintColor: () => EStyleSheet.value('$green_1'),
  inactiveTintColor: () => EStyleSheet.value('$grey_6'),
};

const mapStateToProps = ({ settings }) => ({
  menu: settings.menu,
});

export default connect(mapStateToProps)(BottomTabBar);
