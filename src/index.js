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

function adjustCanvasToContainer(canvasElement, drawingContext) {
    let container = canvasElement.parentElement;
    let positionInfo = container.getBoundingClientRect();

    let height = positionInfo.height;
    let width = positionInfo.width;

    canvasElement.width = width;
    canvasElement.height = height;

    drawingContext.width = width;
    drawingContext.height = height;
}
adjustCanvasToContainer(spinnerCanvasElement,spinnerCanvas);
function setCartesianCoordinates(drawingContext) {
    drawingContext.translate(drawingContext.width/2,drawingContext.height/2); // now 0,0 is the center of the canvas.
}
setCartesianCoordinates(spinnerCanvas);



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


