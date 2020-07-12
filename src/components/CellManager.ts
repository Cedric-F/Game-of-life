import Cell from "./Cell";

export default class CellManager {

    private _cells: Array<Array<Cell>>;
    private readonly size: number;

    constructor(size: number, scale: number) {
        this.size = size / scale;
        this._cells = new Array<Array<Cell>>(this.size);
    }

    get cells(): Array<Array<Cell>> {
        return this._cells;
    }

    public getCell(row: number, col: number): Cell {
        return this._cells[row][col];
    }

    /**
     * Get all neighbors of a given cell in a 3x3 area.
     *
     * @param row the row of the given cell
     * @param col the column of the given cell
     * @population the grid in which the cell is located
     */
    public getLiveNeighbours(row: number, col: number): Set<Cell> {
        const list: Set<Cell> = new Set<Cell>();
        let temp: Cell;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (row + i >= 0 && col + j >= 0 && col + j < this.size && row + i < this.size)
                    if (row !== (row + i) || col !== (col + j)) {
                        temp = this._cells[row + i][col + j];
                        if (temp.alive)
                            list.add(temp);
                    }
            }
        }
        return list;
    }

    /**
     * For manual seeding.
     * Switch the state of a given cell.
     * @param i the index of the cell in the current generation.
     */
    public switchCell(i: number): void {
        const cell: Cell = this._cells[i % this.size][i];
        cell.switch(!cell.alive);
    }

    /**
     * Creates the seed of the game.
     */
    public fill(): void {
        this._cells = [...this._cells].map((_, row) => [...new Array<Cell>(this.size)].map((_, col) => new Cell(row, col)));
    }

    /**
     * Conway's rules:
     * - Any live cell with two OR three live neighbours survives. [1]
     * - Any dead cell with three live neighbours becomes a live cell. [2]
     * - All other live cells die in next generation. Similarly, all other dead cells stay dead. [3]
     *
     * Create a new list based on the current generation.
     * For each element of the current generation, depending on their state, look for live neighbours.
     * If the actual cell is alive and has exactly 2 OR 3 live neighbours, nothing happens.
     * Otherwise, if it is just alive OR has exactly 3 live neighbours, reverse it's state.
     *
     * @returns The new generation of cells.
     */
    public update(): void {
        let holder: Array<Array<number>> = new Array<Array<number>>();
        let cell: Cell;
        let liveNeighbours: number;

        for (let row = 0; row < this.size; row++) {
            holder[row] = new Array<number>();
            for (let col = 0; col < this.size; col++) {
                cell = this._cells[row][col];
                liveNeighbours = this.getLiveNeighbours(cell.row, cell.col).size;

                if (cell.alive && (liveNeighbours === 2 || liveNeighbours === 3)) { // 1
                    holder[row][col] = 1;
                }
                else if (cell.alive) { // 2
                    holder[row][col] = 0;
                } else if (liveNeighbours === 3) { // 3
                    holder[row][col] = 1;
                } else holder[row][col] = 0;
            }
        }

        this._cells
            .forEach((_, row) => _
                .forEach((_, col) =>
                    this.getCell(row, col).switch(holder[row][col] > 0)
                ))
    }
}