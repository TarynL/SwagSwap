import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Button, CardFooter, Col, Row } from "reactstrap";
import Modal from "./modal";

const MyPost = ({ myPost, handleDelete }) => {
    const [showModal, setShowModal] = useState(false)

    const openModal = () => {
        setShowModal(prev => !prev)
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
                            <Link to={`/post/edit/${myPost.id}`}>
                                <Button className="edit  btn-sm btn-light" onClick={openModal}>Edit</Button>
                            </Link>
                            <div showModal={showModal} setShowModal={setShowModal}></div>
                            <Link>
                                <Button className="delete btn-sm btn-light" onClick={() => handleDelete(myPost.id)}>Delete</Button>
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