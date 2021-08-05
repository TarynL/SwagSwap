import React, { useEffect, useState } from "react";
import MyPost from "./MyPost";
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
                        <MyPost myPost={myPost} key={myPost.id} handleDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </div>


    );
};

export default MyPostList;