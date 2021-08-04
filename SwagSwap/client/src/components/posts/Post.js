import React from "react";

import { Card, CardBody, Col } from "reactstrap";
import { Link } from 'react-router-dom';


const Post = ({ post }) => {



    return (
        <>
            <Col sm="2">
                <Card className="m-4 ">

                    <Link to={`/post/${post.id}`}>
                        <img className="postImage" src={post.imageUrl} />
                    </Link>

                </Card>
            </Col>
        </>
    );
};

export default Post;