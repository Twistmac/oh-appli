import {
    MESSAGE_RECEIVED, 
    MESSAGE_RECEIVED_PARENT, 
    FEATCHING, 
    FEATCHING_MESSAGES,
    
    MESSAGE_SYNDIC_RECEIVED,
    MESSAGE_SYNDIC_RECEIVED_PARENT,
    FEATCHING_SYNDIC,
    FEATCHING_SYNDIC_MESSAGES} from '../actions/types';
const INITIAL = { fetching: false, messages: [], messagesParent: [], messagesSyndic:[], messagesParentSyndic:[]};

export default (state = INITIAL, action)=>{
	 switch (action.type){

        case FEATCHING:
            return { INITIAL, fetching: true };

        case FEATCHING_SYNDIC:
            return { INITIAL, fetching: true };

        case FEATCHING_MESSAGES:
        return { INITIAL, fetching: true };

        case MESSAGE_RECEIVED:
        return { ...state, fetching: false, messages: action.payload };

        case MESSAGE_SYNDIC_RECEIVED:
        return { ...state, fetching: false, messagesSyndic: action.payload };

        case MESSAGE_RECEIVED_PARENT:
        return { ...state, fetching: false, messagesParent: action.payload };

        case MESSAGE_SYNDIC_RECEIVED_PARENT:
        return { ...state, fetching: false, messagesParentSyndic: action.payload };

        default: return state;
    }
}