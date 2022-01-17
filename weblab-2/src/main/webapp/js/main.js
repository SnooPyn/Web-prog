var points = [];
$(function (){

    const X_VALUES = [-5,-4,-3,-2,-1,0,1,2,3];
    const Y_MIN = -3;
    const Y_MAX = 5;


    let numValueX = undefined
    let numValueY= undefined
    let numValueR = undefined
    let canvas = $('#canvas');



    function isNumber(s){
        if (s === 0) return true;
        return (!isNaN(parseFloat(s)) && s);
    }

    function checkX(){
        if ($('.x-radio').is(':checked')){
            $('.xbox-label').removeClass('radio-error')
            return true;
        } else {
            $('.xbox-label').addClass('radio-error')
            return false;
        }
    }

    function checkY(){
        let value = $('#y-textinput').val();
        let fieldValueY = value.trim();
        fieldValueY = value.replace(',', '.');
        numValueY = parseFloat(fieldValueY)
        if (numValueY === +fieldValueY && isNumber(numValueY)){
            if (numValueY>Y_MIN && numValueY<Y_MAX){
                $('#y-textinput').removeClass('text-error')
                return true;
            } else{
                $('#y-textinput').addClass('text-error')
                return false;
            }
        } else{
            $('#y-textinput').addClass('text-error')
            return false;
        }
    }

    function checkR(){
        if (numValueR === undefined){
            $('.r-buttons input').addClass('button-error')
            $('.r-buttons input').removeClass('button-clicked')
            return false;
        } else {
            $('.r-buttons input').removeClass('button-error')
            return true;
        }
    }

    $('.r-buttons input').click(function (){
        numValueR = $(this).val();
        $('.r-buttons input').removeClass('button-clicked')
        $(this).addClass('button-clicked')
        drawFromForm();
    });

    $('.x-radio').click(function (){
        numValueX = $(this).val();
    });



    $('.r-buttons input').on('click', function(event){
        numValueR = $(this).val();


        let svgGraph = document.querySelector('.graph').getSVGDocument();
        svgGraph.querySelector('.coordinate-text_minus-Rx').textContent = (-numValueR).toString();
        svgGraph.querySelector('.coordinate-text_minus-Ry').textContent = (-numValueR).toString();
        svgGraph.querySelector('.coordinate-text_minus-half-Rx').textContent = (-numValueR/2).toString();
        svgGraph.querySelector('.coordinate-text_minus-half-Ry').textContent = (-numValueR/2).toString();
        svgGraph.querySelector('.coordinate-text_plus-Rx').textContent = (numValueR).toString();
        svgGraph.querySelector('.coordinate-text_plus-Ry').textContent = (numValueR).toString();
        svgGraph.querySelector('.coordinate-text_plus-half-Rx').textContent = (numValueR/2).toString();
        svgGraph.querySelector('.coordinate-text_plus-half-Ry').textContent = (numValueR/2).toString();

        drawFromForm();
    });



    canvas.on('click',function (event){
        if (!checkR()) return;

        points.push({'x': event.layerX, 'y': event.layerY, 'r': numValueR });


        let svgGraph = document.querySelector('.graph').getSVGDocument();

        let halfCanvas = $('#canvas').attr("width")/2;

        let doubleDivisionRange = svgGraph.querySelector('#x-division3').getAttribute("x1")-
            svgGraph.querySelector('#x-division2').getAttribute("x1");

        numValueY = (-event.offsetY + halfCanvas)/doubleDivisionRange * numValueR;
        if (numValueY<Y_MIN) numValueY = Y_MIN + 0.00000000001;
        if (numValueY>Y_MAX) numValueY = Y_MAX - 0.00000000001;

        let xCanvasValue = (event.offsetX - halfCanvas)/doubleDivisionRange * numValueR;
        let min = Infinity;


        for (let i = 0; i < X_VALUES.length; i++){
            if (Math.abs(xCanvasValue-X_VALUES[i])< min){
                min = Math.abs(xCanvasValue-X_VALUES[i]);
                numValueX = X_VALUES[i];
            }
        }

        printPoints();


        $("#y-textinput").removeClass('text-error');
        $('.r-buttons input').removeClass('button-error');



        $("#y-textinput").val(numValueY.toString().substring(0,10));
        switch (numValueX) {
            case -5:
                $('#x-radio1').prop('checked',true);
                break
            case -4:
                $('#x-radio2').prop('checked',true);
                break;
            case -3:
                $('#x-radio3').prop('checked',true);
                break;
            case -2:
                $('#x-radio4').prop('checked',true);
                break;
            case -1:
                $('#x-radio5').prop('checked',true);
                break;
            case 0:
                $('#x-radio6').prop('checked',true);
                break;
            case 1:
                $('#x-radio7').prop('checked',true);
                break;
            case 2:
                $('#x-radio8').prop('checked',true);
                break;
            case 3:
                $('#x-radio9').prop('checked',true);
                break;
        }
    });

    function drawFromForm(){


        let svgGraph = document.querySelector('.graph').getSVGDocument();

        let halfCanvas = $('#canvas').attr("width")/2;

        let doubleDivisionRange = svgGraph.querySelector('#x-division3').getAttribute("x1")-
            svgGraph.querySelector('#x-division2').getAttribute("x1");

        if (checkX() & checkY() & checkR()){
            drawPoint(
                numValueX / numValueR * doubleDivisionRange + halfCanvas,
                -(numValueY / numValueR * doubleDivisionRange -halfCanvas)
            )
        } else {
            clearCanvas();
        }
    }

    function printPoints() {
        let pointsHTML = "";
        for (let k = 0; k < points.length; k++) {
            pointsHTML = pointsHTML + "<circle r=\"3\" cx=\"" + (((points[k].x - 110) * numValueR / points[k].r) + 110) + "\" cy=\"" + (((points[k].y - 110) * numValueR / points[k].r) + 110) + "\" fill-opacity=\"1\" fill=\"#2c2544\" stroke=\"black\" visibility=\"visible\"></circle>"
        }
        document.querySelector('svg[class="points"]').innerHTML = pointsHTML;
    }

    function drawPoint(x,y) {
        clearCanvas();
        let ctx = canvas[0].getContext("2d");
        ctx.beginPath();
        ctx.arc(x,y,2,0,Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    function clearCanvas() {
        canvas[0].getContext('2d').clearRect(0, 0, canvas.width(), canvas.height());
    }

    $('.x-radio').on('click', () =>{drawFromForm()});
    $('#y-textinput').on('input', () =>{drawFromForm()});



    $('#submit-button').on('click', function(event){

        if(!(checkX() && checkY() && checkR())) {
            event.preventDefault();
        } else{
            $('.hidden_r').val(numValueR.toString());
            $('.hidden_timezone').val(new Date().getTimezoneOffset());
        }
    });


    $('#reset-button').on('click', function(event){
        numValueX = undefined;
        numValueY = undefined;
        numValueR = undefined;
        $('#y-textinput').removeClass('text-error')
        $('.r-buttons input').removeClass('button-error')
        $('.xbox-label').removeClass('radio-error')
        $('.r-buttons input').removeClass('button-clicked')

        let svgGraph = document.querySelector('.graph').getSVGDocument();
        svgGraph.querySelector('.coordinate-text_minus-Rx').textContent = '-R'
        svgGraph.querySelector('.coordinate-text_minus-Ry').textContent = '-R';
        svgGraph.querySelector('.coordinate-text_minus-half-Rx').textContent = '-R/2';
        svgGraph.querySelector('.coordinate-text_minus-half-Ry').textContent = '-R/2';
        svgGraph.querySelector('.coordinate-text_plus-Rx').textContent = 'R';
        svgGraph.querySelector('.coordinate-text_plus-Ry').textContent = 'R';
        svgGraph.querySelector('.coordinate-text_plus-half-Rx').textContent = 'R/2';
        svgGraph.querySelector('.coordinate-text_plus-half-Ry').textContent = 'R/2';
        clearCanvas();

        $('.hidden_clear').val('true');
    });
});
