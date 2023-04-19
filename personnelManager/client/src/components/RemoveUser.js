import React from 'react'
import axios from 'axios'
import * as Icon from 'react-bootstrap-icons'

const RemoveUser = (props) => {
    const { id, successCallBack } = props

    const deleteUser = (e) => {
        axios.delete("http://localhost:8000/api/user/delete/" + id)
            .then(res => successCallBack()
            ).catch(err => console.log(err))
    }
    return (
        <Icon.Trash3Fill
            size={40}
            color="red" 
            onClick={deleteUser}/>
    )
}
export default RemoveUser;