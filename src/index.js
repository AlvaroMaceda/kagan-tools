import styles from './styles.css';

import { Point } from './geometry';
import { SelectorShape } from './selector_shape';

import { AnimationFrames} from "./animation_frames";
import { fromEvent } from 'rxjs';
import { switchMapTo } from 'rxjs/operators';

let animation = new AnimationFrames();

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
let start$ = fromEvent(startButton,'click');
let stop$ = fromEvent(stopButton,'click');


start$.subscribe(()=>{
    console.log('**START**');
});

stop$.subscribe(() => {
    console.log('**STOP**');
    animation.stop();
});

let frames$ = start$.pipe(
    switchMapTo(animation.createFramesStream())
);

frames$.subscribe((x) => {
    console.log("index:"+x.index);
    console.log("from start:"+x.fromStart);
    console.log("from last frame:"+x.fromLastFrame);
    draw();
});


let spinnerCanvasElement = document.getElementById("spinner-canvas");
let spinnerCanvas = spinnerCanvasElement.getContext("2d");

function adjustCanvasSizeToParent(canvasElement, ctx) {
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

let selectorShape = new SelectorShape();
function draw() {
    selectorShape.draw(spinnerCanvas, new Point(0,0));
}

function resizeCanvasToContainer(){
    adjustCanvasSizeToParent(spinnerCanvasElement,spinnerCanvas);
    setOriginInCanvasCenter(spinnerCanvas);
    draw();
}
resizeCanvasToContainer();


window.addEventListener('resize',function(){
    resizeCanvasToContainer();
},false);





