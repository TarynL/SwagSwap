import React, { useEffect, useState } from "react";
import MyPost from "./myPost";
import { Link } from "react-router-dom";
import { getAllPostsFromCurrentUser, deletePost } from "../../modules/postManager";

const MyPostList = () => {
    const [myPosts, setMyPosts] = useState([]);

    const getMyPosts = () => {
        getAllPostsFromCurrentUser().then(p => setMyPosts(p));
    };

    const handleDelete = (id) => {
        deletePost(id)
            .then(() => getMyPosts())
    }

    useEffect(() => {
        getMyPosts();

    }, []);

    return (

        <div>
            <Link to={`/post/add`}>
                <button className="btn btn-secondary" >Add New Post</button>
            </Link>
            <div className="container">
                <div className="row m-5 ">
                    {myPosts.map((myPost) => (
                        <MyPost myPost={myPost} key={myPost.id} handleDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </div>


    );
};

export default MyPostList;