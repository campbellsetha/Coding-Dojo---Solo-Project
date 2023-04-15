import React, { useEffect, useState } from 'react';
import jwt from 'jwt-decode';
//import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
//import Button from 'react-boostrap/Button';

const NavHeader = (props) => {

    const {
        rate,
        rank,
        firstName,
        lastName
    } = props;

    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand href="/dashboard">PSDM</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: {rank}{rate} {lastName}, {firstName}
                    </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default NavHeader;