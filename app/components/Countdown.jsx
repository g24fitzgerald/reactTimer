var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

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
         case 'stopped':
           this.setState({count: 0});
         case 'paused':
           clearInterval(this.timer)
           this.timer = undefined;
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
  handleStatusChange: function(newStatus) {
    this.setState({countdownStatus: newStatus});
  },
  render: function () {
    var {count, countdownStatus} = this.state;
    var renderControlArea = () => {
      if (countdownStatus !== 'stopped') {
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>;
      } else {
        return <CountdownForm onSetCountdown={this.handleSetCountdown}/>;
      }
    };
    return (
      <div>
        <Clock totalSeconds={count}/>
        {renderControlArea()}
      </div>
    )
  }
});
module.exports = Countdown;
