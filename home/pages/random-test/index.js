import {useEffect, useState} from 'react'
import { Button, CircularProgress } from '@mui/material'
import Back from '../../components/Back'
import styles from '../../styles/lab-9.module.scss'

import styled from 'styled-components'

const Grid = ({color='bg-red-500', columns='grid-cols-12', center=true, ...props}) => {
    return (
        <div className={`grid place-content-start ${center?"":"w-fit"} gap-2 place-self-${center?'center':'start'} place-items-start ${columns} rounded-xl ${color} text-zinc-100 p-5 m-3`}>
            {props.children}
        </div>
    )
} 


const RandomTest = () => {
    const [fetchCount, setFetchCount] = useState(0)
    const [roundArray, setRoundArray] = useState(new Array(10).fill(0))
    const [floorArray, setFloorArray] = useState(new Array(10).fill(0))
    const [ceilArray, setCeilArray] = useState(new Array(10).fill(0)) 
    const [roundAvg, setRoundAvg] = useState(0)
    const [floorAvg, setFloorAvg] = useState(0)
    const [ceilAvg, setCeilAvg] = useState(0) 
    const [currentState, setCurrentState] = useState(0)
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
        if (currentState === 1) {
            calculate().then(() => console.log("done"))
        }
    }, [currentState]) 
    useEffect(() => { 
        if (fetchCount >= 6) { 
            setFetchCount(0)
            setCurrentState(2)
        }
    }, [fetchCount])
    switch(currentState) {
        case (0):
            return (
                <div className='w-full h-screen flex flex-col gap-5 justify-center items-center'>
                    <div className='w-full h-fit flex justify-center items-center'>
                        <Button onClick={() => {setCurrentState(1)}} classes={{root: styles.btn}} variant='contained'>Calculate</Button>
                    </div>
                    <Back/>
                </div>
            )
        case(1):
            return (
                <div className='flex w-full h-screen justify-center items-center'>
                    <CircularProgress size={208} />
                    <Back/>
                </div>
            )
        case(2):
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
                        <Button variant='contained' onClick={() => {setCurrentState(1)}} classes={{root: styles.btn}} sx={{backgroundColor: '#3a86ff', padding: '20px 30px'}}>Recalculate</Button>
                    <Back/>
                </div>
            )
        default:
            return (
                <></>
            )
    }  
}

export default RandomTest;
