import React, { Component } from 'react';
import {StyleSheet, Dimensions, Text, View, Aleft} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Badge } from 'native-base';
import {AnnoncesScreen, MessageScreen, AccessScreen} from '../route/ScreenName';
export default class FootersDetails extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      like: this.props.dataSendFooter.like
    };
  }

  like(){
    this.setState({like:!this.state.like})
    // this.props.updateLike(this.state.like)
  }

  render() {
    return (
      
        <Footer>
          <FooterTab style ={styles.FooterTabColor} >
            <Button vertical>
              <Icon name="ios-call" />
              <Text style ={styles.text} >Call</Text>
            </Button>
            <Button vertical>
              <Icon name="ios-chatboxes" />
              <Text style ={styles.text} >Messages</Text>
            </Button>
            <Button vertical onPress = {this.like.bind(this)} >
            {(this.state.like == true) ? <Icon active name="ios-heart" /> : <Icon active name="ios-heart-outline" /> }
              
              <Text style ={styles.text} >Like</Text>
            </Button>
          </FooterTab>
        </Footer>
      
    );
  }
}
const bleuOhome = '#152a45';
const yellowOhome = '#f5d017'
const styles = StyleSheet.create({
  FooterTabColor:{
    backgroundColor:bleuOhome,
  },
  text:{
    color:'#FFF'
  },
  button:{
  	width:5,
  	height:50
  },
  Icon:{
    fontSize:20,
    color:'#FFF',
  }
})