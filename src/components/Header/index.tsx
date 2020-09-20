import React from 'react';
import { Nav, Navbar, } from 'react-bootstrap'
import { Link }from 'react-router-dom'
import './styles.css'


const Header: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">Pencet - Technologies</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto" id="navbar-links">
                    <Nav.Item as={Link} className="nav-link" to="/">Home</Nav.Item>
                    <Nav.Item as={Link} className="nav-link" to="/tarefas">Funcionários</Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>);
}

export default Header;
