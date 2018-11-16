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
	Picker,
	Accordion,
	Item,
	ListItem,
	List,
	DatePicker,
	Toast
} 
from 'native-base';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import {updateProfilPartenaire, getProfile,AnnoncePartenaire, getDetailPartenaire} from './services/Services';
import style from '../Styles/Style';
import {HomePartenaireScreen} from '../route/ScreenName';
import Headers from '../header/Headers';
import FootersPartenaire from '../footer/FootersPartenaire';
import { Base64 } from 'js-base64';

const _format = 'YYYY-MM-DD';
export default class ProfilePartenaireActivity extends Component {
    
	static navigationOptions = {
		drawerIcon:(
				<Icon name = "ios-contact" style ={{color:'#152a45'}} />
			)
    }
    
	constructor(props) {
	  super(props);
	  // this.state = { chosenDate: new Date() };
      this.setDate = this.setDate.bind(this);
      
      
	  this.state = {
	  	visibleSpinner: false,
	  	id_partenaire:global.detailPartenaire[0].id_partenaire,
	  	firstname:'',
	  	lastname:'',
	  	//birthday:'',
	  	pseudo:'',
	  	phonenumber:'',
	  	email: '',
        password: '',
        confirmPassword:'',
        

	  	inputSuccessFirst:false,
	  	inputErrorFirst:false,

	  	inputSuccessLast:false,
	  	inputErrorLast:false,

	  	//inputSuccessSex:false,
	  	//inputErrorSex:false,

	  	//inputSuccessBirth:false,
	  	//inputErrorBirth:false,

	  	inputSuccessPseudo:false,
	  	inputErrorPseudo:false,

	  	inputSuccessPhone:false,
	  	inputErrorPhone:false,

	  	inputSuccessEmail:false,
	  	inputErrorEmail:false,

	  	inputSuccessPwd:false,
	  	inputErrorPwd:false,

	  	inputSuccessPwdConfirm:false,
	  	inputErrorPwdConfirm:false,
	  	sex: 'Male',
	  	chosenDate: ''
	  }
    };
    
    
	componentDidMount(){
        //console.warn(global.detailPartenaire[0].phone)
        this.setState({id_partenaire:global.detailPartenaire[0].id_partenaire});
        this.setState({
            		firstname:global.detailPartenaire[0].prenom,
            	  	lastname:global.detailPartenaire[0].nom,
            	  	//birthday:data.birthday,
            	  	pseudo:global.detailPartenaire[0].username,
             	  	phonenumber:global.detailPartenaire[0].phone,
            	  	email: global.detailPartenaire[0].email,
            	  	//password: data.salt,
            	  	//sex:data.sex
				 });
		
	}
	setDate(newDate) {
	    this.setState({ chosenDate: moment(newDate).format(_format) });
    };
    

    renderIconFirst(){
			if(this.state.firstname === '' && (this.state.inputErrorFirst == false && this.state.inputSuccessFirst == false)){
				return(
				<Icon />
				);
			}else if(this.state.firstname !== '' && this.state.inputSuccessFirst == true){
				return(
				<Icon name='ios-checkmark-circle' style = {{paddingRight:40}} />
				);
			}else if(this.state.firstname === '' && (this.state.inputErrorFirst == true && this.state.inputSuccessFirst == false)) {
				return(
				<Icon name='close-circle' style = {{paddingRight:40}} />
				);
			}
	};

	renderIconLast(){
			if(this.state.lastname === '' && (this.state.inputErrorLast == false && this.state.inputSuccessLast == false)){
				return(
				<Icon />
				);
			}else if(this.state.lastname !== '' && this.state.inputSuccessLast == true){
				return(
				<Icon name='ios-checkmark-circle' style = {{paddingRight:40}} />
				);
			}else if(this.state.lastname === '' && (this.state.inputErrorLast == true && this.state.inputSuccessLast == false)) {
				return(
				<Icon name='close-circle' style = {{paddingRight:40}} />
				);
			}
	};

	// renderIconsex(){
	// 		if(this.state.sex === '' && (this.state.inputErrorSex == false && this.state.inputSuccessSex == false)){
	// 			return(
	// 			<Icon />
	// 			);
	// 		}else if(this.state.sex !== '' && this.state.inputSuccessSex == true){
	// 			return(
	// 			<Icon name='ios-checkmark-circle' style = {{paddingRight:40}} />
	// 			);
	// 		}else if(this.state.sex === '' && (this.state.inputErrorSex == true && this.state.inputSuccessSex == false)) {
	// 			return(
	// 			<Icon name='close-circle' style = {{paddingRight:40}} />
	// 			);
	// 		}
	// };

	

	renderIconPseudo(){
			if(this.state.pseudo === '' && (this.state.inputErrorPseudo == false && this.state.inputSuccessPseudo == false)){
				return(
				<Icon />
				);
			}else if(this.state.pseudo !== '' && this.state.inputSuccessPseudo == true){
				return(
				<Icon name='ios-checkmark-circle' style = {{paddingRight:40}} />
				);
			}else if(this.state.pseudo === '' && (this.state.inputErrorPseudo == true && this.state.inputSuccessPseudo == false)) {
				return(
				<Icon name='close-circle' style = {{paddingRight:40}} />
				);
			}
	};

	renderIconPhone(){
			if(this.state.phonenumber === '' && (this.state.inputErrorPhone == false && this.state.inputSuccessPhone == false)){
				return(
				<Icon />
				);
			}else if(this.state.phonenumber !== '' && this.state.inputSuccessPhone == true){
				return(
				<Icon name='ios-checkmark-circle' style = {{paddingRight:40}} />
				);
			}else if(this.state.phonenumber === '' && (this.state.inputErrorPhone == true && this.state.inputSuccessPhone == false)) {
				return(
				<Icon name='close-circle' style = {{paddingRight:40}} />
				);
			}
	};


	renderIconEmail(){
			if(this.state.email === '' && (this.state.inputErrorEmail == false && this.state.inputSuccessEmail == false)){
				return(
				<Icon />
				);
			}else if(this.state.email !== '' && this.state.inputSuccessEmail == true){
				return(
				<Icon name='ios-checkmark-circle' style = {{paddingRight:40}} />
				);
			}else if(this.state.email === '' && (this.state.inputErrorEmail == true && this.state.inputSuccessEmail == false)) {
				return(
				<Icon name='close-circle' style = {{paddingRight:40}} />
				);
			}
	};
	renderIconPwd(){
			if(this.state.password === '' && (this.state.inputErrorPwd == false && this.state.inputSuccessPwd == false)){
				return(
				<Icon />
				);
			}else if(this.state.password !== '' && this.state.inputSuccessPwd == true){
				return(
				<Icon name='ios-checkmark-circle' style = {{paddingRight:40}} />
				);
			}else if(this.state.password === '' && (this.state.inputErrorPwd == true && this.state.inputSuccessPwd == false)) {
				return(
				<Icon name='close-circle' style = {{paddingRight:40}} />
				);
			}
	};
	renderIconPwdConfirm(){
			if(this.state.confirmPassword === ''){
				return(
				<Icon />
				);
			}else if(this.state.confirmPassword === this.state.password){
				return(
				<Icon name='ios-checkmark-circle' style = {{paddingRight:40}} />
				);
			}else if(this.state.confirmPassword !== this.state.password) {
				return(
				<Icon name='close-circle' style = {{paddingRight:40}} />
				);
			}
	};


	postRegister(){
		let etat = this.state;
		const {navigation} = this.props;
		//firstname
		if (etat.firstname === '') {
			this.setState({
				inputSuccessFirst:false,
				inputErrorFirst:true,
			});
		}else{
			this.setState({
				inputSuccessFirst:true,
				inputErrorFirst:false,
			});
		}

		//lastname
		if (etat.lastname === '') {
			this.setState({
				inputSuccessLast:false,
				inputErrorLast:true,
			});
		}else{
			this.setState({
				inputSuccessLast:true,
				inputErrorLast:false,
			});
		}


		//pseudo
		if (etat.pseudo === '') {
			this.setState({
				inputSuccessPseudo:false,
				inputErrorPseudo:true,
			});
		}else{
			this.setState({
				inputSuccessPseudo:true,
				inputErrorPseudo:false,
			});
		}

		//phonenumber
		if (etat.phonenumber === '') {
			this.setState({
				inputSuccessPhone:false,
				inputErrorPhone:true,
			});
		}else{
			this.setState({
				inputSuccessPhone:true,
				inputErrorPhone:false,
			});
		}
		//email
		if (etat.email === '') {
			this.setState({
				inputSuccessEmail:false,
				inputErrorEmail:true,
			});
		}else{
			this.setState({
				inputSuccessEmail:true,
				inputErrorEmail:false,
			});
		}
		//password
		if (etat.password === '') {
			this.setState({
				inputSuccessPwd:true,
				inputErrorPwd:false,
			})
		}else{
			this.setState({
				inputSuccessPwd:true,
				inputErrorPwd:false,
			})
        }
        
		const params = {
			id_partenaire:etat.id_partenaire,
			prenom:etat.firstname,
			nom:etat.lastname,
			//sex:etat.sex,
			//birthday:etat.chosenDate,
			phone:etat.phonenumber,
			username:etat.pseudo,
			email:etat.email,
			password: (etat.password=='') ? global.detailPartenaire[0].pass : etat.password,
        }
        

		// console.warn(params);
		if (etat.firstname !=='' && etat.lastname !== '' && etat.chosenDate != undefined && etat.pseudo !== '' && etat.phonenumber !=='' && etat.email !== '') {
			updateProfilPartenaire(params).then((result) =>{
				 //console.warn(result);
				this.setState({
                    visibleSpinner: false,
                })
				if (result.success == true) {
					Toast.show({
		                text: "success !",
		                buttonText: "Ok",
		                duration:3000,
		                type:"success"
		          	})
				}else{
					Toast.show({
		                text: "An error occured !",
		                buttonText: "Ok",
		                duration:3000,
		                type:"danger"
		          	})
				}
			});
		}
		// a comenter
		navigation.navigate(HomePartenaireScreen);
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
				<Spinner
				 visible={this.state.visibleSpinner}
				 textContent={"Wait for Loading..."} 
				 textStyle={{color: '#FFF'}}/>
				<Content contentContainerStyle={style.container}>
					
					<Headers dataSend ={dataSend} />

					<View style={styles.viewInputGroupe} >
					<List>
					<ListItem style ={style.listItem}>
						<InputGroup borderType="underline" style={style.inputGroup}>
	                        <Icon name="ios-person-outline" style={{color:'#152a45'}}/>
	                        <Item 
	                        	style = {style.item}
	                        	error = {this.state.inputErrorFirst ? true : false}
	                        	success = {this.state.inputSuccessFirst ? true : false} >
		                        <Input 
		                        	style={{color: 'black'}} 
		                        	placeholder='First name'
		                        	onChangeText={(text) => this.setState({
		                        		firstname: text,
		                        		inputSuccessFirst:true,
		                        		inputErrorFirst:false
		                        		})}
	                          		value={this.state.firstname}/>
	                      		{this.renderIconFirst()}
							</Item>
                    	</InputGroup>
                    	</ListItem>
                    	<ListItem style ={style.listItem}>
						<InputGroup borderType="underline" style={style.inputGroup}>
	                        <Icon name="ios-person-add-outline" style={{color:'#152a45'}}/>
	                        <Item 
	                        	style = {style.item}
	                        	error = {this.state.inputErrorLast ? true : false}
	                        	success = {this.state.inputSuccessLast ? true : false} >
		                        <Input 
		                        	style={{color: 'black'}} 
		                        	placeholder='Last name'
		                        	onChangeText={(text) => this.setState({
		                        		lastname: text,
		                        		inputSuccessLast:true,
		                        		inputErrorLast:false
		                        		})}
	                          		value={this.state.lastname}/>
	                      		{this.renderIconLast()}
							</Item>
                    	</InputGroup>
                    	</ListItem>
                    
                    	<ListItem style ={style.listItem}>
						<InputGroup borderType="underline" style={style.inputGroup}>
	                        <Icon name="ios-people-outline" style={{color:'#152a45', width:29}}/>
	                        <Item 
	                        	style = {style.item}
	                        	error = {this.state.inputErrorPseudo ? true : false}
	                        	success = {this.state.inputSuccessPseudo ? true : false} >
		                        <Input 
		                        	style={{color: 'black'}} 
		                        	placeholder='User name'
		                        	onChangeText={(text) => this.setState({
		                        		pseudo: text,
		                        		inputSuccessPseudo:true,
		                        		inputErrorPseudo:false
		                        		})}
	                          		value={this.state.pseudo}/>
	                      		{this.renderIconPseudo()}
							</Item>
                    	</InputGroup>
                    	</ListItem>
                    	<ListItem style ={style.listItem}>
						<InputGroup borderType="underline" style={style.inputGroup}>
	                        <Icon name="ios-call-outline" style={{color:'#152a45', width:28}}/>
	                        <Item 
	                        	style = {style.item}
	                        	error = {this.state.inputErrorPhone ? true : false}
	                        	success = {this.state.inputSuccessPhone ? true : false} >
		                        <Input 
		                        	style={{color: 'black'}} 
		                        	placeholder='Phone number'
		                        	keyboardType="numeric"
		                        	onChangeText={(text) => this.setState({
		                        		phonenumber: text,
		                        		inputSuccessPhone:true,
		                        		inputErrorPhone:false
		                        		})}
	                          		value={this.state.phonenumber}/>
	                      		{this.renderIconPhone()}
							</Item>
                    	</InputGroup>
                    	</ListItem>
                    	<ListItem style ={style.listItem}>
						<InputGroup borderType="underline" style={style.inputGroup}>
	                        <Icon name="ios-mail-outline" style={{color:'#152a45'}}/>
	                        <Item 
	                        	style = {style.item}
	                        	error = {this.state.inputErrorEmail ? true : false}
	                        	success = {this.state.inputSuccessEmail ? true : false} >
		                        <Input 
		                        	style={{color: 'black'}} 
		                        	placeholder='Email'
		                        	onChangeText={(text) => this.setState({
		                        		email: text,
		                        		inputSuccessEmail:true,
		                        		inputErrorEmail:false
		                        		})}
	                          		value={this.state.email}/>
	                      		{this.renderIconEmail()}
							</Item>
                    	</InputGroup>
                    	</ListItem>
                    	<ListItem style ={style.listItem}>
	                    <InputGroup borderType="rounded" style={style.inputGroup}>
	                        <Icon name="ios-unlock-outline" style={{color:'#152a45', width:28}}/>
	                        <Item 
	                        	style = {style.item}
	                        	error = {this.state.inputErrorPwd ? true : false}
	                        	success = {this.state.inputSuccessPwd ? true : false}>
		                        <Input 
		                        	style={{color: 'black'}} 
		                        	placeholder='New Password' 
		                        	secureTextEntry = {true}
		                        	onChangeText={(text) => this.setState({
		                        		password: text,
		                        		inputSuccessPwd:true,
		                        		inputErrorPwd:false
		                        		})}
	                          		 />
		                        {this.renderIconPwd()}
	                        </Item>
	                    </InputGroup>
	                    </ListItem>

                    	<ListItem style ={style.listItem}>
	                    <InputGroup borderType="rounded" style={style.inputGroup}>
	                        <Icon name="ios-unlock-outline" style={{color:'#152a45', width:28}}/>
	                        <Item 
	                        	style = {style.item}
	                        	error = {this.state.inputErrorPwd ? true : false}
	                        	success = {this.state.inputSuccessPwd ? true : false}>
		                        <Input 
		                        	style={{color: 'black'}} 
		                        	placeholder='Confirm Password' 
		                        	secureTextEntry = {true}
		                        	onChangeText={(text) => this.setState({
		                        		password: text,
		                        		inputSuccessPwd:true,
		                        		inputErrorPwd:false
		                        		})}
	                          		value={this.state.password} />
		                        {this.renderIconPwd()}
	                        </Item>
	                    </InputGroup>
	                    </ListItem>
	                    </List>
					</View>

					<View style={{paddingHorizontal:30, margin:10}} >
						<Button primary block style={styles.button}
						onPress={this.postRegister.bind(this)} >
                    	<Text style={styles.textButton} > Edit Profile </Text>
                    	</Button>
					</View>
				</Content>
				<FootersPartenaire navigation ={dataSend}/>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	viewTextTop:{
		backgroundColor:'#152a45', 
		alignItems:'center', 
		justifyContent:'center', 
		paddingTop:20
	},
	textTop:{
		color:'#FFF', 
		fontFamily:"Entypo", 
		fontSize:20, 
		fontStyle:'italic'
	},
	viewImage:{
		backgroundColor:'#152a45', 
		height:200, 
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
	viewInputGroupe:{
		// padding:20, 
		// backgroundColor:'#c8cacd', 
		marginVertical:20, 
		// marginHorizontal:10, 
		// borderRadius:5
	},
	button:{
		height:55, 
		borderRadius:5
	},
	textButton:{
		fontSize:20, 
		color:'#FFF', 
		fontWeight:'bold'
	},
	textRegister:{
		fontSize:20, 
		color:'#152a45', 
		fontWeight:'bold', 
		textAlign:'center'},
	space:{
		paddingTop:20
	},

})
