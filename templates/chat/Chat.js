import React, { Component } from 'react';
import { 
	View, 
	Text, 
	StyleSheet, 
	TextInput, 
	FlatList, 
    Platform, 
    Keyboard,
    ActivityIndicator,
    TouchableOpacity,
    KeyboardAvoidingView, BackHandler, DeviceEventEmitter } from 'react-native';
import {Container, Content, Header, Icon, Left, Button, Title, Footer, Input} from 'native-base';
import moment from 'moment';
import Headers from '../../header/HeaderTopNavigation';
import { connect } from 'react-redux';
import { sendMessage, fetchConversations, fetchMessages, sendMessageSyndic } from '../actions';
import ChatItem from './ChatItem';
import firebase from '../../database/firebase';

class Chat extends Component {
	constructor(props) {
	  super(props);
      let ID_USER_2 = this.props.navigation.state.params.ID_USER_2;
      var USER_NAME_2 = this.props.navigation.state.params.USER_NAME;
      var type = this.props.navigation.state.params.type;
      var dataAnnonces = this.props.navigation.state.params.dataAnnonces;
      var count = this.props.navigation.state.params.count;
      console.warn(type)
      var InfoAnnonces = {
        id:dataAnnonces.id,
        titre:dataAnnonces.titre,
      }
      // console.warn(count);
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.backPressSubscriptions = new Set()
	  this.state = {
	  	disabled:true,
	  	messageText:'',
        ID_USER_2 : ID_USER_2,
        USER_NAME_2: USER_NAME_2,
        InfoAnnonces:InfoAnnonces,
        type: type,
        count: 0
	  };
	}

	componentDidMount(){
        this.setState({
            count:0
        })
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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

            this.backPressSubscriptions.add(this.handleHardwareBack)

        var user1 = global.id;
        var user2 = this.state.ID_USER_2;
        global.iduser2 = user2;
        var idChat = 'chat_'+(user1<user2 ? user1+'_'+user2 : user2+'_'+user1);
        this.props.fetchConversations(idChat);
    }

      componentWillUnmount (){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        DeviceEventEmitter.removeAllListeners('hardwareBackPress')
        this.backPressSubscriptions.clear()
      }

      handleHardwareBack = () => {
       this.props.navigation.goBack();
        return true;
      }
      _scroll() {
        if (Platform.OS === 'ios') {
          this.refs.list.scrollToEnd();
        } else {
          _.delay(() => this.refs.list.scrollToEnd(), 100);
        }
      }

	onTyping(text){
        this.setState({
            messageText:text
        })
		if (text && text.length >= 2) {
			this.setState({
				disabled:false,
			})
		}else{
			this.setState({
				disabled:true
			})
		}
        
	}

	send(){

        // console.warn(global.count)
        var user1 = global.id;
        var user2 = this.state.ID_USER_2;
        var idChat = 'chat_'+(user1<user2 ? user1+'_'+user2 : user2+'_'+user1);

        // const onRef = firebase.database().ref('data_messages');
        // onRef.child('chats/'+idChat).child('countUnread').on('value', (snapshot) => {
        //     const c = snapshot.val()
        //     console.warn(c);
        // });

        var i = 0;
       const chats = {
            chatId: idChat,
            userName_1:global.userName,
            userName_2:this.state.USER_NAME_2,
            senderId:user1,
            receivedId:user2,
            idSyndic:user2,
            lastMessage: this.state.messageText,
            timestamp: moment().format('DD MMM HH:mm'),
            titreAnnonce:this.state.InfoAnnonces.titre,
            idAnnonce:this.state.InfoAnnonces.id,
            users:{
                ['uid_'+user1]:true,
                ['uid_'+user2]:true
            },
            countUnread:{
                [user1]:0,
                [user2]:this.state.count + 1
            }
        };

        this.setState({
            count:this.state.count + 1
        })

       const conversations = {
             messageId:idChat,
             senderId:user1,
             receivedId:user2,
             status:user1+'_unread',
             message: this.state.messageText,
             read: 0,
             timestamp: moment().format('DD MMM HH:mm'),
       }
       if (this.state.type === 'resident') {
            this.props.sendMessage(chats, conversations, idChat)
       }else{
            this.props.sendMessageSyndic(chats, conversations, idChat)
       }
		this.input._root.clear();
		Keyboard.dismiss();
		this.setState({
				disabled:true
			})
	}

	_keyExtractor = (item, index) => index.toString();

	_renderItem(data){
        const dataMessage = data.item;
        // const user2 = 2;
        const params = {
            dataMessage:dataMessage,
            user2: global.iduser2
        }
		return(
				<ChatItem  conversations = {params} />
			);
	}

    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
    }

	render() {
		const titre = this.state.USER_NAME_2;
		const {navigation} = this.props;
		let dataSend = {
			titre,
			navigation
		}
		const extraBtnStyle = this.state.disabled ? styles.disabledBtn : styles.enabledBtn;
		return (
			<Container>
                <View 
                    style = {{position:'absolute', zIndex:100, top:5, left:0}}>
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
            <Headers dataSend={dataSend} />
				<Content style = {styles.container}>
        {(this.state.type === 'resident')?
  				<FlatList
            ref='list'
    				inverted
  					data = {this.props.messages}
  					extraData = {this.state}
  					keyExtractor = {this._keyExtractor}
  					renderItem = {this._renderItem}
  				/>:
          <FlatList
            ref='list'
            inverted
            data = {this.props.messagesSyndic}
            extraData = {this.state}
            keyExtractor = {this._keyExtractor}
            renderItem = {this._renderItem}
          />
        }

				</Content>
				<Footer>
				<View style={styles.inputBar}>
                        <Input 
                        	onChangeText={(text) => this.onTyping(text)}
                            style={styles.textBox}
                            defaultHeight={30}
                            multiline
                            ref={input => { this.input = input} }
                        />

                        <TouchableOpacity
                        	onPress={this.send.bind(this)}
                        	disabled={this.state.disabled}
                            style={[styles.sendBtn, extraBtnStyle]}>
                            <Text style={{ color: '#fff'}}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </Footer>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:10,
    },
    inputBar: {
    	width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: '#dadfea'
    },
    textBox: {
        borderRadius: 50,
        padding:10,
        borderWidth: 1,
        borderColor: 'gray',
        fontSize: 14,
        paddingHorizontal: 10,
        flex: 1,
        marginLeft: 5,
        backgroundColor:'#FFF'
    },
    sendBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        marginLeft: 5,
        // backgroundColor:'#152a45'
    },
    enabledBtn: {
        backgroundColor: '#152a45'
    },
    disabledBtn: {
        backgroundColor: '#89a9f4'
    },
        IconLeft:{
        left:0,
        height:50,
        width:50,
        fontSize:50,
        color:'#152a45',
    }
});

const mapStateToProps = state => {
    return {
        fetching:state.fetching,
        messages:state.chat.messages,
        messagesSyndic:state.chat.messagesSyndic
    }
}

export default connect(mapStateToProps, { sendMessage, sendMessageSyndic, fetchConversations, fetchMessages})(Chat); 
