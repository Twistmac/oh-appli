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
		getCategories().then((data) =>{
	 		var dataCategorie = [];
			for (var i = 0; i < data.categories.length ; i++) {
				dataCategorie[i] = data.categories[i].name
			}
			this.setState({
				dataCategorie:dataCategorie
			})
		})
		
	}

	_onSelect(idx, value) {
		this.props.filterData(value)
  	}

	_renderFilter(){
		const dropdown_6_icon = this.state.dropdown_6_icon_heart ? require('../img/acces.png') : require('../img/add.png');
		const DEMO_OPTIONS_1 = ['Categorieee', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9'];
		if (this.props.dataSend.titre === 'Ads') {
			return(

				<View style={styles.cell}>
				  <ModalDropdown style={styles.dropdown}
				  	dropdownStyle = {{height:380, paddingHorizontal:20, marginTop:10}}
				  	dropdownTextStyle = {{fontSize:18, color:'black'}}
	                options={this.state.dataCategorie}
	                onSelect={(idx, value) => this._onSelect(idx, value)}>
				    
    	            	<Icon
    	            		style = {styles.IconRight}
    	            		ios="ios-funnel" 
    	            		android="ios-funnel"
    	            		/>
    	            
				  </ModalDropdown>
				</View>
			);
		}else{
			return(
				<Button transparent iconRight light>
				  
	            </Button>
			);
		}
	}

	render() {
		return (
			
				<Header style ={styles.Header} >
					<Left style = {{flex: 1}} >
						 <Button onPress={() =>  this.props.dataSend.navigation.openDrawer()} 
						  transparent iconLeft light>
			            	<Icon
			            		style = {styles.IconLeft}
			            		ios="ios-menu" 
			            		android="ios-menu"
			            		/>
			            </Button>
					</Left>
					<Body style = {{flex: 1,alignItems:'center'}} >
		            	<Title style ={{color:'#152a45'}} >{this.props.dataSend.titre} </Title>
		            </Body>
		            <Right style = {{flex: 1}}>
		            	{this._renderFilter()}
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
