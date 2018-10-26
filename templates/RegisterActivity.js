import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Dimensions
}
from 'react-native';
import style from '../Styles/Style';
import {Container, Content, Header, Icon, Left, Button, Title} from 'native-base';
import {LoginScreen, HeaderScreen} from '../route/ScreenName';
import Headers from '../header/Headers';
import Footers from '../footer/Footers';

export default class Register extends Component {

	static navigationOptions = {
		drawerIcon:(
				<Icon name = "ios-contact" style ={{color:'#152a45'}} />
			)
	}

componentDidMount(){
	// const {navigation} = this.props;
	// console.warn(navigation);
}
	render() {
		const titre = 'Profile';
		const {navigation} = this.props;
		let dataSend = {
			titre,
			navigation
		}
		return (
			<Container>
				<Headers dataSend ={dataSend} />
				<Content contentContainerStyle={styles.container}>
					<TouchableOpacity onPress={()=> 
										navigation.navigate(LoginScreen)
					}>
						<Text style ={{fontSize:20, color:'#152a45'}} > Profile </Text>
					</TouchableOpacity>
				</Content>
				<Footers navigation ={navigation} />
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	}
})
