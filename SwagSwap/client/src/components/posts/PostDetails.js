import React from "react";
import { Card, CardBody, ListGroupItem, ListGroup, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getPostById } from "../../modules/postManager";
import { Link, useHistory } from "react-router-dom";


const PostDetails = () => {
    const [postDetails, setPostDetails] = useState({});
    const { id } = useParams();
    const history = useHistory();


    const getPostDetails = () => {
        getPostById(id)
            .then(setPostDetails)
    }

    const handleDate = () => {
        let date = new Date(postDetails.postedDate).toLocaleDateString();
        return date;
    };

    useEffect(() => {
        getPostDetails();
    }, []);

    return (
        <>
            <div className="detailsPost container w-25 text-center">
                <h2 className="detailsPost-header">Post Details</h2>

                <Card className=" detailsPost-card">
                    <CardBody>

                        <p><b>Title: </b>{postDetails.title}</p>
                        <p><b>Description: </b>{postDetails.description}</p>
                        <p><b>Value: </b>${postDetails.value}</p>
                        <p><b>Size: </b>{postDetails.size}</p>
                        <p><b>Date Posted: </b>{handleDate()}</p>
                        <p><b>Posted By: </b>{postDetails.userProfile?.displayName}</p>
                        <Button onClick={() => history.goBack()} className="btn btn-light">Go Back</Button>
                        <Link to={`/message/${postDetails.id}`}>
                            <Button className="detailsPost-message btn btn-light">Message</Button>
                        </Link>
                        {/* <Link to={`/message/add/${postDetails.id}`}>
                        <Button className="btn btn-primary">Message</Button>
                    </Link> */}
                    </CardBody>
                </Card >
            </div>

        </>
    );
};

export default PostDetails;