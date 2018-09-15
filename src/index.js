import styles from './styles.css';
// import Movil from './Movil'
// import {Point, Vector} from "./geometry";
// import {cmToPixels, secondsToMiliseconds} from "./conversions";
// import Escala from "./Escala";
import { fromEvent } from "rxjs";
import { Point } from './geometry';
import { SelectorShape } from './selector_shape';

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



let selectorShape = new SelectorShape();

function draw() {
    selectorShape.draw(spinnerCanvas, new Point(0,0));
}
draw();

start$.subscribe((event)=> {
    console.log('start');
    foo(spinnerCanvas);
});

window.addEventListener('resize',function(){
    adjustCanvasToContainer(spinnerCanvasElement,spinnerCanvas);
    setOriginInCanvasCenter(spinnerCanvas);
    draw();
},false);


