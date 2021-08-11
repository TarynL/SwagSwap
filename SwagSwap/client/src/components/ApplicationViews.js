import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./posts/PostList";
import MyPostList from "./myPosts/MyPostList";
import MyPostForm from "./myPosts/MyPostForm";
import PostDetails from "./posts/PostDetails";
import MessageList from "./messages/MessageList";
import MyMessageList from "./messages/MyMessageList";
import SelectedUserPostList from "./posts/SelectedUserPostList"

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main className="main" >
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/myPosts" exact>
                    {isLoggedIn ? <MyPostList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/userPosts/:id" exact>
                    {isLoggedIn ? <SelectedUserPostList /> : <Redirect to="/login" />}
                </Route>

                {/* <Route path="/post/add" exact>
                    {isLoggedIn ? <MyPostForm /> : <Redirect to="/login" />}
                </Route> */}


                {/* <Route path="/post/:id" exact>
                    {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
                </Route> */}

                <Route path="/message/:id" exact>
                    {isLoggedIn ? <MessageList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/messages/:id" exact>
                    {isLoggedIn ? <MyMessageList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
};