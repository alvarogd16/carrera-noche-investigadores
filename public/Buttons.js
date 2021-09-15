export class Buttons {
    constructor(startButtons, stopButtons, chrono) {
        this.startButtons = startButtons;
        this.stopButtons = stopButtons;
        this.chrono = chrono;
    }

    initButtons() {
        // Initialize all start buttons
        for(let but of this.startButtons) {

            // When you click, it send signal to servo, start the timer and enable
            // the stop button correspondent
            but.onclick = () => {

                // TODO Signal to servo

                this.chrono.start();
                but.nextElementSibling.disabled = false;
            }
        }

        // Initialize all stop buttons
        for(let but of this.stopButtons) {

            // Stop the timer and disabled the button
            but.onclick = () => {
                this.chrono.stop();
                but.disabled = true;
            }

            // Disabled all the buttons. The correspond start button enable 
            // again the button
            but.disabled = true;
        }
    }
}