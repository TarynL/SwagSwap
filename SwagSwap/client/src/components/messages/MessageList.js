import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import { getAllSenderMessagesByPostId, getAllReceiverMessagesByPostId } from "../../modules/messageManager";

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


    useEffect(() => {
        getSentMessages();
        getReceivedMessages();
    }, []);

    let MessageComponents = sentMessages.map((message) => (
        <SentMessage message={message} key={message.id} />
    ))
    MessageComponents = MessageComponents.concat(receivedMessages.map((message) => (
        <ReceivedMessage message={message} key={message.id} />
    )))


    return (
        <>
            <div className="message-container">
                <div className="container m-2 p-2">
                    {MessageComponents.sort(function (a, b) { return b.key - a.key })}
                </div>
            </div>
        </>
    );
};

export default MessageList;