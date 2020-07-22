import React, { Component } from 'react';
import '../App.css';
import {Stage, Rect, Layer} from "react-konva";
import Cell from "./Cell";
import CellManager from "./CellManager";

export class Canvas extends Component<any, any> {

    private manager: CellManager;

    constructor(props: any) {
        super(props);
        this.manager = new CellManager(props.size, props.scale);
        this.manager.fill();
        this.state = {
            generation: this.manager.cells
        }
    }

    /**
     * Update the model every round.
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if (prevProps.count < this.props.count) {
            this.manager.update();
        }
        if (prevProps.clear < this.props.clear) {
            console.log("clearing");
            this.manager.clear();
            this.manager.update();
            console.log("cleared")
        }
    }

    /**
     * Fill the canvas with dead cells.
     * The rendering creates a rectangle (square) for each element of the current generation.
     * The user can click on a cell to turn it on and off.
     */
    render() {
        const { size, scale } = this.props;
        const { generation } = this.state;
        let key = 0;
        return (
            <div className="canvas">
                <Stage width={size} height={size}>
                    <Layer width={size} height={size}>
                        {[...generation].map((e: Array<Cell>, row: number) => [...e].map((cell: Cell, col: number) => {
                            let live: boolean = cell.alive;
                            return <Rect
                                key={key++}
                                name={"Cell_" + (row + col)}
                                width={scale}
                                height={scale}
                                x={cell.col * scale}
                                y={cell.row * scale}
                                fill={live ? "black" : "white"}
                                stroke={"grey"}
                                strokeWidth={1}
                                onClick={() => this.switch(cell)}
                            />;
                        }))}
                    </Layer>
                </Stage>
            </div>
        );
    }

    /**
     * Manual seeding
     * Allows to turn on and off cells manually to create patterns.
     * @param cell a cell that has been clicked on.
     */
    private switch(cell: Cell) {
        cell.switch(!cell.alive);
        this.setState({generation: this.manager.cells});
    }
}