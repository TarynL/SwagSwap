import React, { useEffect, useState } from "react";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import { Card, CardBody } from "reactstrap";
import { getAllSenderMessagesByPostId, getAllReceiverMessagesByPostId } from "../../modules/messageManager";
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, CardHeader } from 'reactstrap';
import { addMessage } from '../../modules/messageManager';
import { getPostById } from '../../modules/postManager';


const MyMessageList = () => {
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [convos, setConvos] = useState();
    const [recipients, setRecipients] = useState();
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
        messageCopy.recipientId = recipients;
        console.log(messageCopy);
        setNewMessage(messageCopy);

    };

    const handleSave = (evt) => {
        evt.preventDefault();
        addMessage(newMessage)
            .then(() => {
                setNewMessage(emptyMessage)
                getSentMessages()
            })


    };



    const getMessages = (sent, received) => {
        let MessageComponents = sent.map((message) => (
            <SentMessage message={message} key={message.id} />
        ))
        MessageComponents = MessageComponents.concat(received.map((message) => (
            <ReceivedMessage message={message} key={message.id} />
        )))
        setConvos(MessageComponents)
    }




    let convosNames = receivedMessages?.map(message => message.userProfile)
    let uniqueNames = new Set();

    const filtered = convosNames.filter(e => {

        const duplicate = uniqueNames.has(e.id);
        uniqueNames.add(e.id);
        return !duplicate;
    })


    const handleOnClick = (e) => {
        e.preventDefault()
        let messager = e.target.value
        let MessageComponents = receivedMessages.filter(s => s.senderId == e.target.value).map((message) => (
            <ReceivedMessage message={message} key={message.id} />))
        MessageComponents = MessageComponents.concat(sentMessages.filter(s => s.recipientId == e.target.value).map((message) => (
            <SentMessage message={message} key={message.id} />
        )))
        setConvos(MessageComponents)
        setRecipients(messager)

    }



    useEffect(() => {
        getReceivedMessages();
        getSentMessages();
        getPostDetails();

    }, []);

    useEffect(() => {
        getMessages(sentMessages, receivedMessages);
    }, [sentMessages, receivedMessages])



    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col convoList">
                        {filtered.map((m) => {
                            return (<Card className="convoListCard w-75">
                                <CardHeader>Conversation With</CardHeader>
                                <CardBody>
                                    <Button className="text-center" value={m.id} onClick={handleOnClick} > {m.displayName}</Button>
                                    <Link to={`/userPosts/${m.id}`}>
                                        <Button className="btn btn-light">See Posts</Button>
                                    </Link>
                                </CardBody>
                            </Card>
                            )
                        })}

                    </div>
                    <div className="col">

                        <Button className="btn btn-primary goBack" onClick={() => history.push(`/myposts`)}>Go Back</Button>

                        <div className="message-container">
                            <div className="chat-input">
                                <Form>
                                    <FormGroup>
                                        <Input disabled={recipients ? false : true} type="text" name="content" id="content" placeholder="Message Here"
                                            value={newMessage.content}
                                            onChange={handleInputChange} />

                                    </FormGroup>
                                    <Button disabled={recipients ? false : true} className="btn btn-primary float-right" onClick={handleSave}>Send</Button>

                                    <div className="container m-2 p-2 convo-cards">
                                        {convos?.sort(function (a, b) { return b.key - a.key })}
                                    </div>
                                </Form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyMessageList;