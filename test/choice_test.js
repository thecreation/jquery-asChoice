(function($) {
    /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

    var template = '<select class="select" multiple="multiple">
                        <option value ="default" selected="selected">default</option>
                        <option value ="on">on</option>
                        <option value="off">off</option>
                    </select>';
    module('choice method', function() {
        setup: function() {
            this.$elem = $(template).choice();
            this.instance = this.$elem.data('choice');
            this.get = function() {
                return this.$elem.choice('val');
            };
        }
    });
    test('val method', function() {
        equal(this.get(),[],'it should be blank array when unselect any value');

        this.$elem.choice(['default','on']);
        deepEqual(this.get(),['default','on'], 'set array value success');
    });
}(jQuery));
