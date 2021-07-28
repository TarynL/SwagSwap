import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addMessage } from '../../modules/messageManager';

const MessageForm = () => {
    const { id } = useParams();
    const emptyMessage = {
        content: '',
        receipentId: 0,
        postId: id
    };

    const [newMessage, setNewMessage] = useState(emptyMessage);
    const history = useHistory();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const messageCopy = { ...newMessage };

        messageCopy[key] = value;
        messageCopy.postId = id;
        setNewMessage(messageCopy);

    };

    const handleSave = (evt) => {
        evt.preventDefault();

        addMessage(newMessage).then((m) => {
            history.push("/");
        });

    };
    return (
        <Form>
            <h2>New Message</h2>
            <FormGroup>
                <Label for="content">Content</Label>
                <Input type="text" name="content" id="content" placeholder="Message Here"
                    value={newMessage.content}
                    onChange={handleInputChange} />
            </FormGroup>

            <Button className="btn btn-primary" onClick={handleSave}>Send</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/`)}>Cancel</Button>

        </Form>
    );
};

export default MessageForm;
