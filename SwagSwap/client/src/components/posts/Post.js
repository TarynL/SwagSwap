import React from "react";

import { Card, CardBody, Button } from "reactstrap";
import { Link } from 'react-router-dom';


const Post = ({ post }) => {


    const handleDate = () => {
        let date = new Date(post.postedDate).toLocaleDateString();
        return date;
    };

    return (
        <>


            <div className="flip-card m-4">
                <div className="flip-card-inner ">
                    <Card className="postlistCard flip-card-front">

                        {/* <Link to={`/post/${post.id}`}> */}
                        <img className="postImage" src={post.imageUrl} />
                        {/* </Link> */}

                    </Card>
                    <Card className="flip-card-back detailsPost-card">
                        <CardBody>

                            <p><b>Title: </b>{post.title}</p>
                            <p><b>Description: </b>{post.description}</p>
                            <p><b>Value: </b>${post.value}</p>
                            <p><b>Size: </b>{post.size}</p>
                            <p><b>Date Posted: </b>{handleDate()}</p>
                            <p><b>Posted By: </b>{post.userProfile?.displayName}</p>
                        </CardBody>
                        <Link to={`/message/${post.id}`}>
                            <button className="detailsPost-message btn btn-light">Message</button>
                        </Link>
                        {/* <Link to={`/message/add/${postDetails.id}`}>
                        <Button className="btn btn-primary">Message</Button>
                    </Link> */}

                    </Card >
                </div>
            </div>


        </>
    );
};

export default Post;