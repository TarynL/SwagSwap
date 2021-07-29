import React, { useEffect, useState } from "react";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import { getAllSenderMessagesByPostId, getAllReceiverMessagesByPostId } from "../../modules/messageManager";
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addMessage } from '../../modules/messageManager';
import { getPostById } from '../../modules/postManager';


const MessageList = () => {
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);

    const { id } = useParams();

    const getSentMessages = () => {
        getAllSenderMessagesByPostId(id).then(s => setSentMessages(s));
    }

    const getReceivedMessages = () => {
        getAllReceiverMessagesByPostId(id).then(r => setReceivedMessages(r));
    }

    const emptyMessage = {
        content: '',
        recipientId: 0,
        postId: id
    };

    const [postDetails, setPostDetails] = useState({});
    const [newMessage, setNewMessage] = useState(emptyMessage);
    const history = useHistory();

    const getPostDetails = () => {
        getPostById(id)
            .then(setPostDetails)
    }

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const messageCopy = { ...newMessage };

        messageCopy[key] = value;
        messageCopy.postId = id;
        messageCopy.recipientId = postDetails.userId;
        console.log(messageCopy);
        setNewMessage(messageCopy);

    };

    const handleSave = (evt) => {
        evt.preventDefault();

        addMessage(newMessage).then((m) => {
            history.push("/");
        });

    };





    useEffect(() => {
        getSentMessages();
        getReceivedMessages();
        getPostDetails();
    }, []);

    let MessageComponents = sentMessages.map((message) => (
        <SentMessage message={message} key={message.id} />
    ))
    MessageComponents = MessageComponents.concat(receivedMessages.map((message) => (
        <ReceivedMessage message={message} key={message.id} />
    )))


    return (
        <>
            <Button className="btn btn-primary goBack" onClick={() => history.push(`/`)}>Go Back</Button>

            <div className="message-container">
                <div className="chat-input">
                    <Form>
                        <FormGroup>
                            <Input type="text" name="content" id="content" placeholder="Message Here"
                                value={newMessage.content}
                                onChange={handleInputChange} />

                        </FormGroup>
                        <Button className="btn btn-primary float-right" onClick={handleSave}>Send</Button>


                    </Form>
                </div>
                <div className="container m-2 p-2">
                    {MessageComponents.sort(function (a, b) { return b.key - a.key })}
                </div>


            </div>
        </>
    );
};

export default MessageList;