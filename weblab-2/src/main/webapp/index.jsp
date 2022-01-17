<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:useBean id="entries" class="com.example.weblab2.beans.EntriesBean" scope="session" />

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="img/icon.ico">
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Nunito&family=Roboto:wght@300&display=swap" rel="stylesheet">
    <title>Web-Lab #2</title>

</head>
<body>
<table id='main-table' >
    <tr>
        <td id='header' colspan="2">
            <span class='left-aligned'>Bellazreg Anis</span>
            <span class='right-aligned'>#26281<br>Group P3231</span>
        </td>
    </tr>
    <tr>
        <td 	id='result-table-square' rowspan="2">
            <div class = 'result-header'>
                <h2 class = 'result-header-title'>Table</h2>
            </div>
            <div class = 'result-content'>
                <table id = 'result-content-table'>
                    <tr id='table-header'>
                        <th class='coords'>X</th>
                        <th class='coords'>Y</th>
                        <th class='coords'>R</th>
                        <th>Current time</th>
                        <th>Execution time</th>
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

                </table>
            </div>
        </td>
        <td id = 'graph-table-square'>
            <div class = 'graph-header'>
                <h2 class = 'graph-header-title'>Graph</h2>
            </div>
            <div class = 'image-container'>

                <object class="graph" type="image/svg+xml" data="img/graph.svg">
                    <img src="img/graph.png" width="220" height="220" alt="Graph">
                </object>

                <canvas id = 'canvas' width="220" height="220">Interactive area of the graph</canvas>
            </div>
        </td>
    </tr>
    <tr>
        <td id = 'values-table-square'>
            <div class = values-header>
                <h2 class = 'values-header-title'>Values</h2>
            </div>
            <div class = 'values-container'>
                <form id ='input-form' action = "" method='POST'>
                    <table id = 'input-table'>
                        <tr>
                            <td class='input-label'>
                                <h3>X: </h3>
                            </td>
                            <td class='input-value'>

                                <div class='radio-block'>
                                    <label class='xbox-label left-moved' for='x-radio1'>-5</label>
                                    <input class='x-radio' id='x-radio1' type='radio' name='xvalue' value='-5'>
                                </div>
                                <div class='radio-block'>
                                    <label class='xbox-label' for='x-radio2'>-4</label>
                                    <input class='x-radio' id='x-radio2' type='radio' name='xvalue' value='-4'>
                                </div>
                                <div class='radio-block'>
                                    <label class='xbox-label left-moved' for='x-radio3'>-3</label>
                                    <input class='x-radio' id='x-radio3' type='radio' name='xvalue' value='-3'>
                                </div>
                                <div class='radio-block'>
                                    <label class='xbox-label' for='x-radio4'>-2</label>
                                    <input class='x-radio' id='x-radio4' type='radio' name='xvalue' value='-2'>
                                </div>
                                <div class='radio-block'>
                                    <label class='xbox-label left-moved' for='x-radio5'>-1</label>
                                    <input class='x-radio' id='x-radio5' type='radio' name='xvalue' value='-1'>
                                </div>
                                <div class='radio-block'>
                                    <label class='xbox-label left-moved' for='x-radio6'>0</label>
                                    <input class='x-radio' id='x-radio6' type='radio' name='xvalue' value='0'>
                                </div>
                                <div class='radio-block'>
                                    <label class='xbox-label left-moved' for='x-radio7'>1</label>
                                    <input class='x-radio' id='x-radio7' type='radio' name='xvalue' value='1'>
                                </div>
                                <div class='radio-block'>
                                    <label class='xbox-label left-moved' for='x-radio8'>2</label>
                                    <input class='x-radio' id='x-radio8' type='radio' name='xvalue' value='2'>
                                </div>
                                <div class='radio-block'>
                                    <label class='xbox-label left-moved' for='x-radio9'>3</label>
                                    <input class='x-radio' id='x-radio9' type='radio' name='xvalue' value='3'>
                                </div>

                                <input class="hidden_r" type="hidden" name="rvalue" value="">
                                <input class="hidden_timezone" type="hidden" name="timezone" value="">
                                <input class="hidden_clear" type="hidden" name="clear" value="">
                            </td>
                        </tr>
                        <tr>
                            <td class = 'input-label'>
                                <h3>Y: </h3>
                            </td>
                            <td class='input-value'>
                                <input id='y-textinput' type='text' name='yvalue' autocomplete='off' placeholder='From -3 to 5...' maxlength='12'>
                            </td>
                        </tr>
                        <tr>
                            <td class = 'input-label' id = 'r-input-label'>
                                <h3>R: </h3>
                            </td>
                            <td class='input-value'>
                                <div class = 'r-buttons'>
                                    <input id = 'r-button-1' type='button' name='rvalue1' value='1'>
                                    <input id = 'r-button-2' type='button' name='rvalue2' value='2'>
                                    <input id = 'r-button-3' type='button' name='rvalue3' value='3'>
                                    <input id = 'r-button-4' type='button' name='rvalue4' value='4'>
                                    <input id = 'r-button-5' type='button' name='rvalue5' value='5'>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan='2'>
                                <div class='sub-res-buttons'>
                                    <input id='submit-button' type="submit" value="Submit">
                                    <input id='reset-button' type="submit" value="Reset">
                                </div>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </td>
    </tr>
</table>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src = 'js/main.js'></script>
</body>
</html>