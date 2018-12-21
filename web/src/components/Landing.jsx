import React from "react";
import { Banner } from "./Banner";
import { Container, Col, Row, Card, CardBody } from "reactstrap";

export class Landing extends React.Component{
    render(){
        return (
            <div>
                <Container>
                    <br/>
                    <Card>
                        <CardBody>
                            <Banner/>
                            <Row>
                                <Col lg={4}>
                                    <div>
                                        <h3 className="text-center">Crusader's Curse</h3>
                                        description!
                                    </div>
                                </Col>
                                <Col lg={4}></Col>
                                <Col lg={4}>
                                    <div>
                                        <h3 className="text-center">Setup</h3>
                                        instructions!
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>  
            </div>
        );
    }
}