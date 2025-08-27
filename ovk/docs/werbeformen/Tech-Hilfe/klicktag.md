# Clicktag

Die Schreibweise für Klicktags lautet: clicktag Die Schreibweise für Multi-Klicktags lautet: clicktag, clicktag2,
clicktag3 ``` <n> ``` Die Folgenden Codezeilen sind in das HTML5-Werbemittel zur Übergabe der Klicktags zu integrieren - die
Funktion liefert alle GET Parameter zurück, die an die Datei übergeben werden: 

```js
<script>  var getUriParams = function(){
    var query_string = {}  
    var query = window.location.search.substring(1);  
    var parmsArray = query.split('&');  
    if(parmsArray.length <= 0) return query_string;  
    for(var i = 0; i < parmsArray.length; i++) {  
        var pair = parmsArray[i].split('=');  var val = decodeURIComponent(pair[1]);  
        if (val != '' && pair[0] != '') query_string[pair[0]] = val;  
    }  
    return query_string;  
}();  
</script> 
```
