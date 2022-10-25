import { useEffect, useState, forwardRef } from 'react';
import slotSpritesheet from '../../public/lab-8-assets/slots/slot-spritesheet.png';
import styled from 'styled-components'
import {motion} from 'framer-motion'
import utils from '../helper-classes/utils'

const slotOffset = slotSpritesheet.height/3;

const getOffset = (num) => {
    return (28 -slotOffset*num)
}
const SlotStyles = styled.div`
    & {
        display: flex;
        position: relative;  
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 141px;
        height: 225.6px;
        background-color: white;
        border-radius: 9.4px;
        z-index: -1;
        background-image: url(${slotSpritesheet.src});
        background-repeat: repeat-y;    
        background-size: ${slotSpritesheet.width}px; 
        background-position: center;
    }
`;



const Slot = ({offset=0, spin, onAnimationComplete, delayMultiplier=0}) => {
    const Component = forwardRef(({offset}, ref) => (
        <SlotStyles ref={ref} offset={offset}/>
    ))

    const MotionSlot = motion(Component)

    const getPosition = () => {
        return `center ${getOffset(offset)}px`;
    }

    const variants = {
        initial: {
            backgroundPosition: `center ${getOffset(utils.random(0, 2))}px`
        }, 
        spin: {
            backgroundPosition: [`center ${getOffset(offset+1)*(utils.random(20*delayMultiplier, 30*delayMultiplier))}px`, getPosition()],  
        },
        idle: {
            backgroundPosition: getPosition(),
            transition: {
                type: 'tween', 
                duration: 0
            }
        }
    }

    const transition = {
        type: 'tween',
        ease: 'circOut',
        duration: 1*delayMultiplier,  
    }
    
    return (
        <MotionSlot onAnimationComplete={(e)=>onAnimationComplete(e)} variants={variants} transition={transition} initial='initial' animate={spin?'spin':'idle'}> 
        </MotionSlot>
    )
}

export default Slot;