var React = require('react');

var Controls = React.createClass({
  propTypes: { //need prop of paused or started: want to render pause when started and start when paused
    countdownStatus: React.PropTypes.string.isRequired, //controls cant do anything without this prop, so its required
    onStatusChange: React.PropTypes.func.isRequired
  },
  onStatusChange: function(newStatus) { //currier pattern-function that returns new function,
    return () => {
       this.props.onStatusChange(newStatus);
     }
   },
   render: function () {
     var {countdownStatus} = this.props;
     var renderStartStopButton = () => {
       if (countdownStatus === 'started') {
         return <button className="button secondary" onClick={this.onStatusChange('paused')}>Pause</button>
       } else if (countdownStatus === 'paused') {
         return <button className="button primary" onClick={this.onStatusChange('started')}>Start</button>
       }
     };

     return (
       <div className="controls">
         {renderStartStopButton()}
         <button className="button alert hollow" onClick={this.onStatusChange('stopped')}>Clear</button>
       </div>
     )
   }
 });

 module.exports = Controls;
