import React from "react";
import { Card, CardBody } from "reactstrap";



const SentMessage = ({ message }) => {

    return (
        <>
            <Card className="container w-50 m-2 p-2">
                <CardBody className="card-content float-right">
                    <p >{message?.content}</p>
                    <p >To: {message.userProfile.displayName}</p>
                    <p >{message?.createDateTime}</p>


                </CardBody>
            </Card>
        </>
    );


};

export default SentMessage;