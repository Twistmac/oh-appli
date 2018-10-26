import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Alert,
	TouchableOpacity,
	BackHandler , DeviceEventEmitter

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
	List,
	Toast
} 
from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import style from '../Styles/Style';
import {AddProfilScreen, HomeScreen, LoginScreen} from '../route/ScreenName';
import {loginPartenaire, storePartner, getPartner} from './services/Services';
const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];
export default class LoginPartenaireActivity extends Component {
	constructor(props) {
	  super(props);
	  // this.post = this.post.bind(this); call function in the start
	  this.backPressSubscriptions = new Set()
	  this.state = {
	  	visibleSpinner: false,
	  	email: '',
	  	password: '',
	  	inputSuccess:false,
	  	inputError:false,
	  	inputSuccessPwd:false,
	  	inputErrorPwd:false
	  };

	  getPartner().then((data)=>{
	  	// console.warn(JSON.parse(data).email);
	  	this.setState({
	  		email:JSON.parse(data).email,
	  		password:JSON.parse(data).password
	  	})
	  })
	}

	componentDidMount() {
	    DeviceEventEmitter.removeAllListeners('hardwareBackPress')
	        DeviceEventEmitter.addListener('hardwareBackPress', () => {
	          let invokeDefault = true
	          const subscriptions = []

	          this.backPressSubscriptions.forEach(sub => subscriptions.push(sub))

	          for (let i = 0; i < subscriptions.reverse().length; i += 1) {
	            if (subscriptions[i]()) {
	              invokeDefault = false
	              break
	            }
	          }

	          if (invokeDefault) {
	            BackHandler.exitApp()
	          }
	        })

	        this.backPressSubscriptions.add(this.handleHardwareBack);

	  }

	  componentWillUnmount() {
	   DeviceEventEmitter.removeAllListeners('hardwareBackPress')
      this.backPressSubscriptions.clear()
	  }

	  handleHardwareBack = () => {
	   this.props.navigation.goBack();
	    return true;
	  }

	renderIconEmail(){
			if(this.state.email === '' && (this.state.inputError == false && this.state.inputSuccess == false)){
				return(
				<Icon />
				);
			}else if(this.state.email !== '' && this.state.inputSuccess == true){
				return(
				<Icon name='ios-checkmark-circle' style = {{paddingRight:40}} />
				);
			}else if(this.state.email === '' && (this.state.inputError == true && this.state.inputSuccess == false)) {
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

	post(){
		let etat = this.state;
		const {navigation} = this.props;
		//email
		if (etat.email === '') {
			this.setState({
				inputSuccess:false,
				inputError:true,
			});
		}else{
			this.setState({
				inputSuccess:true,
				inputError:false,
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

		if (etat.email !== '' && etat.password !== '') {
			// navigation.navigate(AddProfilScreen)
				this.setState({
                    visibleSpinner: true,
                })
			loginPartenaire(etat.email, etat.password).then((result) =>{
				//console.warn(result.result[0].email)
				this.setState({
                    visibleSpinner: false,
                })
                const params = {
                	email:this.state.email,
                	password:this.state.password,
                }
                // console.warn(result);
				//succes = 1 succes
				//succes = 2 wrong pass word
				//succes = user not exist
				if (result.success == true) {
					storePartner(params);
					global.userName = result.pseudo;
					global.id = result.id;
					console.warn(result.result);
					navigation.navigate(HomeScreen);
					Toast.show({
		                text: "Login success !",
		                buttonText: "Ok",
		                duration:3000,
		                type:"success"
	          		})
	          		/*if (result.complete !== 1) {
	          			navigation.navigate(AddProfilScreen);
	          		}else{
	          			navigation.navigate(HomeScreen);
	          		}*/
				}else if(result.success == false){
					Toast.show({
		                text: "Wrong Password!",
		                buttonText: "Ok",
		                duration:3000,
		                type:"warning"
	          		})
				}
			});
		}
	
	};
	render() {
		const {navigation} = this.props;
		return (
			<Container>
				<Spinner
				 visible={this.state.visibleSpinner}
				 textContent={"Wait for Loading..."} 
				 textStyle={{color: '#FFF'}}/>
				<Content contentContainerStyle={style.container}>
					<View style ={styles.viewTextTop} >
						<Text style={styles.textTop} > Simple life is in your hands</Text>
					</View>

					<View style={styles.viewImage} >
						<Image
							style={styles.image}
							source = {require('../img/logo1.png')} >
						</Image>
					</View>
					
					<View style={styles.viewInputGroupe} >
					<List>
					<ListItem style ={style.listItem}>
						<InputGroup borderType="underline" style={style.inputGroup}>
	                        <Icon name="ios-person" style={{color:'#152a45'}}/>
	                        <Item 
	                        	style = {style.item}
	                        	error = {this.state.inputError ? true : false}
	                        	success = {this.state.inputSuccess ? true : false} >
		                        <Input 
		                        	style={{color: 'black'}} 
		                        	placeholder='Login or Email'
		                        	onChangeText={(text) => this.setState({
		                        		email: text,
		                        		inputSuccess:true,
		                        		inputError:false
		                        		})}
	                          		value={this.state.email}/>
	                      		{this.renderIconEmail()}
							</Item>
                    	</InputGroup>
                    	</ListItem>
                    	<ListItem style ={style.listItem}>
	                    <InputGroup borderType="rounded" style={[style.inputGroup, styles.space]}>
	                        <Icon name="md-unlock" style={{color:'#152a45'}}/>
	                        <Item 
	                        	style = {style.item}
	                        	error = {this.state.inputErrorPwd ? true : false}
	                        	success = {this.state.inputSuccessPwd ? true : false}>
		                        <Input 
		                        	style={{color: 'black'}} 
		                        	placeholder='Password' 
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

					<View style={{paddingHorizontal:30}} >
						<Button primary block style={styles.button}
						onPress={this.post.bind(this)} >
                    	<Text style={styles.textButton} > Access Now </Text>
                    </Button>
					</View>
					<View style={{padding:30}}>
						<TouchableOpacity
						 onPress = {() => navigation.navigate(LoginScreen)} >
							<Text style={styles.textRegister}> Access Resident </Text>
						</TouchableOpacity>
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
		marginVertical:40, 
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
	}

})
