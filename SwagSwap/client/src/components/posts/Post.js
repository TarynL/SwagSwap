import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from 'react-router-dom';


const Post = ({ post }) => {



    return (
        <>
            <Card className="container w-50 m-2 p-2">
                <CardBody className="card-content">
                    <Link to={`/post/${post.id}`}>
                        <img className="postImage" id="modal" src={post.imageUrl} />
                    </Link>
                </CardBody>
            </Card>
            {/* <div className="modal">
                <div className="modal_contents">
                    {PostDetails()}
                </div>
            </div> */}
        </>
    );
};

export default Post;