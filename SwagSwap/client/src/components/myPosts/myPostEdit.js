import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getPostById, updatePost } from "../../modules/postManager";

const MyPostEdit = () => {
    const [editPost, setEditPost] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const postCopy = { ...editPost };

        postCopy[key] = value;
        setEditPost(postCopy);
    };

    const handleUpdate = (evt) => {
        evt.preventDefault();
        const editedPost = {
            id: editPost.id,
            userId: editPost.userId,
            title: editPost.title,
            description: editPost.description,
            value: editPost.value,
            imageUrl: editPost.imageUrl,
            postedDate: editPost.postedDate,
            categoryId: editPost.categoryId,
            size: editPost.size

        };
        updatePost(editedPost).then((p) => {
            history.push("/myPosts");
        });

    };
    useEffect(() => {
        getPostById(id)
            .then(p => {
                setEditPost(p);
            });
    }, [])

    return (
        <Form>
            <h2>Edit Post</h2>
            <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="title" id="title" placeholder="title"
                    value={editPost.title}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input type="text" name="description" id="description" placeholder="description"
                    value={editPost.description}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="value">Value</Label>
                <Input type="text" name="value" id="value" placeholder="value"
                    value={editPost.value}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="imageUrl">Image</Label>
                <Input type="text" name="imageUrl" id="imageUrl" placeholder="image"
                    value={editPost.imageUrl}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="categoryId">Category</Label>
                <Input type="text" name="categoryId" id="categoryId" placeholder="category"
                    value={editPost.categoryId}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="size">Size</Label>
                <Input type="text" name="size" id="size" placeholder="size"
                    value={editPost.size}
                    onChange={handleInputChange} />
            </FormGroup>

            <Button className="btn btn-primary" onClick={handleUpdate}>Submit</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/myPosts`)}>Cancel</Button>
        </Form>
    );

};

export default MyPostEdit;
