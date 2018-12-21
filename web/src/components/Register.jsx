import React from "react";
import { Container, Card, CardBody, Form, FormGroup, Label, Button, Input } from "reactstrap";
import { Ajax } from "../utils/Ajax";
import { Banner } from "./Banner";
import ModalDispatcher from "../dispatchers/ModalDispatcher";

export class Register extends React.Component{
    constructor(props){
        super(props);

        this.usernameInput = null;
        this.passwordInput = null;
        this.confirmInput = null;
        this.submitBtn = null;
    }

    onSubmit(evt){
        evt.preventDefault();

        let url = window.location.origin.replace("localhost:3000", "localhost:8080");

        let headers = {
            "Access-Control-Allow-Origin": window.location.origin
        };

        let username = this.usernameInput.value,
            password = this.passwordInput.value,
            confirm = this.confirmInput.value;

        if(password !== confirm){
            console.log("BAD INPUTS")
            ModalDispatcher.modal("Passwords do no match.", "Error");
            return;
        }

        this.submitBtn.disabled = true;

        Ajax.post(url, headers, {username, password})
            .then(xhr => {
                ModalDispatcher.modal(
                    xhr.response,
                    xhr.status === 200 ? "Account Created" : "Account Error"
                );
            })
            .catch(err => {
                ModalDispatcher.modal(
                    "Request failed - Unable to contact account server. Please try again later.",
                    "Request Error"
                );
            })
            .then(() => this.submitBtn.disabled = false);
    }

    render(){
        return (
            <div>
                <Container>
                    <br/>
                    <Card>
                        <CardBody>
                        <Banner/>
                        <h3 className="text-center">Account Registration</h3>
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
                                <Label>Confirm Password</Label>
                                <Input
                                    innerRef={input => this.confirmInput = input}
                                    type="password"
                                    maxLength="25"
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button innerRef={input => this.submitBtn = input} color="dark">
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