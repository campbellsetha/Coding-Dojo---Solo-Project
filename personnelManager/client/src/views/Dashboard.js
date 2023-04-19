import React, { useEffect, useState } from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import LinesEllipsis from 'react-lines-ellipsis'
import Card from 'react-bootstrap/Card'
import Moment from 'react-moment'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import NavHeader from '../components/NavHeader'
import RemoveUser from '../components/RemoveUser'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import basic_pic from '../img/basic_picture.png'


const Dashboard = (props) => {

    const [user, setUser] = useState({})
    const [userUnits, setUserUnits] = useState([])
    const [otherUsers, setOtherUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const usr = jwt(localStorage.getItem('token'))
        axios.get('http://localhost:8000/api/user/' + usr.id)
            .then(res => {
                console.log("This is Dashboard ", res.data)
                setUser(res.data)
                setUserUnits(res.data.currentUnit)
            }).catch(err => {
                console.log(err);
            })
    }, [])

    const unitHandler = (unit) => {
        console.log(unit, user.rate)
        axios.get(`http://localhost:8000/api/users/${unit}/${user.rate}`)
        .then(res => {
            console.log(res)
            setOtherUsers(res.data)
        }).catch(err => console.log(err))
    }

    const removeFromDom = (id) => {
        setOtherUsers(otherUsers.filter(otherUser => otherUser._id !== id))
    }

    return (
        <>
            <NavHeader />
            <Container>
                <Row className="mt-3" style={{height: "500px", justifyContent: "center"}}>
                    <Col sm={2}>
                        <ButtonGroup vertical style={{ border: "1px solid gold", borderRadius: "3px", backgroundColor:"rgb(51, 60, 74)", alignItems: "center", padding: "10px"}} defaultActiveKey="/dashboard">
                            {
                                userUnits.map((unit, i) => {
                                    return (
                                        <Button size="sm"  variant="secondary" className="m-1" key={i} onClick={() => {unitHandler(unit)}}>Unit: {unit}</Button>
                                    )
                                })
                            }
                        </ButtonGroup>
                    </Col>
                    <Col sm={9}  style={{border: "1px solid gold", maxHeight: "560px", borderRadius: "3px", backgroundColor:"rgb(51, 60, 74)", overflowY: "scroll"}}>
                        {
                            otherUsers.map((otherUser, i) => {
                                if (!otherUser.admin) {
                                return (
                                    <Card className="m-3" style={{width: "95%", maxHeight: "160px", padding: "10px", justifyContent: "center", display: "inline-flex", flexDirection: "row", overflowY: "scroll"}}bg="dark" border="warning" key={i}>
                                        <Card.Img variant="left" height="100px" width="100px" style={{alignSelf: "center"}} className="m-2" src={basic_pic} alt="blank profile" onClick={() => navigate(`profile/user/${otherUser._id}`)}/>
                                        <Card.Body style={{display: "flex", flexDirection: "column"}}>
                                            <Card.Title>{otherUser.rate}{otherUser.rank} {otherUser.lastName}, {otherUser.firstName}</Card.Title>
                                            <Card.Text>
                                                <LinesEllipsis
                                                    text={otherUser.bio}
                                                    maxLine='2'
                                                    ellipsis='...'
                                                />
                                                <div style={{display: "inline-flex", marginTop: "5px"}}>
                                                    <p style={{marginRight: "20px"}}>PRD: <Moment format="MM/DD/YYYY">{otherUser.rotationDate}</Moment></p>   
                                                    <p>EAOS: <Moment format="MM/DD/YYYY">{otherUser.endOfService}</Moment></p> 
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                        {
                                            user.admin ?
                                            <RemoveUser 
                                                id = {otherUser._id}
                                                successCallBack = {() => removeFromDom(otherUser._id)}
                                            /> : null
                                        }
                                    </Card>
                                )}
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard;