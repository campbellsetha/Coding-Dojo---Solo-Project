import React from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';

const Sidebar = (props) => {
    const { currentUnit, setDisplayUnit } = props;
    
    return (
        <Nav variant="pills" className="flex-column" defaultActiveKey="/dashboard">
            currentUnit.map((unit, i) => {
                return (
                    <Nav.Item className="m-3" onClick={(e) => setDisplayUnit(unit)}>Unit: { unit }</Nav.Item>
                )})
        </Nav>
    )
}
export default Sidebar;
