import React from "react";
import { Button, Navbar, NavbarBrand, Collapse, Nav, NavbarToggler, NavItem, NavLink } from "reactstrap";
import NavDispatcher from "../dispatchers/NavDispatcher";

export class Navigation extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            navOpen: false
        };
    }

    toggleNavbar(){
        this.setState(prev => {{navOpen: !prev.navOpen}});
    }

    onHome(){
        NavDispatcher.showLanding();
    }

    onLogin(){
        NavDispatcher.showLogin();
    }

    onCreateAccount(){
        NavDispatcher.showRegister();
    }

    render(){
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand>
                    (Logo)
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar.bind(this)}/>
                <Collapse isOpen={this.state.navOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <Button color="dark" onClick={this.onHome.bind(this)}>
                                Home
                            </Button>
                        </NavItem>
                        <NavItem>
                            <Button color="dark" onClick={this.onLogin.bind(this)}>
                                Login
                            </Button>
                        </NavItem>
                        <NavItem>
                            <Button color="dark" onClick={this.onCreateAccount.bind(this)}>
                                Create Account
                            </Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}