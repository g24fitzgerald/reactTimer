var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var Countdown = require('Countdown');

describe('Countdown', () => {
  it ('should exist', () => {
    expect(Countdown).toExist();
  });

  describe('handleSetCountdown', () => {
    it('should set state to started and count down', (done) => { //tells mocha to wait for them to be done
      var countdown = TestUtils.renderIntoDocument(<Countdown/>);
      countdown.handleSetCountdown(10);

      expect(countdown.state.count).toBe(10);
      expect(countdown.state.countdownStatus).toBe('started');

      //test that count is updated with aynchronous test. mocha doesnt support this without using a done arg
      setTimeout(() => {
        expect(countdown.state.count).toBe(9);
        done(); //lets us perform asynchronous test
      }, 1001)
    });

    it('should never set count less than zero', (done) => { //tells mocha to wait for them to be done
      var countdown = TestUtils.renderIntoDocument(<Countdown/>);
      countdown.handleSetCountdown(1);

      //test that count is updated with aynchronous test. mocha doesnt support this without using a done arg
      setTimeout(() => {
        expect(countdown.state.count).toBe(0);
        done(); //lets us perform asynchronous test
      }, 3001)
    });
  });
});
