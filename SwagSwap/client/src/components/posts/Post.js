import React from "react";

import { Card, CardBody } from "reactstrap";
import { Link } from 'react-router-dom';


const Post = ({ post }) => {



    return (
        <>
            <Card className="col-s-1 m-4 p-1">

                <Link to={`/post/${post.id}`}>
                    <img className="postImage" src={post.imageUrl} />
                </Link>

            </Card>

        </>
    );
};

export default Post;