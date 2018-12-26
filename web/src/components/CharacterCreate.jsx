import React from "react";
import { Container, Card, CardBody, Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { Banner } from "./Banner";
import NavDispatcher from "../dispatchers/NavDispatcher";

export const ARCHETYPE_INFO = {
    "Knight": {
        description: "\
            Tank hero, specializes in survival and dealing melee damage to single targets. Knights have superior defenses and resistances compared to the rest, at the cost of damage and ranged attacks. \
            A knight can further specialize into a TEMPLAR which focus on stronger defenses with AoE attacks or CRUSADER which specializes in melee damage with increased defense\
        ",
        icon: null
    },
    "Ranger": {
        description: "\
            Damage hero, specializes in single target and AoE ranged attacks. Rangers have superior damage compared to there rest, at the cost of resistances and melee attacks.\
            A ranger can further specialize into a SENTINEL which focus on stronger defenses or an ASSASSIN which specializes in debuffs and stronger attacks.\
        ",
        icon: null
    },
    "Mage": {
        description: "\
            Support hero, specializes in weaker ranged AoE damage and crowd control. Mages, although weaker than the rest, gain pets later and are great and increasing team survivability.\
            A mage can further specialize into an ARCANE ENCHANTER which focus on defensive support (buffing and healing) or a BLOOD MAGE which specializes in offensive support (debuffing and damage).\
            Both specializations come with a pet.\
        ",
        icon: null
    },
};

export class CharacterCreate extends React.Component{
    constructor(props){
        super(props);

        this.nameInput = null;
        this.archetypeInput = null;
    }

    componentDidMount(){
        this.forceUpdate();
    }

    onCancel(){
        NavDispatcher.showCharacterSelect();
    }

    onSubmit(evt){
        evt.preventDefault();

        let name = this.nameInput.value,
            archetype = this.archetypeInput.value.toLowerCase();
    }

    renderArchetype(){
        return this.archetypeInput ? this.archetypeInput.value.toUpperCase() : null;
    }

    renderDescription(){
        if(this.archetypeInput){
            let info = ARCHETYPE_INFO[this.archetypeInput.value] || null;
            return info ? info.description : null;
        }
        return null;
    }

    renderIcon(){
        return null;
    }

    render(){
        return (
            <div>
                <Container>
                    <br/>
                    <Card>
                        <CardBody>
                            <Banner/>
                            <h3 className="text-center">Create Your Hero</h3>
                            <br/>
                            <Form onSubmit={this.onSubmit.bind(this)}>
                                <FormGroup>
                                    <Label>Hero Name</Label>
                                    <Input
                                        innerRef={input => this.nameInput = input}
                                        type="text"
                                        placeholder="Enter your hero's name here"
                                        maxLength={15}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col lg={6}>
                                            <Label>Select Hero Archetype</Label>
                                            <Input
                                                innerRef={input => this.archetypeInput = input}
                                                type="select"
                                                onInput={() => this.forceUpdate()}
                                            required>
                                                <option>Knight</option>
                                                <option>Ranger</option>
                                                <option>Mage</option>
                                            </Input>
                                        </Col>
                                        <Col lg={6}>
                                            <h5 className="text-center">{this.renderArchetype()}</h5>
                                            <div>
                                                {this.renderDescription()}
                                            </div>
                                            <div>
                                                {this.renderIcon()}
                                            </div>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Button>
                                        Submit
                                    </Button>&nbsp;
                                    <Button onClick={this.onCancel.bind(this)} type="button">
                                        Cancel
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