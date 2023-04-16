import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';
import ListAll from '../components/ListAll';
import NavHeader from '../components/NavHeader';
import Sidebar from '../compoenents/Sidebar';

const Dashboard = (props) => {

    const [id, setId] = useState("")
    const [user, setUser] = useState({})

    useEffect(() => {

        const user = jwt(localStorage.getItem('token'))
        console.log(user)
        setId(user.id);
        console.log(id);
        axios.get('http://localhost:8000/api/user/'+user.id)
            .then(res => {
                console.log(res.data)
                setUser(res.data)
            }).catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <NavHeader 
                rate = { rate }
                rank = { rank }
                firstName = { firstName }
                lastName = { lastName }
            />
            <div className="m-4">
                <div className="m-4">
                    <Sidebar
                        currentUnit = { currentUnit }
                        setDisplayUnit = { setDisplayUnit }
                    />
                </div>
                <div className="m-4">
                    <ListAll
                        displayUnit = { displayUnit }
                    />
                </div>
            </div>

        </>

    )
}

export default Dashboard;
