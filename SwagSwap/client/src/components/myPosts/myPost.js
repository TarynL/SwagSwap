import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Button, CardFooter, Col } from "reactstrap";

const MyPost = ({ myPost, handleDelete }) => {

    return (
        <>
            <Col sm="2">
                <Card className="m-2 ">
                    <CardBody className="card-content  p-0">
                        <img className="postImage" src={myPost.imageUrl} />

                    </CardBody>
                    <CardFooter className="text-center">
                        <Link to={`/post/edit/${myPost.id}`}>
                            <Button className="btn btn-light">Edit</Button>
                        </Link>
                        <Link>
                            <Button className="btn btn-light" onClick={() => handleDelete(myPost.id)}>Delete</Button>
                        </Link>
                        <Link to={`/messages/${myPost.id}`}>
                            <Button className="btn btn-light">Messages</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </Col>
        </>
    );
};

export default MyPost;