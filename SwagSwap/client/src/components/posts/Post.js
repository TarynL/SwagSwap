import React from "react";
import { Card, CardBody } from "reactstrap";

const Post = ({ post }) => {

    return (
        <Card className="container w-50 m-2 p-2">
            <CardBody className="card-content-category">
                <img src={post.imageUrl} />
            </CardBody>

        </Card>
    );
};

export default Post;