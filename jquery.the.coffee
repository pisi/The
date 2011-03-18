# "The" Event
# ===========
# DOM data change announcement event for [jQuery](http://jquery.com/)

(($) ->

  # Usage of __`.the`__ is identical to jQuery's own `.data` function
  # - it stores/retrieves data key values from data set stored on DOM node.
  # On top of it has two unique feature add-ons described below.

  # Value Change Event
  # ------------------
  # Each verified value change is announced with __`"the"`__ event.
  # Along with the standard event object, the callback receives key and value.

  # Normalization of Values
  # -----------------------
  # Sometimes you want to make sure a to-be-stored value is "legal"
  # by checking the value against a normalization method.
  # An optional third parameter can be supplied when setting a value.
  # The parameter will be hash of normalization functions per key (if any).
  # Normalization function receives input value and must return back the normalized one.
  # Any value first undergoes normalization and is stored after then (if changed).

  # `.the( callback )`
  # ------------------
  # Binds a `callback` function to "the" event.
  # Equivalent of `.bind("the", callback)`.
  # `"the"` event is triggered every time a data value changes.
  # Its `callback` receives `key` and `value` as additional parameters.
  #
  # Returns *jQuery*.
  $.fn.the or $.fn.the= (key, value, normals, special)->

    return $(this).bind('the', key) if typeof key == 'function'

    # `.the( key )`
    # -------------
    # Retrieves the key from DOM node data store.
    # Covenience method, equivalent of `.data(key)`.
    #
    # Returns *value*.
    stored= $(this).data(key);

    # `.the( key, value, [ normals ] )`
    # ---------------------------------
    # Stores the key value into DOM node data store.
    #
    # Returns *value*.
    if arguments.length > 1
      try value= normals[key] value
      if value != stored
        $(this).data(key, value).trigger('the', [key, value, special]);
        return value
    stored

) jQuery

# ---
# [github.com/pisi/The](https://github.com/pisi/The)
# ---
# **&copy; 2011 [Petr Vostrel](http://petr.vostrel.cz/)**
#
#     @license "The" Event
#     Copyright (c) 2011 Petr Vostrel (http://petr.vostrel.cz/)
#     Dual licensed under the MIT (MIT-LICENSE.txt)
#     and GPL (GPL-LICENSE.txt) licenses.
#
#     Version: 0.1
#     Updated: 2011-03-17
