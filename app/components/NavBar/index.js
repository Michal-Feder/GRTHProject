import React, { memo } from 'react';

//Bootstrap
import { Button, Navbar, Nav } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Switch, Route, Link } from 'react-router-dom';


function NavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand >
          <Link className="lnk" to="/">myProject</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="lnk lnk-nav" to="/">Home</Link>
            <Link className="lnk lnk-nav" to="/AttendanceRegistration">Attendance Registration</Link>
            <Link className="lnk lnk-nav" to="/AttendanceList">Attendance List</Link>
          </Nav>
          <Form inline>
            <Button variant="outline-danger">
              <Link className="lnk" to="/Login">Login</Link>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

    </div>
  );
}

NavBar.propTypes = {};

export default memo(NavBar);
