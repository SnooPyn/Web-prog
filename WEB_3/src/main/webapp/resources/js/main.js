let xval;
let rval;

$(function() {
    const X_VALUES = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
    const Y_MIN = -3, Y_MAX = 3;
    const R_VALUES = [0.1, 0.2, 0.3,0.4, 0.5, 0.6, 0.7,0.8, 0.9,1,1.1,1.2, 1.3,1.4, 1.5, 1.6, 1.7,1.8, 1.9,2,2.1, 2.2, 2.3,2.4, 2.5, 2.6, 2.7,2.8, 2.9,3];

    let yval;

    const canone = 68;

    let canvasCurrent = $('.graph-canvas_current');
    let canvasPoints = $('.graph-canvas_points');
    let info = $('.input-form__info');

    $(document).ready(function() {
        $('.input-form__button-list_r').onchange = function () {
            rval = this.value;
        }
    });

    function isNumeric(x) {
        return !isNaN(parseFloat(x)) && isFinite(x);
    }

    function validateX() {
        if (isNumeric(xval)) {
            info.text('Enter point coordinates')
            return true;
        } else {
            info.text('Select the X value!')
            return false;
        }
    }

    function validateY() {
        yval = $('.input-form__text_y').val();

        if (isNumeric(yval) && yval >= Y_MIN && yval <= Y_MAX)
        {
            info.text('Enter point coordinates')
            return true;
        } else {
            info.text(`Select  Y starting ${Y_MIN} to ${Y_MAX}!`)
            return false;
        }
    }

    function validateR() {
        if (isNumeric(rval) && R_VALUES.includes(parseFloat(rval))) {
            info.text('Enter point coordinates')
            return true;
        } else {
            info.text('Select R!')
            return false;
        }
    }

    function validateForm() {
        return validateX() && validateY() && validateR();
    }

    function drawTablePoint(x, y, r, hitResult) {
        let ctxPoints = canvasPoints[0].getContext('2d');
        ctxPoints.fillStyle = hitResult === 'Miss' ? 'red' : 'green';
        ctxPoints.beginPath();
        ctxPoints.arc(
            x / r * canone + canvasPoints.width() / 2,
            - y / r * canone + canvasPoints.height() / 2,
            2, 0, 2 * Math.PI);
        ctxPoints.fill();
    }


    function loadTablePoints() {
        let rows = [];
        let headers = $(".result-table th");

        $(".result-table tr").each(function(index) {
            let cells = $(this).find("td");
            rows[index] = {};
            cells.each(function(cellIndex) {
                rows[index][$(headers[cellIndex]).html()] = $(this).html().replace(/\s/g, "");
            });
        });

        for (let i = 0; i < rows.length; i++) {
            drawTablePoint(
                rows[i]['X'],
                rows[i]['Y'],
                rows[i]['R'],
                rows[i]['RESULT']);
        }
    }

    function clearCanvasCurrent() {
        canvasCurrent[0].getContext('2d').clearRect(0, 0, canvasCurrent.width(), canvasCurrent.height());
    }

    function drawCurrentPoint(x, y) {
        clearCanvasCurrent();

        if (x > canvasCurrent.width() || x < 0 ||
            y > canvasCurrent.height() || y < 0)
            return;

        let ctxAxes = canvasCurrent[0].getContext('2d');
        ctxAxes.setLineDash([2, 2]);
        ctxAxes.fillStyle = 'black';
        ctxAxes.beginPath();
        ctxAxes.moveTo(x, canvasCurrent.width() / 2);
        ctxAxes.lineTo(x, y);
        ctxAxes.moveTo(canvasCurrent.height() / 2, y);
        ctxAxes.lineTo(x, y);
        ctxAxes.stroke();
        ctxAxes.arc(x, y, 2, 0, 2 * Math.PI);
        ctxAxes.fill();
    }

    function redrawCurrentFromInput() {
        if (validateForm()) {
            drawCurrentPoint(xval * canone / rval + canvasCurrent.width() / 2, -(yval / rval *  canone - canvasCurrent.height() / 2));
        } else {
            clearCanvasCurrent();
        }
    }

    function setRval() {
        rval = $('.input-form__hidden_r input[type=hidden]').value;
    }

    canvasCurrent.on('click', function(event) {
        if (!validateR()) return;

        let canvasX = (event.offsetX - canvasCurrent.width() / 2) / canone * rval;
        let minDiff = Infinity;
        let nearestX = xval;

        for (let i = 0; i < X_VALUES.length; i++) {
            if (Math.abs(canvasX - X_VALUES[i]) < minDiff) {
                minDiff = Math.abs(canvasX - X_VALUES[i]);
                nearestX = X_VALUES[i];
            }
        }

        let canvasY = (-event.offsetY + canvasCurrent.height() / 2) / canone * rval;
        if (canvasY < Y_MIN) {
            canvasY = Y_MIN;
        } else if (canvasY > Y_MAX) {
            canvasY = Y_MAX;
        }

        drawCurrentPoint(nearestX * canone / rval + canvasCurrent.width() / 2,
            -(canvasY / rval *  canone - canvasCurrent.height() / 2));

        let xSelect = $('input[value="' + nearestX + '"]');
        xSelect.prop('selected', true);

        xSelect.click();

        $('.input-form__select_x option').not(xSelect).prop('selected', false);
        $('.input-form__text_y').val(canvasY.toString().substring(0, 10));
        $('.input-form__hidden_r input[type=hidden]').click();
        $('.input-form__control-buttons__button_submit').click();

    });

    $('.input-form__select_x').on('change', event => redrawCurrentFromInput());

    $('.input-form__text_y').on('input', event => redrawCurrentFromInput());

    $('.input-form__button_r').on('click', function(event) {
        rval = $(this).val();
        if (!validateR) return;

        $(this).addClass('input-form__button_r_clicked');
        $('.input-form__button_r').not(this).removeClass('input-form__button_r_clicked');

        let svgGraph = document.querySelector(".result-graph").getSVGDocument();
        svgGraph.querySelector('.coordinate-text_minus-Rx').textContent = (-rval).toString();
        svgGraph.querySelector('.coordinate-text_minus-Ry').textContent = (-rval).toString();
        svgGraph.querySelector('.coordinate-text_minus-half-Rx').textContent = (-rval/2).toString();
        svgGraph.querySelector('.coordinate-text_minus-half-Ry').textContent = (-rval/2).toString();
        svgGraph.querySelector('.coordinate-text_plus-Rx').textContent = (rval).toString();
        svgGraph.querySelector('.coordinate-text_plus-Ry').textContent = (rval).toString();
        svgGraph.querySelector('.coordinate-text_plus-half-Rx').textContent = (rval/2).toString();
        svgGraph.querySelector('.coordinate-text_plus-half-Ry').textContent = (rval/2).toString();

        redrawCurrentFromInput();
    });

    $('.input-form__control-buttons__button_submit').on('click', function(event) {
        if (!validateForm()) {
            event.preventDefault();
        } else {
            $('.input-form__hidden_r input[type=hidden]').val(rval);
        }
    });

    loadTablePoints();


}
);

