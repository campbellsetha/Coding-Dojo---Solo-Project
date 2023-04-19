import React, { useEffect, useState } from 'react'
import jwt from 'jwt-decode'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Moment from 'react-moment'
import NavHeader from '../components/NavHeader'
import Container from 'react-bootstrap/Container'
import basic_pic from '../img/basic_picture.png'
import Button from 'react-bootstrap/Button'

const Profile = () => {
    const {id} = useParams()
    const [loggedIn, setLoggedIn] = useState({})
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [quals, setQuals] = useState([])

    useEffect(() => {
        getActiveUser()
        getProfileUser()
    }, [])

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
            setQuals(res.data.quals)
            console.log(user)
        }).catch(err => console.log(err))
    }

    return (
        <>
            <NavHeader/>
            <Container fluid="lg" style={{display: "flex", justifyContent: "space-around"}}>
                <div className="m-4" style={{height: "auto", width: "60%", backgroundColor:"rgb(51, 60, 74)", border: "1px solid gold", borderRadius: "3px", padding: "20px"}}>
                    <img
                        src={basic_pic}
                        alt="default-user"
                        width="250"
                        height="250"
                        className="m-4"
                    />
                    <h2 className="mb-3">{user.rate}{user.rank} {user.lastName}, {user.firstName}</h2>
                    <div className="mb-3" style={{display: "inline-flex"}}>
                        <h3 style={{marginRight: "20px"}}>Currently Stationed: <br/>Unit-{user.currentUnit}</h3>
                        <h3 style={{marginRight: "20px"}}>Projected Rotation: <br/><Moment format="MM/DD/YYYY">{user.rotationDate}</Moment></h3>
                        <h3 style={{marginRight: "20px"}}>End of Service: <br/><Moment format="MM/DD/YYYY">{user.endOfService}</Moment></h3>
                    </div>
                    <h3 className="mb-3">Contact me at: {user.email}</h3>
                    <h3>Bio:</h3>
                    <h4 className="mb-3">{user.bio}</h4>
                    <h3>Qualifications:</h3>
                        {
                            quals.map((qual, i) => {
                                return (
                                    <h4 className="mb-3" key={i}>{qual}, </h4>
                                )
                            })
                        }
                    { loggedIn._id === user._id || loggedIn.admin ?
                        <Button size="sm" variant="warning" onClick={() => navigate(`/update/user/${user._id}`)}>edit profile</Button>
                    :
                        null
                    }
                </div>
            </Container>
        </>
    )
}
export default Profile;