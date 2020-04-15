import * as WebBrowser from "expo-web-browser";
import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card } from "react-native-elements";
import VideoPlayer from "react-native-video-player";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { withNavigation } from "react-navigation";
import ProfileScreen from "../screens/ProfileScreen";
import { Searchbar } from "react-native-paper";
import { Video } from "expo-av";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import Functions from "../functions";
import Moment from "moment";

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
  Button,
  AsyncStorage,
} from "react-native";

import { MonoText } from "../components/StyledText";
import { ActionQuestionAnswer } from "material-ui/svg-icons";

const data = [
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something",
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something two",
  },
];

function initialCourses(courses) {
  return (previousState, currentProps) => {
    return { ...previousState, courses: courses };
  };
}

function setUser(user) {
  console.log("IN FUNCTION");
  console.log(user);
  return (previousState, currentProps) => {
    return { ...previousState, user: user, username: user.FIRST_NAME };
  };
}

/*export default function HomeScreen() {*/
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mute: false,
      fullScreen: false,
      shouldPlay: false,
      words: [],
      courses: [],
      popular: [],
      showEnglish: true,
      user: [],
      username: "",
      question: {
        question: "",
        choices: [],
        answers: [],
        correctAnswer: "",
        selectedAnswer: "",
        isAnswered: false,
      },
    };
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener("didFocus", () => {
      setTimeout(() => {
        AsyncStorage.getItem("access_token").then((token) => {
          console.log("token ===> " + token);

          /*
					Functions.fetchWords(token, this.updateWords);
					Functions.fetchCourses(token, this.updateCourses);
					Functions.fetchPopular(token, this.updatePopular);					
					*/
          const question = {
            question:
              "Unlike the nylon parachutes of today, these bend as they catch the air, Raphael's design, if constructed, would be rigid and unwieldy: its frame consisted of twenty-two-foot-long wooden poles shaped into a pyramid",
            choices: ["A. NO CHANGE", "B. which", "C. those", "D. they"],
            answers: ["A", "B", "C", "D"],
            selectedAnswer: "",
            correctAnswer: "C",
            isAnswered: false,
          };
          this.updateQuestion(question);
        });
        AsyncStorage.getItem("user").then((user) => {
          console.log("USER ===> " + user);
          this.setState(setUser(JSON.parse(user)));
        });
      }, 1200);
    });
  }

  updateWords = (words) => {
    this.setState({ words: words });
    console.log(this.state.words);
  };

  updateCourses = (courses) => {
    this.setState(initialCourses(courses));
    console.log(this.state.courses);
  };

  updatePopular = (popular) => {
    this.setState({ popular: popular });
    console.log(this.state.popular);
  };

  updateQuestion = (question) => {
    this.setState({ question });
  };

  handlePlayAndPause = () => {
    this.setState((prevState) => ({
      shouldPlay: !prevState.shouldPlay,
    }));
  };

  handleVolume = () => {
    this.setState((prevState) => ({
      mute: !prevState.mute,
    }));
  };
  data = [
    {
      imageUrl: require("../assets/images/pop1.png"),
      favorite: require("../assets/images/favorite.png"),
      title: "Sixty Years of Answering #WhyApply",
      date: "October 03, 2019",
    },
    {
      imageUrl: require("../assets/images/pop1.png"),
      favorite: require("../assets/images/favorite.png"),
      title: "Sixty Years of Answering #WhyApply",
      date: "October 03, 2019",
    },
  ];

  _dataEnglishCards = [
    {
      word: "Internet",
      description:
        "Retro occupy organic, stump town shabby chic pour-over roof party DIY normcore. Actually arti san organic occupy",
    },
    {
      word: "Internet",
      description:
        "Retro occupy organic, stump town shabby chic pour-over roof party DIY normcore. Actually arti san organic occupy",
    },
  ];

  _dataMathCards = [
    {
      word: "Perfect square",
      description: "Product of a rational number multiplied by itself",
    },
    {
      word: "Perfect square",
      description: "Product of a rational number multiplied by itself",
    },
  ];

  _renderEnglishCards = ({ item }) => (
    <View
      style={{
        boxSizing: "border-box",
        height: 175.5,
        width: 306,
        border: "0.5px solid #0DB09F",
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        boxShadow: "0 20px 36px 0 rgba(0,0,0,0.05)",
        borderColor: "#0DB09F",
        borderWidth: 0.5,
        padding: 0,
        left: 0,
        top: 0,
        marginRight: 24,
        position: "relative",
      }}
    >
      <Text
        style={{
          height: 28,
          color: "#0DB09F",
          fontFamily: "SFNSDisplay-Bold",
          fontSize: 24,
          top: 31.25,
          left: "7.27%",
          lineHeight: 28,
        }}
      >
        {item.NAME}
      </Text>
      <Text
        style={{
          height: 73,
          width: 243,
          color: "#A9ABB8",
          fontFamily: "SFNSDisplay",
          fontSize: 12,
          lineHeight: 18,
          top: 31.25 + 21,
          left: "7.27%",
          textAlign: "justify",
        }}
        numberOfLines={3}
      >
        {item.DESCRIPTION}
      </Text>
      <TouchableOpacity
        style={{
          height: 20,
          width: 20,
          position: "absolute",
          top: 21.25,
          right: "5.67%",
          zIndex: 1,
        }}
        activeOpacity={0}
      >
        <Image
          style={{
            height: 13.33,
            width: 11.25,
            position: "absolute",
            top: 3.33,
            left: 4.17,
            zIndex: 0,
          }}
          source={require("../assets/images/soundSubject.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          height: 16,
          width: 16,
          position: "absolute",
          bottom: 14.25,
          right: "6.2%",
          zIndex: 1,
        }}
        activeOpacity={0}
      >
        <Image
          style={{
            height: 12,
            width: 12,
            position: "absolute",
            top: 2,
            left: 2,
            zIndex: 0,
          }}
          source={require("../assets/images/expandSubject.png")}
        />
      </TouchableOpacity>
    </View>
  );

  _renderMathCards = ({ item }) => (
    <View
      style={{
        boxSizing: "border-box",
        height: 161.5,
        width: 306,
        border: "0.5px solid #0DB09F",
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        boxShadow: "0 20px 36px 0 rgba(0,0,0,0.05)",
        borderColor: "#0DB09F",
        borderWidth: 0.5,
        padding: 0,
        left: 0,
        top: 0,
        marginRight: 24,
        position: "relative",
      }}
    >
      <Text
        style={{
          height: 28,
          color: "#0DB09F",
          fontFamily: "SFNSDisplay-Bold",
          fontSize: 24,
          top: 31.25,
          left: "7.27%",
          lineHeight: 28,
        }}
      >
        {item.word}
      </Text>
      <Text
        style={{
          height: 73,
          width: 243,
          color: "#A9ABB8",
          fontFamily: "SFNSDisplay",
          fontSize: 12,
          lineHeight: 18,
          top: 31.25 + 21,
          left: "7.27%",
          textAlign: "justify",
        }}
        numberOfLines={3}
      >
        {item.description}
      </Text>
      <TouchableOpacity
        style={{
          height: 20,
          width: 20,
          position: "absolute",
          top: 21.25,
          right: "5.67%",
          zIndex: 1,
        }}
        activeOpacity={0}
      >
        <Image
          style={{
            height: 13.33,
            width: 11.25,
            position: "absolute",
            top: 3.33,
            left: 4.17,
            zIndex: 0,
          }}
          source={require("../assets/images/soundSubject.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          height: 16,
          width: 16,
          position: "absolute",
          bottom: 20.25,
          right: "6.2%",
          zIndex: 1,
        }}
        activeOpacity={0}
      >
        <Image
          style={{
            height: 12,
            width: 12,
            position: "absolute",
            top: 2,
            left: 2,
            zIndex: 0,
          }}
          source={require("../assets/images/expandSubject.png")}
        />
      </TouchableOpacity>
    </View>
  );

  renderCards() {
    if (this.state.showEnglish) {
      return (
        <View>
          <Text
            style={{
              height: 26,
              color: "#1A1C36",
              fontFamily: "SFNSDisplay-Bold",
              left: "9.07%",
              fontSize: 21,
              lineHeight: 24,
              top: 0,
            }}
          >
            Word of the day
          </Text>
          <FlatList
            style={{
              height: 175.5,
              position: "relative",
              width: "100%",
              top: 17,
              left: 0,
              paddingLeft: "7.47%",
              paddingRight: "6.6%",
              boxSizing: "border-box",
            }}
            contentInset={{ right: 30 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={this.state.words}
            renderItem={this._renderEnglishCards}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text
            style={{
              height: 26,
              color: "#1A1C36",
              fontFamily: "SFNSDisplay-Bold",
              left: "9.07%",
              fontSize: 21,
              lineHeight: 24,
              top: 0,
            }}
          >
            Word of the day
          </Text>
          <FlatList
            contentInset={{ right: 30 }}
            style={{
              height: 161.5,
              position: "relative",
              width: "100%",
              top: 17,
              left: 0,
              paddingLeft: "7.47%",
              paddingRight: "6.6%",
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={this.state.words}
            renderItem={this._renderMathCards}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
    }
  }

  renderQuestion = () => {
    const { question } = this.state;
    if (question.isAnswered) {
      return <></>;
		}
		if (question.question=='') {
			return <></>;
		}
    return (
      <View>
        <Text
          style={{
            height: 26,
            color: "#1A1C36",
            fontFamily: "SFNSDisplay-Bold",
            left: "9.07%",
            fontSize: 21,
            lineHeight: 24,
            top: 0,
          }}
        >
          Question of the day
        </Text>
        <View
          style={{
            marginHorizontal: "9.07%",
            marginVertical: 5,
            padding: 15,
            borderRadius: 10,
            borderColor: "#0DB09F",
            borderWidth: 0.5,
            backgroundColor: "#FFFFFF",
            boxShadow: "0 20px 36px 0 rgba(0,0,0,0.05)",
          }}
        >
          <Text
            style={{
              paddingBottom: 10,
            }}
          >
            {question.question}
          </Text>
          <View style={{}}>
            {question.choices.map((choice, index) => (
              <Text key={"question-choice-" + index}>{choice}</Text>
            ))}
          </View>
          <View
            style={{
              marginBottom: 5,
              marginTop: 15,
              marginHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {question.answers.map((answer, index) => (
              <TouchableOpacity
                style={[
                  {
                    borderColor: "#0DB09F",
                    borderWidth: 0.5,
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  answer == question.selectedAnswer && {
                    backgroundColor: "#0DB09F",
                  },
                ]}
                onPress={() => this.setAnswer(answer)}
              >
                <Text
                  key={"question-answer-" + index}
                  style={[
                    {
                      fontSize: 24,
                      color: "#0DB09F",
                    },
                    answer == question.selectedAnswer && {
                      color: "#FFF",
                    },
                  ]}
                >
                  {answer}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  setAnswer = (answer) => {
    let { question } = this.state;
    question.selectedAnswer = answer;
    question.isAnswered = true;
    this.setState({
      ...this.state,
      question,
    });
  };

  renderVideo = () => {
		if (!this.state.question.isAnswered) {
			return (
				<></>
			)
		}
		const { question } = this.state;
    return (
      <>
				<View
					style={{
						marginHorizontal: '7.5%'
					}}
				>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ fontSize: 14, lineHeight: 24, marginRight: 10 }}>Selected Answer:</Text>
						<Text style={{ color: '#0DB09F', fontSize: 18, lineHeight: 24 }}>{question.selectedAnswer}</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ fontSize: 14, lineHeight: 24, marginRight: 10 }}>Correct Answer:</Text>
						<Text style={{ color: '#0DB09F', fontSize: 18, lineHeight: 24 }}>{question.correctAnswer}</Text>
					</View>
				</View>
        <Video
          source={{
            uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          shouldPlay={this.state.shouldPlay}
          resizeMode="cover"
          useNativeControls={true}
          style={{
            height: 187,
            top: 69 - 44 - 35.71 + 17 + 25 + 15,
            width: "85.33%",
            left: "7.47%",
            borderRadius: 5.5,
          }}
          isMuted={this.state.mute}
        />

        <View style={styles.controlBar}></View>
      </>
    );
  };

  /* 
	renderItem = ({item}) => (
		<Card
		containerStyle={{width: '79.47%', left: '7.47%', top: '0%', elevation:0, shadowOpacity: 0, shadowColor: '', paddingBottom: 10, borderWidth: 0,}}>
		
		<Image style={{height: 85, width: 85, borderRadius: 10, top: 0, left: 0,}} source={item.imageUrl}/>
		
		<Text style={{height: 14, width: 70, position: 'absolute', color: '#0DB09F', fontFamily: 'SFNSDisplay-Bold', fontSize: 12, lineHeight: 15, top: 4, left: 105,}}>{item.examType}</Text>
		
		<Text numberOfLines={2} style={{height: 38, width: 193, color: '#1A1C36', position: 'absolute', fontFamily: 'SFNSDisplay-Bold', fontSize: 16, lineHeight: 18, left: 105, top: 23,}}>{item.title}</Text>
		
		<Text style={{height: 14, width: 93, color: '#A9ABB8', fontFamily: 'SFNSDisplay', fontSize: 12, lineHeight: 15, top: 70, position: 'absolute', left: 105,}}>{item.date}</Text>
		
		</Card>
	);
	*/

  renderItem = ({ item }) => (
    <View
      style={{
        height: 260,
        width: 276,
        top: 0,
        elevation: 0,
        shadowOpacity: 0,
        shadowColor: "",
        borderColor: "white",
        padding: 0,
        left: 0,
        marginRight: 28,
      }}
    >
      <Image
        style={{
          height: 260,
          width: 276,
          position: "relative",
          top: 0,
          left: 0,
        }}
        source={{ uri: item.IMAGE }}
      />

      <Image
        style={{
          height: 34,
          width: 34,
          borderRadius: 10,
          left: 225,
          top: -276 + 32,
        }}
        source={require("../assets/images/favorite.png")}
      />

      <Text
        style={{
          height: 55,
          width: 216,
          color: "#FFFFFF",
          fontFamily: "SFNSDisplay-Bold",
          fontSize: 18,
          lineHeight: 22,
          top: -276 - 22 + 168,
          left: 24,
          bottom: 43,
        }}
      >
        {item.NAME}
      </Text>

      <Text
        style={{
          height: 14,
          width: 114,
          color: "#FFFFFF",
          fontFamily: "SFNSDisplay",
          fontSize: 12,
          lineHeight: 15,
          top: -276 - 70 + 217,
          left: 24,
        }}
      >
        {Moment(item.DATE).format("MMMM DD, YYYY")}
      </Text>
    </View>
  );

  render() {
    const { navigate } = this.props.navigation;
    const { width } = Dimensions.get("window");
    const height = Dimensions.get("window").height;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ paddingTop: Platform.OS === "android" ? 25 : 0 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            behaviour="height"
            style={{
              ...Platform.select({
                ios: {},
                android: {},
              }),
            }}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "space-between",
            }}
            scrollEventThrottle={16}
          >
            <View
              style={{
                height: 1180 + 61.7 + 20 + 100 + 2 + 25 + 15 + 175.5 + 47 + 2,
                shadowOffset: { width: 0, height: 0 },
                shadowColor: "#000000",
                shadowOpacity: 0.06,
                shadowRadius: 70,
                elevation: 5,
              }}
            >
              <Text style={styles.userNameText}>
                Hello, {this.state.username}
              </Text>
              <Text style={styles.whatYouWantToLearn}>
                What would you like to learn today?
              </Text>

              <Image
                style={{
                  height: 17.14,
                  width: 17.14,
                  position: "relative",
                  top: 0,
                  left: "85.45%",
                  zIndex: 1,
                }}
                source={require("../assets/Icons/search.png")}
              />
              <View
                style={{
                  backgroundColor: "#F2F2F2",
                  position: "relative",
                  height: 36,
                  width: 36,
                  zIndex: 0,
                  left: "82.93%",
                  top: -25.71,
                  borderRadius: 4.29,
                }}
              ></View>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Search")}
                style={{
                  height: 36,
                  width: 36,
                  borderRadius: 4.29,
                  position: "relative",
                  top: -25.68 - 35.71,
                  left: "82.93%",
                  zIndex: 1,
                }}
                activeOpacity={0}
              ></TouchableOpacity>

              <View style={{ width: width, top: 69 - 44 - 35.71 }}>
                {/* 
								this.renderCards()
								*/}
                {this.renderQuestion()}
              </View>
              {this.renderVideo()}

              <Text
                style={{
                  height: 24,
                  width: "50.93%",
                  color: "#1A1C36",
                  fontFamily: "SFNSDisplay-Bold",
                  fontSize: 21,
                  lineHeight: 24,
                  position: "relative",
                  top: 47.68 - 35.71 + 14 + 25 + 15 + 2,
                  left: "9.07%",
                }}
              >
                Our Courses
              </Text>

              <View
                style={{
                  position: "relative",
                  top: 74.68 - 35.71 + 25 + 25 + 2,
                }}
              >
                <Image
                  style={{
                    height: 64,
                    width: 64,
                    position: "relative",
                    top: 0,
                    left: "7.47%",
                  }}
                  source={require("../assets/images/ACT.png")}
                />

                <Image
                  style={{
                    height: 64,
                    width: 64,
                    position: "relative",
                    top: -64,
                    left: "30.13%",
                  }}
                  source={require("../assets/images/SAT.png")}
                />

                <Image
                  style={{
                    height: 64,
                    width: 64,
                    position: "relative",
                    top: -128,
                    left: "52.8%",
                  }}
                  source={require("../assets/images/HSEntrance.png")}
                />

                <Image
                  style={{
                    height: 64,
                    width: 64,
                    position: "relative",
                    top: -192,
                    left: "75.47%",
                  }}
                  source={require("../assets/images/PSAT.png")}
                />
              </View>

              <View style={{ top: -128 + 12 + 7 + 25 + 15 + 15 + 2 }}>
                <Text
                  style={{
                    height: 14,
                    width: "5.87%",
                    color: "#1A1C36",
                    fontFamily: "SFNSDisplay",
                    fontSize: 12,
                    lineHeight: 15,
                    textAlign: "center",
                    position: "relative",
                    top: 0 - 35.71,
                    left: "13.07%",
                  }}
                >
                  ACT
                </Text>

                <Text
                  style={{
                    height: 14,
                    width: "8.07%",
                    color: "#1A1C36",
                    fontFamily: "SFNSDisplay",
                    fontSize: 12,
                    lineHeight: 15,
                    textAlign: "center",
                    position: "relative",
                    top: -14 - 35.71,
                    left: "34.27%",
                  }}
                >
                  SAT
                </Text>

                <Text
                  style={{
                    height: 14,
                    width: "19.6%",
                    color: "#1A1C36",
                    fontFamily: "SFNSDisplay",
                    fontSize: 12,
                    lineHeight: 15,
                    textAlign: "center",
                    position: "relative",
                    top: -28 - 35.71,
                    left: "51.53%",
                  }}
                >
                  HS Entrance
                </Text>

                <Text
                  style={{
                    height: 14,
                    width: "7.93%",
                    color: "#1A1C36",
                    fontFamily: "SFNSDisplay",
                    fontSize: 12,
                    lineHeight: 15,
                    textAlign: "center",
                    position: "relative",
                    top: -42 - 35.71,
                    left: "80%",
                  }}
                >
                  PSAT
                </Text>
              </View>

              <Text
                style={{
                  height: 25,
                  width: "21.73%",
                  color: "#1A1C36",
                  fontFamily: "SFNSDisplay",
                  fontFamily: "SFNSDisplay-Bold",
                  fontSize: 21,
                  lineHeight: 24,
                  position: "relative",
                  top: -128 - 35.71 + 25 + 15 + 15 + 2,
                  left: "9.07%",
                }}
              >
                Popular
              </Text>
              <Text
                style={{
                  height: 16,
                  width: 65,
                  color: "#A9ABB8",
                  fontFamily: "SFNSDisplay",
                  fontSize: 12,
                  lineHeight: 15,
                  textAlign: "center",
                  position: "relative",
                  top: -128 - 16 - 35.71 + 25 + 15 + 15,
                  left: 118,
                }}
              >
                (Right now)
              </Text>

              <View
                style={{
                  height: 260,
                  width: "100%",
                  top: -128 - 35.71 + 11 - 1 + 25 + 3 + 25 + 2,
                }}
              >
                <FlatList
                  style={{
                    height: 260,
                    width: "100%",
                    position: "relative",
                    top: 0,
                    left: 0,
                    paddingLeft: 28,
                    paddingRight: 28,
                  }}
                  contentInset={{ right: 30 }}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={this.state.popular}
                  renderItem={this.renderItem}
                  keyExtractor={(item, index) => index}
                />
              </View>

              <Text
                style={{
                  height: 31,
                  width: "62.27%",
                  color: "#1A1C36",
                  fontFamily: "SFNSDisplay-Bold",
                  fontSize: 21,
                  lineHeight: 29,
                  position: "relative",
                  top: -138 + 39 - 35.71 + 21 - 1 + 25 + 15 + 2,
                  left: "9.07%",
                }}
              >
                Upcoming exams
              </Text>

              <Text
                style={{
                  height: 16,
                  width: "13.2%",
                  color: "#A9ABB8",
                  fontFamily: "SFNSDisplay-Bold",
                  fontSize: 14,
                  lineHeight: 17,
                  position: "relative",
                  top: -168 + 45 - 35.71 + 21 - 1 + 25 + 15 + 2,
                  left: "81.33%",
                }}
                onPress={
                  /*() => navigate('Search')*/ () =>
                    this.props.navigation.navigate("UpcomingExams")
                }
              >
                See all
              </Text>

              <Image
                style={{
                  height: 85,
                  width: 85,
                  borderRadius: 10,
                  position: "relative",
                  top: -128 + 25 + 25 - 35.71 + 21 - 1 + 25 + 2,
                  left: "7.47%",
                }}
                source={require("../assets/images/ActExam.png")}
              />

              <Text
                style={{
                  height: 14,
                  width: 26,
                  color: "#0DB09F",
                  fontFamily: "SFNSDisplay-Bold",
                  position: "relative",
                  fontSize: 12,
                  lineHeight: 15,
                  left: 133,
                  top: -128 - 85 + 29 + 22 - 35.71 + 21 - 1 + 25 + 15 + 2,
                }}
              >
                ACT
              </Text>
              <Text
                numberOfLines={2}
                style={{
                  height: "4.08%",
                  width: "51.47%",
                  color: "#1A1C36",
                  fontFamily: "SFNSDisplay-Bold",
                  position: "relative",
                  fontSize: 16,
                  lineHeight: 18,
                  left: 133,
                  top: -128 - 49 + 22 - 35.71 + 21 - 1 + 25 + 15 + 2,
                }}
              >
                In the tumultuous business of cut.
              </Text>

              <Text
                style={{
                  height: 14,
                  width: 103,
                  color: "#A9ABB8",
                  fontFamily: "SFNSDisplay",
                  position: "relative",
                  fontSize: 12,
                  lineHeight: 15,
                  left: 133,
                  top: -128 - 49 - 16 + 25 - 35.71 + 21 - 1 + 25 + 15 + 2,
                }}
              >
                October 03, 2019
              </Text>

              <Image
                style={{
                  height: 85,
                  width: 85,
                  borderRadius: 10,
                  position: "relative",
                  top: -128 - 30 + 25 - 35.71 + 21 - 1 + 25 + 15 + 2,
                  left: "7.47%",
                }}
                source={require("../assets/images/PsatExam.png")}
              />

              <Text
                style={{
                  height: 14,
                  width: "9.2%",
                  color: "#0DB09F",
                  position: "relative",
                  fontFamily: "SFNSDisplay-Bold",
                  fontSize: 12,
                  lineHeight: 15,
                  left: 133,
                  top: -128 - 64 - 47 + 22 - 35.71 + 21 - 1 + 25 + 15 + 2,
                }}
              >
                PSAT
              </Text>

              <Text
                numberOfLines={2}
                style={{
                  height: "4.08%",
                  width: "51.47%",
                  color: "#1A1C36",
                  position: "relative",
                  fontFamily: "SFNSDisplay-Bold",
                  fontSize: 16,
                  lineHeight: 18,
                  left: 133,
                  top: -128 - 64 - 48 + 10 + 22 - 35.71 + 21 - 1 + 25 + 15 + 2,
                }}
              >
                In the tumultuous business of cut.
              </Text>

              <Text
                style={{
                  height: 14,
                  width: 103,
                  color: "#A9ABB8",
                  position: "relative",
                  fontFamily: "SFNSDisplay",
                  fontSize: 12,
                  lineHeight: 15,
                  left: 133,
                  top: -128 - 64 - 48 + 10 + 8 - 35.71 + 21 - 1 + 25 + 15 + 2,
                }}
              >
                October 03, 2019
              </Text>

              <Image
                style={{
                  height: 103,
                  width: "85.33%",
                  borderRadius: 10,
                  position: "relative",
                  top: -219 + 288 - 249 - 35.71 + 21 - 1 + 25 + 15 + 2,
                  left: "7.47%",
                }}
                source={require("../assets/images/studyforexams.png")}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

class SearchScreen extends React.Component {
  render() {
    const { width } = Dimensions.get("window");
    const height = Dimensions.get("window").height;
    return (
      <SafeAreaView>
        <View
          style={{ paddingTop: Platform.OS === "android" ? 25 : 0, flex: 1 }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Home")}
            style={{
              height: 20,
              width: 20,
              borderRadius: 4.29,
              position: "relative",
              left: 25,
              zIndex: 1,
              top: 17,
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
              source={require("../assets/Icons/keyboard_arrow_left.png")}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              top: 17,
              position: "absolute",
              width: width,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: Platform.OS === "android" ? 25 : 0,
            }}
          >
            <Text
              style={{
                width: "44.93%",
                color: "#1A1C36",
                fontFamily: "SFNSDisplay-Bold",
                fontSize: 16,
                lineHeight: 18,
                textAlign: "center",
              }}
            >
              Search
            </Text>
          </View>
          <Searchbar
            style={{
              boxSizing: "border-box",
              height: 54.2,
              width: "86.72%",
              border: "0.2px solid #0DB09F",
              borderRadius: 5,
              backgroundColor: "#FFFFFF",
              boxShadow: "0 16px 24px 0 rgba(0,0,0,0.05)",
              top: 65.9,
              left: "6.64%",
              position: "absolute",
              borderWidth: 0.3,
              borderColor: "#0DB09F",
              borderRadius: 5,
              shadowOffset: { width: 0, height: 0 },
              top: Platform.OS === "android" ? 25 + 65.9 : 65.9,
              shadowColor: "#000000",
              shadowOpacity: 0.2,
              shadowRadius: 80,
              elevation: 5,
            }}
            placeholder="Search"
          />
        </View>
      </SafeAreaView>
    );
  }
}

class UpcomingExamsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exams: [],
    };
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener("didFocus", () => {
      AsyncStorage.getItem("access_token").then((token) => {
        Functions.fetchUpcomingExams(token, this.updateUpcomingExams);
      });
    });
  }

  updateUpcomingExams = (exams) => {
    this.setState({ exams: exams });
    console.log(this.state.exams);
  };

  data = [
    {
      imageUrl: require("../assets/images/exam1.png"),
      examType: "ACT",
      title: "Kogi Cosby sweater ethical squid.",
      date: "October 03, 2019",
    },
    {
      imageUrl: require("../assets/images/exam2.png"),
      examType: "SAT",
      title: "Tousled food truck polaroid, sal.",
      date: "October 03, 2019",
    },
    {
      imageUrl: require("../assets/images/exam3.png"),
      examType: "PSAT",
      title: "Fixie tote bag ethnic keytar. Neu.",
      date: "October 03, 2019",
    },
    {
      imageUrl: require("../assets/images/exam4.png"),
      examType: "HS Entrance",
      title: "Keytar Mc weeney's Williamsburg,.",
      date: "October 03, 2019",
    },
    {
      imageUrl: require("../assets/images/exam5.png"),
      examType: "SAT",
      title: "Hella narwhal Cosby sweater McSw.",
      date: "October 04, 2019",
    },
  ];

  renderItem = ({ item }) => (
    <View
      style={{
        width: "79.47%",
        left: "7.47%",
        top: "0%",
        elevation: 0,
        shadowOpacity: 0,
        shadowColor: "",
        paddingLeft: 0,
        borderWidth: 0,
        marginBottom: 30,
      }}
    >
      <Image
        style={{ height: 85, width: 85, borderRadius: 10, top: 0, left: 0 }}
        source={{ uri: item.IMAGE }}
      />

      <Text
        style={{
          height: 14,
          width: 80,
          position: "absolute",
          color: "#0DB09F",
          fontFamily: "SFNSDisplay-Bold",
          fontSize: 12,
          lineHeight: 15,
          top: 4,
          left: 105,
        }}
      >
        {item.TYPE}
      </Text>

      <Text
        numberOfLines={2}
        style={{
          height: 43,
          width: 203,
          color: "#1A1C36",
          position: "absolute",
          fontFamily: "SFNSDisplay-Bold",
          fontSize: 16,
          lineHeight: 18,
          left: 105,
          top: 23,
        }}
      >
        {item.NAME}
      </Text>

      <Text
        style={{
          height: 14,
          width: 103,
          color: "#A9ABB8",
          fontFamily: "SFNSDisplay",
          fontSize: 12,
          lineHeight: 15,
          top: 70,
          position: "absolute",
          left: 105,
        }}
      >
        {Moment(item.DATE).format("MMMM DD, YYYY")}
      </Text>
    </View>
  );
  render() {
    const { width } = Dimensions.get("window");
    const height = Dimensions.get("window").height;
    return (
      <SafeAreaView>
        <View style={{ paddingTop: Platform.OS === "android" ? 25 : 0 }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Home");
            }}
            style={{
              height: 20,
              width: 20,
              borderRadius: 4.29,
              position: "relative",
              left: 25,
              zIndex: 1,
              top: 18,
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
              source={require("../assets/Icons/keyboard_arrow_left.png")}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              top: 18,
              position: "absolute",
              width: width,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: Platform.OS === "android" ? 25 : 0,
            }}
          >
            <Text
              style={{
                width: "44.93%",
                color: "#1A1C36",
                fontFamily: "SFNSDisplay-Bold",
                fontSize: 16,
                lineHeight: 18,
                textAlign: "center",
              }}
            >
              Upcoming Exams
            </Text>
          </View>
          <FlatList
            style={{
              width: "100%",
              position: "absolute",
              height: height * 0.9,
              left: "0%",
              top: Platform.OS === "android" ? 25 + 77 : 77,
            }}
            contentInset={{ bottom: 90 }}
            showsVerticalScrollIndicator={false}
            vertical
            data={this.state.exams}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
          />
        </View>
      </SafeAreaView>
    );
  }
}

SearchScreen.navigationOptions = {
  title: "",
  header: null,
};

UpcomingExamsScreen.navigationOptions = {
  title: "",
  header: null,
};

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Search: SearchScreen,
    UpcomingExams: UpcomingExamsScreen,
  },
  {
    initialRouteName: "Home",
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

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

function _onPressButton() {
  alert("You tapped the button!");
}

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  console.log(this);
  console.log("AAAAA");
  //    const { navigation } = this.props;
  //    const { navigate } = navigation;

  navigate("ProfileScreen");

  //    WebBrowser.openBrowserAsync(
  //                                'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  //                                );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /*backgroundColor: '#fff',*/
    backgroundColor: "#fff",
  },
  container2: {
    flex: 1,
    backgroundColor: "green",
  },

  viewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flex: 1,
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 0,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },
  userNameText: {
    height: 34,
    width: "88.13%",
    color: "#1A1C36",
    fontFamily: "SFNSDisplay-Bold",
    left: 28,
    top: 24,
    fontSize: 28,
    textAlign: "left",
    lineHeight: 33,
  },
  videoPlayer: {
    width: 320,
    height: 186,
    position: "relative",
    left: 28,
    top: 192.8,
  },
  whatYouWantToLearn: {
    height: 22,
    width: "88.13%",
    color: "#A9ABB8",
    fontFamily: "SFNSDisplay",
    fontSize: 14,
    lineHeight: 17,
    position: "relative",
    height: 22,
    left: 27,
    top: 37 - 2,
  },
  tabBarInfoContainer: {
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
