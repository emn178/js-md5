assert('md5 1', 'd41d8cd98f00b204e9800998ecf8427e', md5(''));
assert('md5 2', '9e107d9d372bb6826bd81d3542a419d6', md5('The quick brown fox jumps over the lazy dog'));
assert('md5 3', 'e4d909c290d0fb1ca068ffaddf22cbd0', md5('The quick brown fox jumps over the lazy dog.'));
assert('md5 4', 'a7bac2239fcdcb3a067903d8077c4a07', md5('中文'));
assert('md5 5', 'ec3edbf3b05a449fc206a0138c739c3b', md5('aécio'));
