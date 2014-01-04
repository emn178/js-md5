# js-md5
This is a simple MD5 hash function for JavaScript supports UTF-8 encoding.

## Usage
    md5('Message to hash');

## Example
Code

    md5('');
    md5('The quick brown fox jumps over the lazy dog');
    md5('The quick brown fox jumps over the lazy dog.');
Output

    d41d8cd98f00b204e9800998ecf8427e
    9e107d9d372bb6826bd81d3542a419d6
    e4d909c290d0fb1ca068ffaddf22cbd0

It also support UTF-8 encoding:

Code

    md5('中文');
Output

    a7bac2239fcdcb3a067903d8077c4a07

## Run Tests
You can open `tests/index.html` in browser or use node.js to run `node tests/node-test.js` for test.

## Extensions
### jQuery
If you prefer jQuery style, you can add following code to add a jQuery extension.

Code

    jQuery.md5 = md5
And then you could use like this:

    $.md5('message');
### Prototype
If you prefer prototype style, you can add following code to add a prototype extension.

Code

    String.prototype.md5 = function() {
      return md5(this);
    };
And then you could use like this:

    'message'.md5();
