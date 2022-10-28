import {useEffect, useState} from 'react'
import utils from '../../components/helper-classes/utils'  
import { Button, CircularProgress, TextField } from '@mui/material'
import Back from '../../components/Back'

import styled from 'styled-components'

const BTN = styled.div`
    & >* {
        background-color: #3a86ff;
        padding: 20px 30px;
    }
`;

const Grid = ({color='bg-red-500', columns='grid-cols-12', center=true, ...props}) => {
    return (
        <div className={`grid place-content-start ${center?"":"w-fit"} gap-2 place-self-${center?'center':'start'} place-items-start ${columns} rounded-xl ${color} text-zinc-100 p-5 m-3`}>
            {props.children}
        </div>
    )
} 


let iterations = 1_000_000 
const RandomTest = () => {     
    const [doneCount, setDoneCount] = useState(0)
    const [fetchCount, setFetchCount] = useState(0)
    const [roundArray, setRoundArray] = useState(new Array(10).fill(0))
    const [floorArray, setFloorArray] = useState(new Array(10).fill(0))
    const [ceilArray, setCeilArray] = useState(new Array(10).fill(0)) 
    const [roundAvg, setRoundAvg] = useState(0)
    const [floorAvg, setFloorAvg] = useState(0)
    const [ceilAvg, setCeilAvg] = useState(0) 
    const [currentState, setCurrentState] = useState(0)
    const [startCalculation, setStartCalculation] = useState(false)
    const calculate = async () => {
        const data = await (await fetch('/api/getRandomTest')).json()
        setRoundArray(() => {
            setFetchCount(count => count+1)
            return data.round
        })   
        setFloorArray(() => {
            setFetchCount(count => count+1)
            return data.floor
        })   
        setCeilArray(() => {
            setFetchCount(count => count+1)
            return data.ceil
        })   

        setRoundAvg(() => {
            setFetchCount(count => count+1)
            return data.roundAvg
        }) 
        setFloorAvg(() => {
            setFetchCount(count => count+1)
            return data.floorAvg
        }) 
        setCeilAvg(() => {
            setFetchCount(count => count+1)
            return data.ceilAvg
        })
    } 
    useEffect(() => {
        if (currentState == 1) { 
            calculate()
        }
    }, [currentState]) 
    useEffect(() => { 
        if (fetchCount >= 6) { 
            setFetchCount(0)
            setCurrentState(2)
            console.log('done')
        }
    }, [fetchCount])
    if (currentState === 0) {
        return (
            <div className='w-full h-screen flex flex-col gap-5 justify-center items-center'> 
                <div className='w-full h-fit flex justify-center items-center'>
                    <BTN>
                        <Button onClick={() => {setCurrentState(1)}} variant='contained' sx={{backgroundColor: 'blue'}}>Calculate</Button>
                    </BTN> 
                </div>
                <Back/>
            </div>
        )
    } else if (currentState === 1) {
        return (
            <div className='flex w-full h-screen justify-center items-center'> 
                <CircularProgress style={{strokeDasharray: 100}} size={208} />
                <Back/>
            </div>
        )   
    } else if (currentState === 2) {
        return ( 
            <div className='w-full h-screen flex flex-col justify-center items-center'>
                <div className='grid place-content-center place-self-center w-fit h-fit place-items-left grid-cols-1'>  
                    <div className='font-bold text-xl'>
                        <Grid>
                            <p className='col-span-2'>Round Method: </p>{roundArray.map((item, index) => <p key={`rounded${index}`}>{item}%</p>)}
                        </Grid>
                        <Grid>
                            <p className='col-span-2'>Floor Method: </p>{floorArray.map((item, index) => <p key={`floored${index}`}>{item}%</p>)}
                        </Grid>
                        <Grid>
                            <p className='col-span-2'>Ceil Method: </p>{ceilArray.map((item, index) => <p key={`ceiled${index}`}>{item}%</p>)}
                        </Grid>
                    </div> 
                    <Grid columns='grid-cols-3' center={false} color="bg-zinc-500">
                        <p className='font-bold mx-3'>Round Avg: {roundAvg}%</p> 
                        <p className='font-bold mx-3'>Floor Avg: {floorAvg}%</p> 
                        <p className='font-bold mx-3'>Ceil Avg: {ceilAvg}%</p> 
                    </Grid>
                </div>
                <BTN>
                    <Button variant='contained' onClick={() => {setCurrentState(1)}}>Recalculate</Button>
                </BTN>
                <Back/>
            </div>
        ) 
    } else {
        return (
            <></>
        )
    }  
}

export default RandomTest;