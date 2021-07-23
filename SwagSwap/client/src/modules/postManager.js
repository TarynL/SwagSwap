import { getToken } from "./authManager";

const baseUrl = '/api/post';

export const getAllPosts = () => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get post.");
            }
        });
    });
};

export const getPostById = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/details/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get post details.");
            }
        });
    });
};

export const getAllPostsFromCurrentUser = () => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/myPosts`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get your posts.");
            }
        });
    });
};

export const addPost = (post) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to save a new post.");
            }
        });
    });
};

export const deletePost = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

    })
};

export const updatePost = (editedPost) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/${editedPost.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedPost)
        }).then((res) => {
            if (!res.ok) {
                window.alert('You are unable to edit this post.');
            }
        })

    });
};