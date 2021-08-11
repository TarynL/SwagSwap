import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Button, CardFooter, Col, Row } from "reactstrap";
import { getPostById } from "../../modules/postManager";

const MyPost = ({ myPost, handleDelete, setEditPost, toggleModal }) => {


    const handleSetEdit = (postId) => {
        toggleModal()
        getPostById(postId)
            .then(res => setEditPost(res))
    }


    return (
        <>
            <Col sm="3">
                <Row>
                    <Card className=" myPostCard">
                        <CardBody className="card-content  p-0">
                            <img className="postImage" src={myPost.imageUrl} />

                        </CardBody>
                        <CardFooter className="text-center cardFooter">
                            <Button className="edit  btn-sm btn-light" onClick={() => handleSetEdit(myPost?.id)} id="editBtn">Edit</Button>
                            <Link>
                                <Button className="delete btn-sm btn-light" onClick={() => handleDelete(myPost?.id)}>Delete</Button>
                            </Link>
                            <Link to={`/messages/${myPost.id}`}>
                                <Button className="message btn-sm btn-light">Messages</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </Row>
            </Col>
        </>
    );
};

export default MyPost;