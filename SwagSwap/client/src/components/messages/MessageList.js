import React, { useEffect, useState } from "react";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import { useParams } from "react-router";
import { getPostById } from "../../modules/postManager";
import { getAllMessages, getAllMessagesByCurrentUser } from "../../modules/messageManager";

const MessageList = () => {
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    // const [postImage, setPostImage] = useState([]);
    // const { id } = useParams();


    const getSentMessages = () => {
        getAllMessagesByCurrentUser().then(s => setSentMessages(s));
    };

    const getReceivedMessages = () => {
        getAllMessages().then(r => setReceivedMessages(r));
    }
    // const getPostImage = () => {
    //     getPostById(id)
    //         .then(setPostImage)
    // }


    useEffect(() => {
        // getPostImage();
        getSentMessages();
        getReceivedMessages();

    }, []);

    return (
        <>
            <div className="message-container">
                {/* <div>{postImage.imageUrl}</div> */}
                <div className="container m-2 p-2 float-right">
                    {/* {sentMessages.map((sentMessage) => (
                        <SentMessage sentMessage={sentMessage} key={sentMessage.id} />
                    ))} */}
                </div>
                <div className="container m-2 p-2 float-left">
                    {receivedMessages.map((receivedMessage) => (
                        <ReceivedMessage receivedMessage={receivedMessage} key={receivedMessage.id} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default MessageList;