import { RECIEVE_MESSAGE, SEND_MESSAGE } from "./constants";

// ---------------------------- Actions ----------------------------------
export const sendMessageAction = (context, from, text) => {
    // uses context provider's sendMessage to communicate with the API
    context.sendMessage(from, text)
    return {
        type: SEND_MESSAGE
    };
};

export const recieveMessageAction = (message) => {
    return {
        type: RECIEVE_MESSAGE,
        payload: message
    };
};