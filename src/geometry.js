export class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    scale(factor) {
        return new Point(this.x * factor,this.y * factor);
    }
    clone() {
        return new Point(this.x,this.y);
    }
    add(point) {
        return new Point(this.x + point.x,this.y + point.y);
    }
}

export class PolarPoint {
    constructor(R, theta) {
        this.R = R;
        this.theta = theta;
    }
    clone() {
        return new PolarPoint(this.R,this.theta);
    }
    toCartesian() {
        return new Point(
            this.R * Math.cos(this.theta),
            this.R * Math.sin(this.theta)
            );
    }
}

export class Vector extends Point {
    times(num) {
        return new Vector(this.x * num, this.y*num);
    }
}
