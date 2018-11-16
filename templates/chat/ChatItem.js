import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
// import { connect } from 'react-redux';
import { Container, Header, Content, Thumbnail} from 'native-base';
import { connect } from 'react-redux';
import firebase from '../../database/firebase';

// create a component
class ChatItem extends Component {

    constructor(props) {
      super(props);
        //console.warn('this.props.messages')
      this.state = {
        id:1,
        isModalVisible: false,
      };
    }

    showAvatarOrNoT(message) {
                if (message.senderId != global.id) {
                    return (
                        <Thumbnail
                            source={require('../../img/nobody.png')}
                            small
                            rounded
                        />
                    )
                }else{
                    return(
                        <View />
                    )
                }
           
    }

    ConfirmationSupp(message){
        Alert.alert(
          'Delete',
          'Do You want to delete this message?',
          [
            {text: 'NO', style: 'cancel'},
            {text: 'YES', onPress: () => this.deleteMessagesItem(message)},
          ]
        );
    }

    deleteMessagesItem(message){
        var user1 = global.id;
        var user2 = this.props.conversations.user2;
        var idChat = 'chat_'+(user1<user2 ? user1+'_'+user2 : user2+'_'+user1);

        const key = message.key
        var racine = firebase.database().ref('data_messages');
        const del =  racine.child('conversations/'+idChat).child(key).remove();
        // console.warn(del);
    }

    _renderTouchableInMymessage(message){
        const isMyMessage = message.senderId == global.id;
        const messageItem = isMyMessage ? styles.messageItemRight : styles.messageItemLeft;
        const messageTextColor = isMyMessage ? styles.myMessage : styles.notMyMessage;
        if (isMyMessage) {
            return(
                    <TouchableOpacity onPress = {this.ConfirmationSupp.bind(this, message)} >
                        <View style={[styles.mess,messageItem]}>
                            <Text style = {[styles.messageText, messageTextColor,]} > {message.message} </Text>
                        </View>
                    </TouchableOpacity>
                );
        }else{
            return(
                    <View style={[styles.mess,messageItem]}>
                        <Text style = {[styles.messageText, messageTextColor,]} > {message.message} </Text>
                    </View>
                );
        }
    }

    render(){
        const message = this.props.conversations.dataMessage;
        const isMyMessage = message.senderId == global.id;
        const textContainerExtra = isMyMessage ? styles.textContainerRight : styles.textContainerLeft;
        
        
        return(
            <View>
                <View style={styles.messageContainer}>
                {this.showAvatarOrNoT(message)}
                    <View style={[styles.textContainer, textContainerExtra ]}>
                        {this._renderTouchableInMymessage(message)}
                        <Text style = {{fontSize:10}} > {message.timestamp} </Text>
                    </View>
                </View>
            </View>
            )
    }
}

// define your styles
const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 0,
    },
    textContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flex:1,
        borderRadius:20
    },
    textContainerLeft:{
        alignItems: 'flex-start',
        // backgroundColor: '#d5d8d4'
    },
    textContainerRight: {
        alignItems: 'flex-end',
        // backgroundColor: '#007AFF'
    },
    message: {
        fontSize: 16
    },
    sender: {
        fontWeight: 'bold',
        paddingRight: 10
    },
    messageText:{
        fontSize:16
    },
    myMessage:{
        color:'#FFF'
    },
    notMyMessage:{
        color:'black',
        
    },
    messageItemRight: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 20,
        alignItems: 'flex-end'
    },
    messageItemLeft: {
        backgroundColor: '#d5d8d4',
        padding: 10,
        borderRadius: 20,
        alignItems: 'flex-end'
    },
    mess:{
        borderWidth: 0,
    }
});

const mapStateToProps = state => {
    return {
        fetching:state.fetching,
        messages:state.chat.messages
    }
}

export default connect(mapStateToProps)(ChatItem); 
