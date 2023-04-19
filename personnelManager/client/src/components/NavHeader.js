import React, {useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import jwt from 'jwt-decode'
import Navbar from 'react-bootstrap/Navbar';
import LogoutUser from '../components/LogoutUser';
import logo from '../img/USN-seal.png'

const NavHeader = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const usr = jwt(localStorage.getItem('token'))
        axios.get('http://localhost:8000/api/user/' + usr.id)
            .then(res => {
                setUser(res.data)
            }).catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <Navbar>
                <Link to="/dashboard"><img
                    src={logo}
                    alt="USN seal"
                    width="100"
                    height="100"
                    className="m-3"
                /></Link>
                <Navbar.Brand className="fs-1" style={{color: 'whitesmoke'}}>PSDM</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text style={{color: 'whitesmoke'}}>
                        {
                            !user.admin ?
                            <p>Welcome {user.rate}{user.rank} {user.lastName}, {user.firstName}</p> :
                            <p>Welcome Admin {user.lastName}, {user.firstName}</p>
                        }
                    </Navbar.Text>
                    <LogoutUser/>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
export default NavHeader;