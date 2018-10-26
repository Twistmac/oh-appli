import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity
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
	Body,
	ListItem,
	List,
	Card, 
	CardItem, 
	Thumbnail
} from 'native-base';
import Style from '../Styles/Style';
import style from '../Styles/Style';
import {LoginScreen, AddProfilScreen} from '../route/ScreenName';
import Headers from '../header/Headers';
import HeaderAll from '../header/HeadersAllPage';
import Footers from '../footer/Footers';


// const resetAction = NavigationActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({ routeName: 'Drawer'})
//   ]
// })


export default class Menus extends Component {
	static navigationOptions = {
		drawerIcon:(
				<Icon name = "ios-information-circle" style ={{color:'#152a45'}} />
			)
	}
	componentDidMount(){
	// this.props.navigation.dispatch(resetAction)
	}
	render() {
		const titre = 'Tutorials';
		const {navigation} = this.props;
		let dataSend = {
			titre,
			navigation
		}
		return (
			<Container>
				<Headers dataSend={dataSend} />
				<Content contentContainerStyle={style.container}>
					<HeaderAll titre = {'Welcome to OHOME'} />
					<View style ={styles.Body} >
						<Text style={styles.textTuto} > T u t o r i a l </Text>
						<Text style={styles.textUse} > How to use OHOME </Text>
					</View>

					<View>
						<Card>
							<CardItem>
								<Left>
					                <Thumbnail source={require('../img/add.png')} />
					                <Body>
					                  <Text style={styles.textUse}>Ads page</Text>
					                </Body>
				              	</Left>
							</CardItem>
							<CardItem style={{marginTop:-10}} >
				              <Body>
				                <Text>
				                  What’s new around you ? Living together is stronger.
				                </Text>
				              </Body>
				            </CardItem>
						</Card>
					</View>

					<View>
						<Card>
							<CardItem>
								<Left>
					                <Thumbnail source={require('../img/message.png')} />
					                <Body>
					                  <Text style={styles.textUse}>Messages page</Text>
					                </Body>
				              	</Left>
							</CardItem>
							<CardItem  style={{marginTop:-10}}>
				              <Body>
				                <Text>
				                  Easy to use, exchange with your lobby and your neighborhood.
				                </Text>
				              </Body>
				            </CardItem>
						</Card>
					</View>

					<View>
						<Card>
							<CardItem>
								<Left>
					                <Thumbnail source={require('../img/acces.png')} />
					                <Body>
					                  <Text style={styles.textUse}>Opening access page</Text>
					                </Body>
				              	</Left>
							</CardItem>
							<CardItem style={{marginTop:-10}}>
				              <Body>
				                <Text>
									Too busy or lazy to go downstairs, one single button on your phone will help.
				                </Text>
				              </Body>
				            </CardItem>
						</Card>
					</View>

					{/*<View style={{marginVertical:10, marginHorizontal:20}} >
						<Button onPress = {()=> navigation.navigate(AddProfilScreen)} iconLeft light block primary>
				            <Icon name='ios-home' style={{marginRight:20, color:'#FFF'}} />
				            <Text 
				            	style={styles.textTop} >Let's go !</Text>
			            </Button>
			        </View>*/}
				</Content>
				<Footers navigation ={dataSend}/>
			</Container>
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
	Body:{
		backgroundColor:'#FFF', 
		alignItems:'center', 
		justifyContent:'center',
		paddingTop:10,
		paddingBottom:10
	},
	textTuto:{
		color: black, 
		fontFamily:"fontello", 
		fontSize:35,
		fontWeight:'bold',
	},
	textUse:{
		color: bleuOhome, 
		fontFamily:"fontello", 
		fontSize:15,
		fontWeight:'bold',
	},
	textTumb:{
		color: bleuOhome,
	}
})
