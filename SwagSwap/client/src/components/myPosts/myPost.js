import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Button, CardFooter, Col, Row } from "reactstrap";
import EditModal from "./EditModal";

const MyPost = ({ myPost, handleDelete }) => {





    return (
        <>
            <Col sm="3">
                <Row>
                    <Card className=" myPostCard">
                        <CardBody className="card-content  p-0">
                            <img className="postImage" src={myPost.imageUrl} />

                        </CardBody>
                        <CardFooter className="text-center cardFooter">
                            {/* <Link to={`/post/edit/${myPost.id}`}> */}
                            <Button className="edit  btn-sm btn-light" data-toggle="modal" data-target="#editModal" id="editBtn">Edit</Button>
                            {/* </Link> */}
                            <div id="editModal" className="modal fade" role="form">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        {EditModal}
                                    </div>
                                </div>
                            </div>
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