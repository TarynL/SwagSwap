
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./posts/PostList";
import MyPostList from "./myPosts/myPostList";
import MyPostForm from "./myPosts/myPostForm";
import MyPostEdit from "./myPosts/myPostEdit";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
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