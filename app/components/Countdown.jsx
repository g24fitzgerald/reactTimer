var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');

var Countdown = React.createClass({
  getInitialState: function() {
    return {
      count: 0,
      countdownStatus: 'stopped' //maintains current status of timer
    };
  },
  componentDidUpdate: function (prevProps, prevState) { //lifecycle method componentDidUpdate is called everytime to counter counts down (each state change)
    if (this.state.countdownStatus !== prevState.countdownStatus) { //check if status = started
      switch (this.state.countdownStatus) {
        case 'started':
          this.startTimer();
          break;
      }
    }
  },
  startTimer: function () {
    //setInterval triggers function after certain amount of time
    this.timer = setInterval(() => {
      var newCount = this.state.count -1;
      this.setState({
        count: newCount >= 0 ? newCount : 0 //ternary operator so we dont get negative #. stop at 0
      });
    }, 1000);
  },
  handleSetCountdown: function (seconds) {
    this.setState({
      count: seconds,
      countdownStatus: 'started' //set new countdown, which enables countdown process
    });
  },
  render: function () {
    var {count} = this.state;
    return (
      <div>
        <Clock totalSeconds={count}/>
        <CountdownForm onSetCountdown={this.handleSetCountdown}/>
      </div>
    )
  }
});
module.exports = Countdown;
