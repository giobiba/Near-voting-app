import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';

import getConfig from './config'
import Home from './components/Home';
import Vote from './components/Vote';
import NewPoll from './components/NewPoll';
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() { 
  return (
    <BrowserRouter>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/">Demos Kratos</Navbar.Brand>
        <Navbar.Text>iDK.</Navbar.Text>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="/newpoll">New Poll</Nav.Link>
            <Nav.Link onClick={
              window.accountId == "" ? login : logout
            }>{
              window.accountId == "" ? "Login" : window.accountId
            }</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/vote" element={<Vote/>} />
        <Route exact path="/newpoll" element={<NewPoll/>} />
      </Routes>
    </BrowserRouter>
  );
}
