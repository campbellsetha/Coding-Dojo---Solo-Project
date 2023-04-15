import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import jwt from 'jwt-decode';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Button from 'react-bootstrap/Button';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [errors, setErrors] = useState("");
    const navigate = useNavigate ();

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/login", 
        {email, password})
            .then(res =>{
                console.log(res);
                const token = res.data.token
                const user = (jwt(token));
                console.log(user.id);
                localStorage.setItem('token', token);
                console.log(localStorage.getItem('token'));
                navigate('/dashboard');
            }).catch(err => {
                console.log(err.response.data.errors);
                //setErrors(err.response.data.errors);
            })
    }

    return (
        
        <container className="welcome">
            <div className="login-title-nav">
                <h1> PNW Submarine Detail Manager</h1>
            </div><hr style={{width: '90%', alignSelf: 'center', color: 'whitesmoke'}}/>
            <div className="login-menu">
                <h3>Login</h3><hr style={{color: 'whitesmoke'}}/>
                <Form onSubmit={submitHandler}>
                        <Col md>
                            <FloatingLabel controlId="floatingInput" label="Email" className="mb-3" onSubmit={submitHandler}>
                                <Form.Control required type="email" onChange={(e) => setEmail(e.target.value)}></Form.Control>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Password" className="mb-3" onSubmit={submitHandler}>
                                <Form.Control required type="password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
                            </FloatingLabel>
                        </Col>
                    <Button variant="success" type="submit">Login</Button>
                </Form>
            </div>
            <div className="m-3">
                <Button className="me-5" variant="secondary" href="/register-user">New Sailor?</Button>
                <Button className="ms-5" variant="secondary" href="/register-user">New Detailer?</Button>
            </div>
        </container>
    )
}
export default Login;