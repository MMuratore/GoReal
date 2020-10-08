
export class Statistic {
    userId : number;
    gameNumber : number;
    trainingNumber : number;
    victoryRatio : number;
    playTime : number;

    constructor() {
        this.gameNumber = 0;
        this.trainingNumber = 0;
        this.victoryRatio = 0;
        this.playTime = 0;
    }
}