import React from "react";
import { Container, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Banner } from "./Banner";
import Game from "../game/Game";
import NavDispatcher from "../dispatchers/NavDispatcher";
import ModalDispatcher from "../dispatchers/ModalDispatcher";

export class Login extends React.Component{
    constructor(props){
        super(props);

        this.usernameInput = null;
        this.passwordInput = null;
        this.submitBtn = null;
    }

    componentDidMount(){
        Game.on("login", this.onGameLogin.bind(this));
    }

    onGameLogin(evt){
        let {status, message} = evt;
        
        this.submitBtn.disabled = false;

        if(status !== 200){
            ModalDispatcher.modal(
                message || "Invalid username or password.",
                "Login Error"
            )
        }
        else{
            NavDispatcher.showGame();
        }
    }

    onSubmit(evt){
        evt.preventDefault();

        this.submitBtn.disabled = true;
        
        let username = this.usernameInput.value,
            password = this.passwordInput.value;

        Game.login(username, password);
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
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    }
}