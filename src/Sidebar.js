import React, {useState,useEffect} from 'react';
import './Sidebar.css';
import {Avatar, IconButton} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db from './firebase';
import { useStateValue } from './StateProvider';
import { Popover, Button } from 'antd';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from  'react-router-dom';
import {auth,provider} from './firebase';


function Sidebar(props) {
    const history = useHistory();
    const [rooms, setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();
    const [searchFilter , setSearchFilter] = useState("");
    // window.rooms =[];
        const logout = () => {
            auth.signOut();
            localStorage.removeItem("userDetails");

            window.location.href = window.location.href.slice(0, window.location.href.indexOf("rooms"));
        };

        useEffect(() => {
            if(searchFilter.length){
                setRooms(window.rooms.
                    filter(e=> e && e.data.name.toLowerCase().includes(searchFilter.toLowerCase())
                    ))
            }else{
                window.rooms && setRooms(window.rooms)
            }
        }, [searchFilter])


    useEffect(() => {
        window.rooms = [];
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => {
                window.rooms.push(doc.data().email.includes(user.email) ? {
                    id: doc.id,
                    data: doc.data()
                } : undefined);
               return doc.data().email.includes(user.email) ? {
                    id: doc.id,
                    data: doc.data()
                } : undefined
            }

            ))
        ));
// debugger
        return () => {
            unsubscribe();
        }
    },[]); 

    const content = (
        <div style={{"display": "flex", justifyContent:"center", cursor: "pointer"}} onClick={()=>{logout()}}>
          <LogoutIcon/>
          Logout
        </div>
      );
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                    <Popover  content={content} title="Options" trigger="click">
                        <MoreVertIcon/>
                        </Popover>
                    </IconButton>
                    
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input onChange={(e)=>{setSearchFilter(e.target.value)}} type="text" placeholder="Search or start new chat"/>
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat/>
                {rooms.map(room=> ( 
                   room ? <SidebarChat key={room.id} id={room.id} name={room.data.name} email={room.data.email}/> :null
                ))}
            </div>
        </div>
    );
}

export default Sidebar;