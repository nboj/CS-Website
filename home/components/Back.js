// built-in imports
import {useRouter} from 'next/router';
// 3rd party imports
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Styles = styled.div`
    & {
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
        height: fit-content;
        position: fixed;
        left: 50%;
        bottom: 30px;
        transform: translate3d(-50%, 0, 0);
        gap: 5px;
        user-select: none; 
        z-index: 50;
    }
    & h1 { 
        font-family: 'Heebo';
        font-style: normal;
        font-weight: 400;
        font-size: 20px; 
    }
    &.light {
        color: #fdfffc;     
    }
    &.light svg {
        fill: #fdfffc;
    }
    &.dark {
        color: #011627;  
    }
    &.dark svg {
        fill: #011627;
    }
`;


const Back = ({variant='dark', className}) => {
    const [hover, setHover] = useState(false);
    const router = useRouter();
    const backVariants = {
        initial: {
            scale: 1,
        },
        onHover: {
            scale: 1.1, 
        }
    }
    const handleOnClick = () => {
        router.back();
    }
    return (
        <Styles className={`${variant} ${className}`}>
            <motion.div 
                onClick={handleOnClick}
                className='flex justify-center items-center gap-1 cursor-pointer'
                variants={backVariants} 
                onHoverStart={() => {setHover(true)}} 
                onHoverEnd={() => {setHover(false)}} 
                initial='initial'
                animate={hover?'onHover':'initial'}
                transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                    mass: 0.3
                }}
            >
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM17 7L1 7V9L17 9V7Z"/>
                </svg>
                <h1>Go Back</h1>
            </motion.div>
        </Styles>
    )
}

export default Back;
