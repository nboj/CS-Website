class utils {
    static random = (min, max) => {
        return Math.random() * (max-min) + min
    }
    static roundedRandom = (min, max) => { 
        return Math.round(this.random(min, max))
    } 
    static flooredRandom = (min, max) => { 
        return Math.floor(Math.random() * (max-min+1)+min)
    }
    static lerp = (a, b, t) => {
        return a + (b - a) * t
    }
    static bezier = (t , initial , p1, p2, final) => {
        return (1 - t) * (1 - t) * (1 - t) * initial
            +
            3 * (1 - t) * (1 - t) * t * p1
            +
            3 * (1 - t) * t * t * p2
            +
            t * t * t * final;
    }
}

export default utils;
