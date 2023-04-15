import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const RegisterUser = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirm, setConfirm]=useState("");
    const [detailGroup, setDetailGroup]=useState("");
    const [admin, setAdmin]=useState("");
    const [errors, setErrors]=useState({});


    const submitHandler = (e) => {
        e.preventDefault();

        if(confirm === password) {
            setAdmin(true);

            axios.post("http://localhost:8000/api/users/register", {
                    firstName,
                    lastName,
                    email,
                    password,
                    detailGroup,
                    admin
            }).then((res) => {
                console.log(res.data)
                navigate("/login");
            }).catch(err => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            })
        }
    }

    return (
        <container className="welcome">
            <div className="login-title-nav">
            <h1>Admin Registration</h1>
            </div><hr style={{width: '90%', alignSelf: 'center', color: 'whitesmoke'}}/>
            <div className="register-menu">
                <Form>
                    <Row className="g-2">
                        <Col md>
                            <FloatingLabel controlId="floatingInput" label="First Name" className="mb-3" onSubmit={submitHandler}>
                                <Form.Control required type="text" onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingInput" label="Last Name" className="mb-3" onSubmit={submitHandler}>
                                <Form.Control required type="text" onChange={(e) => setLastName(e.target.value)}></Form.Control>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="g-2">
                        <Col md>
                            <FloatingLabel controlId="floatingInput" label="Email" className="mb-3" onSubmit={submitHandler}>
                                <Form.Control required type="email" onChange={(e) => setEmail(e.target.value)}></Form.Control>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="g-2">
                        <Col md>
                            <FloatingLabel controlId="floatingInput" label="Password" className="mb-3" onSubmit={submitHandler}>
                                <Form.Control required type="password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingInput" label="Confirm Password" className="mb-3" onSubmit={submitHandler}>
                                <Form.Control required type="password" onChange={(e) => setConfirm(e.target.value)}></Form.Control>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="g-2">
                        <Col mb>
                            <FloatingLabel controlID="floatingSelectGrid" label="Detailing Group">
                                <Form.Select required onchange={(e) => setDetailGroup(e.target.value)}>
                                    <option>Select detailing group</option>
                                    <option value="CS">CS</option>
                                    <option value="EMN">EMN</option>
                                    <option value="ETV">ETV</option>
                                    <option value="ETN">ETN</option>
                                    <option value="FT">FT</option>
                                    <option value="HM">HM</option>
                                    <option value="ITS">ITS</option>
                                    <option value="LS">LS</option>
                                    <option value="MMA">MMA</option>
                                    <option value="MMN">MMN</option>
                                    <option value="MT">MT</option>
                                    <option value="STS">STS</option>
                                    <option value="TM">TM</option>
                                    <option value="YN">YN</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <div className="mt-3">
                        <Button className="me-3" variant="success" type="submit">Register</Button>
                        <Button className="ms-3" variant="secondary" href="/register-admin">Not a Detailer?</Button>
                    </div>
                </Form>
            </div>
        </container>
    )
    /*return (
        <div className="user-register">
            <h1 className="user-reg-tag">New Sailor Registration</h1>
            <form onSubmit={submitHandler}>
                <div className="user-info-basic">
                    <label>First Name:</label>
                    {
                        errors.firstName ?
                        <p className="error-tag"> {errors.firstName.message}</p> : null
                    }
                    <br/><input 
                        type="text"
                        name="firstName"
                        onChange ={(e) => setFirstName(e.target.value)}
                    />
                    <label>Last Name:</label>
                    {
                        errors.lastName ?
                        <p className="error-tag"> {errors.lastName.message}</p> : null
                    }
                    <br/><input 
                        type="text"
                        name="lastName"
                        onChange ={(e) => setLastName(e.target.value)}
                    />
                    <label>Email:</label>
                    {
                        errors.email ?
                        <p className="error-tag"> {errors.email.message}</p> : null
                    }
                    <br/><input 
                        type="text"
                        name="email"
                        onChange ={(e) => setEmail(e.target.value)}
                    />
                    <label>Password:</label>
                    {
                        errors.password ?
                        <p className="error-tag"> {errors.password.message}</p> : null
                    }
                    <br/><input 
                        type="password"
                        name="password"
                        onChange ={(e) => setPassword(e.target.value)}
                    />
                    <label>Confirm password:</label>
                    {
                        errors.password ?
                        <p className="error-tag"> {errors.password.message}</p> : null
                    }
                    <br/><input 
                        type="password"
                        name="confirm"
                        onChange ={(e) => setConfirm(e.target.value)}
                    />
                </div>
                <div className="admin-info-group">
                    <label>Detailing Group(s):</label>
                    <br/><select id="detailGroup" name="detailGroup"
                    onChange ={(e) => setDetailGroup(e.target.value)}>
                        <input type="checkbox" value="CS">CS</input>
                        <input type="checkbox" value="EMN">EMN</input>
                        <input type="checkbox" value="ETV">ETV</input>
                        <br/><input type="checkbox" value="ETN">ETN</input>
                        <input type="checkbox" value="FT">FT</input>
                        <input type="checkbox" value="HM">HM</input>
                        <br/><input type="checkbox" value="ITS">ITS</input>
                        <input type="checkbox" value="LS">LS</input>
                        <input type="checkbox" value="MMA">MMA</input>
                        <br/><input type="checkbox" value="MMN">MMN</input>
                        <input type="checkbox" value="MT">MT</input>
                        <input type="checkbox" value="STS">STS</input>
                        <br/><input type="checkbox" value="TM">TM</input>
                        <input type="checkbox" value="YN">YN</input>
                    </select>
                </div>
                <div>
                    <button>Register</button>
                </div>
            </form>
        </div>
    )*/
}
export default RegisterUser;