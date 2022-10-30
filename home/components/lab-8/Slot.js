import { useEffect, useState, forwardRef, useRef } from 'react';
import slotSpritesheet from '../../public/lab-8-assets/slots/slot-spritesheet.png';
import styled from 'styled-components'
import {motion, useSpring} from 'framer-motion'
import utils from '../helper-classes/utils'  

const slotOffset = slotSpritesheet.height/4;

const getOffset = (num) => {
    return (25-slotOffset*num)
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
        border-radius: 9.4px;
        z-index: -1;
        box-shadow: 1px -1px 29px 12px rgba(0,21,33,0.54) inset;
        -webkit-box-shadow: 1px -1px 29px 12px rgba(0,21,33,0.54) inset;
        -moz-box-shadow: 1px -1px 29px 12px rgba(0,21,33,0.54) inset;
        background-color: #264653;
        background-image: url(${slotSpritesheet.src});
        background-repeat: repeat-y;    
        background-size: ${slotSpritesheet.width}px;  
        background-position: 50% 0px;
    }
`;



const Slot = ({offset, spin, onAnimationComplete, delayMultiplier=0, stiffnessMultiplier}) => {
    const Component = forwardRef(({offset, style}, ref) => (
        <SlotStyles ref={ref} offset={offset} style={style} id={`slot${delayMultiplier}`}/>
    ))

    const MotionSlot = motion(Component)

    const getRandomSpin = () => {
        return getOffset(offset+1)*(-utils.random(50*delayMultiplier, 60*delayMultiplier))
    }
    const [current, setCurrent] = useState(0)
    const x = useSpring(current, { stiffness: 100*stiffnessMultiplier, damping: 17})   //, restDelta: 5, restSpeed: 5
    let times = 0
    
    useEffect(() => { 
        if (spin) {  
            const value = getRandomSpin()
            const startingValue = current - 130;
            x.set(startingValue)
            const unsubX = x.onChange(latest => {
                if(latest) {
                    setCurrent(latest) 
                    switch (times) {
                        case (0):
                            if (latest <= startingValue) { 
                                x.set(value)
                                times++
                            }
                            return; 
                        case (1):
                            if (latest >= value) { 
                                x.set(getOffset(offset))
                                times++
                            }
                            return;
                        case (2):  
                            if (latest === getOffset(offset) && spin) {
                                onAnimationComplete()
                            }
                            return
                    }
                }
            })

            return () => unsubX() 
        }
    }, [spin])  

    useEffect(() => {
        const ran = utils.flooredRandom(0, 1000)
        setCurrent(ran)
        x.set(ran)
    }, []) 
    
    return (
        <MotionSlot style={{backgroundPosition: `50% ${current}px`}} />
    )
} 

export default Slot;
