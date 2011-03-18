/**
 * "The" Tests
 */
(function($){

  var
    $element;

  module('The', {
    setup: function setup(){
      $element= $('#element');
    },
    teardown: function teardown(){
      $('#element').unbind('the').removeData();
    }
  });
  test( '`.the(key, value)` is used to write and `.the(key)` to read', function(){

    expect(4);

    // Store something we can retrieve using the method
    equal( $element.the('A', 123), 123);
    equal( $element.the('B', 234), 234);

    // Now we will try to retrieve them
    equal( $element.the('A'), 123);
    equal( $element.the('B'), 234);

  });
  test( '`.the(key, value, normals) can be used to attach normals map for key-based value normalization`', function(){

    expect(2);

    $element.the('A', 12.34, { A: function(value){ return Math.round(value) } });
    equal( $element.the('A'), 12, 'Normalized (rounded)');

    $element.the('B', 12.34, { A: function(value){ return Math.round(value) } });
    equal( $element.the('B'), 12.34, 'Un-normalized when none of normals matches');

  });
  test( '`.the(handler) binds handler to "the" event`', function(){

    expect(3);

    // Single non-function argument is treated as a `key`
    equal( $element.the('X'), undefined);

    // Single function argument is treated as handler
    // In that case `.the` returns back the jQuery object for chaining
    equal( typeof $element.the(function(){
      ok( true, 'Handler fired');
    }), 'object');

    // Let's try the handler
    $element.the('A', 123);

  });
  test( '"the" is a regular event and behaves as such when used with `.bind`, `.unbind` and `.trigger`', function(){

    expect(3);
    $element.bind('the', function(){
      ok( true, '`.bind("the", function)`');
    });
    // This fires "the" three times
    $element.the('A', 123);
    $element.the('A', 234);
    $element.trigger('the', ['A', 234]);
    $element.unbind('the');
    $element.the('A', 123);

  });
  test( '"the" event works well with `.one`', function(){

    expect(1);
    $element.one('the', function(){
      ok( true, '`.one("the", function)`');
    });
    // This fires "the" three times, but handler will react just once
    $element.the('A', 123);
    $element.the('A', 234);
    $element.trigger('the', ['A', 234]);

  });
  test( '"the" event works well with `.live`', function(){

    // Bind yet non-existing element using `.live`
    $('#new_element').live('the', function(){
      ok( true );
    });

    // Now, create the actual element for real and store a value
    equal( $('<div/>').appendTo('body').the('A', 123), 123);

    // Just cleanup
    $('#new_element').remove();

  });
  test( 'Like any other event, "the" event too bubbles all the way up the DOM', function(){

    expect(3);
    $(document).the(function(){ ok( true ) });
    $element.one('the', function(){ ok( true ) });
    $element.the('A', 123);

    $element.one('the', function(){ ok( true );
      // Returning false stops event propagation and thus the handler still bound to the document
      // won't be fired for the second time
      return false;
    });
    $element.the('A', 234);
    $(document).unbind('the');

  });
  test( 'Trigger "the" event when actually changing a value in the store', function(){

    expect(4);
    var
      count= 0

    $element.the(function(){
      count++
    });

    $element.the('A', undefined); // no change (undefined is default value)
    $element.the('A', 123); // 1st change
    $element.the('A', 234); // 2nd
    $element.the('A', 234);
    $element.the('B', 123); // 3rd
    $element.the('C', 345); // 4th
    $element.the('C', 345);
    $element.the('C', 456); // 5th

    // We've called `the` 7 times, but only 5 changes occoured
    equal( count, 5, 'Correct number of events triggered' );

    // Assert stored values just for sure
    equal( $element.the('A'), 234);
    equal( $element.the('B'), 123);
    equal( $element.the('C'), 456);

  });
  test( '"the" event handler receives `event`, `key` and `value` as function arguments', function(){

    $element.the(function(event, key, value){
      equal( typeof event, 'object', 'First argument `event` is always object');
      equal( event.type, 'the', '`event.type` set');
      equal( typeof key, 'string', 'Second argument `key` must be a string');
      equal( key, 'A', 'Tested value');
      equal( value, 123, 'Third argument `value` can be anything');
    });
    $element.the('A', 123);

  });

})(jQuery);