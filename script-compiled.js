"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch() {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

        _this.reset();
        _this.state = {
            running: false,
            display: '.stopwatch',
            laps: [],
            currentTime: _this.format(_this.times)
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: "reset",
        value: function reset() {
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
        }
    }, {
        key: "print",
        value: function print() {
            this.setState({ currentTime: this.format(this.times) });
        }
    }, {
        key: "format",
        value: function format(times) {
            return pad0(this.times.minutes) + ":" + pad0(this.times.seconds) + ":" + pad0(Math.floor(this.times.miliseconds));
        }
    }, {
        key: "start",
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.state.running = true;
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: "step",
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
            this.print();
        }
    }, {
        key: "calculate",
        value: function calculate() {
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
    }, {
        key: "stop",
        value: function stop() {
            this.setState({ running: false });
            clearInterval(this.watch);
        }
    }, {
        key: "LabClick",
        value: function LabClick() {
            this.setState({
                laps: this.state.laps.concat([this.state.currentTime])
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                { className: "stopwatch" },
                React.createElement(
                    "div",
                    { className: "controls" },
                    React.createElement(
                        "a",
                        { className: "button", onClick: this.start.bind(this) },
                        "Start"
                    ),
                    React.createElement(
                        "a",
                        { className: "button", onClick: this.stop.bind(this) },
                        "Stop"
                    ),
                    React.createElement(
                        "a",
                        { className: "button", onClick: this.LabClick.bind(this) },
                        "Lap"
                    )
                ),
                this.state.currentTime,
                React.createElement(
                    "ul",
                    { className: "stopwatch-laps" },
                    this.state.laps.map(function (lap) {
                        return React.createElement(
                            "li",
                            { className: "stopwatch-lap" },
                            _this3.format(lap)
                        );
                    })
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
