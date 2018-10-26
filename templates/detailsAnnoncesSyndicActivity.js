import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Dimensions,
	BackHandler,
	Linking
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
	Badge,
	Thumbnail} from 'native-base';
import {ChatScreen, CommentairesScreen} from '../route/ScreenName';
import HeadersNavigation from '../header/HeadersNavigation';
import FootersDetails from '../footer/FootersDetails';
import {getLike, getOneAnnoncesSyndic} from './services/Services';
import Footers from '../footer/Footers';


const _format = 'MMMM  DD';
export default class detailsAnnoncesActivity extends Component {
	constructor(props) {
	  super(props);
	  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
	  var id_annonce = this.props.navigation.state.params.id_annonce;
	  this.state = {
	  	annonces : [],
	  	id_annonce : id_annonce,
	  	statut_like:false
	  };
	}

	static navigationOptions = {
		drawerIcon:(
				<Icon name = "ios-contact" style ={{color:'#152a45'}} />
			)
	}

	// like(){
	// 	getLike(this.state.data.id, global.id).then((data) => {
 //        // console.warn(data);
 //      	})
	// }

	componentWillMount() {
	    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
	}

	componentDidMount(){
		// console.warn(this.state.data.user_id.username);
		getOneAnnoncesSyndic(this.state.id_annonce, global.id).then((data)=>{
			// console.warn(data[0]);
			this.setState({annonces:data[0], statut_like:data[0].etat_like})
		})

		
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
	
	}

	handleBackButtonClick() {
	    this.props.navigation.goBack();
	    return true;
	}

	Render_Profil(){

			return(
		    		<Card>
		                 <CardItem>
							<Left>
				                <Thumbnail source={require('../img/nobody.png')} />
				                <Body>
				                  <Text style={{fontWeight:'bold'}}>Annonce syndic</Text>
				                </Body>
			              	</Left>
						</CardItem>
		            </Card>
				);

	}

	like(){
    	this.setState({statut_like:!this.state.statut_like})
    }

	_renderIconLike(){
		if (this.state.statut_like) {
			return(
					<TouchableOpacity onPress = {this.like.bind(this)} >
				       <Icon style ={styles.Ios_heart} name='ios-heart-outline' />
                    </TouchableOpacity>
				)
		}else{
			return(
					<TouchableOpacity onPress = {this.like.bind(this)} >
				       <Icon style ={styles.Ios_heart} name='ios-heart' />
                    </TouchableOpacity>
				)
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

    gotoCommentaire(id) {
          this.props.navigation.navigate(CommentairesScreen, {idComs: id});
       }

    callNumber = (url) =>{
       Linking.canOpenURL(url).then(supported => {
       if (!supported) {
        console.log('Can\'t handle url: ' + url);
       } else {
        return Linking.openURL(url);
       }
     }).catch(err => console.error('An error occurred', err));
    }

    goToChat(){
		this.props.navigation.navigate(ChatScreen, {ID_USER_2:this.state.annonces.syndic_id, USER_NAME:this.state.annonces.nom, dataAnnonces:this.state.annonces, type : "syndic"});
	}

	render() {
		
		const titre = "this.state.annonce.titre";
		const {navigation} = this.props;
		let dataSend = {
			titre,
			navigation
		}
		let dataSendFooter = {
			navigation
		}
		const img = 'https://ohome.easywebmobile.fr/public/img/annonces/'+this.state.annonces.image;
		// const imgLocal ='../img/image_7.jpg';
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
				              	<Text style={styles.titre} >{this.state.annonces.titre}</Text>
				              </View>
				              <View>
				              	<Text style ={styles.text_Price} >{this.state.annonces.prix} €</Text>
				              </View>
				              <View>
				              {this._renderDate(this.state.annonces)}
				              </View>
				              <View style={styles.container}>
				                      <View style={styles.View_Social}>
					                      <TouchableOpacity onPress={()=> this.callNumber(`tel:${this.state.annonces.tel}`)}>
			                                  <Icon style ={styles.Ios_call} name='ios-call' />
			                               </TouchableOpacity>
				                      </View>
				                      <View style={styles.View_Social}>
					                      <TouchableOpacity onPress = {this.goToChat.bind(this)} >
				                                  <Icon  style ={styles.Ios_heart} name='ios-chatboxes' />
				                          </TouchableOpacity>
				                      </View>
				                      <View style={styles.View_Social}>
				                      	{this._renderIconLike()}
				                      </View>
				                      <View style={styles.View_Social}>
			                      			<TouchableOpacity onPress = {this.gotoCommentaire.bind(this, this.state.annonces.id)} >
			                      		            <Icon style ={styles.Ios_heart} name='md-text' />
			                      		    </TouchableOpacity>
				                      </View>
				                </View>
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
				                <Text>{this.state.annonces.description} </Text>
				              </Body>
				            </CardItem>
				        </Card>
				    </View>
				</Content>
				<Footers navigation ={dataSend}/>
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
		paddingHorizontal:20
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
