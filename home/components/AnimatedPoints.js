import styled from 'styled-components'
import { motion } from 'framer-motion'

const Styles = styled.div`
    & {
        position: absolute;
    }
`;

const AnimatedPoints = ({style, display, setDisplay, ...props}) => {
    const variants = {
        initial: { 
            opacity: 1,
            y: 0,
            transition: {
                type: 'tween',
                duration: 0
            }
        }, 
        shown: { 
            opacity: [1,1,0],
            y: -20,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 30
            }
        }
    }
    return (
        <Styles style={style}>
            <motion.div onAnimationComplete={() => {setDisplay()}} variants={variants} initial='initial' animate={display?'shown':'initial'}>
                {display?<p>{props.children}</p>:''}
            </motion.div>
        </Styles>
    )
}

export default AnimatedPoints;