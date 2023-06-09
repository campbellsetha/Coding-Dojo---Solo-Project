import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import ErrorModal from '../components/ErrorModal'

const RegisterUser = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [currentUnit, setCurrentUnit] = useState("");
    const [rate, setRate] = useState("");
    const [rank, setRank] = useState("");
    const [rotationDate, setRotationDate] = useState("");
    const [endOfService, setEndOfService] = useState("");
    const [errors, setErrors] = useState({});
    const [modalShow, setModalShow] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault();
        if(confirm === password) {
        axios.post("http://localhost:8000/api/users/register", {
                firstName,
                lastName,
                email,
                password,
                currentUnit,
                rate,
                rank,
                rotationDate,
                endOfService
            }).then((res) => {
                console.log(res.data)
                navigate("/login");
            }).catch(err => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
                setModalShow(true)
            })
        }
    }

    return (
        <>
            <Container className="welcome">
                <div className="login-title-nav">
                <h1>New Sailor Registration</h1>
                </div><hr style={{width: '90%', alignSelf: 'center', color: 'whitesmoke'}}/>
                <div className="register-menu">
                    <Form onSubmit={submitHandler}>
                        <Row className="g-2">
                            <Col md>
                                <FloatingLabel controlid="floatingInput" label="First Name" className="mb-3" onSubmit={submitHandler}>
                                    <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlid="floatingInput" label="Last Name" className="mb-3" onSubmit={submitHandler}>
                                    <Form.Control type="text" onChange={(e) => setLastName(e.target.value)}></Form.Control>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-2">
                            <Col md>
                                <FloatingLabel controlid="floatingInput" label="Email" className="mb-3" onSubmit={submitHandler}>
                                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)}></Form.Control>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-2">
                            <Col md>
                                <FloatingLabel controlid="floatingInput" label="Password" className="mb-3" onSubmit={submitHandler}>
                                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlid="floatingInput" label="Confirm Password" className="mb-3" onSubmit={submitHandler}>
                                    <Form.Control type="password" onChange={(e) => setConfirm(e.target.value)}></Form.Control>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-2">
                            <Col mb>
                                <FloatingLabel controlid="floatingSelectGrid" label="Assigned Unit">
                                    <Form.Select onChange={(e) => setCurrentUnit(e.target.value)}>
                                        <option>Select unit</option>
                                        <option value="001">SSN 001</option>
                                        <option value="002">SSN 002</option>
                                        <option value="003">SSN 003</option>
                                        <option value="010">SSBN 010</option>
                                        <option value="011">SSBN 011</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col mb>
                                <FloatingLabel controlid="floatingSelectGrid" label="Rate">
                                    <Form.Select onChange={(e) => setRate(e.target.value)}>
                                        <option>Select rate</option>
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
                            <Col mb>
                                <FloatingLabel controlid="floatingInputGrid" label="Rank">
                                    <Form.Select onChange={(e) => setRank(e.target.value)}>
                                        <option>Select rank</option>
                                        <option value="Fireman">(E3) - Fireman</option>
                                        <option value="3">(E4) - Petty Officer 3rd Class</option>
                                        <option value="2">(E5) - Petty Officer 2nd Class</option>
                                        <option value="1">(E6) - Petty Officer 1st Class</option>
                                        <option value="C">(E7) - Chief Petty Officer</option>
                                        <option value="CS">(E8) - Senior Chief Petty Officer</option>
                                        <option value="CM">(E9) - Master Chief Petty Officer</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-2">
                            <Col mb>
                                <Form.Label className="mt-2">Proj. Rotation Date</Form.Label>
                                <Form.Control type="date" onChange={(e) => setRotationDate(e.target.value)}/>
                            </Col>
                            <Col mb>
                            <Form.Label className="mt-2">End Of Service</Form.Label>
                                <Form.Control type="date" onChange={(e) => setEndOfService(e.target.value)}/>
                            </Col>
                        </Row>
                        <div className="mt-3">
                            <Button className="me-3" size="sm" variant="success" type="submit">Register</Button>
                            <Button className="ms-3" size="sm" variant="secondary" href="/register-admin">Not a Sailor?</Button>
                            <Button className="ms-5" size="sm" variant="secondary" href="/login">Need to Login?</Button>
                        </div>
                    </Form>
                </div>
            </Container>
            <ErrorModal
                errors = { errors }
                show = { modalShow }
                onHide = {() => setModalShow(false)}
            />
        </>
    )
}
export default RegisterUser