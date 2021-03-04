import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import db from './firebase';
import './sidebarchat.css'
function Sidebarchat({id,name,addNewChat}) {
    const [seed,setseed] = useState('');
    const [messages,setMessages] = useState('')

    useEffect(()=>{
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snap=>(
               setMessages(snap.docs.map((docs)=> docs.data())) 
            ))
        }
    },[id])
    useEffect(()=>{
    setseed(Math.floor(Math.random()*5000));        

    },[])

    const createChat = ()=>{
        const roomName = prompt("Please enter name for chat")
        if (roomName){
            db.collection('rooms').add({
                name:roomName,
            })
        }
    };
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarchat">
           <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
           <div className="sidebarchat__info">
               <h2>{name}</h2>
               <p>{messages[0]?.message}</p>
           </div>

        </div>

        </Link>

    ):(
        <div onClick={createChat}
        className="sidebarchat">
           <h2>Add new chat</h2> 
        </div>
    )
}

export default Sidebarchat

