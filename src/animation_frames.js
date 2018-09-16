import {animationFrameScheduler, interval, Subject} from "rxjs";
import {distinct, scan, share, take, takeUntil} from "rxjs/operators";

const initialFrameData = {index:0, fromStart:0, fromLastFrame:0};

function frameTimesCalculator(startTime) {
    console.log(`creating frame calculator. Start time:${startTime}`);
    return function (previousFrameData) {
        const timeSinceAnimationStarted = animationFrameScheduler.now()-startTime;
        return {
            index: previousFrameData.index + 1,
            fromStart: timeSinceAnimationStarted,
            fromLastFrame:timeSinceAnimationStarted-previousFrameData.fromStart
        }
    }
}

export class AnimationFrames {

    constructor() {
        this.pauser$ = new Subject();
    }

    createFramesStream() {
        return interval(0,animationFrameScheduler).pipe(
            scan(frameTimesCalculator(animationFrameScheduler.now()),initialFrameData),
            distinct(),
            // take(100), // For debugging
            share(),
            takeUntil(this.pauser$)
        );
    }

    stop() {
        this.pauser$.next();
    }

}