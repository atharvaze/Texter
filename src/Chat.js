import {Avatar,IconButton } from '@material-ui/core'
import {MoreVert,SearchOutlined, AttachFile, Message, InsertEmoticon, Mic} from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Chat.css'
import db from './firebase'
import {useStateValue} from './StateProvider'
import firebase from 'firebase'
import SendIcon from '@material-ui/icons/Send';
function Chat() {
    const [roomName,setroomName] = useState([])
    const [seed,setSeed] = useState('')
    const [input,setInput] = useState('')
    const {roomId} = useParams();
    const [messages,setMessages] = useState([])
    const [{user},dispatch] = useStateValue();


    useEffect(()=>{
      if(roomId){
          db.collection('rooms')
          .doc(roomId).onSnapshot(snapshot=>{
              setroomName(snapshot.data().name)
          })
          db.collection('rooms').doc(roomId)
          .collection('messages').orderBy('timestamp','asc')
          .onSnapshot(snapshot=>(
              setMessages(snapshot.docs.map(doc=>doc.data()))
          ))
      }    
    },[roomId])

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));  
    },[roomId])

    const sendMsg = (e)=>{
        if(input != ''){
            
        e.preventDefault()
        console.log(input)
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
    }
        setInput('')
    }
    return (
        <div className="chat">
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="chat__headerInfo">
              <h3>{roomName}</h3>
              <p>Last seen {""}
              {new Date(
                  messages[messages.length-1]?.
              timestamp?.toDate()).toUTCString()}

              </p>
        
            </div>
            <div className="chat__headerRight">

            </div>
            </div>
            <div className="chat__body">
            {messages.map(message=>(
            <p className={`chat__message ${message.name == user.displayName &&"chat__receiver"}`}>
            <span className="chat__name">{message.name}</span>
                {message.message}
            <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
            </p>
            ))}
            

            
            </div>
            <div className="chat__footer">
            <InsertEmoticon/>
            <form>
                <input value={input}onChange={e=>setInput(e.target.value)} placeholder="type a message" type="text" required/>
                <button type="submit" onClick={sendMsg}><SendIcon/></button>
                
                
            </form>
            
            </div>
        </div>
    )
}

export default Chat
