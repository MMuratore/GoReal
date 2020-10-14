import { Rule } from './Rule.model';
import { Stone } from './Stone.model';
import { TimeControl } from './TimeControl.model';
import { User } from './user.model';
import { Board } from './board.model';

export class Game {
    id : number;
    startDate : Date;
    endDate : Date;
    blackRank : number;
    whiteRank : number;
    result? : string;
    size : number;
    komi : number;
    handicap: number;
    blackCapture: number;
    whiteCapture: number;
    blackState?: boolean;
    whiteState?: boolean;
    koInfo: Stone;
    timeControl: TimeControl;
    rule: Rule;
    blackPlayer: User;
    whitePlayer: User;
    board: Board;

    constructor() {
        this.blackCapture = 0;
        this.whiteCapture = 0;
        this.blackState = true;
        this.whiteState = false;
        this.koInfo = new Stone(-1, -1, null);
        this.timeControl = new TimeControl();
        this.rule = new Rule();
        this.blackPlayer = new User();
        this.whitePlayer = new User();
    }
}