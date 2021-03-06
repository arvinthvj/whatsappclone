import React, {useState,useEffect} from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './Chat.css';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import {useStateValue} from "./StateProvider";
import moment from 'moment';
import SendIcon from '@mui/icons-material/Send';
const imageToBase64 = require('image-to-base64');
var base64Img = require('base64-img');
var fs = require('fs');
function Chat() {
    const [input, setInput] = useState("");
    const [image, setImage] = useState("");
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data()?.name);
            });
            let dateOnceFinder = {};
            db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc, index) => {
                    debugger
                    if(index == snapshot.docs.length-1){
                        setTimeout(() => {
                            dateOnceFinder = {};
                        }, 400);
                    }
                    if(!dateOnceFinder[new Date(doc.data().timestamp1).toLocaleDateString()]){
                        debugger
                        dateOnceFinder[new Date(doc.data().timestamp1).toLocaleDateString()] = moment(new Date(doc.data().timestamp1)).format("DD/MM/YYYY") == moment().subtract(1, "days").format("DD/MM/YYYY") ? "Yesterday"  : new Date(doc.data().timestamp1).toLocaleDateString() == new Date().toLocaleDateString() ? "Today": new Date(doc.data().timestamp1).toLocaleDateString();
                        return {...doc.data(), dateOnce : dateOnceFinder[new Date(doc.data().timestamp1).toLocaleDateString()]}
                    }else{
                        return doc.data()
                    }
                    
                }))
            });

        }
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));        
    }, [roomId]);
const submitIcon=()=>{

}
    const sendMessage = async(e , isImageTrue) => {
        e.preventDefault();
        const blobToBase64 = blob => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            return new Promise(resolve => {
              reader.onloadend = () => {
                resolve(reader.result);
              };
            });
          };
          let imageAsString  ;
          if(isImageTrue){
            imageAsString =  await blobToBase64(URL.createObjectURL(image));
          }
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: isImageTrue ?  imageAsString :  input,
            name: user.displayName,
            timestamp : new Date().toUTCString(),
            timestamp1: new Date().toUTCString(),
            type : isImageTrue ? "image" : "text"
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
                    <>
                    <div className='tagHolder'>
                    {message.dateOnce && <p className='tagsForChat'>{message.dateOnce}</p>}
                    </div>
                    {message.type && message.type == "image" ? <>
                     <span className="chat_name">{message.name}</span>
                     <div className={`chat_message ${ message.name == user.displayName && 'chat_receiver'} image`}>
                         <img src={message.message}>
                         </img>
                     </div>
                    </>:
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
                     </span>
                </p> 
                    }
                    
                    </>
                ))}
            </div>
            <div className='chat_footer'>
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button type="submit" onClick={sendMessage}> Send a Message</button>
                </form>
                <MicIcon/>
                {/* <div onClick> */}
                <input type="file"
                onChange = {(e)=>{setImage(e.target.files[0])}}
       id="avatar" name="avatar"
       accept="image/png, image/jpeg" />
                <AddPhotoAlternateIcon/>
                {/* </div> */}
                <SendIcon onClick={(e)=>{sendMessage(e, true)}}/>
                
            </div>
            
        </div>
    )
}

export default Chat
