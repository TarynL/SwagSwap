import React from "react";
import { Card, CardBody } from "reactstrap";



const SentMessage = ({ message }) => {

    const handleDate = () => {
        let date = new Date(message.createDateTime).toLocaleDateString();
        return date;
    };

    return (
        <>
            <div className="messageCard">

                <Card className="container Smessage">
                    <CardBody className="card-content  sent">
                        <p >{message?.content}</p>
                        <p >To: {message.userProfile.displayName}</p>
                        <p className="date">Sent on: {handleDate()}</p>


                    </CardBody>
                </Card>
                <div className="messageCurlHolder">
                    <div className="messageCurl"></div>
                    <div className="messageCurlCover"></div>
                </div>
            </div>

        </>
    );


};

export default SentMessage;