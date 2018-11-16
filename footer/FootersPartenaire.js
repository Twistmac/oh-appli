import React, { Component } from 'react';
import {StyleSheet, Dimensions, Text, View} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Badge } from 'native-base';
import {AnnoncesScreen, MessageScreen, AccessScreen, AnnonceResidenceScreen} from '../route/ScreenName';
export default class FootersPartenaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      couleurAd:'#5067FF',
      couleurMsg:'#5067FF',
      couleurAcces:'#5067FF'
    };
  }
  
  componentWillMount(){
    // console.warn(this.props.navigation.titre);
    let titre = this.props.navigation.titre;
    if (titre === 'Ads') {
      this.setState({
        //jaune
        couleurAd:'#f5d017'
      })
    }else{
      //bleu
        couleurAd:'#5067FF'
    }

    if (titre === 'Messages') {
      this.setState({
        //jaune
        couleurMsg:'#f5d017'
      })
    }else{
      //bleu
        couleurMsg:'#5067FF'
    }

    if (titre === 'Access') {
      this.setState({
        //jaune
        couleurAcces:'#f5d017'
      })
    }else{
      //bleu
        couleurAcces:'#5067FF'
    }
  }
  annonces(){
    // this.setState({
    //   activeButtonAnnonces:true,
    //   activeButtonMessages : false,
    //   activeButtonkeys : false,
    // })
    this.props.navigation.navigation.navigate(AnnonceResidenceScreen)
  }

  messages(){
    // this.setState({
    //   activeButtonAnnonces:false,
    //   activeButtonMessages : true,
    //   activeButtonkeys : false,
    // })
    this.props.navigation.navigation.navigate(MessageScreen)
  }

  
  render() {
    return (
      
        <Footer style = {{backgroundColor:'transparent'}} >
          <FooterTab  style={styles.FooterTabColor}>
            <Button 
              onPress ={this.annonces.bind(this)} >
              <View style ={[styles.rondYellow,{backgroundColor:this.state.couleurAd}]}>
              	<Icon style ={styles.Icon} name="ios-list-box" />
              </View>
            </Button>
            <Button
              onPress ={this.messages.bind(this)}>
              <View style ={[styles.rondYellow,{backgroundColor:this.state.couleurMsg}]}>
	              {/*<Badge ><Text>51</Text></Badge>*/}
	              <Icon style ={styles.Icon} name="ios-text" />
              </View>
            </Button>
            
          </FooterTab>
        </Footer>
      
    );
  }
}

const styles = StyleSheet.create({
  FooterTabColor:{
    backgroundColor:'transparent',
  },
  button:{
  	width:5,
  	height:50
  },
  Icon:{
    fontSize:20,
    color:'#FFF',
  },
  rondBleu:{
  	alignItems:'center',
  	justifyContent:'center',
  	height:50,
  	width:50,
  	borderRadius:50,
  },
  rondYellow:{
  	alignItems:'center',
  	justifyContent:'center',
  	height:50,
  	width:50,
  	borderRadius:50,
  }
})