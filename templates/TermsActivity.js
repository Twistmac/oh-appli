import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	WebView,
	Dimensions
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
} from 'native-base';
import style from '../Styles/Style';
import {LoginScreen} from '../route/ScreenName';
import Headers from '../header/Headers';
import HeaderAll from '../header/HeadersAllPage';
import Footers from '../footer/Footers';
import {getTerms} from './services/Services';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class Terms extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	titre:'',
	  	content:''
	  };
	}

	componentDidMount(){
		getTerms().then((data) => {
			this.setState({
				content:data.content,
				titre:data.titre
			})
		})
	}
	static navigationOptions = {
		drawerIcon:(
				<Icon name = "ios-help-circle" style ={{color:'#152a45'}} />
			)
	}

	render() {
		var htmlCode = "<b>I am rendered in a <i>WebView</i></b>"
		const titre = 'Terms & conditions';
		const {navigation} = this.props;
		let dataSend = {
			titre,
			navigation
		}
		return (
			<Container>
				<Headers dataSend={dataSend} />
				<Content contentContainerStyle={styles.containers}>
				<HeaderAll titre = {'Terms and Conditions'} />
	              <View style={{flex: 1}}>
	                <WebView source={{html:this.state.content}} style={{width:width,height:(height-200),backgroundColor:'#FFF',marginTop:5}} />
	              </View>
				
				</Content>
				<Footers navigation ={dataSend}/>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	}
})
