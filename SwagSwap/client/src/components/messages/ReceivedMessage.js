import React from "react";
import { Card, CardBody } from "reactstrap";



const ReceivedMessage = ({ message }) => {

    const handleDate = () => {
        let date = new Date(message.createDateTime).toLocaleDateString();
        return date;
    };
    return (
        <>
            <div className="messageCard">
                <Card className="container  Rmessage">
                    <CardBody className="card-content received">
                        <p >{message?.content}</p>
                        <p >From: {message.userProfile.displayName}</p>
                        <p >Date: {handleDate()}</p>

                    </CardBody>
                </Card>
                <div className="messageCurlHolder">
                    <div className="RmessageCurl"></div>
                    <div className="messageCurlCover"></div>
                </div>
            </div>
        </>
    );


};

export default ReceivedMessage;