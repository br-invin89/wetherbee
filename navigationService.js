import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    console.log("function setTopLevelNavigator(navigatorRef)")
  _navigator = navigatorRef;
}

function navigateMainNavigator(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function navigateAndReset() {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'App' })],
    })
  );
}

function navigateAndReset2() {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Auth' })],
    })
  );
}

function logout() {
  _navigator.dispatch(
    NavigationActions.navigate({ routeName: 'Auth' }),
  );
}


function skipAuth() {
    console.log("mmana: " + _navigator)
  _navigator.dispatch(
    NavigationActions.navigate({ routeName: 'Main' }),
  );
}



// add other navigation functions that you need and export them

export default {
  setTopLevelNavigator,
  navigateMainNavigator,
  navigateAndReset,
  logout,
  skipAuth
};
