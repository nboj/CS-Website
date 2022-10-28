// built in components 
import Head from 'next/head'
import { useEffect, useState, forwardRef, useRef } from 'react';
// my components
import Back from '../../../components/Back'
import utils from '../../../components/helper-classes/utils'
import Slot from '../../../components/lab-8/Slot'
import AnimatedPoints from '../../../components/AnimatedPoints'
import GitLink from '../../../components/GitLink'
import useInterval from '../../../components/useInterval'
// 3rd party components
import styled from 'styled-components'
import { Button } from '@mui/material'
import { motion } from 'framer-motion'
// assets
import bg from '../../../public/lab-8-assets/slots/background.jpg';
import slotsContainerSpritesheet from '../../../public/lab-8-assets/slots/slot-machine-spritesheet.png'; 
import slotSpritesheet from '../../../public/lab-8-assets/slots/slot-spritesheet.png';

const slotOffset = slotSpritesheet.height/4;
const machineOffset = slotsContainerSpritesheet.height/6

const getOffset = (num) => {
    return (18 -slotOffset*num)
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
/* -machineOffset*0 */
    @keyframes lever {
        0% {
            background-position: center ${-machineOffset*0}px;
        }
        100% {
            background-position: center ${-machineOffset*5}px;
        }
    }
    & .slots-container {
        position: relative;
        background: url(${slotsContainerSpritesheet.src});
        background-size: 100%;
        background-position: center 0px;
        background-repeat: no-repeat;
        width: 840px;
        height: 526.4px;     
        animation-duration: 0.2s;
        animation-timing-function: steps(5);  
        animation-iteration-count: 2;
        animation-direction: alternate; 
    } 
`; 
 

const Slots = () => { 
    var completeCount = 0; 
    const [offset1, setOffset1] = useState(0)
    const [offset2, setOffset2] = useState(0)
    const [offset3, setOffset3] = useState(0)
    const [spin, setSpin] = useState(false)
    const [credits, setCredits] = useState(20)
    const setOffsets = [setOffset1, setOffset2, setOffset3]  
    const [picks, setPicks] = useState([0, 1, 2])  
    const [animatedPoints, setAnimatedPoints] = useState([])
    const [removeCount, setRemoveCount] = useState(0)
    const [autoplay, setAutoplay] = useState(false) 
    const [clickedSpin, setClickedSpin] = useState(false)
    const [cheats, setCheats] = useState(false)
    const [leverDown, setLeverDown] = useState(false)
    const creditsRef = useRef(null)
    const max = 3; 
    let prevPicks = []

    useEffect(() => {
        if (removeCount > 1) {
            animatedPoints.map((item, index) => {
                if (index <= removeCount) {
                    setAnimatedPoints(points => points.filter((__, i) => i != 0))
                } else {
                    return
                }
            }) 
        }
    }, [removeCount])

    const removeAnimatedPoint = () => {  
        setRemoveCount(remove => remove + 1)
    }

    const addAnimatedPoint = (style, text) => { 
        setAnimatedPoints(points => [
            ...points, 
            <AnimatedPoints style={{...style, left: `${creditsRef.current.clientWidth}px`, fontSize: '1.3rem'}} setDisplay={removeAnimatedPoint} display={true} key={Date.now()}>{text}</AnimatedPoints>
        ])

    }
    
    const handleSpin = (e) => {
        setLeverDown(true)
        setClickedSpin(true)
        if (!cheats)
            setPicks(picks.map(item => utils.flooredRandom(0,max))) 
        else {
            const ran = utils.flooredRandom(0, max)
            setPicks(picks.map(item => ran))
        }
    } 

    useEffect(() => {
        if (clickedSpin) {
            setClickedSpin(false)
            if (credits > 0) {
                setCredits(credits => credits - 1) 
                addAnimatedPoint({color: 'red', fontWeight: '600'}, '-1')
            } 
            setSpin(true)
            setOffsets.map((item, index) => {
                item(picks[index])
            })
        }
    }, [picks])
    
    const handleComplete = (e) => { 
        if (spin) {    
            if (completeCount >= 2) {
                setLeverDown(false)
                completeCount = 0;  
                if (prevPicks[0] == prevPicks[1] && prevPicks[0] == prevPicks[2]) {
                    setCredits(credits => credits + 10)   
                    addAnimatedPoint({color: 'green', fontWeight: '600'}, '+10')
                }  
                setSpin(false)  
            } else {
                completeCount++
            }
        }
    } 
    
    const handleAutoplay = () => { 
        setAutoplay(autoplay => !autoplay)
    }

    const ap = () => { 
        if (!spin && autoplay && credits > 0 && completeCount === 0)
            handleSpin()  

    }
    
    const autoplayInterval = useInterval(ap, 1000)


    useEffect(() => {
        if (spin) {
            prevPicks = picks
        }
    }, [spin])

    useEffect(() => {  
        completeCount = 0; 
        setOffsets.map((item) => {
            item(utils.random(0, max))
        }) 
        return () => clearInterval(autoplayInterval)
    }, []) 

    const reset = () => {
        const c = 20-credits
        addAnimatedPoint({color: c >= 0?'green':'red', fontWeight: '600'}, c>=0?`+${c}`:`${c}`)
        setCredits(20); 
        setSpin(false);
    }
    
    return (
        <Styles>
            <Head>
                <title>Slots</title>
            </Head>
            <div className='absolute left-5 top-5 z-10 grid grid-cols-2 gap-2'>
                <h1 ref={creditsRef} className='font-bold text-zinc-200 text-2xl'>Credits: {credits}</h1>
                {animatedPoints.map((item) => item)}
                <Button onClick={reset} color='inherit' variant='text' sx={{color: 'white'}}>Restart</Button>
            </div>
            <div className='flex flex-col justify-center items-center w-full h-screen'> 
                <div className='slots-container flex flex-row justify-center items-center' style={leverDown?{columnGap: '34.6px', animationName: 'lever'}:{columnGap: '34.6px'}}> 
                    <Slot offset={offset1} spin={spin} onAnimationComplete={handleComplete} delayMultiplier={1} stiffnessMultiplier={1.4}></Slot>
                    <Slot offset={offset2} spin={spin} onAnimationComplete={handleComplete} delayMultiplier={1.3} stiffnessMultiplier={1.3}></Slot>
                    <Slot offset={offset3} spin={spin} onAnimationComplete={handleComplete} delayMultiplier={1.6} stiffnessMultiplier={1.2}></Slot>
                </div> 
                <div className='flex flex-row justify-center items-center gap-5'>
                    <Button variant='outlined' color='inherit' sx={{color: '#fee440'}} disabled={spin || credits <= 0 || autoplay} onClick={() => {handleSpin()}}>Spin!</Button> 
                    <Button variant='outlined' color='inherit' sx={{color: '#fee440'}} onClick={handleAutoplay}>Autoplay {autoplay?'on':'off'}</Button> 
                    <Button variant='outlined' color='inherit' sx={{color: '#fee440'}} onClick={() => setCheats(cheats => !cheats)}>Cheatmode {cheats?'on':'off'}</Button> 
                </div>
            </div>
            <GitLink href='https://github.com/nboj/CS-Website/blob/main/home/pages/lab-8/slots/index.js' theme='dark' />  
            <GitLink href='https://github.com/nboj/CS-Website/blob/main/home/components/helper-classes/utils.js' topOffset={20} text='View random src code' theme='dark' />  
            <Back variant='light' />
        </Styles>
    )
}

export default Slots;