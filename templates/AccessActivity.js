import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity
}
from 'react-native';
import style from '../Styles/Style';
import {Container, Content, Header, Icon, Left, Button, Title} from 'native-base';
import {LoginScreen} from '../route/ScreenName';
import Headers from '../header/Headers';
import Footers from '../footer/Footers';
export default class AccessActivity extends Component {

	static navigationOptions = {
		drawerIcon:(
				<Icon name = "ios-key" style ={{color:'#152a45'}} />
			)
	}
	render() {
		const titre = 'Access';
		const {navigation} = this.props;
		let dataSend = {
			titre,
			navigation
		}
		return (
			<Container>
				<Headers dataSend={dataSend} />
				<Content contentContainerStyle={styles.container}>
					<Image style = {{width:150, height:150}} source = {require('../img/home.png')} />
					<View  style={{marginTop:-110}}>
						<TouchableOpacity>
							<Button style= {{width:100, height: 100}} transparent primary>
				              <View style ={styles.rondYellow} >
				              	<Icon style ={styles.Icon} name="ios-key" />
				              </View>
				            </Button>
						</TouchableOpacity>
					</View>
					<View style = {{marginTop: 20}} >
						<Text style = {{fontSize:18, color:'#152a45'}} > Press in this icon to open the door </Text>
					</View>
				</Content>
				<Footers navigation ={dataSend} />
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	rondYellow:{
	  	alignItems:'center',
	  	justifyContent:'center',
	  	height:100,
	  	width:100,
	  	borderRadius:50,
	  	backgroundColor:'#f5d017'
    },
    Icon:{
      fontSize:40,
      color:'#FFF',
    },
})
