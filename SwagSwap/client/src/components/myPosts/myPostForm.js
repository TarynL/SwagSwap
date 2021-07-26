import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addPost } from '../../modules/postManager';
import { getAllCategories } from "../../modules/categoryManager";


const MyPostForm = () => {
    const emptyPost = {
        title: '',
        description: '',
        value: 0,
        imageUrl: '',
        categoryId: 0,
        size: ''
    };

    const [newPost, setNewPost] = useState(emptyPost);
    const [category, setCategory] = useState([]);

    const history = useHistory();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const myPostCopy = { ...newPost };

        myPostCopy[key] = value;
        setNewPost(myPostCopy);
    };

    const getCategories = () => {
        return getAllCategories()
            .then(categoriesFromAPI => {
                setCategory(categoriesFromAPI)
            })
    }

    const handleSave = (evt) => {
        evt.preventDefault();

        addPost(newPost).then((p) => {
            history.push("/myPosts");
        });

    };

    useEffect(() => {
        getCategories();
    }, [])



    return (
        <Form>
            <h2>New Post</h2>
            <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="title" id="title" placeholder="title"
                    value={newPost.title}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input type="text" name="description" id="description" placeholder="description"
                    value={newPost.description}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="value">Value</Label>
                <Input type="text" name="value" id="value" placeholder="value"
                    value={newPost.value}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="imageUrl">Image</Label>
                <Input type="text" name="imageUrl" id="imageUrl" placeholder="image"
                    value={newPost.imageUrl}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="categoryId">Category</Label>
                <select value={newPost.categoryId} name="categoryId" id="categoryId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Select a Category</option>
                    {category.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </FormGroup>
            <FormGroup>
                <Label for="size">Size</Label>
                <Input type="text" name="size" id="size" placeholder="size"
                    value={newPost.size}
                    onChange={handleInputChange} />
            </FormGroup>

            <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/myPosts`)}>Cancel</Button>

        </Form>
    );
};

export default MyPostForm;
