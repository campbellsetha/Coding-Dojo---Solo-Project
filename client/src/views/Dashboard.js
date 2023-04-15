import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';
import ListAll from '../components/ListAll';
import NavHeader from '../components/NavHeader';
import Sidebar from '../compoenents/Sidebar';

const Dashboard = (props) => {

    const [id, setId] = useState("")
    const [rate, setRate] = useState("")
    const [rank, setRank] = useState("")
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [admin, setAdmin] = useState(false)
    const [currentUnit, setCurrentUnit] = useState([]);
    const [displayUnit, setDisplayUnit] = useState("")

    useEffect(() => {

        const user = jwt(localStorage.getItem('token'))
        console.log(user)
        setId(user.id);
        console.log(id);
        axios.get('http://localhost:8000/api/user/'+user.id)
            .then(res => {
                console.log(res.data)
                setRate(res.data.rate);
                setRank(res.data.rank)
                setLastName(res.data.lastName)
                setFirstName(res.data.firstName)
                setAdmin(res.data.admin)
                setCurrentUnit(res.data.currentUnit)
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
