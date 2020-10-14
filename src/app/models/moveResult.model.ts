import { Stone } from './Stone.model';

export class MoveResult {
    stones : Stone[];
    blackCapture: number;
    whiteCapture: number;
    koInfo: Stone;
    blackState: boolean;
    whiteState: boolean;
    result: string;
}