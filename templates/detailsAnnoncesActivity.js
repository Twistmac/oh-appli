import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Dimensions,
	BackHandler
}
from 'react-native';
import moment from 'moment';
import style from '../Styles/Style';
import {
	Container, 
	Content, 
	Header, 
	Icon, 
	Left, 
	Button, 
	Title, 
	Card, 
	CardItem, 
	Body, 
	List, 
	ListItem, 
	Right, 
	Thumbnail} from 'native-base';
import {ChatScreen, ChatPartenaireScreen, ChatResidentPartenaireScreen} from '../route/ScreenName';
import HeadersNavigation from '../header/HeadersNavigation';
import FootersDetails from '../footer/FootersDetails';
import {getLike, getResidentById} from './services/Services';
import Footers from '../footer/Footers';
import FootersPartenaire from '../footer/FootersPartenaire';


const _format = 'MMMM  DD';
export default class detailsAnnoncesActivity extends Component {
	constructor(props) {
	  super(props);
	  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
		let paramsNavigate = this.props.navigation.state.params.params;
		let sectionID = this.props.navigation.state.params.sectionID;
		const data = paramsNavigate;
		 //console.warn(data);
		// console.warn(sectionID);
	  this.state = {
	  	data : data,
	  	sectionID : sectionID,
	  	like: data.like,
		disabled:true,
		residentDetail : null  
	  };
	  // this.updateLike = this.updateLike.bind(this);
	  
	}

	static navigationOptions = {
		drawerIcon:(
				<Icon name = "ios-contact" style ={{color:'#152a45'}} />
			)
	}

	like(){
		getLike(this.state.data.id, global.id).then((data) => {
        // console.warn(data);
      	})
	}

	

	updateLike(like){
		// console.warn(like);
		this.setState({
			data:{
				id:this.state.data.id,
	            categorie_id:this.state.data.categorie_id,
	            titre:this.state.data.titre,
	            description:this.state.data.description,
	            image:this.state.data.image,
	            prix:this.state.data.prix,
	            residence:this.state.data.residence,
	            genre:this.state.data.genre,
	            age:this.state.data.age,
	            created_at:this.state.data.created_at,
	            user_id:this.state.data.user_id,
	            categorie:this.state.data.categorie,
				like:like
			}
		})
		// console.warn(this.state.data);
	}

	renderMenuContact(){
		const iconStyle = this.state.disabled ? styles.iconColorDisabled : styles.iconColorOhome;
		const iconStyle2 = styles.iconColorOhome;
		if(global.UserRole == 'p' && this.state.data.type == 'r'){
			return(
				<View style={styles.container}>
				                      <View style={styles.View_Social}>
					                      
				                      </View>
				                      <View style={styles.View_Social}>
					                      <TouchableOpacity 
					                      		disabled = {this.state.disabled}
					                      		onPress = {this.goToChat.bind(this)} >
				                                  <Icon  style ={[styles.Ios_chatboxes, iconStyle]} name='ios-chatboxes' />
				                          </TouchableOpacity>
				                      </View>
				                      <View style={styles.View_Social}>
				                      	<TouchableOpacity>
				                                  <Icon style ={styles.Ios_heart} name='ios-heart' />
				                          </TouchableOpacity>
				                      </View>
				</View>
			)

		}
		if(global.UserRole == 'p' && this.state.data.type == 'p'){
			return(
				<View style={styles.container}>
				                      
				</View>
			)

		}
		if(global.UserRole == 'r' && this.state.data.type == 'p'){
			return(
				<View style={styles.container}>
				     <View style={styles.View_Social}>
						<TouchableOpacity>
							<Icon style ={styles.Ios_call} name='ios-call' />
						</TouchableOpacity>
					</View>
					<View style={styles.View_Social}>
						<TouchableOpacity 
								//disabled = {this.state.disabled}
								onPress = {this.goToChat.bind(this)} >
								<Icon  style ={[styles.Ios_chatboxes, iconStyle2]} name='ios-chatboxes' />
						</TouchableOpacity>
					</View>
					<View style={styles.View_Social}>
						<TouchableOpacity>
								<Icon style ={styles.Ios_heart} name='ios-heart' />
						</TouchableOpacity>
					</View>         
				</View>
			)

		}
		

		return(
			<View style={styles.container}>
					<View style={styles.View_Social}>
						<TouchableOpacity>
							<Icon style ={styles.Ios_call} name='ios-call' />
						</TouchableOpacity>
					</View>
					<View style={styles.View_Social}>
						<TouchableOpacity 
								disabled = {this.state.disabled}
								onPress = {this.goToChat.bind(this)} >
								<Icon  style ={[styles.Ios_chatboxes, iconStyle]} name='ios-chatboxes' />
						</TouchableOpacity>
					</View>
					<View style={styles.View_Social}>
						<TouchableOpacity>
								<Icon style ={styles.Ios_heart} name='ios-heart' />
						</TouchableOpacity>
					</View>
			</View>
		)
	
	}

	componentWillMount() {
	    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
	}

	componentDidMount(){
		//console.warn(this.state.data.type)
		 
		if (this.state.data.user_id == null) {
			this.setState({
				disabled:true
			})
		}else if (this.state.data.user_id.id === global.id) {
			this.setState({
				disabled:true
			})
		}else{
			this.setState({
				disabled:false
			})
		}
		
	BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
	// const {navigation} = this.props;
	// console.warn(navigation);
	//console.warn(this.state.data)
	//getResidentById()

	}

	handleBackButtonClick() {
	    this.props.navigation.goBack();
	    // this.props.navigation.state.params.updateData(this.state.data, this.state.sectionID);
	    return true;
	}

	// renderlike(){
	// 	if (this.state.data.like == true) {
	// 		return(
	// 				<Text> oui </Text>
	// 			);
	// 	}else{
	// 		return(
	// 				<Text> non </Text>
	// 			);
	// 	}
	// }

	Render_Profil(){
		if (this.state.data.user_id == null) {
			return(
					<View />
				);
		}else{

			return(
		    		<Card>
		                 <CardItem>
							<Left>
				                <Thumbnail source={require('../img/nobody.png')} />
				                <Body>
				                  <Text style={{fontWeight:'bold'}}>{this.state.data.user_id.username}</Text>
				                </Body>
			              	</Left>
						</CardItem>
		            </Card>
				);
		}
	}

	goToChat(){
		//console.warn(global.UserRole)
		
		if(global.UserRole == 'r'){
			if(this.state.data.type == 'p'){
				//console.warn(this.state.data)
				this.props.navigation.navigate(ChatResidentPartenaireScreen, {dataAnnonces:this.state.data, ID_USER_2:this.state.data.id_partenaire, TYPE: 'rp'});

			}else{
				this.props.navigation.navigate(ChatScreen, {ID_USER_2:this.state.data.user_id.id, USER_NAME:this.state.data.user_id.username, dataAnnonces:this.state.data, type : "resident"});

			}
		}
		if(global.UserRole == 'p'){
			//console.warn('partenaire');
			//console.warn(this.state.data);
			this.props.navigation.navigate(ChatPartenaireScreen, {dataAnnonces:this.state.data, ID_USER_2:this.state.data.user_id});
		}
		
	}

	_renderDate(data){
      const currentDate = moment(new Date()).format(_format);
      const getDate = moment(data.created_at).format(_format);
      if (currentDate === getDate) {
        return(
            <Text>{moment(data.created_at).format('HH:mm')}</Text>
          )
      }
      return(
            <Text>{moment(data.created_at).format(_format, 'en')}</Text>
        )
	}
	
	render_footer(data){
		if(global.UserRole == 'p'){
			return(
				<FootersPartenaire navigation ={data}/>
			)
		}
		else{
			<Footers navigation ={data}/>
		}
	}

	render() {
		
		const titre = this.state.data.titre;
		const like = this.state.like;
		// const updateLike = this.updateLike;
		const {navigation} = this.props;
		let dataSend = {
			titre,
			navigation
		}
		let dataSendFooter = {
			like,
			navigation
		}
		const img = 'https://ohome.easywebmobile.fr/public/img/annonces/'+this.state.data.image;
		// const imgLocal ='../img/image_7.jpg';
		const touchableStyle = this.state.disabled ? styles.disabledBtn : styles.enabledBtn;
		const iconStyle = this.state.disabled ? styles.iconColorDisabled : styles.iconColorOhome;
		return (
			<Container>
					<View 
						style = {styles.bouton_Back}>
						<Button
						  onPress={this.handleBackButtonClick.bind(this)}
						  transparent iconLeft light>
			            	<Icon
			            		style = {styles.IconLeft}
			            		ios="ios-arrow-dropleft-circle" 
			            		android="ios-arrow-dropleft-circle"
			            		/>
			            </Button>
				    </View>
				<Content contentContainerStyle={{}}>
					
					<View>
						<Image
							style = {styles.img}
							resizeMode="cover"
							source = {{uri:img}}/>
							{/*<Image source ={require(imgLocal)} resizeMode="cover"/>*/}
					</View>
					<View>
						<Card>
				            <CardItem>
				              <Body>
				              <View>
				              	<Text style={styles.titre} >{this.state.data.titre}</Text>
				              </View>
				              <View>
				              	<Text style ={styles.text_Price} >{this.state.data.prix} €</Text>
				              </View>
				              <View>
				              {this._renderDate(this.state.data)}
				              </View>
				              	{this.renderMenuContact()}
				              </Body>
				            </CardItem>
				        </Card>
				    </View>

				    	<View>
				    		{this.Render_Profil()}
				        </View>

				    <View>
						<Card>
				            <CardItem header>
				              <Text style={styles.titre} >Description :</Text>
				            </CardItem>
				            <CardItem>
				              <Body>
				                <Text>{this.state.data.description} </Text>
				              </Body>
				            </CardItem>
				        </Card>
				    </View>
				</Content>
			 {/* <Footers navigation ={dataSend}/>  */}
			 {this.render_footer(dataSend)}
				
				
				
				{/*<FootersDetails dataSendFooter={dataSendFooter} />*/}
			</Container>
		);
	}
}

const width = Dimensions.get('window').width;
const height = ((width / 2) - 15) *2;
const bleuOhome = '#152a45';
const yellowOhome = '#f5d017'
const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		flexDirection: 'row',
	},
	bouton_Back:{
		position:'absolute', 
		zIndex:100, 
		top:10, 
		left:0
	},
	titre:{
		color:bleuOhome,
		fontWeight:'bold',
		fontSize:18
	},
	img:{
		width:width,
		height:height
	},
	IconLeft:{
		height:50,
		width:50,
		fontSize:50,
		color:'#f5d017',
	},
	text_Price:{
		color:'#f5d017', 
		fontSize:18, 
		fontWeight:'bold'
	},
	Ios_call:{
		fontSize:30, 
		paddingTop:15, 
		paddingLeft:35, 
		color:'#152a45'

	},
	Ios_chatboxes:{
		fontSize:30, 
		paddingTop:15, 
		paddingLeft:35, 
		color:'#152a45'
	},
	Ios_heart:{
		fontSize:30, 
		paddingTop:15, 
		paddingLeft:35, 
		color:'#152a45'
	},
	View_Social:{
		width: '33%', 
		height: 50, 
		backgroundColor: '#FFF'
	},
	iconColorDisabled:{
		// color:'#f5d017',
		display:'none'
		// opacity:0.2
	},
	iconColorOhome:{
		color:'#152a45'
	}
})
