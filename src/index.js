import styles from './styles.css';
// import Movil from './Movil'
// import {Point, Vector} from "./geometry";
// import {cmToPixels, secondsToMiliseconds} from "./conversions";
// import Escala from "./Escala";
import {fromEvent} from "rxjs";


const startButton = document.querySelector('#start');
let start$ = fromEvent(startButton,'click');


let spinnerCanvasElement = document.getElementById("spinner-canvas");
let spinnerCanvas = spinnerCanvasElement.getContext("2d");

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


function angle(angle) {
    return angle - ((1/2) * Math.PI);;
}

function pie(ctx,{x = 0, y= 0, radius, start = 0, end = 2* Math.PI, lineColor, linewidth= 1, fillColor}) {
    console.log(`x:${x} radius=${radius} stroke=${lineColor}`);

    ctx.save();

    if(lineColor!==undefined) ctx.strokeStyle = lineColor;
    if(fillColor!==undefined) ctx.fillStyle = fillColor;
    ctx.lineWidth = linewidth;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x,y,radius,angle(start),angle(end));
    ctx.lineTo(x, y);

    ctx.fill();
    ctx.stroke();

    ctx.restore();
}
const FULL_CIRCLE = 2*Math.PI;

class DrawingProperties {
    constructor({lineColor, lineWidth, fillColor}) {

    }
}

function dividedCircle(ctx, {x = 0, y = 0, radius, numParts = 2}) {

    for(let i=0; i<numParts; i++) {
        pie(ctx,{})
    }

}
// dividedCircle(spinnerCanvas);

pie(spinnerCanvas,{x:0,y:0,start:0,end:FULL_CIRCLE/3,radius:60,fillColor:'white',lineColor:'black',linewidth:2});
pie(spinnerCanvas,{x:0,y:0,start:FULL_CIRCLE/3,end:2*FULL_CIRCLE/3,radius:60,fillColor:'white',lineColor:'black',linewidth:2});
pie(spinnerCanvas,{x:0,y:0,start:2*FULL_CIRCLE/3,end:FULL_CIRCLE,radius:60,fillColor:'white',lineColor:'black',linewidth:2});

pie(spinnerCanvas,{x:0,y:0,start:0,end:FULL_CIRCLE/2,radius:40,fillColor:'red',lineColor:'black'});
pie(spinnerCanvas,{x:0,y:0,start:FULL_CIRCLE/2,end:FULL_CIRCLE,radius:40,fillColor:'red',lineColor:'black'});


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

/*
window.addEventListener('resize',function(){
    console.log('hola');
    var width  = calculateDesiredWidth();  // your code here
    var height = calculateDesiredHeight(); // your code here
    front.canvas.width  = width;
    front.canvas.height = height;
    front.translate(width/2,height/2); // now 0,0 is the center of the canvas.
},false);
*/


