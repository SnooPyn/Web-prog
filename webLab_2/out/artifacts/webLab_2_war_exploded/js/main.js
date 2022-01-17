var points = [];
var x = "";
var y = "";
var r = "";

window.onload = function () {
    setScreenResolution();
}

window.addEventListener('resize', function (event) {
    setScreenResolution();
});


var submit_button = document.querySelector('button[class="submit"]');
submit_button.addEventListener("click", function (e) {
    if (!validationX(x)) {
        document.querySelector('div[class="x_div"]').style.color = "red"
    }
    if (!validationY(y)) {
        document.querySelector('div[class="y_div"]').style.color = "red";
    }
    if (!validationR(r)) {
        document.querySelector('div[class="r_div"]').style.color = "red";
    }
    if (!validationX(x) || !validationY(y) || !validationR(r)) {
        return;
    }

    let request = new XMLHttpRequest();
    function reqReadyStateChange() {
        if (request.readyState == 4) {
            var status = request.status;
            if (status == 200) {
                document.getElementById("output").innerHTML = request.responseText;
            }
        }
    }

    let type = "check";
    let body = "type=" + type + "&x=" + x + "&y=" + y + "&r=" + r;
    alert(body);
    request.open("POST", "http://localhost:8080/WebLab2_server_war/controllerServlet?" + body);
    request.onreadystatechange = reqReadyStateChange;
    request.send();
    points.push({'x': 225 + 36 * x, 'y': 225 - 36 * y, 'r': r });
    printPoints();
    clearFields();
});

var clear_button = document.querySelector('button[class="clear"]');
clear_button.addEventListener("click", function (e) {
    let request = new XMLHttpRequest();
    function reqReadyStateChange() {
        if (request.readyState == 4) {
            var status = request.status;
            if (status == 200) {
                document.getElementById("output").innerHTML = request.responseText;
            }
        }
    }
    let type = "clear";
    let body = "type=" + type;
    request.open("POST", "http://localhost:8080/WebLab2_server_war/controllerServlet?" + body);
    request.onreadystatechange = reqReadyStateChange;
    request.send();
    points = [];
    printPoints();
});


var graph = document.querySelector('div[class="body_graph"]');
graph.addEventListener("click", function (e) {
    if (r == "") return;
    points.push({'x': e.layerX, 'y': e.layerY, 'r': r });
    let request = new XMLHttpRequest();
    function reqReadyStateChange() {
        if (request.readyState == 4) {
            var status = request.status;
            if (status == 200) {
                document.getElementById("output").innerHTML = request.responseText;
            }
        }
    }
    let type = "check";
    let x = (e.layerX - 225) / 36;
    let y = (225 - e.layerY) / 36;
    let body = "type=" + type + "&x=" + x + "&y=" + y + "&r=" + r;
    request.open("POST", "http://localhost:8080/WebLab2_server_war/controllerServlet?" + body);
    request.onreadystatechange = reqReadyStateChange;
    request.send();
    printPoints();
});

function printPoints() {
    let pointsHTML = "";
    for (let k = 0; k < points.length; k++) {
        pointsHTML = pointsHTML + "<circle r=\"3\" cx=\"" + points[k].x + "\" cy=\"" + points[k].y + "\" fill-opacity=\"1\" fill=\"#2c2544\" stroke=\"black\" visibility=\"visible\"></circle>"
    }
    document.querySelector('svg[class="points"]').innerHTML = pointsHTML;
}

var radio_x = document.querySelector('div[class="x_div"]');
radio_x.addEventListener('click', function (event) {
    if (event.target.matches('input[name="x"]')) {
        x = event.target.value;
        assignColorX();
    }
});

var elementY = document.querySelector('input[name="y"]');
elementY.addEventListener('keyup', function () {
    y = elementY.value;
    assignColorY();
});

var button_r = document.querySelector('div[class="r_div"]');
button_r.addEventListener('click', function (event) {
    if (event.target.matches('button[name="r"]')) {
        r = event.target.value;
        assignColorR();
        setGraph(r);
        clearBorderColorR();
        event.target.style.border = "2px solid green";
        printPoints();
    }
});

function setGraph(r) {
    let x;
    x = document.querySelector("polygon[id='1']");
    x.setAttribute("points", 225 + "," + (225 + 18 * r) + " " + 225 + "," + 225 + " " + (225 - 2 * 18 * r) + "," + 225 + " " + (225 - 2 * 18 * r) + "," + (225 + 18 * r));

    x = document.querySelector("polygon[id='2']");
    x.setAttribute("points", 225 + "," + 225 + " " + (225 + 18 * r) + "," + 225 + " " + 225 + "," + ((225 - 18 * r)));

    x = document.querySelector("path[id='3']");
    x.setAttribute("d", "M" + (225 + 2 * 18 * r) + "," + 225 + " A" + (36 * r) + "," + (36 * r) + " " + 90 + " " + 0 + "," + 1 + " " + 225 + "," + (225 + 2 * 18 * r) + " L " + 225 + "," + 225 + " Z");
}

function assignColorX() {
    if (
        x == ""
    ) {
        document.querySelector('div[class="x_div"]').style.color = "white";
        return;
    }
    if (validationX(x)) {
        document.querySelector('div[class="x_div"]').style.color = "green";
        return;
    }
    document.querySelector('div[class="x_div"]').style.color = "red";
}

function assignColorY() {
    if (
        y == ""
    ) {
        document.querySelector('div[class="y_div"]').style.color = "white";
        return;
    }
    if (validationY(y)) {
        document.querySelector('div[class="y_div"]').style.color = "green";
        return;
    }
    document.querySelector('div[class="y_div"]').style.color = "red";
}

function assignColorR() {
    if (
        r == ""
    ) {
        document.querySelector('div[class="r_div"]').style.color = "white";
        return;
    }
    if (validationR(r)) {
        document.querySelector('div[class="r_div"]').style.color = "green";
        return;
    }
    document.querySelector('div[class="r_div"]').style.color = "red";
}

function clearBorderColorR() {
    document.querySelector('button[id="r1"]').style.border = "";
    document.querySelector('button[id="r2"]').style.border = "";
    document.querySelector('button[id="r3"]').style.border = "";
    document.querySelector('button[id="r4"]').style.border = "";
    document.querySelector('button[id="r5"]').style.border = "";
}

function validationX(x) {
    if (x == "") return false;
    if (
        x == -5 ||
        x == -4 ||
        x == -3 ||
        x == -2 ||
        x == -1 ||
        x == 0 ||
        x == 1 ||
        x == 2 ||
        x == 3
    ) {
        return true;
    }
    return false;
}

function validationY(y) {
    if (y == "") return false;
    if (
        !(y < -3 || y > 5) &&
        /[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/.test(y) &&
        y == /[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/.exec(y)[0]
    ) {
        return true;
    }
    return false;
}

function validationR(r) {
    if (r == "") return false;
    if (
        r == 1 ||
        r == 2 ||
        r == 3 ||
        r == 4 ||
        r == 5
    ) {
        return true;
    }
    return false;
}

function clearFields() {
    let a = document.getElementsByName("x");
    for (let b = 0; b < a.length; b++) {
        if (a[b].type == 'radio') {
            a[b].checked = false;
        }
    }
    x = "";
    assignColorX();
    let yr = document.querySelector('input[name="y"]');
    yr.value = "";
    y = "";
    assignColorY();
}

function setScreenResolution() {
    if (window.innerWidth <= 1105) {
        document.querySelector('div[class="header"]').style.left = "0px";
    }

    let sizeIndent = (window.innerWidth - 1105) / 2;

    document.querySelector('div[class="header"]').style.left = sizeIndent + "px";
    document.querySelector('div[class="graph"]').style.left = sizeIndent + "px";
    document.querySelector('div[class="table"]').style.left = sizeIndent + 555 + "px";
    document.querySelector('div[class="values"]').style.left = sizeIndent + 555 + "px";

}