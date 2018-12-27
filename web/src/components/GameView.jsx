import React from "react";
import Client from "../game/Client";
import Game from "../game/Game";
import "./GameView.css";

export class GameView extends React.Component{
    constructor(props){
        super(props);

        this.chatInputRef = React.createRef();
        this.chatTextRef = React.createRef();

        this.onUpdateChat = evt => {
            let {chat, from} = evt;

            let newText = from ? `${from}: ${chat}` : chat;
            let oldText = this.chatTextRef.current.value;

            this.chatTextRef.current.value = !oldText ? newText : `${oldText}\n${newText}`;
        };
    }

    componentDidMount(){
        Client.on("chat", this.onUpdateChat);
    }

    componentWillUnmount(){
        Client.removeListener("chat", this.onUpdateChat);
    }

    onChatEnter(evt){
        let chat = this.chatInputRef.current.value;

        if(chat && evt.keyCode === 13){
            Client.chat(chat);
            this.chatInputRef.current.value = "";
        }
    }

    render(){
        return (
            <div>
                <div id="game-canvas-container"></div>
                <div id="hud-chat">
                    <textarea ref={this.chatTextRef} readOnly/>
                    <input
                        ref={this.chatInputRef}
                        onKeyUp={this.onChatEnter.bind(this)}
                        type="text"
                        maxLength={128}
                    />
                </div>
            </div>
        );
    }
}