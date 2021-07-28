import { getToken } from "./authManager";

const baseUrl = '/api/message';

export const getAllSenderMessagesByPostId = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/sent/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get message.");
            }
        });
    });
};

export const getAllReceiverMessagesByPostId = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/received/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get message.");
            }
        });
    });
};

export const getMessagesByPostId = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/PostId?id=${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get comments.");
            }
        });
    });
};


export const addMessage = (message) => {
    return getToken().then((token) => {
        debugger
        return fetch(`${baseUrl}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to save a new message.");
            }
        });
    });
};

