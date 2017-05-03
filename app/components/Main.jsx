var React = require('react');
var Navigation = require('Navigation');
var Clock = require('Clock');

var Main = (props) => {
  return (
    <div>
    <Navigation/>
      <div>
        <div>
          <p>Main.jsx Rendered</p>
          <Clock/>
          {props.children}
        </div>
      </div>
    </div>
  );
}

module.exports = Main;
