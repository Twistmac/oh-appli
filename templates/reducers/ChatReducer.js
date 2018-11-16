import {
    MESSAGE_RECEIVED, 
    MESSAGE_RECEIVED_PARENT, 
    FEATCHING, 
    FEATCHING_MESSAGES,

    MESSAGE_RECEIVED_Partenaire, 
    MESSAGE_RECEIVED_PARENT_Partenaire, 
    FEATCHING_Partenaire, 
    FEATCHING_MESSAGES_Partenaire,
    
    MESSAGE_SYNDIC_RECEIVED,
    MESSAGE_SYNDIC_RECEIVED_PARENT,
    FEATCHING_SYNDIC,
    FEATCHING_SYNDIC_MESSAGES} from '../actions/types';
const INITIAL = { fetching: false, messages: [], messagesParent: [], messagesSyndic:[], messagesParentSyndic:[]};

export default (state = INITIAL, action)=>{
	 switch (action.type){

        case FEATCHING:
            return { INITIAL, fetching: true };

        case FEATCHING_Partenaire:
        return { INITIAL, fetching: true };    

        case FEATCHING_SYNDIC:
            return { INITIAL, fetching: true };

        case FEATCHING_MESSAGES:
        return { INITIAL, fetching: true };

        case FEATCHING_MESSAGES_Partenaire:
        return { INITIAL, fetching: true };

        case MESSAGE_RECEIVED:
        return { ...state, fetching: false, messages: action.payload };

        case MESSAGE_RECEIVED_Partenaire:
        return { ...state, fetching: false, messages: action.payload };

        case MESSAGE_SYNDIC_RECEIVED:
        return { ...state, fetching: false, messagesSyndic: action.payload };

        case MESSAGE_RECEIVED_PARENT:
        return { ...state, fetching: false, messagesParent: action.payload };

        case MESSAGE_RECEIVED_PARENT_Partenaire:
        return { ...state, fetching: false, messagesParent: action.payload };

        case MESSAGE_SYNDIC_RECEIVED_PARENT:
        return { ...state, fetching: false, messagesParentSyndic: action.payload };

        default: return state;
    }
}