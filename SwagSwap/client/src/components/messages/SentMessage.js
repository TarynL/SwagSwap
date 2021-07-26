import React from "react";
import { Card, CardBody } from "reactstrap";


const SentMessage = ({ sentMessage }) => {
    return (
        <>
            <Card className="container w-50 m-2 p-2">
                <CardBody className="card-content">
                    <p>{sentMessage?.content}</p>
                </CardBody>
            </Card>
        </>
    );
};

export default SentMessage;