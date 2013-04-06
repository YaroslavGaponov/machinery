/*
 machinery
 copyright (c) 2013 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

var isDelimiter = module.exports.isDelimiter = function(ch) {
    return "\ \t\n".indexOf(ch) != -1
}

var isQuote = module.exports.isQuote = function(ch) {
    return "\"\'".indexOf(ch) != -1;
}

var isLowerLetter = module.exports.isLowerLetter = function(ch) {
    return ch >= 'a' && ch <= 'z';
}

var isUpperLetter = module.exports.isUpperLetter = function(ch) {
    return ch >= 'A' && ch <= 'Z';
}

var isLetter = module.exports.isLetter = function(ch) {
    return isLowerLetter(ch) || isUpperLetter(ch);
}


var isDigit = module.exports.isDigit = function(ch) {
    return ch >= '0' && ch <= '9';
}

var isLetterOrDigit = module.exports.isLetterOrDigit = function(ch) {
    return isLetter(ch) || isDigit(ch);
}

var isChar = module.exports.isChar = function(c) {
    return function(ch) { return c == ch }
}

var isChars = module.exports.isChars = function(s) {
    return function(ch) { return s.indexOf(ch) != -1 }
}


var isNotChar = module.exports.isNotChar = function(c) {
    return function(ch) { return c != ch }
}

var isNotChars = module.exports.isNotChars = function(s) {
    return function(ch) { return s.indexOf(ch) == -1 }
}


var all = module.exports.all = function() {
    return true;
}