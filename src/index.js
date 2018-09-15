import styles from './styles.css';
// import Movil from './Movil'
// import {Point, Vector} from "./geometry";
// import {cmToPixels, secondsToMiliseconds} from "./conversions";
// import Escala from "./Escala";
import { fromEvent } from "rxjs";
import { Point } from './geometry';


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


const SelectorShape = require('./selector_shape');
let selectorShape = new SelectorShape();
selectorShape.draw(spinnerCanvas, new Point(0,0));










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
    spinnerCanvas.putImageData(cvSave,0,0);
},false);


