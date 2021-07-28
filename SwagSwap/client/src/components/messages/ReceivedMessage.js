import React from "react";
import { Card, CardBody } from "reactstrap";



const ReceivedMessage = ({ message }) => {

    const handleDate = () => {
        let date = new Date(message.createDateTime).toLocaleDateString();
        return date;
    };
    return (
        <>
            <Card className="container w-50 m-2 p-2">
                <CardBody className="card-content float-left">
                    <p >{message?.content}</p>
                    <p >From: {message.userProfile.displayName}</p>
                    <p >Date: {handleDate()}</p>

                </CardBody>
            </Card>
        </>
    );


};

export default ReceivedMessage;