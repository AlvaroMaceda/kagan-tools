import styles from './styles.css';
// import Movil from './Movil'
// import {Point, Vector} from "./geometry";
// import {cmToPixels, secondsToMiliseconds} from "./conversions";
// import Escala from "./Escala";

// import { fromEvent } from "rxjs";
import { Point } from './geometry';
import { SelectorShape } from './selector_shape';

import { Subject, fromEvent, interval, timer } from 'rxjs';
import { take, scan, share, switchMapTo, debounceTime, distinct } from 'rxjs/operators';
import { animationFrameScheduler } from 'rxjs';

let pauser = new Subject();

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
let start$ = fromEvent(startButton,'click');
let stop$ = fromEvent(stopButton,'click');

function frameDataCalculator(startTime) {
    console.log(`creating frame calculator. Start time:${startTime}`);
    return function (previousFrameData) {
        // console.log(previousFrameData);
        const timeSinceAnimationStarted = animationFrameScheduler.now()-startTime;
        return {
            fromStart: timeSinceAnimationStarted,
            fromLastFrame:timeSinceAnimationStarted-previousFrameData.fromStart
        }
    }
}

const initialFrameData = {fromStart:0,fromLastFrame:0};

function createFrameStream() {
    return interval(0,animationFrameScheduler).pipe(
        scan(frameDataCalculator(animationFrameScheduler.now()),initialFrameData),
        distinct(),
        take(10),
        share()
    );
}

let frames$ = start$.pipe(
    switchMapTo(createFrameStream())
);

frames$.subscribe((x) => {
    console.log("from start:"+x.fromStart);
    console.log("from last frame:"+x.fromLastFrame)
    draw();
});

// createFrameStream().subscribe((x) => {
//     console.log("from start:"+x.fromStart);
//     console.log("from last frame:"+x.fromLastFrame)
// });


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


// start$.subscribe((event)=> {
//     console.log('start');
// });

window.addEventListener('resize',function(){
    resizeCanvasToContainer();
},false);





