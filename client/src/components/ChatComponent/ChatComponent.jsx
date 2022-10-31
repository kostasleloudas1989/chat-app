import { useCallback, useEffect, useRef } from 'react';
import { useAppSelector } from '../../store/redux-hooks';

const ChatComponent = () => {
  const messages = useAppSelector(state => state.messages);
  const msgRef = useRef(null);

  // manages message recieved sound
  const audioPlay = useCallback(() => {
    let audio = new Audio("/message-recieved.mp3")
    audio.play()
  }, []) 
  
  // ---------------------------- Component Lifecycle ----------------------------
  // manages new message box animations
  useEffect(() => {
    if(msgRef.current){
      msgRef.current.classList.remove('animated')
      setTimeout(() => {
        msgRef.current.classList.add('animated')
      }, 100);
      msgRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      audioPlay();
    }
  }, [messages, audioPlay])  
  
  // ----------------------------------------------------------------------------- 
  return (
    <div className='chat'>
      <div className='chat-container'>
        {
          messages?.map(({payload}, i) => {
              return (
                <div key={i} className='message-container' >
                  <b className='msg-sender' >{payload.from}</b>
                  <div 
                    key={`msg-box-${i}`} 
                    className={`message-box animated`} 
                    ref={msgRef}
                  >
                    {payload.text}
                  </div>
                </div>
              )
          })
        }
      </div>
    </div>
  );
}

export default ChatComponent;
