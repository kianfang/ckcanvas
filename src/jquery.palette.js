$(function() {
    var $palette = $("#palette"),
        canvas = $("#palette>canvas")[0],
        winH = $(window).height(),
        winW = $(window).width()
    ;

    var $canvas = $("<canvas>").attr({
        width: $palette.width(),
        height: $palette.height()
    });

    var $mask = $("<div>").addClass("mask");
    $palette.append($canvas, $mask);

    var c = $canvas.get(0).getContext('2d');

    var startX = 0,
        startY = 0,
        prevX = 0,
        prevY = 0,
        mousedown = false,
        mouseup = false,
        mouseleave = false,
        mouseenter = false
    ;

    c.strokeStyle = '#666666';
    c.lineWidth = 3;
    c.lineCap = 'round';
    c.lineJoin = 'round';

    $mask.on("mousedown", function(e) {
        mousedown = true;
        mouseup = false;
        startX = prevX = e.offsetX;
        startY = prevY = e.offsetY;
        console.log(e.offsetX, e.offsetY);
    }).on("mouseenter", function(e) {
        mouseenter = true;
        mouseleave = false;
    }).on("mouseleave", function(e) {
        mouseenter = false;
        mouseleave = true;
    }).on("mousemove", function(e) {
        if(mouseenter && mousedown) {
            c.beginPath();
            c.moveTo(prevX, prevY);
            c.lineTo(e.offsetX,e.offsetY);
            c.stroke();
            // c.closePath();
            prevX = e.offsetX;
            prevY = e.offsetY;
        }

    });

    $(document).on("mouseup", function(e) {
        mousedown = false;
        mouseup = true;
    });

});
