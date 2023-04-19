import React from 'react'
import Modal from 'react-bootstrap/Modal'

const ErrorModal = (props) => {
    const { errors } = props
    return (
        <Modal 
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" style={{color: "red", fontWeight: "800"}}>
                    Login / Registration Errors
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { errors.firstName ?
                    <p style={{color: "red"}}>{ errors.firstName.message}</p>: null
                }
                { errors.lastName ?
                    <p style={{color: "red"}}>{ errors.lastName.message}</p>: null
                }
                { errors.email ?
                    <p style={{color: "red"}}>{ errors.email.message}</p>: null
                }
                { errors.password ?
                    <p style={{color: "red"}}>{ errors.password.message}</p>: null
                }
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}
export default ErrorModal