import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	BackHandler
}
from 'react-native';
import style from '../Styles/Style';
import {Container, Content, Header, Icon, Left, Right, Button, Title, List, ListItem, Thumbnail, Body, Separator, Textarea, Toast } from 'native-base';
import {LoginScreen} from '../route/ScreenName';
import Headers from '../header/Headers';
import Footers from '../footer/Footers';
import {getComments, postComs} from './services/Services';
import moment from 'moment';
export default class CommentairesActivity extends Component {

	static navigationOptions = {
		drawerIcon:(
				<Icon name = "ios-key" style ={{color:'#152a45'}} />
			)
	}

	constructor(props) {
	  super(props);
	  let idComs = this.props.navigation.state.params.idComs;
	  this.state = {
	  	idComs :idComs,
	  	newCommentaire:'',
	  	commentaire: []
	  };
	}

	componentDidMount(){
		const idCom = this.state.idComs;
		getComments(idCom).then((data)=>{
			// console.warn(data);
			this.setState({
				commentaire:data
			})
		})
	}

	handleBackButtonClick() {
	    this.props.navigation.goBack();
	    return true;
	}

	postCommetaire(){
		const params = {
			commentaire:this.state.newCommentaire
		}

		if (this.state.newCommentaire !== '') {
			this.state.commentaire.push(this.state.newCommetaire)
			postComs(this.state.idComs, global.id, params).then((data)=>{
				// console.warn(data);
			});
			Toast.show({
                text: "Comment send",
                buttonText: "Ok",
                duration:3000,
                type:"success"
      		})
		}else{
			Toast.show({
                text: "Please complete the formular",
                buttonText: "Ok",
                duration:3000,
                type:"danger"
      		})
		}
	}

	
	render() {
		const titre = 'Commentaires';
		const {navigation} = this.props;
		let dataSend = {
			titre,
			navigation
		};
		var items = [
		      "J'ai créé une activité simple dans laquelle si vous appuyez à l'intérieur de la zone circulaire, le texte doit changer en conséquence. L'application fonctionne bien, mais lorsque j'appuie sur l'intérieur de la zone circulaire, le message d'erreur est pas une fonction",
		      'Nathaniel Clyne',
		      'Dejan Lovren',
		      'Mama Sakho',
		      'Emre Can'
		    ];
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
					<View style = {{backgroundColor:'#C0C0C0', height:50, justifyContent:'center', alignItems:'center', flexDirection:'row'}} >
						<Icon style={{color:'#152a45', paddingRight:10}} name="md-text" />
				        <Text style = {{color:'#152a45', fontSize:16}} >Your comment here</Text>
			        </View>
			        
				<Content>
					<List dataArray={this.state.commentaire}
			            renderRow={(item) =>
			              <ListItem avatar>
			              <Left>
			                <Thumbnail style = {{width:30, height:40}} source={require('../img/nobody.png')} />
			              </Left>
			              <Body style = {{paddingRight:10}} >
			              	<Text style = {{color:'#000', fontSize: 16, fontWeight:'bold'}} >{item.nom} {item.prenom}</Text>
			                <Text style = {{color:'#C0C0C0', fontSize: 12, fontWeight:'bold'}} >{moment(item.created_at).fromNow()}</Text>
			                <Text style = {{color:'#000', fontSize: 15}} >{item.commentaire}</Text>
			              </Body>
			              </ListItem>
			            }>
		            </List>
				</Content>
				<View style = {{padding:20}} >
			        	<Textarea onChangeText = {(text)=>this.setState({newCommentaire:text})} rowSpan={5} bordered placeholder="Comments...." />
			        	<View>
			        		<TouchableOpacity onPress = {this.postCommetaire.bind(this)}
			        			 style = {{borderRadius:10,  backgroundColor:'#152a45', paddingVertical:15, marginHorizontal:20, marginTop:20}} >
			        			<Text style = {{color:'#FFF', fontSize:16, textAlign:'center'}} >
			        				Post comment
			        			</Text>
			        		</TouchableOpacity>
			        	</View>
			    </View>
					
				<Footers navigation ={dataSend} />
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	rondYellow:{
	  	alignItems:'center',
	  	justifyContent:'center',
	  	height:100,
	  	width:100,
	  	borderRadius:50,
	  	backgroundColor:'#f5d017'
    },
    bouton_Back:{
		position:'absolute', 
		zIndex:100, 
		top:2, 
		left:0
	},
	IconLeft:{
		height:50,
		width:50,
		fontSize:50,
		color:'#f5d017',
	},
    Icon:{
      fontSize:40,
      color:'#FFF',
    },
})
