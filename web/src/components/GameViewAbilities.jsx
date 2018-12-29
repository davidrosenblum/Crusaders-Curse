import React from "react";
import Client from "../game/Client";
import emptyIconImg from "../img/ability_icons/empty.png"

export const ABILITY_ICON_SIZE = 64;

export const ABILITY_ICONS = {

};

export class GameViewAbilities extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            abilities: null
        };

        this.onAbilitiesList = evt => {
            this.setState({abilities: evt.abilities});
        };
    }

    componentDidMount(){
        Client.on("chat", this.onAbilitiesList);
    }

    componentWillUnmount(){
        Client.removeListener("chat", this.onAbilitiesList);
    }

    renderAbilityIcons(){
        let s = ABILITY_ICON_SIZE;

        let icons = new Array(10).fill(<img src={emptyIconImg} width={s} height={s}/>);

        if(this.state.abilities){
            let i = 0;

            for(let ability in this.state.abilities){
                let abilityIcon = ABILITY_ICONS[ability] || emptyIconImg;

                icons[i] = (
                        <img
                            src={abilityIcon}
                            width={s}
                            height={s}
                            title={ability}
                            onClick={() => Client.castAbility(ability)}
                        />
                );

                i++;
            }
        }

        let left = icons.splice(0, 5);
        let right = icons;

        return [left, <br/>, right];
    }
    
    render(){
        return (
            <div id="hud-abilities">
                <table>
                    <tbody>
                        {this.renderAbilityIcons()}
                    </tbody>
                </table>
            </div>
        );
    }
}