import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import * as WebBrowser from "expo-web-browser";
import { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card } from "react-native-elements";
import VideoPlayer from "react-native-video-player";
import { createStackNavigator } from "react-navigation-stack";
import { withNavigation } from "react-navigation";
import { Searchbar } from "react-native-paper";
import { Video } from "expo-av";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { TextInput } from "react-native";
import CountryPicker, {
  getAllCountries,
  getCallingCode,
} from "react-native-country-picker-modal";
import Modal from "react-native-modal";
import SwitchToggle from "@dooboo-ui/native-switch-toggle";
import ToggleSwitch from "toggle-switch-react-native";
import { LinearGradient } from "expo-linear-gradient";
import AuthStacks from "./AuthStack";
import Functions from "../functions";
import NavigationService from "../navigationService";

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
  AsyncStorage,
} from "react-native";

class GetStartedScreen extends React.Component {
  render() {
    const { width } = Dimensions.get("window");
    const height = Dimensions.get("window").height;
    return (
      <ImageBackground
        source={require("../assets/images/getStarted.png")}
        style={{
          height: height,
          width: width,
          resizeMode: "center",
          overflow: "hidden",
          flex: 1,
        }}
      >
        <View
          style={{
            width: "100%",
            top: height * 0.7291,
            flexDirection: "column",
            position: "absolute",
          }}
        >
          <TouchableOpacity
            style={{
              height: 54,
              width: "76%",
              borderRadius: 27,
              backgroundColor: "#FFFFFF",
              top: 0,
              left: "12%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text
              style={{
                height: 18,
                color: "#0DB09F",
                fontFamily: "SFNSDisplay-Bold",
                fontSize: 15,
                lineHeight: 18,
                textAlign: "center",
              }}
            >
              SIGN UP
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              boxSizing: "border-box",
              height: 49,
              width: "76%",
              border: "1px solid #FFFFFF",
              borderRadius: 24,
              width: "76%",
              top: 22,
              left: "12%",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#FFFFFF",
            }}
            onPress={() => this.props.navigation.navigate("LogIn")}
          >
            <Text
              style={{
                height: 16,
                color: "#FFFFFF",
                fontFamily: "SFNSDisplay-Bold",
                fontSize: 14,
                lineHeight: 17,
                textAlign: "center",
              }}
            >
              LOG IN TO YOUR ACCOUNT
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

class LogInScreen extends React.Component {
  state = { phoneNum: "", password: "", visible: false, forgotPassword: "" };

  renderModal() {
    this.setState({ visible: true });
  }

  onTextChangePhoneNum(text) {
    var cleaned = ("" + text).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      var intlCode = match[1] ? "+1 " : "",
        number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
          ""
        );
      this.setState({ phoneNum: number });
      return;
    }

    this.setState({ phoneNum: text });
  }

  onTextChangePassword(text) {
    this.setState({ password: text });
  }
  onTextChangeForgotPassword(text) {
    this.setState({ forgotPassword: text });
  }

  render() {
    const { width } = Dimensions.get("window");
    const height = Dimensions.get("window").height;
    return (
      <ImageBackground
        source={require("../assets/images/LogInBG.png")}
        style={{
          height: height,
          width: width,
          resizeMode: "center",
          overflow: "hidden",
          flex: 1,
        }}
      >
        <SafeAreaView>
          <View style={{ paddingTop: Platform.OS === "android" ? 25 : 0 }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                top: height * 0.038,
              }}
            >
              <Image
                source={require("../assets/images/wetherbees_unofficial_logo.png")}
                style={{
                  width: "33.5%",
                  height: height * 0.0656,
                }}
              />
            </View>

            <Text
              style={{
                height: 42,
                color: "#FFFFFF",
                fontFamily: "SFNSDisplay-Bold",
                fontSize: 24,
                lineHeight: 42,
                top: height * 0.2426,
                left: "10.67%",
                position: "absolute",
              }}
            >
              Welcome Back
            </Text>

            <Text
              style={{
                height: 17,
                opacity: 0.8,
                color: "#FFFFFF",
                fontFamily: "Helvetica",
                fontSize: 12,
                lineHeight: 16,
                left: "11.47%",
                top: height * 0.298,
                position: "absolute",
              }}
            >
              Log in to your account
            </Text>

            <View
              style={{
                width: "100%",
                top: height * 0.3805,
                flexDirection: "column",
                position: "absolute",
              }}
            >
              <View
                style={{
                  boxSizing: "border-box",
                  height: 49,
                  width: "78.67%",
                  border: "1px solid rgba(255,255,255,0.24)",
                  borderRadius: 24,
                  backgroundColor: "rgba(255,255,255,0.24)",
                  top: /*height * .3805*/ 0,
                  left: "10.67%",
                  borderColor: "rgba(255,255,255,0.24)",
                  borderWidth: 1,
                  paddingHorizontal: "6.27%",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  style={{
                    color: "#FFFFFF",
                  }}
                  placeholderTextColor="#FFFFFF"
                  placeholder="Phone number"
                  textContentType="telephoneNumber"
                  keyboardType={"phone-pad"}
                  maxLength={15}
                  returnKeyType={"done"}
                  dataDetectorTypes="phoneNumber"
                  onChangeText={(text) => this.onTextChangePhoneNum(text)}
                  value={this.state.phoneNum}
                />
              </View>

              <View
                style={{
                  boxSizing: "border-box",
                  height: 49,
                  width: "78.67%",
                  border: "1px solid rgba(255,255,255,0.24)",
                  borderRadius: 24,
                  backgroundColor: "rgba(255,255,255,0.24)",
                  top: 17.5 /*height * .4618*/,
                  left: "10.67%",
                  borderColor: "rgba(255,255,255,0.24)",
                  borderWidth: 1,
                  paddingHorizontal: "6.27%",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  style={{
                    color: "#FFFFFF",
                  }}
                  placeholderTextColor="#FFFFFF"
                  placeholder="Password"
                  textContentType="password"
                  keyboardType={"default"}
                  maxLength={35}
                  returnKeyType={"done"}
                  onChangeText={(text) => this.onTextChangePassword(text)}
                  value={this.state.password}
                />
              </View>

              <Text
                style={{
                  height: 14,
                  opacity: 0.8,
                  color: "#FFFFFF",
                  fontFamily: "SFNSDisplay",
                  fontSize: 12,
                  lineHeight: 15,
                  top: 17.5 + height * 0.0265 /*height * .548*/,

                  left: "12%",
                  textDecorationLine: "underline",
                }}
                onPress={() => {
                  this.renderModal();
                }}
              >
                Forgot password?
              </Text>

              <Modal
                onBackdropPress={() => this.setState({ visible: false })}
                isVisible={this.state.visible}
                backdropColor="#000000"
                backdropOpacity={0.5}
                animationIn="slideInDown"
                animationOut="slideOutUp"
                style={{ marginVertical: 0, marginHorizontal: 0 }}
              >
                <View
                  style={{
                    boxSizing: "border-box",
                    height: height * 0.5172,
                    width: "87.2%",
                    border: "0.2px solid #0DB09F",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 16px 24px 0 rgba(0,0,0,0.05)",
                    top: height * 0.2414,
                    position: "absolute",
                    borderRadius: 15,
                    left: "6.4%",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 24,
                      width: 24,
                      right: "4.53%",
                      position: "absolute",
                      justifyContent: "center",
                      alignItems: "center",
                      top: height * 0.0222,
                    }}
                    onPress={() => {
                      this.setState({ visible: false });
                    }}
                  >
                    <Image
                      style={{ height: 13.19, width: 13.19 }}
                      source={require("../assets/Icons/cancel.png")}
                    />
                  </TouchableOpacity>

                  <Image
                    source={require("../assets/images/forgotPassword.png")}
                    style={{
                      width: "25.6%",
                      height: height * 0.1182,
                      top: height * 0.0579,
                      right: width * 0.304,
                      position: "absolute",
                    }}
                  />

                  <View
                    style={{
                      flexDirection: "column",
                      top: height * 0.2094,
                      width: "100%",
                      flex: 1,
                      position: "absolute",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        height: height * 0.0517,
                        color: "#1A1C36",
                        fontFamily: "SFNSDisplay-Bold",
                        fontSize: 24,
                        lineHeight: 42,
                        textAlign: "center",
                        top: 0,
                      }}
                    >
                      Forgot password
                    </Text>

                    <Text
                      style={{
                        height: height * 0.0172 + 2,
                        opacity: 0.8,
                        color: "#1A1C36",
                        fontFamily: "SFNSDisplay",
                        fontSize: 12,
                        lineHeight: 15,
                        textAlign: "center",
                        top: height * 0.008,
                      }}
                    >
                      Enter your email address to get help logging in
                    </Text>

                    <View
                      style={{
                        boxSizing: "border-box",
                        height: 49,
                        width: "72.27%",
                        border: "1px solid #1A1C36;",
                        borderRadius: 24,
                        backgroundColor: "#EEEEF0",
                        opacity: 1,
                        top: height * 0.0369 - 2,
                        paddingHorizontal: "6.27%",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#EEEEF0",
                      }}
                    >
                      <TextInput
                        style={{
                          color: "black",
                        }}
                        placeholderTextColor="black"
                        placeholder="Enter email address"
                        textContentType="emailAddress"
                        keyboardType={"email-address"}
                        maxLength={35}
                        returnKeyType={"done"}
                        dataDetectorTypes="all"
                        onChangeText={(text) =>
                          this.onTextChangeForgotPassword(text)
                        }
                        value={this.state.forgotPassword}
                      />
                    </View>

                    <TouchableOpacity
                      style={{
                        height: 54,
                        width: "72%",
                        borderRadius: 27,
                        backgroundColor: "#0DB09F",
                        justifyContent: "center",
                        alignItems: "center",
                        top: height * 0.0591 - 2,
                      }}
                      onPress={() => this.props.navigation.navigate("")}
                    >
                      <Text
                        style={{
                          height: 18,
                          color: "#FFFFFF",
                          fontFamily: "SFNSDisplay",
                          fontSize: 15,
                          lineHeight: 18,
                          textAlign: "center",
                        }}
                      >
                        SEND EMAIL
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <TouchableOpacity
                style={{
                  height: 54,
                  width: "78.67%",
                  borderRadius: 27,
                  backgroundColor: "#FFFFFF",
                  top: 17.5 + height * 0.0265 + height * 0.0591
                  /*height
                   * .6244*/,
                  left: "12%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => this.props.navigation.navigate("Main")}
              >
                <Text
                  style={{
                    height: 18,
                    color: "#0DB09F",
                    fontFamily: "SFNSDisplay-Bold",
                    fontSize: 15,
                    lineHeight: 18,
                    textAlign: "center",
                  }}
                >
                  LOG IN
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  top:
                    /*height * .8399*/ 17.5 +
                    height * 0.0265 +
                    height * 0.0591 +
                    height * 0.149,
                  width: width,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    height: 22,
                    color: "#FFFFFF",
                    fontFamily: "SFNSDisplay",
                    fontSize: 14,
                    lineHeight: 22,
                    textAlign: "center",
                  }}
                  onPress={() => this.props.navigation.navigate("SignUp")}
                >
                  Don’t have an account?
                  <Text style={{ fontFamily: "SFNSDisplay-Bold" }}>
                    {" "}
                    Sign up
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

class SignUpScreen extends React.Component {
  state = { fullName: "", schoolName: "", currentGrade: "", phoneNum: "" };

  onTextChangeFullName(text) {
    this.setState({ fullName: text });
  }
  onTextChangeSchoolName(text) {
    this.setState({ schoolName: text });
  }
  onTextChangeCurrentGrade(text) {
    this.setState({ currentGrade: text });
  }

  onTextChangePhoneNum(text) {
    var cleaned = ("" + text).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      var intlCode = match[1] ? "+1 " : "",
        number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
          ""
        );
      this.setState({ phoneNum: number });
      return;
    }

    this.setState({ phoneNum: text });
  }

  render() {
    const { width } = Dimensions.get("window");
    const height = Dimensions.get("window").height;
    return (
      <ImageBackground
        source={require("../assets/images/SignUpBG.png")}
        style={{
          height: height,
          width: width,
          resizeMode: "center",
          overflow: "hidden",
          flex: 1,
        }}
      >
        <SafeAreaView>
          <View style={{ paddingTop: Platform.OS === "android" ? 25 : 0 }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                top: height * 0.038,
              }}
            >
              <Image
                source={require("../assets/images/wetherbees_unofficial_logo.png")}
                style={{
                  width: width * 0.25,
                  height: width * 0.25 * 0.4279,
                }}
              />
            </View>

            <Text
              style={{
                height: 32,
                color: "#FFFFFF",
                fontFamily: "SFNSDisplay-Bold",
                fontSize: 24,
                lineHeight: 32,
                left: "10.67%",
                position: "absolute",
                top: height * 0.1404,
              }}
            >
              Get started
            </Text>

            <Text
              style={{
                height: 16,
                opacity: 0.8,
                color: "#FFFFFF",
                fontFamily: "SFNSDisplay",
                fontSize: 12,
                lineHeight: 15,
                left: "11.47%",
                top: height * 0.202,
                position: "absolute",
              }}
            >
              Fill up the form to get started
            </Text>

            <View
              style={{
                height: 3,
                width: "38.67%",
                opacity: 0.9,
                borderRadius: 1.5,
                backgroundColor: "#FFFFFF",
                left: "10.67%",
                top: height * 0.2525,
                position: "absolute",
              }}
            ></View>

            <View
              style={{
                height: 3,
                width: "38.67%",
                opacity: 0.24,
                borderRadius: 1.5,
                backgroundColor: "#FFFFFF",
                top: height * 0.2525,
                left: "50.67%",
                position: "absolute",
              }}
            ></View>

            <View
              style={{
                width: "100%",
                top: height * 0.29,
                flexDirection: "column",
                position: "absolute",
              }}
            >
              <View
                style={{
                  boxSizing: "border-box",
                  height: 48,
                  width: "78.67%",
                  border: "1px solid rgba(255,255,255,0.24)",
                  borderRadius: 24,
                  backgroundColor: "rgba(255,255,255,0.24)",
                  top: 0,
                  left: "10.67%",
                  borderColor: "rgba(255,255,255,0.24)",
                  borderWidth: 1,
                  paddingHorizontal: "6.27%",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  style={{
                    color: "#FFFFFF",
                  }}
                  placeholderTextColor="#FFFFFF"
                  placeholder="Full name"
                  textContentType="name"
                  keyboardType={"default"}
                  maxLength={45}
                  returnKeyType={"done"}
                  dataDetectorTypes="all"
                  onChangeText={(text) => this.onTextChangeFullName(text)}
                  value={this.state.fullName}
                />
              </View>

              <View
                style={{
                  boxSizing: "border-box",
                  height: 48,
                  width: "78.67%",
                  border: "1px solid rgba(255,255,255,0.24)",
                  borderRadius: 24,
                  backgroundColor: "rgba(255,255,255,0.24)",
                  top: 17.5 /*(height * .3719)*/,
                  left: "10.67%",
                  borderColor: "rgba(255,255,255,0.24)",
                  borderWidth: 1,
                  paddingHorizontal: "6.27%",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  style={{
                    color: "#FFFFFF",
                  }}
                  placeholderTextColor="#FFFFFF"
                  placeholder="School name"
                  textContentType="name"
                  keyboardType={"default"}
                  maxLength={180}
                  returnKeyType={"done"}
                  dataDetectorTypes="all"
                  onChangeText={(text) => this.onTextChangeSchoolName(text)}
                  value={this.state.schoolName}
                />
              </View>

              <View
                style={{
                  boxSizing: "border-box",
                  height: 48,
                  width: "78.67%",
                  border: "1px solid rgba(255,255,255,0.24)",
                  borderRadius: 24,
                  backgroundColor: "rgba(255,255,255,0.24)",
                  top: 17.5 + 17.5 /*(height * .4532)*/,
                  left: "10.67%",
                  borderColor: "rgba(255,255,255,0.24)",
                  borderWidth: 1,
                  paddingHorizontal: "6.27%",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  style={{
                    color: "#FFFFFF",
                  }}
                  placeholderTextColor="#FFFFFF"
                  placeholder="Current grade"
                  textContentType="none"
                  keyboardType={"decimal-pad"}
                  maxLength={10}
                  returnKeyType={"done"}
                  dataDetectorTypes="all"
                  onChangeText={(text) => this.onTextChangeCurrentGrade(text)}
                  value={this.state.currentGrade}
                />
              </View>

              <View
                style={{
                  boxSizing: "border-box",
                  height: 48,
                  width: "78.67%",
                  border: "1px solid rgba(255,255,255,0.24)",
                  borderRadius: 24,
                  backgroundColor: "rgba(255,255,255,0.24)",
                  top: 17.5 + 17.5 + 17.5 /*(height * .5345)*/,
                  left: "10.67%",
                  borderColor: "rgba(255,255,255,0.24)",
                  borderWidth: 1,
                  paddingHorizontal: "6.27%",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  style={{
                    color: "#FFFFFF",
                  }}
                  placeholderTextColor="#FFFFFF"
                  placeholder="Phone number"
                  textContentType="telephoneNumber"
                  keyboardType={"phone-pad"}
                  maxLength={15}
                  returnKeyType={"done"}
                  dataDetectorTypes="phoneNumber"
                  onChangeText={(text) => this.onTextChangePhoneNum(text)}
                  value={this.state.phoneNum}
                />
              </View>

              <TouchableOpacity
                style={{
                  height: 54,
                  width: "78.67%",
                  borderRadius: 27,
                  backgroundColor: "#FFFFFF",
                  top: 17.5 + 17.5 + 17.5 + height * 0.093 /*height * .6872*/,
                  left: "10.67%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => this.props.navigation.navigate("SignUp2")}
              >
                <Text
                  style={{
                    height: 18,
                    color: "#0DB09F",
                    fontFamily: "SFNSDisplay-Bold",
                    fontSize: 15,
                    lineHeight: 18,
                    textAlign: "center",
                  }}
                >
                  Continue
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  width: "100%",
                  top:
                    /*height * .7906*/ 17.5 +
                    17.5 +
                    17.5 +
                    height * 0.093 +
                    height * 0.0369,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 45,
                }}
              >
                <Text
                  style={{
                    height: 45,
                    color: "#FFFFFF",
                    fontFamily: "SFNSDisplay",
                    fontSize: 12,
                    lineHeight: 20,
                    textAlign: "center",
                    top: 0,
                  }}
                >
                  By signing up you are agree with our {"\n"}
                  <Text
                    style={{
                      fontFamily: "SFNSDisplay-Bold",
                      textDecorationLine: "underline",
                    }}
                  >
                    Terms and Conditions
                  </Text>{" "}
                  and{" "}
                  <Text
                    style={{
                      fontFamily: "SFNSDisplay-Bold",
                      textDecorationLine: "underline",
                    }}
                  >
                    Privacy policy.
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

class SignUp2Screen extends React.Component {
  state = { ACT: false, SAT: false, PSAT: false };

  _act() {
    if (this.state.ACT == true) {
      return (
        <TouchableOpacity
          style={{
            boxSizing: "border-box",
            height: 57,
            width: "100%",
            border: "1px solid rgba(255,255,255,0.24)",
            borderRadius: 28,
            borderWidth: 2,
            borderColor: "#FFFFFF",
            backgroundColor: "rgba(255,255,255,0.24)",
            justifyContent: "center",
          }}
          onPress={() => this.setState({ ACT: !this.state.ACT })}
        >
          <View
            style={{
              width: "100%",
              height: 24,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 24, width: 24, left: 25 }}
              source={require("../assets/images/actSignUp.png")}
            />
            <Text
              style={{
                height: 16,
                color: "#FFFFFF",
                fontFamily: "SFNSDisplay",
                fontSize: 14,
                lineHeight: 17,
                left: 25 + 10,
              }}
            >
              ACT
            </Text>
            <Image
              style={{ height: 20, width: 20, right: 19, position: "absolute" }}
              source={require("../assets/images/check_circle.png")}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            boxSizing: "border-box",
            height: 57,
            width: "100%",
            border: "1px solid rgba(255,255,255,0.24)",
            borderWidth: 1,
            borderRadius: 28,
            backgroundColor: "rgba(255,255,255,0.24)",
            borderColor: "rgba(255,255,255,0.24)",
            justifyContent: "center",
          }}
          onPress={() => this.setState({ ACT: !this.state.ACT })}
        >
          <View
            style={{
              width: "100%",
              height: 24,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 24, width: 24, left: 25 }}
              source={require("../assets/images/actSignUp.png")}
            />
            <Text
              style={{
                height: 16,
                color: "#FFFFFF",
                fontFamily: "SFNSDisplay",
                fontSize: 14,
                lineHeight: 17,
                left: 25 + 10,
              }}
            >
              ACT
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  _sat() {
    if (this.state.SAT == true) {
      return (
        <TouchableOpacity
          style={{
            boxSizing: "border-box",
            height: 57,
            width: "100%",
            border: "1px solid rgba(255,255,255,0.24)",
            borderWidth: 2,
            borderColor: "#FFFFFF",
            borderRadius: 28,
            backgroundColor: "rgba(255,255,255,0.24)",
            justifyContent: "center",
          }}
          onPress={() => this.setState({ SAT: !this.state.SAT })}
        >
          <View
            style={{
              width: "100%",
              height: 24,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 24, width: 24, left: 25 }}
              source={require("../assets/images/satSignUp.png")}
            />
            <Text
              style={{
                height: 16,
                color: "#FFFFFF",
                fontFamily: "SFNSDisplay",
                fontSize: 14,
                lineHeight: 17,
                left: 25 + 10,
              }}
            >
              SAT
            </Text>
            <Image
              style={{ height: 20, width: 20, right: 19, position: "absolute" }}
              source={require("../assets/images/check_circle.png")}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            boxSizing: "border-box",
            height: 57,
            width: "100%",
            border: "1px solid rgba(255,255,255,0.24)",
            borderWidth: 1,
            borderRadius: 28,
            backgroundColor: "rgba(255,255,255,0.24)",
            borderColor: "rgba(255,255,255,0.24)",
            justifyContent: "center",
          }}
          onPress={() => this.setState({ SAT: !this.state.SAT })}
        >
          <View
            style={{
              width: "100%",
              height: 24,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 24, width: 24, left: 25 }}
              source={require("../assets/images/satSignUp.png")}
            />
            <Text
              style={{
                height: 16,
                color: "#FFFFFF",
                fontFamily: "SFNSDisplay",
                fontSize: 14,
                lineHeight: 17,
                left: 25 + 10,
              }}
            >
              SAT
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  _psat() {
    if (this.state.PSAT == true) {
      return (
        <TouchableOpacity
          style={{
            boxSizing: "border-box",
            height: 57,
            width: "100%",
            border: "1px solid rgba(255,255,255,0.24)",
            borderWidth: 2,
            borderColor: "#FFFFFF",
            borderRadius: 28,
            backgroundColor: "rgba(255,255,255,0.24)",
            justifyContent: "center",
          }}
          onPress={() => this.setState({ PSAT: !this.state.PSAT })}
        >
          <View
            style={{
              width: "100%",
              height: 24,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 24, width: 24, left: 25 }}
              source={require("../assets/images/psatSignUp.png")}
            />
            <Text
              style={{
                height: 16,
                color: "#FFFFFF",
                fontFamily: "SFNSDisplay",
                fontSize: 14,
                lineHeight: 17,
                left: 25 + 10,
              }}
            >
              PSAT
            </Text>
            <Image
              style={{ height: 20, width: 20, right: 19, position: "absolute" }}
              source={require("../assets/images/check_circle.png")}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            boxSizing: "border-box",
            height: 57,
            width: "100%",
            border: "1px solid rgba(255,255,255,0.24)",
            borderWidth: 1,
            borderRadius: 28,
            backgroundColor: "rgba(255,255,255,0.24)",
            borderColor: "rgba(255,255,255,0.24)",
            justifyContent: "center",
          }}
          onPress={() => this.setState({ PSAT: !this.state.PSAT })}
        >
          <View
            style={{
              width: "100%",
              height: 24,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 24, width: 24, left: 25 }}
              source={require("../assets/images/psatSignUp.png")}
            />
            <Text
              style={{
                height: 16,
                color: "#FFFFFF",
                fontFamily: "SFNSDisplay",
                fontSize: 14,
                lineHeight: 17,
                left: 25 + 10,
              }}
            >
              PSAT
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  render() {
    const { width } = Dimensions.get("window");
    const height = Dimensions.get("window").height;
    return (
      <ImageBackground
        source={require("../assets/images/SignUpBG.png")}
        style={{
          height: height,
          width: width,
          resizeMode: "center",
          overflow: "hidden",
          flex: 1,
        }}
      >
        <SafeAreaView>
          <View style={{ paddingTop: Platform.OS === "android" ? 25 : 0 }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                top: height * 0.038,
                position: "absolute",
                width: "100%",
              }}
            >
              <Image
                source={require("../assets/images/wetherbees_unofficial_logo.png")}
                style={{
                  width: width * 0.25,
                  height: width * 0.25 * 0.4279,
                }}
              />
            </View>

            <Text
              style={{
                height: 72,
                color: "#FFFFFF",
                fontFamily: "SFNSDisplay-Bold",
                fontSize: 24,
                lineHeight: 32,
                left: "10.67%",
                position: "absolute",
                top: height * 0.1084,
              }}
            >
              Select tests you’re {"\n"}preparing for
            </Text>

            <View
              style={{
                height: 3,
                width: "38.67%",
                opacity: 0.9,
                borderRadius: 1.5,
                backgroundColor: "#FFFFFF",
                left: "10.67%",
                top: height * 0.2315,
                position: "absolute",
              }}
            ></View>

            <View
              style={{
                height: 3,
                width: "38.67%",
                opacity: 0.9,
                borderRadius: 1.5,
                backgroundColor: "#FFFFFF",
                top: height * 0.2315,
                left: "50.67%",
                position: "absolute",
              }}
            ></View>

            <View
              style={{
                width: "100%",
                top: height * 0.2789,
                flexDirection: "column",
                position: "absolute",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  top: 0 /*height * .2789*/,
                  width: "78.93%",
                  height: 57,
                  left: "10.53%",
                }}
              >
                {this._act()}
              </View>

              <View
                style={{
                  flexDirection: "column",
                  top: 17.5 /*height * .3695*/,
                  width: "78.93%",
                  height: 57,
                  left: "10.53%",
                }}
              >
                {this._sat()}
              </View>

              <View
                style={{
                  flexDirection: "column",
                  top: 17.5 + 17.5 /*height * .4612*/,
                  width: "78.93%",
                  height: 57,
                  left: "10.53%",
                }}
              >
                {this._psat()}
              </View>

              <TouchableOpacity
                style={{
                  height: 54,
                  width: "78.67%",
                  borderRadius: 27,
                  backgroundColor: "#FFFFFF",
                  top: /*height * .702*/ 17.5 + 17.5 + height * 0.1706,
                  left: "10.67%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => this.props.navigation.navigate("Main")}
              >
                <Text
                  style={{
                    height: 18,
                    color: "#0DB09F",
                    fontFamily: "SFNSDisplay-Bold",
                    fontSize: 15,
                    lineHeight: 18,
                    textAlign: "center",
                  }}
                >
                  CONTINUE
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignUp")}
              style={{
                height: 20,
                width: 20,
                borderRadius: 4.29,
                left: "6.67%",
                zIndex: 1,
                top: height * 0.0209,
              }}
              activeOpacity={0}
            >
              <Image
                style={{
                  height: 14,
                  width: "38.93%",
                  position: "relative",
                  top: 3.33,
                  left: "6.67%",
                  zIndex: 0,
                }}
                source={require("../assets/Icons/keyboard_arrow_left_white.png")}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const AuthStack = createStackNavigator(
  {
    GetStarted: GetStartedScreen,
    LogIn: LogInScreen,
    SignUp: SignUpScreen,
    SignUp2: SignUp2Screen,
  },
  {
    initialRouteName: "GetStarted",
  },
  {
    defaultNavigationOptions: {
      header: {
        style: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      },
    },
  }
);

GetStartedScreen.navigationOptions = {
  title: "",
  header: null,
};

LogInScreen.navigationOptions = {
  title: "",
  header: null,
};

SignUpScreen.navigationOptions = {
  title: "",
  header: null,
};

SignUp2Screen.navigationOptions = {
  title: "",
  header: null,
};

function setToken(token) {
  return (previousState, currentProps) => {
    return { ...previousState, hasToken: token !== null };
  };
}

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasToken: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("access_token").then((token) => {
      this.setState(setToken(token));
    });
  }

  _tokenState() {
    if (this.state.hasToken) {
      return (
        <Main
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      );
    } else {
      return (
        <Auth
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      );
    }
  }

  render() {
    return this._tokenState();
  }
}

const Auth = createAppContainer(
  createSwitchNavigator(
    {
      Main: MainTabNavigator,
      Auth: AuthStacks,
    },
    {
      initialRouteName: "Auth",
    }
  )
);

const Main = createAppContainer(
  createSwitchNavigator(
    {
      Main: MainTabNavigator,
      Auth: AuthStacks,
    },
    {
      initialRouteName: "Main",
    }
  )
);
