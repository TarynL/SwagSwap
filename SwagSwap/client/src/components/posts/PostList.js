import React, { useEffect, useState } from "react";
import { Button, Jumbotron, Container } from 'reactstrap';
import Post from "./Post";
import Swag from "../../images/Swag.png"
import { getAllPosts } from "../../modules/postManager";
import { getPostsByCategoryId } from "../../modules/postManager";
import { getAllCategories } from "../../modules/categoryManager";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState(0);



    const getPosts = () => {
        getAllPosts().then(p => setPosts(p));
    };
    const getCategories = () => {
        return getAllCategories()
            .then(c => {
                setCategory(c)
            })
    }


    const handleCategoryDropdown = (e) => {
        const key = e.target.value
        setCategoryId(key)
    }

    const handleFilter = () => {
        if (categoryId === 0) {
            window.alert("Please select a filter")
        }
        else {
            getPostsByCategoryId(categoryId)
                .then(res => setPosts(res))
        }
    }

    const handleReset = () => {
        getPosts();
    }


    useEffect(() => {
        getCategories();
        getPosts();

    }, []);

    return (
        <>
            <div >
                <div className="header landingLogo">
                    <img className="" style={{ height: 200, width: 200, }} src={Swag} />
                </div>
                <div className="container w-25 text-center">
                    <div className="row  ">
                        <div className="col sm-3">
                            <select onChange={handleCategoryDropdown} name="categoryId" id="categoryId" className='form-control'>
                                <option value="0">Filter by Category</option>
                                {category.map(c => (

                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            <div >
                                <Button className="filterButton btn-sm btn-light" onClick={handleFilter}>Filter</Button>
                                <Button className="resetButton btn-sm btn-light" onClick={handleReset}> Reset</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Container className="postlist ">
                <div className="row ">
                    {posts.map((post) => (
                        <Post post={post} key={post.id} />
                    ))}
                </div>
            </Container>

        </>
    );

};

export default PostList;