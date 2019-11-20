import React from 'react'


function Message(props){
    return(
        <div className="message">
            <div className="message-username">{props.userName}: {props.text}</div>
            {/* <div className="message-text">{props.text}</div> */}
        </div>    
    )
        
    
}
export default Message;