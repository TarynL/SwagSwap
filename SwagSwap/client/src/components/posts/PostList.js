import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Post from "./Post";
import { getAllPosts } from "../../modules/postManager";
import { getPostsByCategoryId } from "../../modules/postManager";
import { getAllCategories } from "../../modules/categoryManager";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState([]);
    // const [postByCategory, setPostByCategory] = useState([]);
    // const { id } = useParams();



    const getPosts = () => {
        getAllPosts().then(p => setPosts(p));
    };
    const getCategories = () => {
        return getAllCategories()
            .then(c => {
                setCategory(c)
            })
    }


    // const handleCategoryDropdown = (e) => {
    //     const value = e.target.value;
    //     const key = e.target.id;
    //     const categoryPost = [];
    //     categoryPost[key] = value;
    //     getPostsByCategoryId(id)
    //         .then(setPostByCategory(categoryPost))

    // }


    useEffect(() => {
        getCategories();
        getPosts();
        // getPostsByCategoryId(id);

    }, []);

    return (
        <>
            <div >
                <div className="header m-2 p-2 ">
                    <h1>Out With The Old, In With The New...For You</h1>
                </div>
                <Form className="container row justify-content-center ">
                    <FormGroup className="Col-md-6 m-2 p-2">
                        <Label for="categoryId">Filter by Category</Label>
                        <select name="categoryId" id="categoryId" className='form-control'>
                            <option value="0">Filter by Category</option>
                            {category.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </FormGroup>
                    <FormGroup className="Col-md-6 m-2 p-2 float-right">
                        <Label for="value">Filter by Value</Label>
                        <select name="value" id="value" className='form-control'>
                            <option value="0">Filter by Value</option>
                            <option value="1">Under $50</option>
                            <option value="2">$50-$100</option>
                            <option value="3">$100-$150</option>
                            <option value="">$150 and Up</option>

                        </select>
                    </FormGroup>
                </Form>


                <div className="container">
                    <div className="row m-5 ">
                        {posts.map((post) => (
                            <Post post={post} key={post.id} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );

};

export default PostList;