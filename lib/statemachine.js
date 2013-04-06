/*
 machinery
 copyright (c) 2013 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

var StateMachine = module.exports = function(startState, sizeAlphabet) {
    this.startState = startState;
    this.SIZE_ALPHABET = sizeAlphabet || 1<<16;    
    this.table = {};
}

StateMachine.prototype.state = function(name) {
    if (!this.startState) {
        this.startState = name;
    }
    this._state = name;
    this.table[name] = new Array(this.SIZE_ALPHABET);
    return this;
}

StateMachine.prototype.if = function(condition, nextState) {
    for(var i=0; i<this.SIZE_ALPHABET; i++) {
        if (condition(String.fromCharCode(i))) {
            this.table[this._state][i] = nextState;
        }
    }
    return this;
}

StateMachine.prototype.else = function(nextState) {
    for(var i=0; i<this.SIZE_ALPHABET; i++) {
        if (!this.table[this._state][i]) {
            this.table[this._state][i] = nextState;
        }
    }
    return this;
}

StateMachine.prototype.run = function(text) {
    var accumulator = [];
    
    var currentState = this.startState;
    
    var acc = "";
    var currPos = predPos = 0;
    
    while (currPos < text.length) {

        if (!this.table[currentState]) {
            accumulator.push( { type: currentState, value: acc.substring(0, acc.length - 1), start: predPos, stop: currPos } );
            
            currentState = this.startState;
            acc = "";
            predPos = --currPos;
            
        } else {
            
            currentState = this.table[currentState][text.charCodeAt(currPos)];
            
            if (currentState) {                
                acc += text[currPos++];
            } else {
                currentState = this.startState;
                acc = "";
                currPos = ++predPos;
            }
        }
    }
    
    return accumulator;
}

