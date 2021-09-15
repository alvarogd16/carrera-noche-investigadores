export class Cronometro {
    constructor(elem) {
        this.interval;
        this.clock = 0;
        this.offset = 0;

        this.timer = document.createElement("h1");
        this.timer.id = "crono";
        elem.appendChild(this.timer);

        this.reset();
    }

    reset() {
        this.stop();
        this.clock = 0;
        this.render();
    }

    start() {
        if(!this.interval) {
            this.offset = Date.now();
            this.interval = setInterval(() => this.update(), 1);
        }
    }

    stop() {
        if(this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    update() {
        this.clock = Date.now() - this.offset;
        this.render();
    }

    render() {
        this.timer.innerHTML = this.clock / 1000;
    }

    lap() {
        console.log(this.clock);
    }

    userLap() {
        return this.clock / 1000;
    }
}