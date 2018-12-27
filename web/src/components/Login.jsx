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

        this.lastUsername = null;

        this.state = {
            message:        null,
            inputsDisabled: false
        };

        this.onClientConnected = () => this.setState({message: null, inputsDisabled: false});

        this.onClientClosed = () => {
            this.setState({message: "Socket connection error."});

            ModalDispatcher.modal(
                "Unable to connect to server. The server is probably offline.",
                "Socket Error"
            );
        };

        this.onClientLogin = evt => {
            let {success, message} = evt;

            if(!success){
                this.submitBtn.disabled = false;

                ModalDispatcher.modal(
                    message || "Wrong username or password.",
                    "Login Error"
                )
            }
            else{
                this.saveUsername();
                NavDispatcher.showCharacterSelect();
            }
        };
    }

    componentDidMount(){
        Client.on("connect", this.onClientConnected);
        Client.on("close", this.onClientClosed);
        Client.on("login", this.onClientLogin);

        let lastUsername = this.getLastUsername();
        if(lastUsername){
            this.usernameInput.value = lastUsername;
        }

        if(!Client.isConnected){
            this.setState({message: "Connecting to server...", inputsDisabled: true});
            Client.connect();
        }
    }

    componentWillUnmount(){
        Client.removeListener("connect", this.onClientConnected);
        Client.removeListener("close", this.onClientClosed);
        Client.removeListener("login", this.onClientLogin);
    }

    onClientError(err){
        ModalDispatcher.modal(err.message, "Socket Error");
    }

    onSubmit(evt){
        evt.preventDefault();

        this.submitBtn.disabled = true;
        
        let username = this.usernameInput.value,
            password = this.passwordInput.value;

        this.lastUsername = username;

        Client.login(username, password);
    }

    saveUsername(username){
        username = username || this.lastUsername;
        if(username){
            window.localStorage.setItem("username", username);
            console.log("save", username);
        }
    }

    getLastUsername(){
        return window.localStorage.getItem("username") || null;
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
                                        disabled={this.state.inputsDisabled}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input
                                        innerRef={input => this.passwordInput = input}
                                        type="password"
                                        maxLength="25"
                                        required
                                        disabled={this.state.inputsDisabled}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Button color="dark" innerRef={btn => this.submitBtn = btn} disabled={this.state.inputsDisabled}>
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