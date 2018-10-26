import React, { Component } from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import { Container, Header, View, Button, Icon, Fab, Text } from 'native-base';
import {LoginScreen, DetailsScreen, AjoutAdsScreen} from '../route/ScreenName';
const width = Dimensions.get('window').width;
export default class FAB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  goto(){
    this.props.navigation.navigate(AjoutAdsScreen)
  }
  render() {
    return (  
        
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{left:'42%', bottom:70}}
            style={{ backgroundColor: '#f5d017' }}
            position="bottomLeft"
            onPress={this.goto.bind(this)}>
            <Icon style = {{fontSize:40}} name="ios-add" />
          </Fab>
        
    );
  }
}


const styles = StyleSheet.create({
  leftFab:{
    left:(width)
  }
})