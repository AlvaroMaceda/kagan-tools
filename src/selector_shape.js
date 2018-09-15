const FULL_CIRCLE = 2*Math.PI;

class SelectorShape {

    constructor() {
    }

    draw(ctx, center) {

        let styleOdd = new DrawStyle({fillColor:'red',lineColor:'black',lineWidth:2});
        let styleEven = new DrawStyle({fillColor:'white',lineColor:'black',lineWidth:2});

        setDrawStyle(ctx,styleEven);
        dividedCircle(ctx,{center, radius:130, numParts:5});

        setDrawStyle(ctx,styleOdd);
        dividedCircle(ctx,{center, radius:100, numParts:4});

        setDrawStyle(ctx,styleEven);
        dividedCircle(ctx,{center, radius:70, numParts:3});

        setDrawStyle(ctx,styleOdd);
        dividedCircle(ctx,{center, radius:40, numParts:2});

    }

}

class DrawStyle {
    constructor({lineColor, lineWidth, fillColor}) {
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
}

function setDrawStyle(ctx, drawStyle) {
    if(drawStyle.lineColor !== undefined) ctx.strokeStyle = drawStyle.lineColor;
    if(drawStyle.fillColor !== undefined) ctx.fillStyle = drawStyle.fillColor;
    if(drawStyle.lineWidth !== undefined) ctx.lineWidth = drawStyle.lineWidth;
}


function dividedCircle(ctx, {center, radius, numParts = 2}) {

    let startAngle = 0;
    let increment = FULL_CIRCLE / numParts;
    let endAngle;

    for(let i=0; i<numParts; i++) {
        endAngle = startAngle + increment;
        pie(ctx, {center, radius, start:startAngle, end: endAngle});
        startAngle = endAngle;
    }

}

function pie(ctx,{center, radius, start = 0, end = 2* Math.PI}) {

    ctx.save();

    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.arc(center.x, center.y, radius,translateAngleToOriginOnTop(start),translateAngleToOriginOnTop(end));
    ctx.lineTo(center.x, center.y);

    ctx.fill();
    ctx.stroke();

    ctx.restore();
}


function translateAngleToOriginOnTop(angle) {
    return angle - ((1/2) * Math.PI);
}


module.exports = SelectorShape;