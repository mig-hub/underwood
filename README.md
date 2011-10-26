"My typewriter was my machine gun and it was loaded" - Charles Bukowski

UNDERWOOD.js
============

WHAT IT IS
----------

Underwood is just another jQuery plugin that turns a textfield into a Rich Text Editor.
When the DOM is ready, just call underwood on selected textareas:

    $(function() {
	      $('textearea').underwood();
    });

This will turn all textareas into Rich Text Editors.

Underwood is definitely not the right tool for editing pages.
It is more designed for websites on which the style and structure is quite locked and you just need a textarea on steroids for a piece of text.
Well suited for a relational CMS.

OPTIONS
-------

The first option is `toolbar`, which is a string with toolbar buttons visible and ordered:

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

The second option is `css_href`. It is simply the location for the CSS inside the iFrame (editable area).
If it is null (default), some generic CSS is used instead.

You can also decide what tag is used for a `title_block` and for a `paragraph_block`.
These are respectively defaulted to `'<h3>'` and `'<p>'`.

The last option is `sanitize` and is a boolean.
This option is for when you want to avoid any problem when the text is copied from somewhere else and you want the styling to break anything.
For example on Mac, you can happen to have text with font tags and weird Apple CSS classes.
This is not always bad but it end up producing bugs on some of my tests, so I'd rather have something.
It is still a functionality in Beta.
For the moment it strips out font tags and style parameters.
Feel free to send your comments on that.

  $('textarea.simple').underwood({ sanitize: false });

By default, sanitize is set to true.

If you have a problem making some tags like bold in a particular browser,
it is probably better to set sanitize to false because it might be that some
browsers creates bold with `style` parameter.

STYLE THE EDITOR
----------------

Here are the CSS classes:

    iframe.underwood_iframe
    .underwood_toolbar
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
    .underwood_textarea_copy
  
This is supposed to be self-explanatory but have a look at the example, or drop me a line 
if you need more info.

COPYRIGHT
---------

Copyright (c) 2010-11 Mickael Riga - See MIT_LICENSE for details