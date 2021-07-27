import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getAllPosts } from "../../modules/postManager";

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
                <div className="header">
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