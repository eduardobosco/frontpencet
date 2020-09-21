import React from 'react';
import { Nav, Navbar, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './styles.css'


const Header: React.FC = () => {
    return (
        <div className="container-fluid">
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top" >
            <Navbar.Brand id="brand-text" href="#home" >
                <img
                    alt=""
                    src="./logo.png"
                    width="75"
                    height="75"
                    className="d-inline-block align-top"
                />{' '}Pencet Technologies</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto" id="navbar-links">
                    <Nav.Item as={Link} className="nav-link" to="/">Home</Nav.Item>
                    <Nav.Item as={Link} className="nav-link" to="/tarefas">Funcionários</Nav.Item>
                    <Nav.Item as={Link} className="nav-link" to="/produto">Produtos</Nav.Item>
                    <Nav.Item as={Link} className="nav-link" to="/categoria">Categorias</Nav.Item>
                    <Nav.Item as={Link} className="nav-link" to="/cliente">Clientes</Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </div>
)};

export default Header;
