import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { login } from "../modules/authManager";
import Swag from "../images/Swag.png"

export default function Login() {
    const history = useHistory();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => history.push("/"))
            .catch(() => alert("Invalid email or password"));
    };

    return (
        <>
            <div className="container w-75 text-center login">
                <div  >
                    <img style={{ height: 150, width: 150 }} src={Swag} />
                </div>
                <div  >
                    <img src="groupshot.png" />
                </div>

                <Form className="container w-50 text-center" onSubmit={loginSubmit}>

                    <fieldset>

                        <FormGroup >
                            <Label for="email">Email</Label>
                            <Input id="email" type="text" autoFocus onChange={e => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="password">Password</Label>
                            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup >
                            <Button className="btn-light">Login</Button>
                        </FormGroup>
                        <div className="text-center">
                            <em >
                                Not registered? <Link to="register">Register</Link>
                            </em>
                        </div>
                    </fieldset>
                </Form>
            </div>
        </>
    );
}