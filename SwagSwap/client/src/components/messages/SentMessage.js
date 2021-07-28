import React from "react";
import { Card, CardBody } from "reactstrap";



const SentMessage = ({ message }) => {

    const handleDate = () => {
        let date = new Date(message.createDateTime).toLocaleDateString();
        return date;
    };

    return (
        <>
            <Card className="container w-50 m-2 p-2">
                <CardBody className="card-content float-right">
                    <p >{message?.content}</p>
                    <p >To: {message.userProfile.displayName}</p>
                    <p >Date: {handleDate()}</p>


                </CardBody>
            </Card>
        </>
    );


};

export default SentMessage;