import { Rule } from './Rule.model';
import { Stone } from './Stone.model';
import { TimeControl } from './TimeControl.model';
import { User } from './user.model';

export class Game {
    id : number;
    date : Date;
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
}