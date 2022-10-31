import { RECIEVE_MESSAGE, SEND_MESSAGE } from "./constants";

const initialState = {
    messages: []
};

export default function chatReducer(state, action) {
    if(!state) {
        return initialState;
    }
    switch (action.type) {
        case SEND_MESSAGE:
            return state;
        case RECIEVE_MESSAGE:
            // fetches only the last 10 messages from state
            return {messages: [...state.messages.slice(-9), action.payload]};
        default:
            return state;
    }    
}