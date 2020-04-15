import React from "react";
import {
  Platform,
  ImageBackground,
  View,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import { BottomTabBar } from "react-navigation-tabs";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import SubjectsScreen from "../screens/SubjectsScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import FlashcardScreen from "../screens/FlashcardScreen";
import MultiBar from "react-native-multibar";
import TabBar from "../components/TabBar";
import SubjectIcon from "../components/SubjectIcon";
import Constants from "expo-constants";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {},
});

const getDeviceModel = () =>
  Platform.select({
    ios: Constants.platform.ios.model,
    android: Constants.deviceName,
  });

console.log("+" + Constants.platform.ios.model + "+");
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"home"} />,
};

HomeStack.path = "";

const AnalyticsStack = createStackNavigator(
  {
    Analytics: AnalyticsScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
  config
);

AnalyticsStack.navigationOptions = {
  header: null,
  tabBarLabel: "Analytics",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"analytics"} />
  ),
};

AnalyticsStack.path = "";

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
  config
);

SearchStack.navigationOptions = {
  tabBarLabel: "Search",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  ),
};

SearchStack.path = "";

const SubjectsStack = createStackNavigator(
  {
    Subjects: SubjectsScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
      tabBarLabel: "",
    },
  },
  config
);

SubjectsStack.navigationOptions = {
  tabBarLabel: " ",
  tabBarIcon: ({ focused }) => (
    <SubjectIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  ),
};

SubjectsStack.path = "";

SubjectsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let tabBarLabel = " ";
  let tabBarIcon = ({ focused }) => (
    <SubjectIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  );
  if (
    navigation.state.routes[0].routes[
      navigation.state.routes[0].routes.length - 1
    ].routeName == "Flashcard" ||
    navigation.state.routes[0].routes[
      navigation.state.routes[0].routes.length - 1
    ].routeName == "TestResults"
  ) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel,
    tabBarIcon,
  };
};

const LeaderboardStack = createStackNavigator(
  {
    Leaderboard: LeaderboardScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
  config
);

LeaderboardStack.navigationOptions = {
  tabBarLabel: "Leaderboard",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"leaderboard"} />
  ),
};

LeaderboardStack.path = "";

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"profile"} />
  ),
};

ProfileStack.path = "";

const TabBarComponent = (props) => <BottomTabBar {...props} />;
const { width } = Dimensions.get("window");

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    AnalyticsStack,
    SubjectsStack,
		/*
			:{
				Subjects: { screen: SubjectsScreen, navigationOptions:()=>{
					return {
						tabBarVisible:false,
					};
				}},
				Flashcard: { screen: FlashcardScreen, navigationOptions:()=>{
					return {
						tabBarVisible:false,
					};
				}},
			},
		*/ 
		LeaderboardStack,
    ProfileStack,
  },
  {
    tabBarComponent: (props) => {
      return (
        <React.Fragment>
          <SafeAreaView
            pointerEvents="box-none"
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              justifyContent: "flex-end",
              minHeight: 160,
            }}
            forceInset={{
              top: "never",
              bottom: "always",
            }}
          >
            <SafeAreaView
              style={{
                position: "absolute",
                width: "100%",
                backgroundColor:
                  Constants.platform.ios.model === "iPhone X" ||
                  Constants.platform.ios.model === "iPhone Xr" ||
                  Constants.platform.ios.model === "iPhone Xs" ||
                  Constants.platform.ios.model === "iPhone Xs Max" ||
                  Constants.platform.ios.model === "iPhone 11" ||
                  Constants.platform.ios.model === "iPhone 11 Pro" ||
                  Constants.platform.ios.model === "iPhone 11 Pro Max"
                    ? "#FFFFFF"
                    : "transparent",
              }}
              forceInset={{
                top: "never",
                bottom: "always",
              }}
            >
              <View style={{ height: 49 }} />
            </SafeAreaView>
            <View
              style={{
                flexDirection: "row",
                bottom: 0,
                width: "100%",
                height: 58,
              }}
            >
              <View
                style={{
                  width: (width - 376) / 2,
                  height: 58,
                  left: 0,
                  bottom: 0,
                  backgroundColor: "#FFFFFF",
                }}
              />
              <Image
                style={{
                  bottom: 0,
                  width: 376,
                  height: 58,
                  alignSelf: "center",
                }}
                source={require("../assets/images/tabBar.png")}
              />
              <View
                style={{
                  width: (width - 376) / 2,
                  height: 58,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "#FFFFFF",
                }}
              />
            </View>
            <TabBarComponent {...props} />
          </SafeAreaView>
        </React.Fragment>
      );
    } /*(
      <TabBarComponent {...props} style={{
             backgroundColor: 'transparent',
             position: 'absolute',
             left: 0,
             bottom: 0,
             right: 0,
             borderTopWidth: 0}}/>
    ),*/,
    tabBarOptions: {
      showLabel: true,
      activeTintColor: "#1C202E",
      inactiveTintColor: "#586589",
      style: {
        backgroundColor: "transparent",
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        borderTopWidth: 0,
      },
      tabStyle: {},
    },
  }
);

tabNavigator.path = "";

export default tabNavigator;
