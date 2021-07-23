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

        <div className="container m-2 p-2">
            {posts.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    );
};

export default PostList;