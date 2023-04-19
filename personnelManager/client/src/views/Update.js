import React, { useEffect, useState } from 'react'
import jwt from 'jwt-decode'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Moment from 'react-moment'
import NavHeader from '../components/NavHeader'
import Container from 'react-bootstrap/Container'
import basic_pic from '../img/basic_picture.png'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Update = () => {
    const {id} = useParams()
    const [loggedIn, setLoggedIn] = useState({})
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [rank, setRank] = useState(user.rank)
    const [currentUnit, setCurrentUnit] = useState(user.currentUnit)
    const [rotationDate, setRotationDate] = useState(user.rotationDate)
    const [endOfService, setEndOfService] = useState(user.endOfService)
    const [bio, setBio] = useState(user.bio)
    const [quals, setQuals] = useState([])

    useEffect(() => {
        getActiveUser()
        getProfileUser()
    })

    const getActiveUser = () => {
        const usr = jwt(localStorage.getItem('token'))
        axios.get("http://localhost:8000/api/user/" + usr.id)
            .then(res => {
                console.log(res.data)
                setLoggedIn(res.data)
                console.log(loggedIn)
            }).catch(err => console.log(err))
    }

    const getProfileUser = () => {
        axios.get("http://localhost:8000/api/user/" + id)
            .then(res => {
                console.log(res.data)
                setUser(res.data)
                console.log(user)
                setLoaded(true)
            }).catch(err => console.log(err))
    }

    const adminUpdate = (e) => {
        e.preventDefault()
        console.log(firstName)
        axios.put("http://localhost:8000/api/user/update/" + user._id, {
            firstName, 
            lastName,
            email,
            rank, 
            currentUnit,
            rotationDate,
            endOfService
        }).then(res => {
            console.log(res.data)
            navigate(`/dashboard/profile/user/${user._id}`)
        }).catch(err => console.log(err))
    }

    const userUpdate = (e) => {
        e.preventDefault()
        axios.put("http://localhost:8000/api/user/update/" + user._id, {
            bio,
            quals
        }).then(res => {
            console.log(res.data)
            navigate(`/dashboard/profile/user/${user._id}`)
        }).catch(err => console.log(err))
    }

    return (
        <>
            <NavHeader/>
            <Container fluid="lg" style={{display: "flex", justifyContent: "space-around"}}>
                <div className="m-4" style={{height: "auto", width: "60%", border: "1px solid gold", borderRadius: "3px", padding: "10px"}}>
                    <img
                        src={basic_pic}
                        alt="default-user"
                        width="250"
                        height="250"
                        className="m-4"
                    />
                    { loggedIn.admin && loaded ?
                        <div style={{height: "auto", width: "auto"}}>
                            <Form onSubmit={adminUpdate} style={{width: "100%", }}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First name:</Form.Label>
                                    <Form.Control type="text" defaultValue={user.firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last name:</Form.Label>
                                    <Form.Control type="text" defaultValue={user.lastName} onChange={(e) => setLastName(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="text" defaultValue={user.email} onChange={(e) => setEmail(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rank:</Form.Label>
                                    <Form.Select defaultValue={user.rank} onChange={(e) => setRank(e.target.value)}>
                                        <option>Select rank</option>
                                        <option value="Fireman">(E3) - Fireman</option>
                                        <option value="3">(E4) - Petty Officer 3rd Class</option>
                                        <option value="2">(E5) - Petty Officer 2nd Class</option>
                                        <option value="1">(E6) - Petty Officer 1st Class</option>
                                        <option value="C">(E7) - Chief Petty Officer</option>
                                        <option value="CS">(E8) - Senior Chief Petty Officer</option>
                                        <option value="CM">(E9) - Master Chief Petty Officer</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Assigned Unit:</Form.Label>
                                    <Form.Select defaultValue={user.currentUnit} onChange={(e) => setCurrentUnit(e.target.value)}>
                                        <option>Select unit</option>
                                        <option value="001">SSN 001</option>
                                        <option value="002">SSN 002</option>
                                        <option value="003">SSN 003</option>
                                        <option value="010">SSBN 010</option>
                                        <option value="011">SSBN 011</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Projected Rotation:</Form.Label>
                                    <Form.Control type="date" defaultValue={user.rotationDate} onChange={(e) => setRotationDate(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>End of Service:</Form.Label>
                                    <Form.Control type="date" defaultValue={user.endOfService} onChange={(e) => setEndOfService(e.target.value)}/>
                                </Form.Group>
                                <Button className="mt-3" variant="warning" size="sm" type="submit">update user</Button>
                            </Form>
                        </div>
                    :
                        <div>
                            <h2 className="mb-3">{user.rate}{user.rank} {user.lastName}, {user.firstName}</h2>
                            <div className="mb-3" style={{display: "inline-flex"}}>
                                <h3 style={{marginRight: "20px"}}>Currently Stationed:<br/> Unit-{user.currentUnit}</h3>
                                <h3 style={{marginRight: "20px"}}>Projected Rotation: <br/><Moment format="MM/DD/YYYY">{user.rotationDate}</Moment></h3>
                                <h3 style={{marginRight: "20px"}}>End of Service: <br/><Moment format="MM/DD/YYYY">{user.endOfService}</Moment></h3>
                            </div>
                            <h3 className="mb-3">Contact me at: {user.email}</h3>
                            <Form onSubmit={userUpdate}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Bio:</Form.Label>
                                    <textarea className="form-control" rows="5" type="text" defaultValue={user.bio} onChange={(e) => setBio(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Qualifications:</Form.Label>
                                    <div>
                                        <Form.Check 
                                            inline
                                            label="Aux. Electrician Aft"
                                            type="checkbox"
                                            onChange={() => setQuals([...quals, "Aux. Electrician Aft"])}
                                        />
                                        <Form.Check 
                                            inline
                                            label="Throttleman"
                                            type="checkbox"
                                            onChange={() => setQuals([...quals, "Throttleman"])}
                                        />
                                        <Form.Check 
                                            inline
                                            label="Electrical Operator"
                                            type="checkbox"
                                            onChange={() => setQuals([...quals, "Electrical Operator"])}
                                        />
                                        <Form.Check 
                                            inline
                                            label="Shutdown Electrical Operator"
                                            type="checkbox"
                                            onChange={() => setQuals([...quals, "Shutdown Electrical Operator"])}
                                        />
                                        <Form.Check 
                                            inline
                                            label="Shutdown Reactor Operator"
                                            type="checkbox"
                                            onChange={() => setQuals([...quals, "Shutdown Reactor Operator"])}
                                        />
                                        <Form.Check 
                                            inline
                                            label="Engineering Duty Petty Officer"
                                            type="checkbox"
                                            onChange={() => setQuals([...quals, "Engineering Duty Petty Officer"])}
                                        />
                                        <Form.Check 
                                            inline
                                            label="Engineering Watch Supervisor"
                                            type="checkbox"
                                            onChange={() => setQuals([...quals, "Engineering Watch Supervisor"])}
                                        />
                                    </div>
                                </Form.Group>
                                <Button className="mt-3" variant="warning" size="sm" type="submit">update profile</Button>
                            </Form>
                        </div>
                    }
                    { loggedIn === user.id ?
                        <Button onClick={() => navigate(`/edit/user/${user.id}`)}>edit profile</Button>
                    :
                        null
                    }
                </div>
            </Container>
        </>
    )
}
export default Update;
