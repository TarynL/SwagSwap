import React, { useEffect, useState } from "react";
import { Dropdown } from "reactstrap";
import Post from "./Post";
import { getAllPosts } from "../../modules/postManager";
import { getPostsByCategoryId } from "../../modules/postManager";
import { getAllCategories } from "../../modules/categoryManager";

const PostList = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        getAllPosts().then(p => setPosts(p));
    };

    useEffect(() => {
        getPosts();

    }, []);

    return (
        <>
            <div >
                <div className="header text-center m-2 p-2">
                    <h1>Out With The Old, In With The New...For You</h1>
                </div>
                <div className="dropdown">
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Filter By Category
                        </Dropdown.Toggle>
                    </Dropdown>
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