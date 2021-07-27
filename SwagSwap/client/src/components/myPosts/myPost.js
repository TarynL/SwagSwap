import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Button, CardFooter } from "reactstrap";

const MyPost = ({ myPost, handleDelete }) => {

    return (
        <>
            <Card className="col-xs-1 m-4 p-0">
                <CardBody className="card-content">
                    <img className="postImage" src={myPost.imageUrl} />

                </CardBody>
                <CardFooter className="text-center">
                    <Link to={`/post/edit/${myPost.id}`}>
                        <Button className="btn btn-light">Edit</Button>
                    </Link>
                    <Link>
                        <Button className="btn btn-light" onClick={() => handleDelete(myPost.id)}>Delete</Button>
                    </Link>
                </CardFooter>
            </Card>

        </>
    );
};

export default MyPost;