import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { register } from "../modules/authManager";
import Swag from "../images/Swag.png"


export default function Register() {
    const history = useHistory();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [userZip, setUserZip] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords must match.");
        }
        else if (firstName === '' || lastName === '' || displayName === '' || imageUrl === '' || email === '' || userZip === '') {
            alert("Please fill out all fields to continue.")
        }

        else {
            const userProfile = { firstName, lastName, displayName, imageUrl, email, userZip };
            register(userProfile, password)
                .then(() => history.push("/"));
        }
    };


    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'swagSwap')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dzayiv7cv/image/upload',
            {
                method: 'POST',
                body: data
            }
        )

        const file = await res.json()

        setImage(file.secure_url)
        setLoading(false)
        setImageUrl(file.secure_url)
    }


    return (
        <>
            <div className="container w-50 registerForm text-center login">
                {/* <div className="row"> */}
                <div  >
                    <img style={{ height: 150, width: 150 }} src={Swag} />
                </div>
                <div  >
                    <img style={{ height: 250, width: 350 }} src="groupshot.png" />
                </div>
                <Form className="container w-50 text-center register" onSubmit={registerClick}>
                    <h2 className="registerHeader">Create an Account</h2>
                    <FormGroup>
                        <Label for="imageUrl">Profile Image</Label>
                        <div className="imageInput">
                            <Input type="file"
                                name="file"
                                placeholder="Upload an image for your Profile"
                                onChange={uploadImage} />

                            {loading ? (
                                <h3>Loading...</h3>
                            ) : (
                                <img src={image} style={{ width: '300px' }} />
                            )}
                        </div>

                    </FormGroup>
                    <FormGroup >
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
                    </FormGroup>
                    <FormGroup >
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
                    </FormGroup>
                    <FormGroup >
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
                    </FormGroup>
                    <FormGroup >
                        <Label for="email">Email</Label>
                        <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                    </FormGroup>
                    {/* <FormGroup >
                            <Label htmlFor="imageUrl">Profile Image URL</Label>
                            <Input id="imageUrl" type="text" onChange={e => setImageUrl(e.target.value)} />
                        </FormGroup> */}
                    <FormGroup >
                        <Label htmlFor="userZip">Zip Code</Label>
                        <Input id="userZip" type="text" onChange={e => setUserZip(e.target.value)} />
                    </FormGroup>
                    <FormGroup >
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup >
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="registerButtons">
                        <Button className="btn-light">Register</Button>
                    </FormGroup>
                    <div className="text-center">
                        <em >
                            Already registered? <Link to="login">Login</Link>
                        </em>
                    </div>
                </Form>
            </div>
        </>

    );
}
