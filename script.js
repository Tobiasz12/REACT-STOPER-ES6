class Stopwatch extends React.Component {
    constructor() {
        super();
        this.reset();
        this.state = {
            running: false,
            display: '.stopwatch',
            laps: [],
            currentTime: this.format(this.times)
        }
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    print() {
        this.setState({currentTime: this.format(this.times)});
    }

    format(times) {
        return `${pad0(this.times.minutes)}:${pad0(this.times.seconds)}:${pad0(Math.floor(this.times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.state.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.setState({running: false})
        clearInterval(this.watch);
    }

    LabClick() {
        this.setState({
            laps: this.state.laps.concat([this.state.currentTime])
        })
    }

    render() {
        return (
            <div className="stopwatch">
                <div className="controls">
                    <a className="button" onClick={this.start.bind(this)}>Start</a>
                    <a className="button" onClick={this.stop.bind(this)}>Stop</a>
                    <a className="button" onClick={this.LabClick.bind(this)}>Lap</a>
                </div>
                {this.state.currentTime}
                <ul className="stopwatch-laps">
                    {this.state.laps.map((lap) =>
                        <li className="stopwatch-lap">{print(lap)}</li>)
                    }
                </ul>
            </div>
        )
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(
    <Stopwatch />,
    document.getElementById('app')
);
