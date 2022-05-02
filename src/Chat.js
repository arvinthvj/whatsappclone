import React, {useState,useEffect} from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './Chat.css';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import {useStateValue} from "./StateProvider";
import moment from 'moment';

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            });

            db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            });

        }
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));        
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp : new Date().toUTCString(),
            timestamp1: new Date().toUTCString(),
        })

        setInput("");
    }

    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='chat_headerInfo'>
                    <h3 className='chat-room-name'>{roomName}</h3>
                    <p className='chat-room-last-seen'>
                        Last seen {" "}
                        {moment(new Date(
                            messages[messages.length - 1]?.
                            timestamp1
                        )).fromNow()
                        }
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                    
                </div>
            </div>
            <div className='chat_body'>
                {messages.map(message => (
                    <p key={message.id} className={`chat_message ${ message.name == user.displayName && 'chat_receiver'}`}>
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat_timestemp">{moment(new Date(
                            message.
                            timestamp1
                        )).fromNow().includes("seconds") || moment(new Date(
                            message.
                            timestamp1
                        )).fromNow().includes("minute") || moment(new Date(
                            message.
                            timestamp1
                        )).fromNow().includes("hour") ? moment(new Date(
                            message.
                            timestamp1
                        )).fromNow() :  (`${moment(new Date(message.timestamp1)).format('hh:mm A')} ${new Date(message.timestamp1).toLocaleDateString()}`)} 
                        {/* { !moment(new Date(
                            message.
                            timestamp1
                        )).fromNow().includes("seconds") || !moment(new Date(
                            message.
                            timestamp1
                        )).fromNow().includes("minutes") || !moment(new Date(
                            message.
                            timestamp1
                        )).fromNow().includes("hours") ? "": new Date(message.timestamp1).toDateString()} */}
                        </span>
                    </p>
                ))}
            </div>
            <div className='chat_footer'>
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button type="submit" onClick={sendMessage}> Send a Message</button>
                </form>
                <MicIcon/>
            </div>
            
        </div>
    )
}

export default Chat
