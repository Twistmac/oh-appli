import {
    MESSAGE_RECEIVED,
    MESSAGE_RECEIVED_PARENT, 
    FEATCHING, 
    FEATCHING_SYNDIC,
    FEATCHING_MESSAGES, 
    FEATCHING_SYNDIC_MESSAGES, 
    MESSAGE_SYNDIC_RECEIVED_PARENT,
    MESSAGE_SYNDIC_RECEIVED,
    FEATCHING_MESSAGES_Partenaire,
    MESSAGE_RECEIVED_PARENT_Partenaire,
    FEATCHING_Partenaire,
    MESSAGE_RECEIVED_Partenaire} from './types';

import firebase from '../../database/firebase';

export const sendMessage = (chats, conversations, idChat) => {
	var racine = firebase.database().ref('data_messages');
    return (dispatch) => {
        racine.child('chats/'+idChat).set(chats);
       const key = racine.child('conversations/'+idChat).push(conversations).key;
        racine.child('conversations/'+idChat+'/'+key).update({ key: key });
        // console.warn(ref);
    }
};


//// chat resident partenaire //////
export const sendPartenaireMessage = (chats, conversations, idChat) => {
	var racine = firebase.database().ref('data_messages');
    return (dispatch) => {
        racine.child('chatsPartenaire/'+idChat).set(chats);
       const key = racine.child('conversationsPartenaire/'+idChat).push(conversations).key;
        racine.child('conversationsPartenaire/'+idChat+'/'+key).update({ key: key });
        // console.warn(ref);
    }
};
/////////////////////////////


export const sendMessageSyndic = (chats, conversations, idChat) => {
  var racine = firebase.database().ref('data_messages');
    return (dispatch) => {
        racine.child('chatsSyndic/'+idChat).set(chats);
       const key = racine.child('conversationsSyndic/'+idChat).push(conversations).key;
        racine.child('conversationsSyndic/'+idChat+'/'+key).update({ key: key });
        // console.warn(ref);
    }
};

export const fetchConversations = (idChat) => {
  var racine = firebase.database().ref('data_messages');
   return (dispatch) => {
       dispatch({ type: FEATCHING });
       const onRef = firebase.database().ref();
       onRef.child('data_messages/conversations/'+idChat).on('value',(snapshot)=> {
           const data = snapshot.val() || [];
           const unread = snapshot.numChildren() || null;
           // console.warn(unread);
           handleData(dispatch,data);
       });

       onRef.child('data_messages/conversationsSyndic/'+idChat).on('value',(snapshot)=> {
           const data = snapshot.val() || [];
           const unread = snapshot.numChildren() || null;
           // console.warn(unread);
           handleDataConvSyndic(dispatch,data);
       });


         /*onRef.child('data_messages/conversations/'+idChat).orderByChild('status').equalTo(1+'_unread').on('value', (snapshot) =>{
            const notread = snapshot.numChildren() || null;
            console.warn(notread);
            // racine.child('chats/'+idChat).update({ status: notread });
            // racine.child('conversations/'+idChat).update({ status: notread });
         })*/
   }
};

export const fetchConversationsPartenaire = (idChat) => {
    var racine = firebase.database().ref('data_messages');
     return (dispatch) => {
         dispatch({ type: FEATCHING_Partenaire });
         const onRef = firebase.database().ref();
         onRef.child('data_messages/conversationsPartenaire/'+idChat).on('value',(snapshot)=> {
             const data = snapshot.val() || [];
             const unread = snapshot.numChildren() || null;
             //console.warn(data);
             handleDataPartenaire(dispatch,data);
         });
     }
  };

  export const fetchMessagesPartenaire = (uid) => {
	return(dispatch) =>{
		dispatch({type:FEATCHING_MESSAGES_Partenaire});
		const onRef = firebase.database().ref('data_messages');
		onRef.child('chatsPartenaire').orderByChild('users/uid_'+uid).equalTo(true).on('value',(snapshot)=> {
           const data = snapshot.val() || [];
           // console.warn(data);
           handleDataMessagePartenaire(dispatch,data);
       });
	}
}




export const fetchMessages = (uid) => {
	return(dispatch) =>{
		dispatch({type:FEATCHING_MESSAGES});
		const onRef = firebase.database().ref('data_messages');
		onRef.child('chats').orderByChild('users/uid_'+uid).equalTo(true).on('value',(snapshot)=> {
           const data = snapshot.val() || [];
           // console.warn(data);
           handleDataMessage(dispatch,data);
       });

    onRef.child('chatsSyndic').orderByChild('users/uid_'+uid).equalTo(true).on('value',(snapshot)=> {
           const data = snapshot.val() || [];
           // console.warn(data);
           handleDataSydic(dispatch,data);
       });
	}
}

/*export const fetchMessagesSyndic = (uid) => {
  return(dispatch) =>{
    dispatch({type:FEATCHING_SYNDIC});
    const onRef = firebase.database().ref('data_messages');

    onRef.child('chatsSyndic').orderByChild('users/uid_'+uid).equalTo(true).on('value',(snapshot)=> {
           const data = snapshot.val() || [];
           // console.warn(data);
           handleDataSydic(dispatch,data);
       });
  }
}*/

const handleData = (dispatch,data) => {
    const messages = [];
    Object.values(data).forEach(msg => {
        messages.unshift(msg);
    });
    dispatch({ type:MESSAGE_RECEIVED, payload: messages });
    // console.warn(messages);
};

const handleDataPartenaire = (dispatch,data) => {
    const messages = [];
    Object.values(data).forEach(msg => {
        messages.unshift(msg);
    });
    dispatch({ type:MESSAGE_RECEIVED_Partenaire, payload: messages });
    // console.warn(messages);
};

const handleDataMessage = (dispatch,data) => {
    const messagesParent = [];
    Object.values(data).forEach(msg => {
        messagesParent.unshift(msg);
    });
    dispatch({ type:MESSAGE_RECEIVED_PARENT, payload: messagesParent });
    // console.warn(messagesParent);
};

const handleDataMessagePartenaire = (dispatch,data) => {
    const messagesParent = [];
    Object.values(data).forEach(msg => {
        messagesParent.unshift(msg);
    });
    dispatch({ type:MESSAGE_RECEIVED_PARENT_Partenaire, payload: messagesParent });
    // console.warn(messagesParent);
};

const handleDataConvSyndic = (dispatch,data) => {
    const messagesSyndic = [];
    Object.values(data).forEach(msg => {
        messagesSyndic.unshift(msg);
    });
    dispatch({ type:MESSAGE_SYNDIC_RECEIVED, payload: messagesSyndic });
    // console.warn(messages);
};

const handleDataSydic = (dispatch,data) => {
    const messagesParentSyndic = [];
    Object.values(data).forEach(msg => {
        messagesParentSyndic.unshift(msg);
    });
    dispatch({ type:MESSAGE_SYNDIC_RECEIVED_PARENT, payload: messagesParentSyndic });
    // console.warn(messages);
}