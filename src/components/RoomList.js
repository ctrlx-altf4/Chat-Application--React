import React from 'react';

function RoomList(props){
    return(
        <div className="room-list">
            <ul>
                {props.rooms.map( room =>{
                
                    return(
                        <li key={room.id}>
                           <a onClick={()=>props.subscribeToRoom(room.id)} href="#">{room.name}</a> 
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default RoomList;