import React, { Component } from "react";

export default class StateChange extends Component {

    constructor(props) {
        super(props)

        this.state = {
            buttonState: 'pending'
        }
    }

    pendingBttn() {
        this.setState({
            buttonState: 'complete'
        }, () => {console.log('Button State After:', this.state.buttonState)})
        console.log(this.state.buttonState)
        console.log(BttnFunc)
    }

    completeBttn() {
        this.setState({
            buttonState: 'pending'
        }, () => {console.log('Button State After:', this.state.buttonState)})
        console.log(this.state.buttonState)
    }

    render () {
        return (
            <div>
                <button onClick={() => this.pendingBttn()}>New</button>
                <button onClick={() => this.completeBttn()}>Completed</button>
            </div>
        )
    }
}