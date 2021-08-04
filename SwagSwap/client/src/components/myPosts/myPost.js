import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Button, CardFooter, Col } from "reactstrap";

const MyPost = ({ myPost, handleDelete }) => {

    return (
        <>
            <Col sm="3">
                <Card className=" myPostCard">
                    <CardBody className="card-content  p-0">
                        <img className="postImage" src={myPost.imageUrl} />

                    </CardBody>
                    <CardFooter className="text-center cardFooter">
                        <Link to={`/post/edit/${myPost.id}`}>
                            <Button className="edit btn btn-light">Edit</Button>
                        </Link>
                        <Link>
                            <Button className="delete btn btn-light" onClick={() => handleDelete(myPost.id)}>Delete</Button>
                        </Link>
                        <Link to={`/messages/${myPost.id}`}>
                            <Button className="message btn btn-light">Messages</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </Col>
        </>
    );
};

export default MyPost;