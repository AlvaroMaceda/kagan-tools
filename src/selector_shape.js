import { PolarPoint } from './geometry';

const FULL_CIRCLE = 2*Math.PI;

class DrawStyle {
    constructor({lineColor, lineWidth, fillColor}) {
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
}

let styleOdd = new DrawStyle({fillColor:'red',lineColor:'black',lineWidth:2});
let styleEven = new DrawStyle({fillColor:'white',lineColor:'black',lineWidth:2});

export class SelectorShape {

    constructor() {
    }

    draw(ctx, center, radius) {


        ctx.fillStyle = 'black';

        ring(ctx, styleEven, {center, innerRadius:90, outerRadius:120, numParts:5});
        ring(ctx, styleOdd, {center, innerRadius:60, outerRadius:90, numParts:4});
        ring(ctx, styleEven, {center, innerRadius:30, outerRadius:60, numParts:3});
        ring(ctx, styleOdd, {center, innerRadius:0, outerRadius:30, numParts:2});
    }

}

function ring(ctx, drawStyle, {center, innerRadius, outerRadius, numParts}) {
    setDrawStyle(ctx,drawStyle);
    dividedCircle(ctx,{center, radius:outerRadius, numParts});
    dividedCircleLabels(ctx,{center, radius:outerRadius, numParts});
}


function setDrawStyle(ctx, drawStyle) {
    if(drawStyle.lineColor !== undefined) ctx.strokeStyle = drawStyle.lineColor;
    if(drawStyle.fillColor !== undefined) ctx.fillStyle = drawStyle.fillColor;
    if(drawStyle.lineWidth !== undefined) ctx.lineWidth = drawStyle.lineWidth;
}

function dividedCircle(ctx, {center, radius, numParts = 2}) {

    let parts = circleParts(numParts);

    parts.forEach(({start, end}) => {
        pie(ctx, {center, radius, start, end});
    });

}

function dividedCircleLabels(ctx, {center, radius, numParts = 2}) {

    ctx.textAlign = 'center';

    let start = FULL_CIRCLE / (2 * numParts);
    let parts = circleParts(numParts, start);
    let i = 1;

    parts.forEach(({start}) => {
        let position = new PolarPoint(radius,translateAngleToOriginOnTop(start)).toCartesian();
        ctx.fillText(i++,position.x,position.y);
    });

}

function partsOfInterval(){
    // This should be a generalization of circleParts
}
function displace() {
    // To use as:

    // displaceX = (interval) => displace(interval, X)
    // parts = partsOfInterval(0,2*Math.PI,parts).foreach(displaceX)
}


function circleParts(numParts, start = 0) {

    let startAngle = start;
    let increment = FULL_CIRCLE / numParts;
    let endAngle;
    let result = [];

    for(let i=0; i<numParts; i++) {
        endAngle = startAngle + increment;
        result.push({start:startAngle, end: endAngle});
        startAngle = endAngle;
    }

    return result;
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
