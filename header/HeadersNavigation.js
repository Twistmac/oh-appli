import React, { Component } from 'react';
import {StyleSheet, BackHandler} from 'react-native';
import {Container, Content, Header, Icon, Left, Button, Title, Body, Right} from 'native-base';
import style from '../Styles/Style';
export default class HeadersNavigation extends Component {
	constructor(props) {
	  super(props);
		this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
	  this.state = {};
	}
	componentWillMount() {
	    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
	}

	componentWillUnmount() {
	    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
	}

	handleBackButtonClick() {
	    this.props.dataSend.navigation.goBack(null);
	    return true;
	}
	render() {
		return (
				<Header style ={styles.Header}>
					<Left>
						 <Button onPress={this.handleBackButtonClick.bind(this)}
						  transparent iconLeft light>
			            	<Icon
			            		style = {styles.IconLeft}
			            		ios="ios-arrow-dropleft-circle" 
			            		android="ios-arrow-dropleft-circle"
			            		/>
			            </Button>
					</Left>
					<Body style={{marginLeft:30, alignSelf: 'center'}} >
		            	<Title>{this.props.dataSend.titre} </Title>
		            </Body>
		            <Right>
		            	
		            </Right>
	            </Header>
            
		);
	}
}

const styles = StyleSheet.create({
	Header:{
		backgroundColor:'#152a45',
	},
	IconLeft:{
		height:50,
		width:50,
		fontSize:50,
		color:'#FFF',
	},
	IconRight:{
		height:30,
		width:45,
		fontSize:40,
		color:'#FFF',
	}
})
