import React, { Component } from "react";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, NavbarBrand } from "react-bootstrap";
import Link from "next/link";
export default class Menu extends Component {

    render() {
      console.log("Menu props", this.props);
    return (
      <Navbar className="tch-nav" collapseOnSelect>
      <Navbar.Header>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav className="tch-nav">
          <Link href="/">
          <NavItem className={this.props.url.pathname === '/' ? "active" : ''} eventKey={1}>
            ตารางสอน
          </NavItem>
          </Link>
          <Link href="/registered">
          <NavItem className={this.props.url.pathname === '/registered' ? "active" : ''} eventKey={2}>
            วิชาที่ลงทะเบียนแล้ว
          </NavItem>
          </Link>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
    )
}
};