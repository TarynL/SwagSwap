import React, { useEffect, useState } from "react";
import MyPost from "./MyPost";
import { Link, useHistory } from "react-router-dom";
import { getAllPostsFromCurrentUser, deletePost } from "../../modules/postManager";
import { ModalHeader, Modal, ModalBody, ModalFooter, Button, Input } from "reactstrap";
import { updatePost } from "../../modules/postManager";
import { getAllCategories } from '../../modules/categoryManager';


const MyPostList = () => {
    const [myPosts, setMyPosts] = useState([]);
    const [modal, setModal] = useState(false);
    const [editPost, setEditPost] = useState({})
    const [category, setCategory] = useState([]);

    const history = useHistory();

    const toggleModal = () => setModal(!modal);

    const handleEditModal = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const postCopy = { ...editPost };

        postCopy[key] = value;
        setEditPost(postCopy);
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
                    <Link to={`/post/add`}>
                        <button className="btn btn-secondary add " >Add New Post</button>
                    </Link>
                </div>
            </div>
            <div className="mylist ">
                <div className="row">
                    {myPosts.map((myPost) => (
                        <MyPost myPost={myPost} key={myPost.id} handleDelete={handleDelete} toggleModal={toggleModal} setEditPost={setEditPost} />
                    ))}
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggleModal} className="MainModal">
                <ModalHeader toggle={toggleModal} className="headerModal">Edit Post</ModalHeader>
                <ModalBody>
                    <Input className="m-2" type="text" name="title" id="title" placeholder="title"
                        value={editPost.title}
                        onChange={handleEditModal} />
                    <Input className="m-2" type="textarea" name="description" id="description" placeholder="description"
                        value={editPost.description}
                        onChange={handleEditModal} />
                    <Input className="m-2" type="text" name="value" id="value" placeholder="value"
                        value={editPost.value}
                        onChange={handleEditModal} />

                    <select value={editPost.categoryId} name="categoryId" id="categoryId" onChange={handleEditModal} className='form-control m-2'>
                        <option value="0">Select a Category</option>
                        {category.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>

                    <Input className="m-2" type="text" name="size" id="size" placeholder="size"
                        value={editPost.size}
                        onChange={handleEditModal} />
                </ModalBody>
                <ModalFooter>
                    <Button className="editPost-submit btn btn-primary" onClick={handleUpdate} >Submit</Button>
                    <Button className="editPost-cancel btn btn-primary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>


    );
};

export default MyPostList;