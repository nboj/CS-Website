import utils from '../../components/helper-classes/utils'

const iterations = 1000000
let roundArray = new Array(10).fill(0)
let floorArray = new Array(10).fill(0)
let ceilArray = new Array(10).fill(0)
let roundAvg = 0
let floorAvg = 0
let ceilAvg = 0
const handler = (req, res) => {
    for (let i = 0; i < iterations; i++) {  
        for (let j = 0; j < 10; j++) {
            const ran1 = utils.roundedRandom(1, 10)
            const ran2 = utils.flooredRandom(1, 10) 
            const ran3 = Math.ceil(Math.random() * (11) - 1)
            roundArray[ran1-1]++
            floorArray[ran2-1]++
            ceilArray[ran3-1]++ 
        } 
    }
    
    let total = 0
    roundArray.map(item => total += item) 
    roundArray = roundArray.map(item => (
        Math.round((item/total)*1000)/10
    ))   
    total = 0
    roundArray.map(item => {
        total += item
    }) 
    roundAvg = Math.round((total/roundArray.length)*100)/100
    
    total = 0
    floorArray.map(item => total += item) 
    floorArray = floorArray.map(item => (
        Math.round((item/total)*1000)/10
    ))   
    total = 0
    floorArray.map(item => {
        total += item
    }) 
    floorAvg = Math.round((total/floorArray.length)*100)/100 

    total = 0
    ceilArray.map(item => total += item) 
    ceilArray = ceilArray.map(item => (
        Math.round((item/total)*1000)/10
    ))   
    total = 0
    ceilArray.map(item => {
        total += item
    }) 
    ceilAvg = Math.round((total/ceilArray.length)*100)/100

    res.status(200).json({
        round: roundArray,
        floor: floorArray,
        ceil: ceilArray,
        roundAvg: roundAvg,
        floorAvg: floorAvg,
        ceilAvg: ceilAvg,
    })
}
export default handler;