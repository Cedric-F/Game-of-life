import React, { Component } from 'react';
import './App.css';
import {Canvas} from "./components/Canvas";

export default class App extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {size: 500, scale: 10, count: 0 }
    }

    render(): any {
        let { size, scale, count } = this.state;
        return (
            <div className="App">
                <h1>Game of Life</h1>

                <Canvas size={size} scale={scale} count={count} />

                <button onClick={this.setStatus.bind(this)}>Next generation</button>
            </div>
        );
    }

    private setStatus(): void {
        this.setState(
            {
                count: this.state.count + 1
            });
    }
}