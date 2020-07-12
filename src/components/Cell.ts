export default class Cell {

    private _alive: boolean;
    private readonly _col: number;
    private readonly _row: number;

    constructor(row: number, col: number) {
        this._alive = false;
        this._row = row;
        this._col = col;
    }

    public switch(on: boolean): void {
        this._alive = on;
    }

    get alive(): boolean {
        return this._alive;
    }

    get col(): number {
        return this._col;
    }

    get row(): number {
        return this._row;
    }

    public equals(cell: Cell): boolean {
        return (this._col === cell._col && this._row === cell._row);
    }

    public toString(): string {
        return `Row: ${this._row} Col: ${this._col}`;
    }
}