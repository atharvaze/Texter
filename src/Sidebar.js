import React, { useEffect, useState } from 'react'
import {Avatar,IconButton } from '@material-ui/core'
import {DonutLarge,Chat,MoreVert,SearchOutlined} from '@material-ui/icons'
import './Sidebar.css' 
import Sidebarchat from './Sidebarchat'
import db from './firebase'
import { useStateValue } from './StateProvider'
function Sidebar() {

    const [rooms,setRooms] = useState([]);
    const [{user},dispatch] = useStateValue()
    useEffect(()=>{
        const unsubs = db.collection('rooms').onSnapshot(snap=>{
            setRooms(snap.docs.map(doc=>
                ({
                    id:doc.id,
                    data:doc.data(),
                })
                ))
            })

        return ()=>{
            unsubs()
        }
    },[])
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">

                </div>
                
            </div>
            <div className="sidebar__search">
            <div className="sidebar__searchContainer">
            <SearchOutlined/>
            <input placeholder="Search" type="text"/>
            </div>
            

            </div>
            <div className="sidebar__chat">

                <Sidebarchat addNewChat/>
                {rooms.map(room=>(
                    <Sidebarchat key={room.id} id={room.id}
                    name={room.data.name} />
                ))}


            </div>
        </div>
    )
}

export default Sidebar
