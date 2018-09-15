import { PolarPoint } from './geometry';
import { partial } from "./functional";

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

        radius = 120;
        const NUM_RINGS = 4;
        let ringsRadius = partsOfInterval(0,radius,NUM_RINGS).reverse();
        console.log(ringsRadius);

        let numRing = NUM_RINGS; // TODO: get rid of loop variables
        let style = styleEven;
        ringsRadius.forEach( (ringRadius) => {
            ring(ctx, style, {center, innerRadius:ringRadius.start, outerRadius:ringRadius.end, numParts:numRing+1});
            numRing--;
            style = (style === styleEven ) ? styleOdd : styleEven;
        });
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

    let parts = partsOfInterval(0, FULL_CIRCLE, numParts);

    parts.forEach(({start, end}) => {
        pie(ctx, {center, radius, start, end});
    });

}

function dividedCircleLabels(ctx, {center, radius, numParts = 2}) {

    ctx.textAlign = 'center';

    let displacement = FULL_CIRCLE / (2 * numParts);
    let displaceToCenterOfInterval = partial(displace,displacement);

    let parts = partsOfInterval(0, 2*Math.PI, numParts).map(displaceToCenterOfInterval);

    let i = 1; // TODO: get rid of this "i"
    parts.forEach(({start}) => {
        let position = new PolarPoint(radius,translateAngleToOriginOnTop(start)).toCartesian();
        ctx.fillText(i++,position.x,position.y);
    });

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


function partsOfInterval(start, end, numParts){
    let intervalStart = start;
    let increment = end / numParts;
    let intervalEnd;
    let result = [];

    for(let i=0; i<numParts; i++) {
        intervalEnd = intervalStart + increment;
        result.push({start:intervalStart, end: intervalEnd});
        intervalStart = intervalEnd;
    }

    return result;
}

function displace(ammount,interval) {
    return {
        start: interval.start + ammount,
        end: interval.end + ammount
    }
}
