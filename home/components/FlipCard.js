// built in imports
import { useState } from 'react' 

//3rd party imports 
import { motion } from 'framer-motion'

const FlipCard = ({OuterWrapper, flipped, ...props}) => {
    /**
     * flipped state
     * variants for motion
     * 
     * return
     *  first child
     *      first child will be front 
     *      when flipped, first child will rotate 180deg on y axis
     *  last child
     *      last child will be back
     *      last child will start with -180deg rotation
     *      when flipped, last child will rotate 180deg on y axis
     */ 
    const frontVariants = {
        initial: {
            rotateY: 0, 
        },
        flipped: {
            rotateY: -180, 
        }
    }
    const backVariants = {
        initial: {
            rotateY: 180,  
        },
        flipped: {
            rotateY: 0, 
        }
    }
    const transition = {
        type: 'spring',
        stiffness: 60,
        damping: 10,
    }
    return (
        <OuterWrapper 
            style={{position: 'relative', perspective: '2000px'}} 
            onClick={props.onClick}
        >
            <motion.div 
                variants={frontVariants} 
                initial='initial' 
                animate={flipped?'flipped':''}
                style={{width: '100%', height: '100%', position: 'absolute', zIndex: 2, backfaceVisibility: 'hidden'}}
                transition={transition}
            >
                {props.children[0]}
            </motion.div>
            <motion.div 
                variants={backVariants} 
                initial='initial' 
                animate={flipped?'flipped':''}
                style={{width: '100%', height: '100%', position: 'absolute', zIndex: 1, backfaceVisibility: 'hidden'}}
                transition={transition}
            >
                {props.children[1]}
            </motion.div>
        </OuterWrapper>
    )
}

export default FlipCard;