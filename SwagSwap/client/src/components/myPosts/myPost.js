import React from "react";
import { Card, CardBody } from "reactstrap";

const MyPost = ({ myPost }) => {

    return (
        <Card className="container w-50 m-2 p-2">
            <CardBody className="card-content-category">
                <img src={myPost.imageUrl} />
                <button className="btn btn-light">Edit</button>
                <button className="btn btn-light">Delete</button>
                {/* <Link to={`/category/${category.id}`}>
                    <button className="btn btn-light">Edit</button>
                </Link>
                <Link to={`/category/${category.id}`}>
                    <button className="btn btn-light">Delete</button>
                </Link> */}
            </CardBody>

        </Card>
    );
};

export default MyPost;