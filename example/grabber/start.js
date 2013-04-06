#!/usr/bin/env node

var http = require("http");
var util = require("util");
var ee = require("events").EventEmitter;

var Grabber = require("./grabber");

var Seeker = function() {
    var self = this;
    
    ee.call(this);    
    this.grabber = new Grabber();
    this.urls = {};

    this.on("start", function(url) {
        console.log(url);
        (url.indexOf("https") === 0 ?
            require("https") :
            require("http")
        ).get(url, function(res) {
            var html = "";
            res.on("data", function(chunk) {
                html += chunk;
            });
            res.on("end", function() {
                self.grabber.parse(url, html).forEach(function(u) {
                    self.urls[url] = html;
                    if (!self.urls[u]) {
                        self.urls[u] = null;
                        self.emit("start", u);
                    }
                });
            });    
        }).on("error", function(err){ console.log(util.format("error: [%s] - %s", url, err)); });
    });
}

util.inherits(Seeker, ee);


Seeker.prototype.start = function(url) {
    this.emit("start", url);
}


var url = process.argv[3] || "http://nodejs.org/";
console.log("Starting from " + url);
var seeker = new Seeker();
seeker.start(url)



