import { Rule } from './Rule.model';
import { Stone } from './Stone.model';
import { TimeControl } from './TimeControl.model';
import { User } from './user.model';

export class Game {
    Id : number;
    Date : Date;
    BlackRank : number;
    WhiteRank : number;
    Result? : string;
    Size : number;
    Komi : number;
    Handicap: number;
    BlackCapture: number;
    WhiteCapture: number;
    BlackState?: boolean;
    WhiteState?: boolean;
    KoInfo: Stone;
    TimeControl: TimeControl;
    Rule: Rule;
    BlackPlayer: User;
    WhitePlayer: User;
}