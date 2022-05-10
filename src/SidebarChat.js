import React, {useEffect, useState} from 'react';
import {Avatar} from "@material-ui/core";
import './SidebarChat.css';
import db from './firebase';
import {Link} from 'react-router-dom';
import { Modal, Button, Space } from 'antd';
import { useStateValue } from './StateProvider';
import ModalSeperate from './ModalSeperate';


function info() {
    Modal.info({
      title: 'This is a notification message',
      content: (
        <div>
            Oh ho ! The group is full
        </div>
      ),
      onOk() {},
    });
  }
function SidebarChat({id,name,addNewChat, email}) {
    const [{user},dispatch] = useStateValue();
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");
    const [newPersonEnterOrNot, setNewPersonEnterOrNot] = useState(true);
    const [lengthOfTheGroup, setLengthOfTheGroup] = useState(0);
   
    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()));
                debugger
                let data = snapshot.docs.map((doc) => doc.data());
                let findTheNamsLength = data.reduce((acc,curr)=>{
                    if(!acc.includes(curr.name)){
                        acc.push(curr.name)
                    }
                    return acc
                },[]);
                setLengthOfTheGroup(findTheNamsLength.length);
                if( email && !email.includes(user.email) ){
                    setNewPersonEnterOrNot(false);
                }else{
                    setNewPersonEnterOrNot(true);
                }
            });

        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));        
    }, []);

   
    const createChat = () => {
        debugger
        const roomName = prompt("Please Enter Name for Chat");
        const email = prompt('Enter the Participant email-id')
        if(roomName && email){
            db.collection("rooms").add({
                name: roomName,
                email : [email, user.email]
            })
        }
    };

    return !addNewChat ? (
        
        <Link to={`/rooms/${id}`} key={id}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>Last message : {messages[0]?.type && messages[0]?.type != "image" ? messages[0]?.message : "Sent an image"}</p>
                    <p>{lengthOfTheGroup+ " People are here"}</p>

                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
             
            <h3 className="add-new-chat-title">Add New Chat</h3>
        </div>
    )
}

export default SidebarChat
