import React from "react";
import { Container, Card, CardBody, Button, Row, Table } from "reactstrap";
import Client from "../game/Client";
import NavDispatcher from "../dispatchers/NavDispatcher";
import { Banner } from "./Banner";

export class CharacterSelect extends React.Component{
     constructor(props){
        super(props);

        this.state = {
            characterList: null
        }; 

        this.onCharacterList = evt => {
            if(evt.success){
                this.setState({characterList: evt.characterList});
            }
        };
     }

     componentDidMount(){
        Client.on("character-list", this.onCharacterList);

        Client.getCharacterList();
     }

     componentWillUnmount(){
        Client.removeListener("character-list", this.onCharacterList);
     }

     onCreate(){
        NavDispatcher.showCharacterCreate();
     }

     onLogout(){
         Client.logout();
         NavDispatcher.showLogin();
     }

     renderTable(){
        let rows = [];

        for(let i = 0; i < 6; i++){
            let row = this.state.characterList[i] || null;

            if(row){
                rows.push(
                    <tr key={i}>
                        <td colSpan={3}>
                            {row.name} - 
                            Level {row.level} {row.archetype}
                        </td>
                        <td>
                            <Button>Select</Button>
                        </td>
                    </tr>
                );
            }
            else{
                rows.push(
                    <tr key={i}>
                        <td colSpan={4}>
                            <Button onClick={this.onCreate.bind(this)}>Create</Button>
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
                    <Button onClick={this.onLogout.bind(this)}>Logout</Button>
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