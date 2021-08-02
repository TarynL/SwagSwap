import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Post from "./Post";
import { getPostsByUserId } from "../../modules/postManager";

const SelectedUserPostList = () => {
    const [userPosts, setUserPosts] = useState([]);
    const { id } = useParams();



    const getUserPosts = () => {

        getPostsByUserId(id)
            .then(setUserPosts);
    };

    useEffect(() => {
        getUserPosts(id);

    }, []);

    return (
        <>
            <div >


                <div className="container">
                    <div className="row m-5 ">
                        {userPosts.map((post) => (
                            <Post post={post} key={post.id} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );

};

export default SelectedUserPostList;