import React from 'react'
import Message from './Message'

function MessageList(props){
    return(
        <div className="message-list">
          {props.messages.map((message,index)=>{
              return(
                  <Message key={index} userName={message[0]} text={message[1]} />
              )
          })}
        </div>
    )
        
    
}
export default MessageList;