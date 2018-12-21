import "./App.css";
import React from "react";
import { Landing } from "./Landing";
import { Register } from "./Register";
import { Login } from "./Login";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { MenuModal } from "./MenuModal";
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

    renderCurrentMenu(){
        let menu = null;

        switch(this.state.menu){
            case "landing":
                menu = <Landing/>
                break;
            case "register":
                menu = <Register/>
                break;
            case "login":
                menu = <Login/>
                break;
        }

        return menu;
    }

    render(){
        return (
            <div>
                {this.state.menu !== "game" ? <Navigation/> : null}
                {this.renderCurrentMenu()}
                <br/>
                <Footer/>     
                <MenuModal/>  
            </div>
        );
    }
}