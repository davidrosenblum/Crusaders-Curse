import React from "react";
import { Container } from "reactstrap";

export class Footer extends React.Component{
    render(){
        return (
            <footer>
                <Container>
                    <hr/>
                    Michelle Reina
                    <br/>
                    David Rosenblum
                    <br/>
                    2018
                </Container>
            </footer>
        );
    }
}