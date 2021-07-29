
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./posts/PostList";
import MyPostList from "./myPosts/myPostList";
import MyPostForm from "./myPosts/myPostForm";
import MyPostEdit from "./myPosts/myPostEdit";
import PostDetails from "./posts/PostDetails";
import MessageList from "./messages/MessageList";
import MessageForm from "./messages/MessageForm";

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

                <Route path="/post/add" exact>
                    {isLoggedIn ? <MyPostForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/post/edit/:id" exact>
                    {isLoggedIn ? <MyPostEdit /> : <Redirect to="/login" />}
                </Route>

                <Route path="/post/:id" exact>
                    {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/message/:id" exact>
                    {isLoggedIn ? <MessageList /> : <Redirect to="/login" />}
                </Route>

                {/* <Route path="/message/add/:id" exact>
                    {isLoggedIn ? <MessageForm /> : <Redirect to="/login" />}
                </Route> */}


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