import React, { Component } from "react";

export default class Menu extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        const { playing } = this.props;
        return (
            <div>
                <button onClick={this.props.handleStatus}>{!playing ? "Start" : "Pause"}</button>
                <button onClick={this.props.handleClear}>Clear canvas</button>
            </div>
        );
    }

}