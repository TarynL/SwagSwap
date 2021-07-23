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


        <div className="container m-2 p-2">
            <Link to={`/post/add`}>
                <button className="btn btn-secondary" >Add New Post</button>
            </Link>

            {myPosts.map((myPost) => (
                <MyPost myPost={myPost} key={myPost.id} handleDelete={handleDelete} />
            ))}

        </div>


    );
};

export default MyPostList;