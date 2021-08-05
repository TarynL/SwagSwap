import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap'
import Post from "./Post";
import { getPostsByUserId } from "../../modules/postManager";
import { getUserById } from "../../modules/authManager";

const SelectedUserPostList = () => {
    const [userPosts, setUserPosts] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    const [userDetails, setUserDetails] = useState({});


    const getUserDetails = () => {
        getUserById(id)
            .then(setUserDetails)
    }

    const getUserPosts = () => {
        getPostsByUserId(id)
            .then(setUserPosts);

    };

    useEffect(() => {
        getUserPosts(id);

    }, []);

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <>
            <div className="m-2 p-2">
                <Button onClick={() => history.goBack()} className="btn btn-light">Go Back</Button>
            </div>

            <div className="userPosts-header">
                <h2>All Posts By: {userDetails.displayName}</h2>
            </div>
            <div >

                <div className="selectedUserList">
                    <div className="row m-2 ">
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