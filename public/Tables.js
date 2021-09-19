export class Tables {
    constructor() {
        // HTMLelement to array. Its easy to manipulate
        this.tables = [...document.getElementsByClassName("table")];
    }

    resetTimes() {
        // TODO
        for(let table of this.tables) {
            let rowsArray = [...table.rows];
            /*
            for(let i = 1; i < rowsArray.length; i++) {
                console.log(rowsArray[i]);
            }
            console.log("-------")*/
        }
    }
}