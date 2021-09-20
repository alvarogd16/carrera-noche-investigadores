export class Buttons {
    constructor(chrono, socket, tableControl) {
        this.startButtons = document.getElementsByClassName("start");
        this.stopButtons = document.getElementsByClassName("stop");
        this.reset = document.getElementById("reset");

        this.chrono = chrono;
        this.socket = socket;
        this.tableControl = tableControl;
    }


    initButtons() {
        // Initialize all start buttons
        for(let but of this.startButtons) {

            // When you click, it send signal to servo, start the timer and enable
            // the stop button correspondent
            but.onclick = () => {

                this.socket.emit("start");

                this.chrono.start();
                but.nextElementSibling.disabled = false;

                // Coge el numero de la id del elemento table y la pone como tabla activa
                var numberTable = but.nextElementSibling.nextElementSibling.id[5];
                this.tableControl.setActiveTable(numberTable);
                console.log("Tabla activa: " + numberTable);
            }
        }

        // Initialize all stop buttons
        for(let but of this.stopButtons) {

            // Stop the timer and disabled the button
            but.onclick = () => {
                // El servo vuelve a la posición inicial
			    this.socket.emit("reset");
                
                this.chrono.stop();
                but.disabled = true;

                this.tableControl.setActiveTable("0");
                console.log("Tabla desactivada");

                if(but.parentElement.id === "ronda3")
                    this.tableControl.selectForFinal();
                else if(but.parentElement.id === "final")
                    this.tableControl.fillPodium();
            }

            // Disabled all the buttons. The correspond start button enable 
            // again the button
            but.disabled = true;
        }

        this.reset.onclick = () => {
            // El servo vuelve a la posición inicial
			this.socket.emit("reset");

            this.chrono.reset();

            this.tableControl.setActiveTable("0");
            console.log("Tabla desactivada");

            this.tableControl.resetTables();
        }
    }
}
