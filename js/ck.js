var tryCount = 0;
var minimalUserResponseInMiliseconds = 200;
function check() { 
    console.clear();
    before = new Date().getTime();
    debugger;
    after = new Date().getTime();
    if (after - before > minimalUserResponseInMiliseconds) { 
        document.write(" Dont open Developer Tools. ");
        self.location.replace(
            window.location.protocol + window.location.href.substring(
                window.location.protocol.length
            )
        );  
    } else { 
        before = null;
        after = null;
        delete before;
        delete after;
    }
    setTimeout(check, 100);
}
check();
window.onload = function () { 
    document.addEventListener("contextmenu", function (e) { 
        e.preventDefault();
    }, false);
    document.addEventListener("keydown", function (e) {
        // Ctrl+Shift+I 
        if (e.ctrlKey && e.shiftKey && e.keyCode == 73) { 
            disabledEvent(e);
        }
        // Ctrl+Shift+J 
        if (e.ctrlKey && e.shiftKey && e.keyCode == 74) { 
            disabledEvent(e);
        } 
        // Ctrl+S 
        if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) { 
            disabledEvent(e);
        }
        // Ctrl + U 
        if (e.ctrlKey && e.keyCode == 85) { 
            disabledEvent(e);
        }
        // F12
        if (event.keyCode == 123) { 
            disabledEvent(e);
        } 
    }, false);
    function disabledEvent(e) { 
        if (e.stopPropagation) { 
            e.stopPropagation();
        } else if (window.event) { 
            window.event.cancelBubble = true;
        } 
        e.preventDefault();
        return false;
    }
};