// built in components
import Head from 'next/head'

// 3rd party components
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';

// my components
import Back from '../../../components/Back';

// assets
import blinkImg from '../../../public/lab-8-assets/blink/blink-spritesheet.png';
import { useEffect, useState } from 'react';
import GitLink from '../../../components/GitLink';

const fullSize = Math.round(blinkImg.width/2);
const spriteSize = fullSize/4;
const height = Math.round(blinkImg.height/2)

const Styles = styled.div` 
    & { 
        overflow: clip;
    }
    & .anim {   
        height: ${height}px;
        width: ${spriteSize}px; 
        & .anim-image {
            width: ${fullSize}px;
            height: ${height}px;
            object-fit: cover;
            object-position: -${spriteSize*0}px center;
            user-select: none;
        }   
        & .animate {
            animation-name: anim;
            animation-duration: ${props => props.duration}s; 
            animation-timing-function: steps(3);  
            animation-iteration-count: 2;
            animation-direction: alternate; 
        }
        @keyframes anim { 
            0% {object-position: -${spriteSize}px center;} 
            100% {object-position: -${fullSize}px center;}
        }
    }
`

const titleVariants = {
    initial: {
        scale: 0.8,
        opacity: 0
    },
    shown: {
        scale: 1,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 20, 
            mass: 1 
        }
    },
}

const Blink = () => {
    const [blinkDuration, setBlinkDuration] = useState(1)
    const [blink, setBlink] = useState(false)

    const handleBlink = (delay) => {  
        if (!blink)  {
            setBlinkDuration(delay)
            setBlink(true)
            setTimeout(() => {setBlink(false)}, delay*2000)  
        }
    }  
    
    return (
        <Styles duration={blinkDuration}>
            <Head>
                <title>Blink</title>
            </Head>
            <motion.div variants={titleVariants} initial='initial' whileInView='shown' viewport={{once: true}}>
                <Typography sx={{color: '#2b2d42', fontFamily: 'Oswald, sans-serif'}} className='text-center absolute top-20 w-fit left-1/2 -translate-x-1/2 font-semibold' variant='h2'>Simple Image Based Animation</Typography>
            </motion.div>
            <div className='flex flex-col justify-center items-center w-full h-screen gap-5'>  
                <div className='anim'>
                    <img className={`anim-image ${blink?'animate':''}`} src={blinkImg.src} width={blinkImg.width} height={blinkImg.height} />
                </div>
                <div className='flex flex-row justify-center items-center w-full gap-3'>
                    <Button onClick={() => {handleBlink(0.6)}} disabled={blink} variant='outlined'>slow blink</Button>
                    <Button onClick={() => {handleBlink(0.2)}} disabled={blink} variant='outlined'>normal blink</Button>
                    <Button onClick={() => {handleBlink(0.05)}} disabled={blink} variant='outlined'>fast blink</Button>
                </div> 
            </div>
            <GitLink href='https://github.com/nboj/CS-Website/blob/main/home/pages/lab-8/blink/index.js' />
            <Back />
        </Styles>
    )
}

export default Blink;