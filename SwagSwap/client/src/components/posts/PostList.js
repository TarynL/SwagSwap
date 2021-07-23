import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Link } from "react-router-dom";
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
            {/* <Link to={`/post/add`}>
            <button className="btn btn-secondary" >Add New Post</button>
        </Link> */}

            {posts.map((post) => (
                <Post post={post} key={post.id} />
            ))}

        </div>


    );
};

export default PostList;