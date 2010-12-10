"My typewriter was my machine gun and it was loaded" - Charles Bukowski

WHAT IT IS
----------

Underwood is just another jQuery plugin that turns a textfield into a Rich Text Editor.
When the DOM is ready, just call underwood on selected textareas:

    $(function() {
	      $('textearea').underwood();
    });

This will turn all textareas into Rich Text Editors.

OPTIONS
-------

The only option for the moment is toolbar, which is a string with toolbar buttons visible and ordered:

	  $('textarea.simple').underwood({ toolbar: 'bold italic' });
	
This will turn all textareas with class 'simple' into Rich Text Editors with only 'Bold' and 'Italic' as options.
Here is the list of available buttons:

    title
    paragraph
    bold
    italic
    link
    mailto
    unlink
    image
    source

The default value for toolbar, is all buttons except 'image'.

STYLE THE EDITOR
----------------

Here are the CSS classes:

    iframe.underwood_iframe
    .underwood_btn
	  .underwood_btn_title
	  .underwood_btn_paragraph
	  .underwood_btn_bold
	  .underwood_btn_italic
	  .underwood_btn_link
	  .underwood_btn_mailto
	  .underwood_btn_unlink
	  .underwood_btn_image
	  .underwood_btn_source
	  .underwood_btn_back
  
This is supposed to be self-explainatory but have a look at the example, or drop me a line 
if you need more info.

COPYRIGHT
---------

Copyright (c) 2010 Mickael Riga - See MIT_LICENCE for details