// built in components 
import Head from 'next/head'
// my components
import Back from '../../../components/Back'
import utils from '../../../components/helper-classes/utils'
import Slot from '../../../components/lab-8/Slot'
// 3rd party components
import styled from 'styled-components'
import { Button } from '@mui/material'
import { motion } from 'framer-motion'
// assets
import bg from '../../../public/lab-8-assets/slots/background.jpg';
import slotsContainer from '../../../public/lab-8-assets/slots/slot-machine.png'; 
import slotSpritesheet from '../../../public/lab-8-assets/slots/slot-spritesheet.png';
import { useEffect, useState, forwardRef } from 'react';

const slotOffset = slotSpritesheet.height/3;

const getOffset = (num) => {
    return (28 -slotOffset*num)
}

const Styles = styled.div`
    & {
        position: relative;
        width: 100%;
        height: 100vh;
        background: url(${bg.src});
        background-size: auto 100vh;
        background-repeat: repeat-x;
        background-position: -5vw;
        background-color: #ea686a;
        z-index: 1;
        & > div {
            backdrop-filter: blur(5px);
        }
    }

    & .slots-container {
        position: relative;
        background: url(${slotsContainer.src});
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        width: 940px;
        height: 526.4px;    
    } 
`; 
 

const Slots = () => { 
    var completeCount = 1;
    const [offset1, setOffset1] = useState()
    const [offset2, setOffset2] = useState()
    const [offset3, setOffset3] = useState()
    const [spin, setSpin] = useState(false)
    const [credits, setCredits] = useState(20)
    const setOffsets = [setOffset1, setOffset2, setOffset3]  
    const [picks, setPicks] = useState([0, 1, 2]) 

    const handleSpin = (e) => {
        setPicks(picks => {picks[0] = utils.roundedRandom(0,2); picks[1] = utils.roundedRandom(0,2); picks[2] = utils.roundedRandom(0,2); return picks})
        if (credits > 0) {
            setCredits(credits => credits - 1)
        }
        setOffsets.map((item, index) => {
            item(picks[index])
        })
        setSpin(true)
    }

    const handleComplete = (e) => {    
        if (completeCount >= 3) {
            completeCount = 0;
            console.log('hello')
            setSpin(false) 
        } else {
            completeCount++
        }
    } 

    useEffect(() => {  
        completeCount = 0; 
        setOffsets.map((item) => {
            item(getOffset(utils.random(0, 2)))
        })
    }, [])
    return (
        <Styles>
            <Head>
                <title>Slots</title>
            </Head>
            <div className='absolute left-5 top-5 z-10 grid grid-cols-2 gap-2'>
                <h1 className='font-bold text-zinc-200 text-2xl'>Credits: {credits}</h1>
                <Button onClick={() => {setCredits(20); setSpin(false);}} color='inherit' variant='text' sx={{color: 'white'}}>Restart</Button>
            </div>
            <div className='flex flex-col justify-center items-center w-full h-screen'> 
                <div className='slots-container flex flex-row justify-center items-center' style={{columnGap: '37.6px'}}> 
                    <Slot offset={offset1} spin={spin} onAnimationComplete={handleComplete} delayMultiplier={1}></Slot>
                    <Slot offset={offset2} spin={spin} onAnimationComplete={handleComplete} delayMultiplier={2}></Slot>
                    <Slot offset={offset3} spin={spin} onAnimationComplete={handleComplete} delayMultiplier={3}></Slot>
                </div> 
                <Button variant='outlined' color='inherit' sx={{color: '#fee440'}} disabled={spin || credits <= 0} onClick={() => {handleSpin()}}>Spin!</Button>
            </div>
            <Back variant='light' />
        </Styles>
    )
}

export default Slots;