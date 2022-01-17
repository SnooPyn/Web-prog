<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:useBean id="entries" class="beans.EntriesBean" scope="session" />

<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>WebLab2</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="header">
    <div class="name">Bellazreg Anis</div>
    <div class="data">#26281<br>Group P3231</div>
</div>

<div class="table">
    <header class="name__table">Table</header>
    <div class="dataTable">
        <div class="scroll-table">
            <table>
                <thead>
                <tr>

                    <th width="20px">X</th>
                    <th width="20px">Y</th>
                    <th width="20px">R</th>
                    <th>ExecuteTime</th>
                    <th>CurrentTime</th>
                    <th>Result</th>
                </tr>
                <c:forEach var="entry" items="${entries.entries}">
                    <tr>
                        <td>${entry.xValue}</td>
                        <td>${entry.yValue}</td>
                        <td>${entry.rValue}</td>
                        <td>${entry.currentTime}</td>
                        <td>${entry.executionTime}</td>
                        <td>${entry.hitResult}</td>
                    </tr>
                </c:forEach>
                </thead>
            </table>
            <div class="scroll-table-body">
                <table>
                    <tbody id="output">

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<div class="graph">
    <header class="name__graph">Graph</header>
    <div class="body_graph">
        <svg class="zone_coordinates" width="450" height="450" xmlns="http://www.w3.org/2000/svg">
            <!-- Оси координат -->
            <line x1="0" x2="450" y1="225" y2="225" stroke="black"></line>
            <line x1="225" x2="225" y1="0" y2="450" stroke="black"></line>
            <!-- Стрелки к осям -->
            <polygon points="225,0 220,15 230,15" stroke="black"></polygon>
            <polygon points="450,225 435,220 435,230" stroke="black"></polygon>
            <!-- Подписи к осям -->
            <text x="435" y="215">X</text>
            <text x="230" y="15">Y</text>
            <!-- Метки для значений R на оси X -->
            <line x1="45" x2="45" y1="220" y2="230" stroke="black"></line>
            <line x1="135" x2="135" y1="220" y2="230" stroke="black"></line>
            <line x1="315" x2="315" y1="220" y2="230" stroke="black"></line>
            <line x1="405" x2="405" y1="220" y2="230" stroke="black"></line>
            <!-- Метки для значений R на оси Y -->
            <line x1="220" x2="230" y1="45" y2="45" stroke="black"></line>
            <line x1="220" x2="230" y1="135" y2="135" stroke="black"></line>
            <line x1="220" x2="230" y1="315" y2="315" stroke="black"></line>
            <line x1="220" x2="230" y1="405" y2="405" stroke="black"></line>
            <!-- Значения R на оси X -->
            <text x="35" y="245">-5</text>
            <text x="120" y="245">-2.5</text>
            <text x="305" y="245">2.5</text>
            <text x="400" y="245">5</text>
            <!-- Значения R на оси Y -->
            <text x="210" y="51">5</text>
            <text x="195" y="140">2.5</text>
            <text x="190" y="320">-2.5</text>
            <text x="205" y="410">-5</text>
            <!-- Прямоугольник -->
            <polygon id="1" stroke="#5a5c68" fill="#5a5c68" fill-opacity="0.4" points=""></polygon>
            <!-- Треугольник -->
            <polygon id="2" stroke="#5a5c68" fill="#5a5c68" fill-opacity="0.4" points=""></polygon>
            <!-- Четверть эллипса -->
            <path id="3" stroke="#5a5c68" fill="#5a5c68" fill-opacity="0.4" d=""></path>

            <svg class="points">

            </svg>
        </svg>
    </div>
</div>

<div class="values">
    <header class="name__values">Values</header>
    <div class="x_div">
        X:
        <input type="radio" name="x" value="-5">-5
        <input type="radio" name="x" value="-4">-4
        <input type="radio" name="x" value="-3">-3
        <input type="radio" name="x" value="-2">-2
        <input type="radio" name="x" value="-1">-1
        <input type="radio" name="x" value="0">0
        <input type="radio" name="x" value="1">1
        <input type="radio" name="x" value="2">2
        <input type="radio" name="x" value="3">3
    </div>

    <div class="y_div">
        Y: <input type="text" name="y" placeholder="-3 ... 5">
    </div>

    <div class="r_div">
        R:
        <button id="r1" name="r" value="1">1</button>
        <button id="r2" name="r" value="2">2</button>
        <button id="r3" name="r" value="3">3</button>
        <button id="r4" name="r" value="4">4</button>
        <button id="r5" name="r" value="5">5</button>
    </div>

    <div class="button">
        <button type="button" class="submit">submit</button>
        <button type="button" class="clear">rest</button>
    </div>
</div>
</body>
<script src="js/main.js"></script>
</html>