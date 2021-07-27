// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import { addMessage } from '../../modules/messageManager';
// import { getAllMessages, getAllMessagesByCurrentUser } from "../../modules/messageManager";

// const MessageForm = () => {
//     const emptyMessage = {
//         content: '',
//         receipentId: 0,
//         postId: 0
//     };

//     const [newMessage, setNewMessage] = useState(emptyMessage);
//     const [post, setPost] = useState();
//     const history = useHistory();

//     const handleInputChange = (evt) => {
//         const value = evt.target.value;
//         const key = evt.target.id;

//         const messageCopy = { ...newMessage };

//         messageCopy[key] = value;
//         setNewMessage(messageCopy);

//     };

//     const get = () => {
//         return getAllMessages()
//             .then(m => {
//                 setPost

//             }
//     }

// }