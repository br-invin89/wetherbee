import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
console.disableYellowBox = false;


export default function App(props) {

      
    

  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
      console.log("Loading...")
      
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
            
    );
  } else {
      console.log("Done Loading...")
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
            <AppNavigator/>
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([

    require('./assets/images/ACT.png'),
    require('./assets/images/PSAT.png'),
    require('./assets/images/HSEntrance.png'),
    require('./assets/images/SAT.png'),
    require('./assets/images/allowParents.png'),
    require('./assets/images/arrow.png'),
    require('./assets/images/ast.png'),
    require('./assets/images/bg_img1.png'),
    require('./assets/images/bg_prize.png'),
    require('./assets/images/combinedShape.png'),
    require('./assets/images/ct1.png'),
    require('./assets/images/ct2.png'),
    require('./assets/images/ct3.png'),
    require('./assets/images/ct4.png'),
    require('./assets/images/incorrectQuestion.png'),
    require('./assets/images/notification1.png'),
    require('./assets/images/notification2.png'),
    require('./assets/images/notification3.png'),
    require('./assets/images/prizeOval.png'),
    require('./assets/images/question1.png'),
    require('./assets/images/question2.png'),
    require('./assets/images/question3.png'),
    require('./assets/images/question4.png'),
    require('./assets/images/question5.png'),
    require('./assets/images/star.png'),
    require('./assets/images/studyforexam.png'),
    require('./assets/images/studyforexams.png'),
    require('./assets/images/totA.png'),
    require('./assets/images/totQ.png'),
    require('./assets/images/ActExam.png'),
    require('./assets/images/ActLogo.png'),
    require('./assets/images/exam1.png'),
    require('./assets/images/exam2.png'),
    require('./assets/images/exam3.png'),
    require('./assets/images/exam4.png'),
    require('./assets/images/exam5.png'),
    require('./assets/images/favorite.png'),
    require('./assets/images/keyboard_arrow_left.png'),
    require('./assets/images/Oval.png'),
    require('./assets/images/pop1.png'),
    require('./assets/images/popular.png'),
    require('./assets/images/PsatExam.png'),
    require('./assets/Icons/arrow2.png'),
    require('./assets/Icons/calendar_today-24px.png'),
    require('./assets/Icons/cancel.png'),
    require('./assets/Icons/close.png'),
    require('./assets/Icons/english-language.png'),
    require('./assets/Icons/keyboard_arrow_left_white.png'),
    require('./assets/Icons/keyboard_arrow_left.png'),
    require('./assets/Icons/arrow.png'),
    require('./assets/Icons/crop_free.png'),
    require('./assets/Icons/play_circle_filled_white.png'),
    require('./assets/Icons/search.png'),
    require('./assets/images/forgotPassword.png'),
    require('./assets/images/getStarted.png'),
    require('./assets/images/LogInBG.png'),
    require('./assets/images/SignUpBG.png'),
    require('./assets/images/splash.png'),
    require('./assets/images/wetherbees_unofficial_logo.png'),
    require('./assets/images/actSignUp.png'),
    require('./assets/images/check_circle.png'),
    require('./assets/images/getStarted.png'),
    require('./assets/images/psatSignUp.png'),
    require('./assets/images/satSignUp.png'),
    require('./assets/Icons/keyboard_arrow_left_white.png'),
    require('./assets/images/1place.png'),
    require('./assets/images/2place.png'),
    require('./assets/images/3place.png'),
    require('./assets/images/4place.png'),
    require('./assets/images/5place.png'),
    require('./assets/images/6place.png'),
    require('./assets/images/7place.png'),
    require('./assets/images/8place.png'),
    require('./assets/images/9place.png'),
    require('./assets/images/10place.png'),
    require('./assets/images/starOn.png'),
    require('./assets/images/starOff.png'),
    require('./assets/images/crown.png'),
    require('./assets/images/leaderboardBG.png'),
    require('./assets/images/detailStar.png'),
    require('./assets/images/detailHeadshot.png'),
    require('./assets/images/cardBG.png'),
    require('./assets/images/cardScreenBG2.png'),
    require('./assets/Icons/backCardIcon.png'),
    require('./assets/Icons/startOverCardIcon.png'),
    require('./assets/Icons/cardAudio.png'),
    require('./assets/Icons/cardStar.png'),
    require('./assets/Icons/addGroup.png'),
    require('./assets/Icons/cancel_left.png'),
    require('./assets/Icons/cancel-mark.png'),
    require('./assets/Icons/correct-symbol.png'),
    require('./assets/Icons/download.png'),
    require('./assets/Icons/flashcard.png'),
    require('./assets/Icons/keyboard_arrow_left2.png'),
    require('./assets/Icons/learn.png'),
    require('./assets/Icons/share.png'),
    require('./assets/Icons/test.png'),
    require('./assets/Icons/write.png'),
    require('./assets/Icons/writeImage.png'),
    require('./assets/Icons/keyboard_arrow_left_white.png'),
    require('./assets/Icons/keyboard_arrow_left_white2.png'),
    require('./assets/Icons/homeIconOn.png'),
    require('./assets/Icons/analyticsIconOn.png'),
    require('./assets/Icons/leaderboardIconOn.png'),
    require('./assets/Icons/profileIconOn.png'),
    require('./assets/Icons/homeIconOff.png'),
    require('./assets/Icons/analyticsIconOff.png'),
    require('./assets/Icons/leaderboardIconOff.png'),
    require('./assets/Icons/profileIconOff.png'),
    require('./assets/images/tabBar.png'),
    require('./assets/Icons/subjectIcon.png'),
    require('./assets/images/subjectTerms.png'),
    require('./assets/images/soundSubject.png'),
    require('./assets/images/expandSubject.png'),
    require('./assets/Icons/cancel_left.png'),
    require('./assets/Icons/cancel_left.png'),
    require('./assets/images/testResultsImage.png'),
    require('./node_modules/react-native-calendars/src/calendar/img/next.png'),
    require('./node_modules/react-native-calendars/src/calendar/img/previous.png'),
    require('./assets/images/testResultsImage.png'),
    require('./assets/images/testResultsImage.png'),
    require('./assets/images/testResultsImage.png'),
    require('./assets/Icons/airDrop.png'),
    require('./assets/Icons/cancelShareModal.png'),
    require('./assets/Icons/CloseButton.png'),
    require('./assets/Icons/closeShare.png'),
    require('./assets/Icons/contact1.png'),
    require('./assets/Icons/contact2.png'),
    require('./assets/Icons/contact3.png'),
    require('./assets/Icons/contact4.png'),
    require('./assets/Icons/contact5.png'),
    require('./assets/Icons/contactSMS.png'),
    require('./assets/Icons/copy.png'),
    require('./assets/Icons/copyButton.png'),
    require('./assets/Icons/mail.png'),
    require('./assets/Icons/messages.png'),
    require('./assets/Icons/notes.png'),
    require('./assets/Icons/readinglist.png'),
    require('./assets/Icons/readingListButton.png'),
    require('./assets/Icons/reminders.png'),
    require('./assets/Icons/addGroup.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'SFNSDisplay': require('./assets/fonts/SFNSDisplay.ttf'),
      'SFNS-Pro': require('./assets/fonts/SFProText-Regular.ttf'),
      'SFNSDisplay-Bold': require('./assets/fonts/SFNSDisplay-Bold.ttf'),
      'Helvetica': require('./assets/fonts/Helvetica.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
    
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
