import React, { useState,useEffect } from 'react';

function SendMessageForm(props){
    // states
    const [message, setMessage] = useState('');

    //event handlers
    const handleChange=(e)=>{
        setMessage(e.target.value);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
          //accesing the function from parent component to pass value to the parent
        props.sendMessage(message);
        setMessage('');
    }
  
 
    return(
        <form className="send-message-form"  onSubmit={handleSubmit}>
            <input 
                onChange={handleChange}
                value={message}
                placeholder="Type your text here"
                type="text"
            />
        </form>
    )
}
export default SendMessageForm;