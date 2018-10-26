import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	FlatList,
	Animated,
	Dimensions,
	ScrollView,
	Alert
}
from 'react-native';
import Menu, {
    MenuProvider,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from 'react-native-popup-menu';
import Spinner from 'react-native-loading-spinner-overlay';
import {data} from '../database'
import style from '../Styles/Style';
import {Container, Content, Header, Icon, Left, Button, Title, List, ListItem, Body, Right, Thumbnail, Item, Input} from 'native-base';
import {ChatScreen} from '../route/ScreenName';
import Headers from '../header/Headers';
import Footers from '../footer/Footers';
import {database} from '../database';
import firebase from '../database/firebase';

import { connect } from 'react-redux';
import { fetchMessages } from './actions';

const AnimatedScrollView = Animated.createAnimatedComponent(Content);
const HEADER_HEIGHT = 55;
const BOX_SIZE = (Dimensions.get('window').width / 2) - 12;
class MessageActivity extends Component {
	constructor(props) {
    super(props);
    this.renderItem = this._renderItem.bind(this);
    this.renderItemSyndic = this._renderItemSyndic.bind(this);
    this.renderHeader = this._renderHeader.bind(this);
    console.warn(this.props.messagesSyndic)
    this.state = {
      visibleSpinner:false,
      data: [],
      scrollAnim: new Animated.Value(0),
      offsetAnim: new Animated.Value(0),
      datamessages: this.props.messagesParentSyndic
    }
  }

  	componentDidMount() {
  		this.props.fetchMessages(global.id);
  	    this.state.scrollAnim.addListener(this._handleScroll);
  	}

  	componentWillUnmount() {
  		// this.props.fetchMessages();
  	    this.state.scrollAnim.removeListener(this._handleScroll);
  	  }

	componentWillMount(){
		// this.chats = data.getUsers();
			// console.warn(this.chats);
		// this.setState({
		//   data: this.chats
		// });
    }


    _handleScroll = ({ value }) => {
        this._previousScrollvalue = this._currentScrollValue;
        this._currentScrollValue = value;
    };
      
    _handleScrollEndDrag = () => {
        this._scrollEndTimer = setTimeout(this._handleMomentumScrollEnd, 250);
    };

    _handleMomentumScrollBegin = () => {
        clearTimeout(this._scrollEndTimer);
    };

    _handleMomentumScrollEnd = () => {
        const previous = this._previousScrollvalue;
        const current = this._currentScrollValue;
        
        if (previous > current || current < HEADER_HEIGHT) {
          // User scrolled down or scroll amount was too less, lets snap back our header
          Animated.spring(this.state.offsetAnim, {
            toValue: -current,
            tension: 300,
            friction: 35,
          }).start();
        } else {
          Animated.timing(this.state.offsetAnim, {
            toValue: 0,
            duration: 300,
          }).start();
        }
    };

	static navigationOptions = {
		drawerIcon:(
				<Icon name = "ios-text" style ={{color:'#152a45'}} />
			),
		headerMode: "none",
	}
	_filter(text) {
	  let pattern = new RegExp(text, 'i');
	  let chats = _.filter(this.chats, (chat) => {

	    if (chat.userName.search(pattern) != -1)
	      return chat;
	  });

	  this.setState({data: chats});
	}

	_renderHeader(){
		return(
			<View style ={styles.searchContainer} >
				<Item rounded style={{borderColor:'#FFF'}} >
		            <Icon style={{color:'#FFF'}} active name='ios-search' />
		            <Input
		            onChange={(event) => this._filter(event.nativeEvent.text)}
		            placeholderTextColor='#FFF'
		            placeholder='Search'
		            style={{color:'#FFF'}}

		            />
		        </Item>
	        </View>
			);
	}

	ConfirmationSupp(passDataId){
		Alert.alert(
		  'Delete',
		  'Do you want to delete it?',
		  [
		    {text: 'NO', style: 'cancel'},
		    {text: 'YES', onPress: () => this.suppression(passDataId)},
		  ]
		);
	}

	suppression(passDataId){
		var user1 = global.id;
        var user2 = passDataId;
        var idChat = 'chat_'+(user1<user2 ? user1+'_'+user2 : user2+'_'+user1);

		var racine = firebase.database().ref('data_messages');
		racine.child("chats/"+idChat+'/users').update({ ['uid_'+global.id]: false });
	}

	

	_renderItem(data){

		var unread = [];
		unread = data.item.countUnread;
		const isUnread = unread[global.id] > 0;

		const UnreadStyle = isUnread ? styles.UnreadItem : styles.ReadItem;

		if (data.item.senderId == global.id) {
			var passDataId = data.item.receivedId
		}else{
			var passDataId = data.item.senderId
		}
		if (data.item.userName_1 === global.userName) {
			var passDataUserName = data.item.userName_2
		}else{
			var passDataUserName = data.item.userName_1
		}

		var count = unread[passDataId];
		global.count = count;

		var myCount = unread[global.id];
		global.myCount = myCount;

		// console.warn(global.count)

		var InfoAnnonces = {id:data.item.idAnnonce, titre:data.item.titreAnnonce}

		return(
		
		<View>
			<List>
	            <ListItem avatar>
	              <Left>
	                <Thumbnail source={require('../img/nobody.png')} />
	              </Left>
	              <Body>
	            <TouchableOpacity onPress = {this.pressFlat.bind(this, passDataId, passDataUserName, InfoAnnonces, count)} >
	                <Text style = {{fontWeight:'bold', fontSize:18, color:'black'}} >{(data.item.userName_1 === global.userName) ? data.item.userName_2 : data.item.userName_1}</Text>
	                <Text style = {{fontWeight:'bold', fontSize:14, color:'black',paddingTop:2}} >{data.item.titreAnnonce}</Text>
	                <Text style ={[{paddingTop:10}, UnreadStyle]} numberOfLines={1} note>{(data.item.senderId == global.id ? 'Vous :' : '')} {data.item.lastMessage}</Text>
	                {/*<Text note>{data.item.timestamp}</Text>*/}
        		</TouchableOpacity>
	              </Body>
	              <Right style = {{paddingTop:10}} >
	              <View style = {styles.rondBleu} >
	              	<Text style={{color:yellowOhome}}> {global.myCount} </Text>
	              </View>
        	              <Menu>
        	              	  <MenuTrigger>
        	              	  <View style ={styles.viewContext} >
        	              	  	<Icon style = {{color:'black', fontSize:30, paddingLeft:10}} name = 'ios-more'/>
        	              	  </View>
        		              </MenuTrigger>
        		              <MenuOptions customStyles={{
                                        optionWrapper: styles.containerMenu,
                                        optionsContainer : styles.containerMenus,
                                        optionText: styles.textMenu
                                    }}>
                                  <MenuOption onSelect={this.ConfirmationSupp.bind(this, passDataId)}>
                                    <Text style={{ color: 'red' }}>Delete</Text>
                                  </MenuOption>
        		           	  </MenuOptions>
        	          	  </Menu>
        	          	  <Text style = {[{fontSize:12}, UnreadStyle]} note>{data.item.timestamp}</Text>
	              </Right>
	            </ListItem>
	        </List>
        </View>
		);
	}

		_renderItemSyndic(data){

		var unread = [];
		unread = data.item.countUnread;
		const isUnread = unread[global.id] > 0;

		const UnreadStyle = isUnread ? styles.UnreadItem : styles.ReadItem;

		if (data.item.senderId == global.id) {
			var passDataId = data.item.receivedId
		}else{
			var passDataId = data.item.senderId
		}
		if (data.item.userName_1 === global.userName) {
			var passDataUserName = data.item.userName_2
		}else{
			var passDataUserName = data.item.userName_1
		}

		var count = unread[passDataId];
		global.count = count;

		var myCount = unread[global.id];
		global.myCount = myCount;

		// console.warn(global.count)

		var InfoAnnonces = {id:data.item.idAnnonce, titre:data.item.titreAnnonce}

		return(
		
		<View>
			<List>
	            <ListItem avatar>
	              <Left>
	                {/*<Thumbnail source={require('../img/nobody.png')} />*/}
	              </Left>
	              <Body>
	            <TouchableOpacity onPress = {this.pressFlat2.bind(this, passDataId, passDataUserName, InfoAnnonces, count)} >
	                <Text style = {{fontWeight:'bold', fontSize:18, color:'black'}} >{(data.item.userName_1 === global.userName) ? data.item.userName_2 : data.item.userName_1}</Text>
	                <Text style = {{fontWeight:'bold', fontSize:14, color:'black',paddingTop:2}} >{data.item.titreAnnonce}</Text>
	                <Text style ={[{paddingTop:10}, UnreadStyle]} numberOfLines={1} note>{(data.item.senderId == global.id ? 'Vous :' : '')} {data.item.lastMessage}</Text>
	                {/*<Text note>{data.item.timestamp}</Text>*/}
        		</TouchableOpacity>
	              </Body>
	              <Right style = {{paddingTop:10}} >
	              <View style = {styles.rondBleu} >
	              	<Text style={{color:yellowOhome}}> {global.myCount} </Text>
	              </View>
        	              <Menu>
        	              	  <MenuTrigger>
        	              	  <View style ={styles.viewContext} >
        	              	  	<Icon style = {{color:'black', fontSize:30, paddingLeft:10}} name = 'ios-more'/>
        	              	  </View>
        		              </MenuTrigger>
        		              <MenuOptions customStyles={{
                                        optionWrapper: styles.containerMenu,
                                        optionsContainer : styles.containerMenus,
                                        optionText: styles.textMenu
                                    }}>
                                  <MenuOption onSelect={this.ConfirmationSupp.bind(this, passDataId)}>
                                    <Text style={{ color: 'red' }}>Delete</Text>
                                  </MenuOption>
        		           	  </MenuOptions>
        	          	  </Menu>
        	          	  <Text style = {[{fontSize:12}, UnreadStyle]} note>{data.item.timestamp}</Text>
	              </Right>
	            </ListItem>
	        </List>
        </View>
		);
	}

	pressFlat(idUser2, userName2, infoAnnonce, count){
		// console.warn(idUser2);
		this.props.navigation.navigate(ChatScreen, {ID_USER_2:idUser2, USER_NAME:userName2, dataAnnonces:infoAnnonce, count: count, type : "resident"});
	}

	pressFlat2(idUser2, userName2, infoAnnonce, count){
		// console.warn(idUser2);
		this.props.navigation.navigate(ChatScreen, {ID_USER_2:idUser2, USER_NAME:userName2, dataAnnonces:infoAnnonce, count: count, type : "syndic"});
	}

	_keyExtractor = (item, index) => index.toString();

	_renderListVide(){
		return(
				<View style = {{flex:1, alignItems:'center', justifyContent:'center'}} >
					<Text Style ={{textAlign:'center'}} > No messages to render</Text>
				</View>
			)
	}

	_renderSeparator() {
	  return (
	    <View style={styles.separator}/>
	  )
	}

	render() {
		const { scrollAnim, offsetAnim } = this.state;
		    
	    const translateY = Animated.add(scrollAnim, offsetAnim).interpolate({
	      inputRange: [0, HEADER_HEIGHT],
	      outputRange: [0, -HEADER_HEIGHT],
	      extrapolate: 'clamp'
		});
		const titre = 'Messages';
		const {navigation} = this.props;
		let dataSend = {
			titre,
			navigation
		}
		return (
			<Container style ={{zIndex:-10}} >
				<Animated.View style={[styles.header, { transform: [{translateY}] }]}>
		        	<Headers dataSend={dataSend} />
		        </Animated.View>
				<AnimatedScrollView
				          contentContainerStyle={styles.gallery}
				          scrollEventThrottle={16}
				          onScroll={Animated.event(
				            [ { nativeEvent: { contentOffset: { y: this.state.scrollAnim } } } ],
				          )}
				          onMomentumScrollBegin={this._handleMomentumScrollBegin}
				          onMomentumScrollEnd={this._handleMomentumScrollEnd}
				          onScrollEndDrag={this._handleScrollEndDrag}>
				<Spinner
				 visible={this.state.visibleSpinner}
				 textContent={"Loading..."} 
				 textStyle={{color: '#FFF'}}/>
		        <Content style ={{zIndex:100}} >
		        <FlatList
		                  data={this.props.messagesParentSyndic}
		                  keyExtractor={this._keyExtractor}
		                  extraData={this.state}
		                  ListEmptyComponent={this._renderListVide}
		                  ItemSeparatorComponent={this._renderSeparator}
		                  ListHeaderComponent={this.renderHeader}
		                  renderItem = {this.renderItemSyndic}/>
		          <FlatList
		                  data={this.props.messagesParent}
		                  keyExtractor={this._keyExtractor}
		                  extraData={this.state}
		                  ListEmptyComponent={this._renderListVide}
		                  ItemSeparatorComponent={this._renderSeparator}
		                  renderItem = {this.renderItem}/>
		        </Content>
	        	</AnimatedScrollView>
		        <Footers navigation ={dataSend} />
	        </Container>
		);
	}
}
const bleuOhome = '#152a45';
const yellowOhome = '#f5d017'
const styles = StyleSheet.create({
	container:{
		// flex:1,
		// justifyContent:'center',
		// alignItems:'center'
	},
	root: {
    backgroundColor: 'red'
  },
  searchContainer: {
    backgroundColor: bleuOhome,
    padding: 20,
    alignItems: 'center', 
    paddingTop:70
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingBottom: 12,
    paddingTop: 7,
    flexDirection: 'row'
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 50,
    backgroundColor: '#FFF'
  },
  header: {
    height: HEADER_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex:100,
    backgroundColor: 'red',
    overflow: 'hidden',
  },
	separator: {
  		left:90,
  	    height: 2,
  	    backgroundColor: '#152a45'
    },
    viewContext:{
	   	backgroundColor:'transparent', 
	   	width:50, 
	   	height:30, 
	   	alignItems:'center', 
	   	justifyContent: 'center',
   },
   containerMenus:{
   		marginTop:10,
        width : 150,
        alignItems : 'center',
        borderWidth: 1,
        borderColor: '#d3d3d3',
    },
   containerMenu:{
       alignItems : 'center'
    },
    textMenu:{
        fontSize: 16
    },
    UnreadItem:{
    	color:'black',
    	fontWeight:'bold'
    },
    ReadItem:{
    	// color:''
    },
    rondBleu:{
    	width:30, 
    	height:30, 
    	backgroundColor:bleuOhome, 
    	borderRadius:50, 
    	alignItems:'center', 
    	justifyContent:'center'
    }
})

const mapStateToProps = state => {
    return {
        fetching:state.fetching,
        messagesParent:state.chat.messagesParent,
        messagesParentSyndic:state.chat.messagesParentSyndic
    }
}

export default connect(mapStateToProps, { fetchMessages })(MessageActivity); 
