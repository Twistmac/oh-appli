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
import {register} from './services/Services';
import style from '../Styles/Style';
import {AnnoncesScreen} from '../route/ScreenName';
import HeaderAll from '../header/HeadersAllPage';
const _format = 'YYYY-MM-DD';
export default class AddProfilActivity extends Component {
	constructor(props) {
	  super(props);
	  // this.state = { chosenDate: new Date() };
	  this.setDate = this.setDate.bind(this);
	  this.state = {
	  	visibleSpinner: false,
	  	idUser:undefined,
	  	firstname:'',
	  	lastname:'',
	  	birthday:'',
	  	pseudo:'',
	  	phonenumber:'',
	  	email: '',
	  	password: '',
	  	confirmPassword:'',

	  	inputSuccessFirst:false,
	  	inputErrorFirst:false,

	  	inputSuccessLast:false,
	  	inputErrorLast:false,

	  	inputSuccessSex:false,
	  	inputErrorSex:false,

	  	inputSuccessBirth:false,
	  	inputErrorBirth:false,

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
	  	chosenDate: new Date()
	  }
	};
	componentDidMount(){
		this.setState({idUser:global.id});
	}
	setDate(newDate) {
	    this.setState({ chosenDate: moment(newDate).format(_format) });
    };
    onValueChange2(value: string) {
	    this.setState({
	      sex: value
	    });
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

	renderIconBirth(){
			if(this.state.birthday === '' && (this.state.inputErrorBirth == false && this.state.inputSuccessBirth == false)){
				return(
				<Icon />
				);
			}else if(this.state.birthday !== '' && this.state.inputSuccessBirth == true){
				return(
				<Icon name='ios-checkmark-circle' style = {{paddingRight:40}} />
				);
			}else if(this.state.birthday === '' && (this.state.inputErrorBirth == true && this.state.inputSuccessBirth == false)) {
				return(
				<Icon name='close-circle' style = {{paddingRight:40}} />
				);
			}
	};

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

		//sex
		if (etat.sex === '') {
			this.setState({
				inputSuccessSex:false,
				inputErrorSex:true,
			});
		}else{
			this.setState({
				inputSuccessSex:true,
				inputErrorSex:false,
			});
		}

		//birthday
		if (etat.birthday === '') {
			this.setState({
				inputSuccessBirth:false,
				inputErrorBirth:true,
			});
		}else{
			this.setState({
				inputSuccessBirth:true,
				inputErrorBirth:false,
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
				inputSuccessPwd:false,
				inputErrorPwd:true,
			})
		}else{
			this.setState({
				inputSuccessPwd:true,
				inputErrorPwd:false,
			})
		}
		const params = {
			idUser:etat.idUser,
			firstName:etat.firstname,
			lastName:etat.lastname,
			sex:etat.sex,
			birthday:etat.chosenDate,
			phoneNumber:etat.phonenumber,
			pseudo:etat.pseudo,
			email:etat.email,
			password:etat.password
		}

		// console.warn(params);
		if (etat.firstname !=='' && etat.lastname !== '' && etat.chosenDate != undefined && etat.pseudo !== '' && etat.phonenumber !=='' && etat.email !== '' && etat.password !== '') {
			this.setState({
                visibleSpinner: true,
            })
			register(params).then((result) =>{
				this.setState({
                    visibleSpinner: false,
                })
				if (result.success == true) {
					Toast.show({
		                text: "Sign up success !",
		                buttonText: "Ok",
		                duration:3000,
		                type:"success"
		          	})
		          	navigation.navigate(AnnoncesScreen);
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
		// navigation.navigate(HomeScreen);
	}
	render() {
		const {navigation} = this.props;
		return (
			<Container>
				<Spinner
				 visible={this.state.visibleSpinner}
				 textContent={"Wait for Loading..."} 
				 textStyle={{color: '#FFF'}}/>
				<Content contentContainerStyle={style.container}>
					
					<HeaderAll titre = {'Sign up'} />

					<View style={styles.viewInputGroupe} >
					<List>
					<ListItem>
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
                    	<ListItem>
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
                    	<ListItem>
						<InputGroup borderType="underline" style={style.inputGroup}>
	                        <Icon name="ios-transgender" style={{color:'#152a45', zIndex:100}}/>
	                        <Item picker style ={[style.item,{left:-7}]} >
	                      		<Picker
	          		                mode="dropdown"
	          		                iosIcon={<Icon name="ios-arrow-down-outline" />}
	          		                style={{ width: undefined, borderWidth:2}}
	          		                placeholder="Select your SEX"
	          		                placeholderStyle={{ color: "#bfc6ea" }}
	          		                placeholderIconColor="#007aff"
	          		                selectedValue={this.state.sex}
	          		                onValueChange={this.onValueChange2.bind(this)}>
	          		                <Picker.Item label="Male" value="Male" />
					                <Picker.Item label="Female" value="Female" />
				                </Picker>
							</Item>
                    	</InputGroup>
                    	</ListItem>

                    	<ListItem>
						<InputGroup borderType="underline" style={style.inputGroup}>
	                        <Icon name="ios-calendar-outline" style={{color:'#152a45'}}/>
	                        <Item style={[style.item, {width:'95%',left:-5}]} >
		                        <DatePicker
	                                locale={"en"}
	                                timeZoneOffsetInMinutes={undefined}
	                                modalTransparent={false}
	                                animationType={"fade"}
	                                androidMode={"default"}
	                                placeHolderText="Birthday"
	                                showFilter={true}
	                                textStyle={{ color: "black", width:'100%'}}
	                                placeHolderTextStyle={{ color: "black" }}
	                                onDateChange={this.setDate}/>
							</Item>
                    	</InputGroup>
                    	</ListItem>
                    	<ListItem>
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
                    	<ListItem>
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
                    	<ListItem>
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
                    	<ListItem>
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
	                          		value={this.state.password} />
		                        {this.renderIconPwd()}
	                        </Item>
	                    </InputGroup>
	                    </ListItem>
	                    <ListItem>
	                    <InputGroup borderType="rounded" style={style.inputGroup}>
	                        <Icon name="ios-unlock-outline" style={{color:'#152a45', width:28}}/>
	                        <Item 
	                        	style = {style.item}
	                        	error = {this.state.inputErrorPwdConfirm ? true : false}
	                        	success = {this.state.inputSuccessPwdConfirm ? true : false}>
		                        <Input 
		                        	style={{color: 'black'}} 
		                        	placeholder='Confirm Password' 
		                        	secureTextEntry = {true}
		                        	onChangeText={(text) => this.setState({
		                        		confirmPassword: text,
		                        		inputSuccessPwdConfirm:true,
		                        		inputErrorPwdConfirm:false
		                        		})}
	                          		value={this.state.confirmPassword} />
		                        {this.renderIconPwdConfirm()}
	                        </Item>
	                    </InputGroup>
	                    </ListItem>
	                    </List>
					</View>

					<View style={{paddingHorizontal:30, margin:10}} >
						<Button primary block style={styles.button}
						onPress={this.postRegister.bind(this)} >
                    	<Text style={styles.textButton} > Sign Up </Text>
                    	</Button>
					</View>
				</Content>
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
