Info
=======

Machinery is state machine in pure javascript.


Example
=======

Search href in html page

```javascript
    new StateMachine("start")
    
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
        
        .run(HTML)
            .forEach(o) {
                console.log(o);
            }
            
    ;   

```