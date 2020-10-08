export class Stone {
    row : number;
    column : number;
    color : boolean;
    gameId : number;

    constructor(row: number, column: number, color: boolean) {
        this.row = row;
        this.column = column;
        this.color = color;
    }
}