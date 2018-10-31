import React, { Component } from 'react';
import {View} from 'react-native';
import {Container, Content, Header, Icon, Left, Button, Title} from 'native-base';
import {LoginScreen} from '../route/ScreenName';
import {removeEmailRes, removePassRes} from './services/Services';
export default class Logout extends Component {
	static navigationOptions = {
		drawerIcon:(
				<Icon name = "md-exit" style ={{paddingLeft:10, color:'#152a45', width:38}} />
			)
	}
	constructor(props) {
		super(props);
		global.type = null
		//console.warn(global.type);
		removeEmailRes();
		removePassRes();
		this.props.navigation.navigate(LoginScreen);
	  this.state = {};
	}
	render() {
		return (
			<View>
				
			</View>
		);
	}
}
