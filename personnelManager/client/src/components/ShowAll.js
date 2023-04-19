import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import basic_pic from '../img/basic_picture.png'

const ShowAll = (props) => {
    const {user} = props;
    const [displayUnit, setDisplayUnit] = useState(user.currentUnit)
    const [otherUsers, setOtherUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        console.log(user)
        console.log(user.rank, displayUnit)
        axios.get(`http://localhost:8000/api/users/${displayUnit}/${user.rank}`)
            .then(res => {
                console.log(res)
                setOtherUsers(res.data)
            }).catch(err => console.log(err))
    }, [displayUnit, user.rank])

    return (
        <div>
            <div>
                <Nav variant="pills" className="flex-column" defaultActiveKey="/dashboard">
                    {
                        user.currentUnit.map((unit, i) => {
                            return(
                            <Nav.Item key={i} onClick={(e)=> setDisplayUnit(unit)}>Unit: {unit}</Nav.Item>
                            )
                        })
                    }
                </Nav>
            </div>
            <div>
                        {
                otherUsers.map((otherUser, i) => {
                    return (
                        <Card bg="primary" border="warning" onClick={navigate(`/user/${otherUser.id}`)}>
                            <Card.Img variant="left" src="" alt={basic_pic}>
                                <Card.Body>
                                    <Card.Title>{otherUsers.rank}{otherUser.rate} {otherUser.lastName}, {otherUser.firstName}</Card.Title>
                                    <Card.Text>
                                        {otherUser.bio}
                                    </Card.Text>
                                    {
                                        user.admin ?
                                        <Button>remove</Button> : null
                                    }
                                </Card.Body>
                            </Card.Img>
                        </Card>
                    )
                })
            }
            </div>
        </div>
    )
}
export default ShowAll