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
            <div >


                <div className="container">
                    <div className="row m-5 ">
                        {userPosts.map((post) => (
                            <Post post={post} key={post.id} />
                        ))}
                    </div>
                </div>

                <Button onClick={() => history.goBack()} className="btn btn-light">Go Back</Button>

            </div>
        </>
    );

};

export default SelectedUserPostList;