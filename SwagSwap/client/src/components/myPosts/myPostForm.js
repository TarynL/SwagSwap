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
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'swagSwap')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dzayiv7cv/image/upload',
            {
                method: 'POST',
                body: data
            }
        )

        const file = await res.json()

        setImage(file.secure_url)
        setLoading(false)
        newPost.imageUrl = file.secure_url
    }

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
        if (newPost.title === '' || newPost.description === '' || newPost.value === 0 || newPost.imageUrl === '' || newPost.categoryId === 0 || newPost.size === '') {
            window.alert("Please fill out all fields to continue.")
        }
        else {
            addPost(newPost).then(() => {
                history.push("/myPosts");
            });
        }


    };

    useEffect(() => {
        getCategories();
    }, [])



    return (
        <Form className="newPost container w-50 text-center">
            <h3 className="newPost-header">New Post</h3>
            <div className="newPost-form">
                <FormGroup >
                    <Label for="imageUrl">Image</Label>
                    <div className="imageInput">
                        <Input type="file"
                            name="file"
                            placeholder="Upload an image"
                            onChange={uploadImage} />

                        {loading ? (
                            <h3>Loading...</h3>
                        ) : (
                            <img src={image} style={{ width: '300px' }} />
                        )}
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label for="title">Title</Label>

                    <Input type="text" name="title" id="title" placeholder="Title"
                        value={newPost.title}
                        onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="textarea" name="description" id="description" placeholder="description"
                        value={newPost.description}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="value">Value</Label>
                    <Input type="text" name="value" id="value" placeholder="Value"
                        value={newPost.value}
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
                    <Input type="text" name="size" id="size" placeholder="Size"
                        value={newPost.size}
                        onChange={handleInputChange} />
                </FormGroup>
                <div >
                    <Button className="newPost-submit btn btn-primary" onClick={handleSave}>Submit</Button>
                    <Button className="newPost-cancel btn btn-primary" onClick={() => history.push(`/myPosts`)}>Cancel</Button>
                </div>
            </div>
        </Form>
    );
};

export default MyPostForm
