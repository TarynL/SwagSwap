import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const MyPost = ({ myPost, handleDelete }) => {

    return (
        <Card className="container w-50 m-2 p-2">
            <CardBody className="card-content">
                <img className="postImage" src={myPost.imageUrl} />
                <Link to={`/post/edit/${myPost.id}`}>
                    <button className="btn btn-light">Edit</button>
                </Link>

                <button className="btn btn-light" onClick={() => handleDelete(myPost.id)}>Delete</button>

            </CardBody>

        </Card>
    );
};

export default MyPost;