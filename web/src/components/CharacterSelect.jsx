import React from "react";
import { Container, Card, CardBody, Button, Row, Table } from "reactstrap";
import { Banner } from "./Banner";
import Client from "../game/Client";
import NavDispatcher from "../dispatchers/NavDispatcher";
import ModalDispatcher from "../dispatchers/ModalDispatcher";

export class CharacterSelect extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            characterList:  null,
            inputsDisabled: false
        }; 

        this.onCharacterList = evt => {
            if(evt.success){
                this.setState({characterList: evt.characterList});
            }
        };

        this.onCharacterSelect = evt => {
            // only will be an error (map-enter is considered the success)
            if(!evt.success){
                this.setState({inputsDisabled: false});
                ModalDispatcher.modal(evt.message, "Character Error");
            }
        };

        this.onEnterMap = evt => {
            if(evt.success){
                NavDispatcher.showGame();
            }
            else{
                this.setState({inputsDisabled: false});
                ModalDispatcher.modal(evt.message, "Map Error");
            }
        };
    }

    componentDidMount(){
        Client.on("character-list", this.onCharacterList);
        Client.on("character-select", this.onCharacterSelect);
        Client.on("enter-map", this.onEnterMap);

        Client.getCharacterList();
    }

    componentWillUnmount(){
        Client.removeListener("character-list", this.onCharacterList);
        Client.removeListener("character-select", this.onCharacterSelect);
        Client.removeListener("enter-map", this.onEnterMap);
    }

    onCreate(){
        NavDispatcher.showCharacterCreate();
    }

    onLogout(){
        Client.logout();
        NavDispatcher.showLogin();
    }

    onSelect(name){
        this.setState({inputsDisabled: true});
        Client.selectCharacter(name);
    }

    renderTable(){
        let rows = [];

        for(let i = 0; i < 6; i++){
            let row = this.state.characterList[i] || null;

            if(row){
                rows.push(
                    <tr key={i}>
                        <td>
                            {row.name}
                        </td>
                        <td colSpan={2}>
                            Level {row.level} {row.archetype}
                        </td>
                        <td>
                            <Button onClick={() => this.onSelect(row.name)} disabled={this.state.inputsDisabled}>Select</Button>
                        </td>
                    </tr>
                );
            }
            else{
                rows.push(
                    <tr key={i}>
                        <td colSpan={4}>
                            <Button onClick={this.onCreate.bind(this)} disabled={this.state.inputsDisabled}>Create</Button>
                        </td>
                    </tr>
                );
            }
        };

        return (
            <div>
                <Banner/>
                <h3 className="text-center">Select Your Hero</h3>
                <br/>
                <Table>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
                <div className="text-center">
                    <Button onClick={this.onLogout.bind(this)} disabled={this.state.inputsDisabled}>Logout</Button>
                </div>
            </div>
        );
     }

    renderBody(){
    let characterList = this.state.characterList;
    
    if(characterList){
        return this.renderTable();
    }

    return <div>Fetching characters...</div>;
    }

    render(){
        return (
            <div>
                <Container>
                <br/>
                <Card>
                    <CardBody>
                        {this.renderBody()}
                    </CardBody>
                </Card>
                </Container>
            </div>
        )
    }
}