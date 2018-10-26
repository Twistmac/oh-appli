import React, { Component } from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Container, Content, Header, Icon, Left, Button, Title, Body, Right} from 'native-base';
import style from '../Styles/Style';
import ModalDropdown from 'react-native-modal-dropdown';
import {getCategories} from '../templates/services/Services';

export default class Headers extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	dataCategorie : []
	  };
	}

	componentDidMount(){

		
	}

	_onSelect(idx, value) {
		// console.warn(value);
	    // this.setState({
	    //   icon_heart: !this.state.dropdown_6_icon_heart,
	    // })
  	}


	render() {
		return (
			
				<Header style ={styles.Header} >
					<Left style = {{flex: 1}} >
						 
					</Left>
					<Body style = {{flex: 1,alignItems:'center'}} >
		            	<Title style ={{color:'#152a45'}} >{this.props.dataSend.titre} </Title>
		            </Body>
		            <Right style = {{flex: 1}}>
		            	
		            </Right>
	            </Header>
            
		);
	}
}

const styles = StyleSheet.create({
	Header:{
		backgroundColor:'#FFF',
	},
	IconLeft:{
		left:-28,
		height:50,
		width:50,
		fontSize:50,
		color:'#152a45',
	},
	IconRight:{
		height:30,
		width:45,
		fontSize:40,
		color:'#152a45',
	},
	dropdown:{
		// height:-1
	}
})
