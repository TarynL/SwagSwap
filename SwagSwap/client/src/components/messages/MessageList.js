import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Message from "./Message";
import { getAllMessagesByPostId } from "../../modules/messageManager";

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const { id } = useParams();

    const getMessages = () => {
        getAllMessagesByPostId(id).then(r => setMessages(r));
    }


    useEffect(() => {
        getMessages();
    }, []);

    return (
        <>
            <div className="message-container">
                <div className="container m-2 p-2 float-left">
                    {messages.map((message) => (
                        <Message message={message} key={message.id} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default MessageList;