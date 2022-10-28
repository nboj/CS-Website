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
}

export default utils;