import React from "react";
import Game from "../game/Game";
import { GameViewChat } from "./GameViewChat";
import { GameViewAbilities } from "./GameViewAbilities";
import "./GameView.css";

export class GameView extends React.Component{
    componentDidMount(){
        Game.renderer.injectInto(`#game-canvas-container`);
    }

    render(){
        return (
            <div>
                <div id="game-canvas-container"></div>
                <GameViewChat/>
                <GameViewAbilities/>
            </div>
        );
    }
}