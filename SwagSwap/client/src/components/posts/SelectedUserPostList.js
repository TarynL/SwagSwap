import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap'
import Post from "./Post";
import { getPostsByUserId } from "../../modules/postManager";

const SelectedUserPostList = () => {
    const [userPosts, setUserPosts] = useState([]);
    const { id } = useParams();
    const history = useHistory();



    const getUserPosts = () => {

        getPostsByUserId(id)
            .then(setUserPosts);
    };

    useEffect(() => {
        getUserPosts(id);

    }, []);

    return (
        <>
            <div className="userPosts-header">
            </div>
            <div className="m-2 p-2">
                <Button onClick={() => history.goBack()} className="btn btn-light">Go Back</Button>
            </div>
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