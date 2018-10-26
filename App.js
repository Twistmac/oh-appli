import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  BackHandler, DeviceEventEmitter, Alert
} from 'react-native';
import {

  MenuProvider,
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { connect } from 'react-redux';


//redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './templates/reducers';
//fin redux

import {Root} from 'native-base';
import Routenavigation from './route/RouteNavigation';
import Chat from './templates/chat/Chat';

// type Props = {};
class App extends Component {
  constructor(props) {
    super(props);
    this.backPressSubscriptions = new Set()
    this.state = {};
  }

  /*onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
  Alert.alert(
            '',
            "Fermer l'application?",
            [
                {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Quitter', onPress: () => BackHandler.exitApp()},
            ],
            { cancelable: false });

        return true;
  }*/

   componentDidMount () {
    DeviceEventEmitter.removeAllListeners('hardwareBackPress')
    DeviceEventEmitter.addListener('hardwareBackPress', () => {
      let invokeDefault = true
      const subscriptions = []

      this.backPressSubscriptions.forEach(sub => subscriptions.push(sub))

      for (let i = 0; i < subscriptions.reverse().length; i += 1) {
        if (subscriptions[i]()) {
          invokeDefault = false
          break
        }
      }

      if (invokeDefault) {
        BackHandler.exitApp()
      }
    })

    this.backPressSubscriptions.add(this.handleHardwareBack)
  }

  componentWillUnmount () {
    DeviceEventEmitter.removeAllListeners('hardwareBackPress')
    this.backPressSubscriptions.clear()
  }

  handleHardwareBack = () => { 
         Alert.alert(
            '',
            "Fermer l'application?",
            [
                {text: 'Annuler', onPress: () => console.log('reset'), style: 'cancel'},
                {text: 'Quitter', onPress: () => BackHandler.exitApp()},
            ],
            { cancelable: false });

        return true;
   }
  render() {
    const navigation = this.props;
    return (
    	<Root>
          <Provider store ={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
            <MenuProvider>
            		<Routenavigation />
            </MenuProvider>    
          </Provider>
      </Root>
    );
  }
}

export default App; 
