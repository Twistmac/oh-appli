import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,

}
from 'react-native';
import {
	Container,
	Content, 
	Header, 
	Icon, 
	Left, 
	Button, 
	Title, 
	InputGroup,
	Input,
	Accordion,
	Item,
	ListItem,
	List
} 
from 'native-base';
import style from '../Styles/Style';

export default class HeadersAllPage extends Component {
	render() {
		return (
			
				<Content contentContainerStyle={style.container}>
					<View style={styles.viewImage} >
						<Image
						style={styles.image}
						source = {require('../img/logo1.png')} >
						</Image>
					</View>
					<View style ={styles.viewTextTop} >
						<Text style={styles.textTop} >{this.props.titre} </Text>
					</View>
				</Content>
			
		);
	}
}

const bleuOhome = '#152a45';
const black = 'black';
const white = '#FFF'
const styles = StyleSheet.create({
	textTop:{
		color:'#FFF', 
		fontFamily:"Entypo", 
		fontSize:20, 
		fontStyle:'italic'
	},
	viewImage:{
		backgroundColor:bleuOhome, 
		height:100, 
		flex:1, 
		alignItems:'center', 
		justifyContent:'center'
	},
	image:{
		height:'30%', 
		width:'80%', 
		resizeMode:'contain', 
		flex:1
	},
	viewTextTop:{
		backgroundColor:bleuOhome, 
		alignItems:'center', 
		justifyContent:'center', 
		paddingBottom:15
	},
})