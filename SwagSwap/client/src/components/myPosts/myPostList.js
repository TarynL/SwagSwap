import React, { useEffect, useState } from "react";
import MyPost from "./myPost";
import { Link, useHistory } from "react-router-dom";
import { getAllPostsFromCurrentUser, deletePost } from "../../modules/postManager";
import { ModalHeader, Modal, ModalBody, ModalFooter, Button, Input } from "reactstrap";
import { updatePost, addPost } from "../../modules/postManager";
import { getAllCategories } from '../../modules/categoryManager';


const MyPostList = () => {
    const [myPosts, setMyPosts] = useState([]);
    const [modal, setModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editPost, setEditPost] = useState({})
    const [category, setCategory] = useState([]);
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        value: 0,
        imageUrl: '',
        categoryId: 0,
        size: ''
    });

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

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



    const toggleModal = () => setModal(!modal);

    const toggleAddModal = () => setAddModal(!addModal);

    const handleEditModal = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const postCopy = { ...editPost };

        postCopy[key] = value;
        setEditPost(postCopy);
    };

    const handleAddModal = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const myPostCopy = { ...newPost };

        myPostCopy[key] = value;
        setNewPost(myPostCopy);
    };


    const getCategories = () => {
        return getAllCategories()
            .then(c => {
                setCategory(c)
            })
    }


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
        toggleModal();
        updatePost(editedPost)
            .then(res => getMyPosts())
    };

    const handleSave = (evt) => {
        evt.preventDefault();
        if (newPost.title === '' || newPost.description === '' || newPost.value === 0 || newPost.imageUrl === '' || newPost.categoryId === 0 || newPost.size === '') {
            alert("Please fill out all fields to continue.")
        }
        else {
            toggleAddModal();
            addPost(newPost)
                .then(res => getMyPosts())
        };
    }





    const getMyPosts = () => {
        getAllPostsFromCurrentUser().then(p => setMyPosts(p));
    };

    const handleDelete = (id) => {
        deletePost(id)
            .then(() => getMyPosts())
    }

    useEffect(() => {
        getCategories();
    }, [])

    useEffect(() => {
        getMyPosts();

    }, []);

    return (

        <div>
            <div className="row">
                <div className="col">
                    <button className="btn btn-secondary add " onClick={toggleAddModal} >Add New Post</button>
                </div>
            </div>
            <div className="mylist ">
                <div className="row">
                    {myPosts.map((myPost) => (
                        <MyPost myPost={myPost} key={myPost.id} handleDelete={handleDelete} toggleModal={toggleModal} setEditPost={setEditPost} />
                    ))}
                </div>
            </div>
            <div>
                <Modal isOpen={modal} toggle={toggleModal} className="MainModal">
                    <ModalHeader toggle={toggleModal} className="headerModal">Edit Post</ModalHeader>
                    <ModalBody>
                        <Input className="m-2" type="text" name="title" id="title" placeholder="Title"
                            value={editPost.title}
                            onChange={handleEditModal} />
                        <Input className="m-2" type="textarea" name="description" id="description" placeholder="Description"
                            value={editPost.description}
                            onChange={handleEditModal} />
                        <Input className="m-2" type="text" name="value" id="value" placeholder="Value"
                            value={editPost.value}
                            onChange={handleEditModal} />

                        <select value={editPost.categoryId} name="categoryId" id="categoryId" onChange={handleEditModal} className='form-control m-2'>
                            <option value="0">Select a Category</option>
                            {category.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>

                        <Input className="m-2" type="text" name="size" id="size" placeholder="Size"
                            value={editPost.size}
                            onChange={handleEditModal} />
                    </ModalBody>
                    <ModalFooter className="footerModal">
                        <Button className="editPost-submit btn btn-primary" onClick={handleUpdate} >Submit</Button>
                        <Button className="editPost-cancel btn btn-primary" onClick={toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
            <div>
                <Modal isOpen={addModal} toggle={toggleAddModal} className="MainModal" >
                    <ModalHeader toggle={toggleAddModal} className="headerModal">Add Post</ModalHeader>
                    <ModalBody>
                        <div className="imageInput m-2">
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
                        <Input className="m-2" type="text" name="title" id="title" placeholder="Title"
                            value={newPost.title}
                            onChange={handleAddModal} />
                        <Input className="m-2" type="textarea" name="description" id="description" placeholder="Description"
                            value={newPost.description}
                            onChange={handleAddModal}
                        />
                        <Input className="m-2" type="text" name="value" id="value" placeholder="Value"
                            value={newPost.value}
                            onChange={handleAddModal} />


                        <select value={newPost.categoryId} name="categoryId" id="categoryId" onChange={handleAddModal} className='form-control m-2'>
                            <option value="0">Select a Category</option>
                            {category.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>

                        <Input type="text" name="size" id="size" placeholder="Size" className="m-2"
                            value={newPost.size}
                            onChange={handleAddModal} />
                    </ModalBody>
                    <ModalFooter className="footerModal">
                        <Button className="editPost-submit btn btn-primary" onClick={handleSave} >Submit</Button>
                        <Button className="editPost-cancel btn btn-primary" onClick={toggleAddModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>


    );
};

export default MyPostList;