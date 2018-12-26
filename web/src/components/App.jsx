import "./App.css";
import React from "react";
import { Landing } from "./Landing";
import { Register } from "./Register";
import { Login } from "./Login";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { MenuModal } from "./MenuModal";
import { CharacterSelect } from "./CharacterSelect";
import { CharacterCreate } from "./CharacterCreate";
import NavDispatcher from "../dispatchers/NavDispatcher";

export class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            menu: "landing"
        };
    }

    componentDidMount(){
        NavDispatcher.on("show-menu", this.onNavMenu.bind(this));
    }

    onNavMenu(evt){
        this.setState({menu: evt.menu});
    }

    renderNav(){
        switch(this.state.menu){
            case "game":
                return null;
            case "character-create":
                return null;
            case "character-select":
                return null;
            default:
                return <Navigation/>
        }
    }

    renderCurrentMenu(){
        switch(this.state.menu){
            case "landing":
                return <Landing/>;
            case "register":
                return <Register/>;
            case "login":
                return <Login/>;
            case "character-select":
                return <CharacterSelect/>;
            case "character-create":
                return <CharacterCreate/>;
            default:
                return null;
        }
    }

    render(){
        return (
            <div>
                {this.renderNav()}
                {this.renderCurrentMenu()}
                <br/>
                <Footer/>     
                <MenuModal/>  
            </div>
        );
    }
}