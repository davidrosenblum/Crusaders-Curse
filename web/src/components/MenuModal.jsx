import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import ModalDispatcher from "../dispatchers/ModalDispatcher";

export class MenuModal extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showModal: false,
            header: null,
            body: null,
            footer: null
        };
    }

    componentDidMount(){
        ModalDispatcher.on("modal", this.onModal.bind(this));
    }

    onModal(evt){
        let {header=null, body=null, footer=null} = evt;
        this.setState({header, body, footer, showModal: true});
    }

    toggleModal(){
        this.setState({showModal: !this.state.showModal});
    }

    render(){
        return (
            <Modal isOpen={this.state.showModal} toggle={this.toggleModal.bind(this)}>
                <ModalHeader toggle={this.toggleModal.bind(this)}>
                    {this.state.header}
                </ModalHeader>
                <ModalBody>
                    {this.state.body}
                </ModalBody>
                <ModalFooter>
                    {this.state.footer}
                </ModalFooter>
            </Modal> 
        );
    }
}