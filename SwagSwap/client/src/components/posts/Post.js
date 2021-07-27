import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from 'react-router-dom';


const Post = ({ post }) => {



    return (
        <>
            <Card className="col-xs-1 m-4 p-0">
                <CardBody className="card-content">
                    <Link to={`/post/${post.id}`}>
                        <img className="postImage" id="modal" src={post.imageUrl} />
                    </Link>
                </CardBody>
            </Card>

        </>
    );
};

export default Post;