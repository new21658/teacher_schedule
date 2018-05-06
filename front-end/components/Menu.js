import React, { Component } from "react";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, NavbarBrand } from "react-bootstrap";
import Link from "next/link";

const ProtectedMenu = (props) => {
  return (
    <Nav className="tch-nav">
      <Link href="/">
        <NavItem className={props.url.pathname === '/' ? "active" : ''} eventKey={1}>
          ตารางสอน
    </NavItem>
      </Link>
      <Link href="/registered">
        <NavItem className={props.url.pathname === '/registered' ? "active" : ''} eventKey={2}>
          รายวิชา
    </NavItem>
      </Link>
    </Nav>
  )
}

const NoneProtectedMenu = (props) => {
  return (
    <Nav className="tch-nav">
      <NavItem href="/login">
        <i className="fas fa-arrow-left"></i> เข้าสู่ระบบ
      </NavItem>
      <Link href="/schedule">
      <NavItem className={props.url.pathname === '/schedule' ? "active" : ''} >
        <i className="fas fa-calendar"></i> ตารางการใช้ห้องเรียน
      </NavItem>
      </Link>
      <Link href="/testSchedule">
      <NavItem className={props.url.pathname === '/testSchedule' ? "active" : ''} >
        <i className="fas fa-calendar"></i> ตารางสอบ
      </NavItem>
      </Link>
    </Nav>
  )
}


export default class Menu extends Component {

  render() {
    console.log("Menu props", this.props);
    return (
      <Navbar className="tch-nav" collapseOnSelect>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {
            this.props.isLoggedIn ? <ProtectedMenu { ...this.props } /> : <NoneProtectedMenu { ...this.props } />
          }
        </Navbar.Collapse>
      </Navbar>
    )
  }
};