import { createContext } from "react";
import { recieveMessageAction } from "./actions";
import { CHAT } from "./constants";
import { useAppDispatch } from "./redux-hooks";

const ServerContext = createContext(null);
export { ServerContext };

// gets the endpoint from env
const wsServerEndPoint = process.env.REACT_APP_WS_SERVER_URL;

/* 
    Here we implement a context provider utilizing react's create context hook.
    We connect it to our websocketApi and we implement methods for sending and
    recieving data to it.
*/
const WsContextManager = ({ children }) => {
    const dispatch = useAppDispatch();
    let socket;

    if(!socket) {
        socket = new WebSocket(wsServerEndPoint);
        socket.binaryType = 'blob';
        socket.onmessage = (event) => {
            if(event.data instanceof Blob){
                const reader = new FileReader();
                reader.onload = () => {
                    dispatch(recieveMessageAction(JSON.parse(reader.result)));
                }
                reader.readAsText(event.data)
            } else {
                dispatch(recieveMessageAction(JSON.parse(event.data)));
            }
        };
    }

    const sendMessage = (from, text) => {
        const msg = {
            type: CHAT,
            payload: {
                from: from,
                text
            }
        }
        socket.send(JSON.stringify(msg))
    };

    return (
        <ServerContext.Provider value={{ sendMessage }}>
            { children }
        </ServerContext.Provider>
    );
}

export default WsContextManager;