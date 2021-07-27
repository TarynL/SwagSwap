import React from "react";
import { Card, CardBody } from "reactstrap";



const Message = ({ message }) => {
    return (
        <>
            <Card className="container w-50 m-2 p-2">
                <CardBody className="card-content">
                    <p >{message?.content}</p>
                </CardBody>
            </Card>
        </>
    );


};

export default Message;