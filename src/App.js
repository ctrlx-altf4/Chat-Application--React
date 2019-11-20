import React, {useState, useEffect} from 'react';
import Chatkit from '@pusher/chatkit-client';
import './App.css';
import RoomList from "./components/RoomList";
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import NewRoomForm from './components/NewRoomForm';
import {tokenUrl, instanceLocator} from "./config";

function App() {

  const [message, setMessages]                = useState([]);
  const [user,setUser]                        = useState([]);
  const [joinableRooms,setAvailableRooms]     = useState([]);
  const [joinedRooms, setJoinedRooms]         = useState([])


  useEffect(()=>{
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'prj',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    //Connecting to Chatkit API
    chatManager.connect()
    .then(currentUser =>{

      //to take out this resolved object out of this useEffect Scope
      setUser(currentUser);
      
      //Finding the joinable Rooms
      getRooms(currentUser);
   
    })
    .catch((err)=>{
      console.log("error:0 "+ err);
    })
  
  },[])//to remove the infinite loop


//State values set from this function is passed down to RoomList Component
const getRooms=(currentUser)=>{
   currentUser.getJoinableRooms()
      .then(joinableRooms=>{
        setAvailableRooms(joinableRooms);
        setJoinedRooms(currentUser.rooms);
      })
      .catch((err)=>{
        console.log(err);
      })

}


//Invoked from RoomList Component
const subscribeToRoom=(roomId)=>{
  setMessages([" "]);
  user.subscribeToRoomMultipart({
    roomId,
    hooks: {
      onMessage: msg =>{
        setMessages(message=>[...message, [msg.senderId, msg.parts[0].payload.content]]);
      }
    }
  })
  .then(room=>{
    getRooms(user);
  })
  .catch((err)=>{
    console.log('error on subscribing to room: '+ err);
  })
}

//Invoked from SendMessageForm Component
const sendMessage=(text)=>{
  console.log(user);
  user.sendSimpleMessage({
    text,
    roomId:user.rooms[0].id
  })
}

  return (

    <div className="App">
      <RoomList subscribeToRoom={subscribeToRoom} rooms={[...joinableRooms,...joinedRooms]}/>
      <MessageList messages={message}/>
      <SendMessageForm sendMessage={sendMessage}/>
      <NewRoomForm/>
    </div>
  );
 
}

export default App;
