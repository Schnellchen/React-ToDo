import React from 'react';


export class Test extends React.Component {
    constructor() {
        super()
        this.state = {
            testState: true,
        }
    }
    render() {
        return (<div>{this.state.testState}</div>)
    }
}