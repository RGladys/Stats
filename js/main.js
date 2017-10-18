let numberElement = document.getElementById('number');

(function() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            numberElement.appendChild(document.createTextNode(data[0].number))
        }
    };
    
    xmlhttp.open("GET", "server.php?asknumber=ask", true);
    xmlhttp.send();
})()