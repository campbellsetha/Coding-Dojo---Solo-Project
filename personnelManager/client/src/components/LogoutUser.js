import React from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
const LogoutUser = () => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }
    return (
        <Button variant="danger"className='m-3' size="sm" onClick={logout}>Logout</Button>
    )
}
export default LogoutUser