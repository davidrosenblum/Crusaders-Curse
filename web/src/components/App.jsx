import "./App.css";
import React from "react";
import { Landing } from "./Landing";
import { Register } from "./Register";
import { Login } from "./Login";
import { Navigation } from "./Navigation";
import { MenuModal } from "./MenuModal";
import { CharacterSelect } from "./CharacterSelect";
import { CharacterCreate } from "./CharacterCreate";
import { GameView } from "./GameView";
import NavDispatcher from "../dispatchers/NavDispatcher";
import ModalDispatcher from "../dispatchers/ModalDispatcher";
import Client from "../game/Client";

export class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            menu: "landing"
        };
    }

    componentDidMount(){
        // menu change
        NavDispatcher.on("show-menu", evt => this.setState({menu: evt.menu}));

        Client.on("close", this.onClientClose.bind(this));
    }

    onClientClose(){
        this.setState({menu: "landing"});

        ModalDispatcher.modal(
            "Unable to connect to server. The server is probably offline.",
            "Socket Error"
        );
    }

    renderNav(){
        let menu = this.state.menu;

        if(menu === "game" || menu === "character-create" || menu === "character-select"){
            return null;
        }

        return <Navigation/>;
    }

    renderCurrentMenu(){
        switch(this.state.menu){
            case "landing":
                return <Landing/>;
            case "register":
                return <Register/>;
            case "login":
                return <Login connected={this.state.connected}/>;
            case "character-select":
                return <CharacterSelect characterList={this.state.characterList}/>;
            case "character-create":
                return <CharacterCreate/>;
            case "game":
                return <GameView/>
            default:
                return null;
        }
    }

    render(){
        return (
            <div>
                {this.renderNav()}
                {this.renderCurrentMenu()}  
                <MenuModal/>  
            </div>
        );
    }
}