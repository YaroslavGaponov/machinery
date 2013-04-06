
var util = require("util");
var url = require("url");

var classifier = require("../../../machinery").Classifier;
var StateMachine = require("../../../machinery").StateMachine;

var LinkGrabber = module.exports = function() {
    
    this.stateMachine = new StateMachine("start")
    
        .state("start")
            .if(classifier.isChar("<"), "search_A")
            
        .state("search_A")
            .if(classifier.isChars("aA"), "search_H")
            
        .state("search_H")
            .if(classifier.isDelimiter, "search_H")
            .if(classifier.isChars("hH"), "search_R")
    
        .state("search_R")
            .if(classifier.isChars("rR"), "search_E")

        .state("search_E")
            .if(classifier.isChars("eE"), "search_F")

        .state("search_F")
            .if(classifier.isChars("fF"), "search_Equal")
                
        .state("search_Equal")
            .if(classifier.isChars("="), "search_Quote")
            .if(classifier.isDelimiter, "search_Equal")

        .state("search_Quote")
            .if(classifier.isChars("\'"), "readLink_1")
            .if(classifier.isChars("\""), "readLink_2")
            .if(classifier.isDelimiter, "search_Quote")
        
        .state("readLink_1")
            .if(classifier.isNotChars("\'"), "readLink_1")
            .else("link_1")
                    
        .state("readLink_2")
            .if(classifier.isNotChars("\""), "readLink_2")
            .else("link_2")
            
    ;   
}

LinkGrabber.prototype.parse = function(base_url, text) {
    var acc = [];
    this.stateMachine.run(text).forEach(function(o) {        
        var u = null;
        switch (o.type) {
            case "link_1":
                u = o.value.substring(o.value.indexOf("\'") + 1);
                break;
            case "link_2":
                u = o.value.substring(o.value.indexOf("\"") + 1);
                break;            
        }
        
        if (u) {
            u = url.resolve(base_url, u);            
            if (u.indexOf("http") === 0) {
                acc.push(u);
            }
        }
    });
    return acc;
}





