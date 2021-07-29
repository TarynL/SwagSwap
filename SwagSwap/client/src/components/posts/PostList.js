import React, { useEffect, useState } from "react";
import { Dropdown, DropdownMenu } from "reactstrap";
import Post from "./Post";
import { getAllPosts } from "../../modules/postManager";
import { getPostsByCategoryId } from "../../modules/postManager";
import { getAllCategories } from "../../modules/categoryManager";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    // const [categories, setCategories] = useState([]);

    const getPosts = () => {
        getAllPosts().then(p => setPosts(p));
    };

    // const handleInputChange = (e) => {
    //     const newCategory = { ...categories }
    //     let selectedVal = e.target.value
    //     newCategory[e.target.id] = selectedVal
    //     setCategories(newCategory)
    // }

    // const filterPosts = (id) => {
    //     getAllCategories()
    //         .then(c => c.Id === id)
    //         .then(getPostsByCategoryId(id)
    //             .then(res => {
    //                 setPosts(res)
    //             }))

    // }


    useEffect(() => {
        getPosts();

    }, []);

    return (
        <>
            <div >
                <div className="header m-2 p-2 ">
                    <h1>Out With The Old, In With The New...For You</h1>
                </div>

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