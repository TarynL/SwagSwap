import React from "react";
import { Card, CardBody } from "reactstrap";


const ReceivedMessage = ({ receivedMessage }) => {
    return (
        <>
            <Card className="container w-50 m-2 p-2">
                <CardBody className="card-content">

                    <p className="float-right">{receivedMessage?.content}</p>
                </CardBody>
            </Card>
        </>
    );
};

export default ReceivedMessage;