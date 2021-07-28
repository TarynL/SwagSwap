import React from "react";
import { Card, CardBody } from "reactstrap";



const ReceivedMessage = ({ message }) => {

    return (
        <>
            <Card className="container w-50 m-2 p-2">
                <CardBody className="card-content float-left">
                    <p >{message?.content}</p>
                    <p >From: {message.userProfile.displayName}</p>
                    <p >{message?.createDateTime}</p>

                </CardBody>
            </Card>
        </>
    );


};

export default ReceivedMessage;