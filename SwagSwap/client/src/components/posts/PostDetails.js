import React from "react";
import { Card, CardBody, ListGroupItem, ListGroup, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getPostById } from "../../modules/postManager";
import { Link } from "react-router-dom";


const PostDetails = () => {
    const [postDetails, setPostDetails] = useState({});
    const { id } = useParams();


    const getPostDetails = () => {
        getPostById(id)
            .then(setPostDetails)
    }

    const handleDate = () => {
        let date = new Date(postDetails.publishDateTime).toDateString();
        return date;
    };

    useEffect(() => {
        getPostDetails();
    }, []);

    return (
        <>
            <h2 className="text-center">Details </h2>
            <Card className="w-75 mx-auto">
                <CardBody>

                    <p><b>Title: </b>{postDetails.title}</p>
                    <p><b>Description: </b>{postDetails.description}</p>
                    <p><b>Value: $</b>{postDetails.value}</p>
                    <p><b>Date Posted: </b>{handleDate()}</p>
                    <p><b>Posted By: </b>{postDetails.userProfile?.displayName}</p>
                    {/* <Link to={`/message/add/${postDetails.id}`}>
                    <Button className="btn btn-success">Message</Button>
                </Link> */}
                </CardBody>
            </Card >
        </>
    );
};

export default PostDetails;