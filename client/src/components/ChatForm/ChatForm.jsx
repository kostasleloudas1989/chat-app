import EmojiPicker from 'emoji-picker-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { sendMessageAction } from '../../store/actions';
import { ServerContext } from '../../store/context';
import { useAppDispatch } from '../../store/redux-hooks';

const ChatForm = () => {
  const context = useContext(ServerContext);
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const messageInputRef = useRef(null);
  const userInputRef = useRef(null);  

  // ---------------------------- Component Lifecycle ----------------------------
  useEffect(() => {
    userInputRef?.current?.classList?.remove("error-field")
  }, [name])

  // --------------------------------- Handlers ----------------------------------
  // manages message sending
  const sendMessage = (event) => {
    if(event.keyCode === 13 && 
        event.target.value.trim().length > 0 && 
        validateForm() !== false
      ) {
          dispatch(sendMessageAction(context, name, event.target.value));
          event.target.value = '';
    } 
    else if(event.keyCode === undefined && 
            messageInputRef.current.value.trim().length > 0 && 
            validateForm() !== false
          ){
              dispatch(sendMessageAction(context, name, messageInputRef.current.value));
              messageInputRef.current.value = '';
    }
  };
  // manages emoji selection 
  const handleEmojiPick = (emoji) => {
    messageInputRef.current.value += emoji.emoji
  }
  // manages form validation 
  const validateForm = () => {
    if(name.trim().length === 0) {
      userInputRef?.current?.classList?.add("error-field")
      alert("Please specify a valid User Name")
      return false;
    }    
  }
  // "closes" emoji picker on Esc button press
  window.addEventListener('keydown', (event) => {
    if(event.code === "Escape") {
      setShowPicker(false)
    }
  });

  // ---------------------------------------------------------------------------
  return (
    <div>
      <form>        
        <div className='chat-bar'>
          <div className='user-input-container'>
            <input
              className="user-input"
              ref={userInputRef}
              value={name}
              placeholder="insert your name"
              onChange={event => setName(event.target.value.trim())}
            />
          </div>
          <img
            className='image-button'
            src='/images/emoji-picker-icon.png'
            alt="emojiPicker"
            onClick={() => setShowPicker(val => !val)}
          />
          <input 
            className="message-input" 
            ref={messageInputRef} 
            onKeyUp={sendMessage} 
            placeholder="type a message"
          />
          <img
            data-testid={`send-button-test`}
            className='image-button send-button'
            src='/images/send-icon.png'
            alt="sendMsg"
            onClick={sendMessage}
          />
        </div>                    
      </form>
      {
        showPicker === true &&
          <div className='emoji-picker-container'>
            <EmojiPicker 
              onEmojiClick={handleEmojiPick}
              emojiStyle="apple"
              skinTonesDisabled
              emojiVersion={1}
            />
          </div>          
      }
    </div>
    
  );
}

export default ChatForm;
