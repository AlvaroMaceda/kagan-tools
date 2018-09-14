import styles from './styles.css';
// import Movil from './Movil'
// import {Point, Vector} from "./geometry";
// import {cmToPixels, secondsToMiliseconds} from "./conversions";
// import Escala from "./Escala";
import {fromEvent} from "rxjs";


const FULL_CIRCLE = 2*Math.PI;

class DrawStyle {
    constructor({lineColor, lineWidth, fillColor}) {
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
}

const startButton = document.querySelector('#start');
let start$ = fromEvent(startButton,'click');

let spinnerCanvasElement = document.getElementById("spinner-canvas");
let spinnerCanvas = spinnerCanvasElement.getContext("2d");


// function resizeCanvas() {
//     inMemCanvas.width = canvasRef.width;
//     inMemCanvas.height = canvasRef.height;
//     inMemCtx.drawImage(canvasRef, 0, 0);
//     canvasRef.width = 1000;
//     ctx.drawImage(inMemCanvas, 0, 0);
// }


function adjustCanvasToContainer(canvasElement, ctx) {
    let container = canvasElement.parentElement;
    let positionInfo = container.getBoundingClientRect();

    let height = positionInfo.height;
    let width = positionInfo.width;

    canvasElement.width = width;
    canvasElement.height = height;

    ctx.width = width;
    ctx.height = height;
}

function setOriginInCanvasCenter(ctx) {
    ctx.translate(ctx.width/2,ctx.height/2); // now 0,0 is the center of the canvas.
}

adjustCanvasToContainer(spinnerCanvasElement,spinnerCanvas);
setOriginInCanvasCenter(spinnerCanvas);


function translateAngleToOriginOnTop(angle) {
    return angle - ((1/2) * Math.PI);
}


function setDrawStyle(ctx, drawStyle) {
    if(drawStyle.lineColor !== undefined) ctx.strokeStyle = drawStyle.lineColor;
    if(drawStyle.fillColor !== undefined) ctx.fillStyle = drawStyle.fillColor;
    if(drawStyle.lineWidth !== undefined) ctx.lineWidth = drawStyle.lineWidth;
}

function pie(ctx,{x = 0, y= 0, radius, start = 0, end = 2* Math.PI}) {

    ctx.save();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x,y,radius,translateAngleToOriginOnTop(start),translateAngleToOriginOnTop(end));
    ctx.lineTo(x, y);

    ctx.fill();
    ctx.stroke();

    ctx.restore();
}


function dividedCircle(ctx, {x = 0, y = 0, radius, numParts = 2}) {

    let startAngle = 0;
    let increment = FULL_CIRCLE / numParts;
    let endAngle;

    for(let i=0; i<numParts; i++) {
        endAngle = startAngle + increment;
        pie(ctx,{x,y,radius,start: startAngle, end: endAngle});
        startAngle = endAngle;
    }

}

let styleOdd = new DrawStyle({fillColor:'red',lineColor:'black',lineWidth:2});
let styleEven = new DrawStyle({fillColor:'white',lineColor:'black',lineWidth:2});

setDrawStyle(spinnerCanvas,styleEven);
dividedCircle(spinnerCanvas,{x:0, y:0, radius:130, numParts:5});

setDrawStyle(spinnerCanvas,styleOdd);
dividedCircle(spinnerCanvas,{x:0, y:0, radius:100, numParts:4});

setDrawStyle(spinnerCanvas,styleEven);
dividedCircle(spinnerCanvas,{x:0, y:0, radius:70, numParts:3});

setDrawStyle(spinnerCanvas,styleOdd);
dividedCircle(spinnerCanvas,{x:0, y:0, radius:40, numParts:2});





//709
//156 ?
function foo(ctx) {
    // ctx.translate(0,75);
    ctx.save();
    ctx.fillStyle = '#FF0000';
    let square = [
        0,
        0,
        30,
        60
    ];
    ctx.fillRect.apply(ctx,square);
    ctx.restore();
}

start$.subscribe((event)=> {
    console.log('start');
    foo(spinnerCanvas);
});

window.addEventListener('resize',function(){
    console.log('hola');

    let cvSave = spinnerCanvas.getImageData(0,0,spinnerCanvasElement.width, spinnerCanvasElement.height);
    console.log(cvSave);
    adjustCanvasToContainer(spinnerCanvasElement,spinnerCanvas);
    spinnerCanvas.drawImage(cvSave,0,0);
},false);


