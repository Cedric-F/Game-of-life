import React, { Component } from 'react';
import './App.css';
import {Canvas} from "./components/Canvas";
import Menu from "./components/Menu";

export default class App extends Component<any, any> {

    private loop: any;

    constructor(props: any) {
        super(props);
        this.state = {size: 550, scale: 10, playing: false, clear: 0, count: 0 }
    }

    render(): any {
        let { size, scale, count, playing, clear } = this.state;
        return (
            <div className="App">
                <h1>Conway's Game of Life</h1>
                <ol>
                    <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                    <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                    <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                    <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                </ol>
                <Canvas size={size} scale={scale} count={count} clear={clear}/>
                <Menu playing={playing} handleStatus={this.setGame.bind(this)} handleClear={this.upClear.bind(this)} />
            </div>
        );
    }

    private setGame(): void {
        this.setState({ playing: !this.state.playing });
        if (this.state.playing) {
            clearInterval(this.loop);
        } else {
            this.loop = setInterval(this.setCounter.bind(this), 500);
        }
    }

    private setCounter(): void {
        if (this.state.playing) {
            this.setState(
            {
                count: this.state.count + 1
            });
        }
    }

    private upClear(): void {
        this.setState(
            {
                clear: this.state.clear + 1,
                playing: false
            });
    }
}