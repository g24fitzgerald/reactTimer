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

    it('should pause countdown on paused status', () => {
      var countdown = TestUtils.renderIntoDocument(<Countdown/>);

      countdown.handleSetCountdown(3);
      countdown.handleStatusChange('paused'); //triggers paused status

      setTimeout(() => {
        expect(countdown.state.count).toBe(3);
        expect(countdown.state.countdownStatus).toBe('paused');
        done(); //lets us perform asynchronous test
      }, 1001)
    });

    it('should reset count on stopped status', () => {
      var countdown = TestUtils.renderIntoDocument(<Countdown/>);

      countdown.handleSetCountdown(3);
      countdown.handleStatusChange('stopped');//resets new status to stopped and should restart countdown

      setTimeout(() => {
        expect(countdown.state.count).toBe(0);
        expect(countdown.state.countdownStatus).toBe('stopped');
        done(); //lets us perform asynchronous test
      }, 1001)
    });
  });
});
