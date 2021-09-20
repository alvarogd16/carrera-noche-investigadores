export class Cronometro {
    constructor() {
        this.interval;
        this.clock = 0;
        this.offset = 0;

        this.timer = document.getElementById("cronometro")

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
        this.timer.innerHTML = (this.clock / 1000).toFixed(3);
    }

    lap() {
        console.log(this.clock);
    }

    getTime() {
        return this.clock / 1000;
    }
}