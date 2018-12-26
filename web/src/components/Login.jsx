import React from "react";
import { Container, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Banner } from "./Banner";
import Client from "../game/Client";
import NavDispatcher from "../dispatchers/NavDispatcher";
import ModalDispatcher from "../dispatchers/ModalDispatcher";

export class Login extends React.Component{
    constructor(props){
        super(props);

        this.usernameInput = null;
        this.passwordInput = null;
        this.submitBtn = null;

        this.clientSubscriptions = {};

        this.state = {
            message: null
        };
    }

    componentDidMount(){
        this.clientSubscriptions = {
            "connect":  this.onClientConnected.bind(this),
            "close":    this.onClientClosed.bind(this),
            "login":    this.onClientLogin.bind(this),
            "error":    this.onClientError.bind(this)
        };

        for(let type in this.clientSubscriptions){
            Client.on(type, this.clientSubscriptions[type]);
        }

        if(!Client.isConnected){
            this.setInputsDisabled(true);
            this.setState({message: "Connecting to server..."});
            Client.connect();
        }
    }

    componentWillUnmount(){
        for(let type in this.clientSubscriptions){
            Client.removeListener(type, this.clientSubscriptions[type]);
        }
    }

    onClientConnected(){
        this.setState({message: null});
        this.setInputsDisabled(false);
    }

    onClientClosed(){
        this.setState({message: "Socket connection error."});

        ModalDispatcher.modal(
            "Unable to connect to server. The server is probably offline.",
            "Socket Error"
        );
    }

    onClientLogin(evt){
        let {success, message} = evt;

        if(!success){
            this.submitBtn.disabled = false;

            ModalDispatcher.modal(
                message || "Wrong username or password.",
                "Login Error"
            )
        }
        else{
            NavDispatcher.showCharacterSelect();
        }
    }

    onClientError(err){
        ModalDispatcher.modal(err.message, "Socket Error");
    }

    onSubmit(evt){
        evt.preventDefault();

        this.submitBtn.disabled = true;
        
        let username = this.usernameInput.value,
            password = this.passwordInput.value;

        Client.login(username, password);
    }

    setInputsDisabled(disabled){
        this.usernameInput.disabled = disabled;
        this.passwordInput.disabled = disabled;
        this.submitBtn.disabled = disabled;
    }

    render(){
        return (
            <div>
                <br/>
                <Container>
                    <Card>
                        <CardBody>
                            <Banner/>
                            <h3 className="text-center">Account Login</h3>
                            <Form onSubmit={this.onSubmit.bind(this)}>
                                <FormGroup>
                                    <Label>Username</Label>
                                    <Input
                                        innerRef={input => this.usernameInput = input}
                                        type="text"
                                        maxLength="25"
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input
                                        innerRef={input => this.passwordInput = input}
                                        type="password"
                                        maxLength="25"
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Button color="dark" innerRef={btn => this.submitBtn = btn}>
                                        Submit
                                    </Button>
                                    {this.state.message}
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    }
}