import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addMessage } from '../../modules/messageManager';
import { getPostById } from '../../modules/postManager';

const MessageForm = () => {
    const { id } = useParams();

    const emptyMessage = {
        content: '',
        recipientId: 0,
        postId: id
    };

    const [postDetails, setPostDetails] = useState({});
    const [newMessage, setNewMessage] = useState(emptyMessage);
    const history = useHistory();

    const getPostDetails = () => {
        getPostById(id)
            .then(setPostDetails)
    }

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const messageCopy = { ...newMessage };

        messageCopy[key] = value;
        messageCopy.postId = id;
        messageCopy.recipientId = postDetails.userId;
        console.log(messageCopy);
        setNewMessage(messageCopy);

    };

    const handleSave = (evt) => {
        evt.preventDefault();

        addMessage(newMessage).then((m) => {
            history.push("/");
        });

    };

    useEffect(() => {
        getPostDetails()
    }, []);


    return (
        <Form>
            <h2>New Message </h2>
            <FormGroup>
                <Label for="content">Content</Label>
                <Input type="text" name="content" id="content" placeholder="Message Here"
                    value={newMessage.content}
                    onChange={handleInputChange} />
            </FormGroup>
            {/* <Input type="hidden" name="recipientId" value={postDetails.userId} /> */}

            <Button className="btn btn-primary" onClick={handleSave}>Send</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/`)}>Cancel</Button>

        </Form>
    );
};

export default MessageForm;
