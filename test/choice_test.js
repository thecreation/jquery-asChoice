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

    module('jQuery#awesome', {
        // This will run before each test in this module.
        setup: function() {
            this.elems = $('#qunit-fixture').children();
        }
    });

    test('is chainable', function() {
        expect(1);
        // Not a bad test to run on collection methods.
        strictEqual(this.elems.awesome(), this.elems, 'should be chainable');
    });

    test('is awesome', function() {
        expect(1);
        strictEqual(this.elems.awesome().text(), 'awesome0awesome1awesome2', 'should be awesome');
    });

    module('jQuery.awesome');

    test('is awesome', function() {
        expect(2);
        strictEqual($.awesome(), 'awesome.', 'should be awesome');
        strictEqual($.awesome({
            punctuation: '!'
        }), 'awesome!', 'should be thoroughly awesome');
    });

    module(':awesome selector', {
        // This will run before each test in this module.
        setup: function() {
            this.elems = $('#qunit-fixture').children();
        }
    });

    test('is awesome', function() {
        expect(1);
        // Use deepEqual & .get() when comparing jQuery objects.
        deepEqual(this.elems.filter(':awesome').get(), this.elems.last().get(), 'knows awesome when it sees it');
    });


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
