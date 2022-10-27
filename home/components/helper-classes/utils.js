class utils {
    static random = (min, max) => {
        return Math.random() * (max-min) + min
    }
    static roundedRandom = (min, max) => { 
        return Math.round(this.random(min, max))
    } 
}

export default utils;