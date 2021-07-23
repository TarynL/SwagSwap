import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const MyPost = ({ myPost }) => {

    return (
        <Card className="container w-50 m-2 p-2">
            <CardBody className="card-content-category">
                <img className="postImage" src={myPost.imageUrl} />
                <button className="btn btn-light">Delete</button>
                <Link to={`/post/edit/${myPost.id}`}>
                    <button className="btn btn-light">Edit</button>
                </Link>
                {/* <Link to={`/category/${category.id}`}>
                    <button className="btn btn-light">Delete</button>
                </Link>  */}
            </CardBody>

        </Card>
    );
};

export default MyPost;