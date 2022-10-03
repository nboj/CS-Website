// built in imports
import { useState } from 'react';
// 3rd party imports
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Back from './Back';

const Styles = styled.div`
    & {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
    }
    & .outer-container {
        display: flex; 
        width: ${props => props.containerWidth}px;
        height: 570px;
        border-top: 1px solid rgba(53, 48, 48, 0.31);
        border-bottom: 1px solid rgba(53, 48, 48, 0.31);
        border-right: 0px solid rgba(53, 48, 48, 0.31);
        border-radius: 18px; 
    }
    & .inner-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; 
        width: ${props => props.containerWidth}px;
        height: 570px;
        border-left: 1px solid rgba(53, 48, 48, 0.31);
        border-right: 1px solid rgba(53, 48, 48, 0.31);
        border-radius: 18px;
    }
    & .output-container {  
        display: none;  
        justify-content: center;
        align-items: center;
        user-select: none;
    }
`;
 
const ShortLabTemplate = ({output, changeLayout, ...props}) => { 
    const [initialContainerWidth, setInitialContainerWidth] = useState(425);
    const innerContainerVariants = {
        initial: { 
            borderTopRightRadius: 18,
            borderBottomRightRadius: 18,
            transition: {
                type: 'Spring',
                damping: 30,
            }
        },
        change: { 
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0, 
        }
    }
    const outerContainerVariants = {
        initial: { 
            width: initialContainerWidth,
            borderRight: ['0px solid rgba(53, 48, 48, 0.31)','0px solid rgba(53, 48, 48, 0.31)'],
            transition: {
                type: 'Spring', 
                damping: 100,
                stiffness: 1,
                mass: 3,
            }
        },
        change: {
            width: initialContainerWidth*2.5,
            borderRight: '1px solid rgba(53, 48, 48, 0.31)',  
        }
    }
    const outputContainerVariants = {
        initial: {
            display: 'none',
            width: 0,
            opacity: 0,
        },
        change: {
            display: 'flex',
            opacity: 1,
            width: initialContainerWidth*1.5, 
        }
    }
    return (
        <Styles containerWidth={initialContainerWidth}> 
            <motion.div 
                className='outer-container'
                variants={outerContainerVariants}
                initial='initial'
                animate={changeLayout?'change':'initial'}
            > 
                <motion.div 
                    variants={innerContainerVariants} 
                    initial='initial' 
                    animate={changeLayout?'change':'initial'} 
                    className='inner-container'
                    >
                    {props.children}
                </motion.div>  
                <motion.div 
                    className='output-container'
                    variants={outputContainerVariants}
                    initial='initial'
                    animate={changeLayout?'change':'initial'} 
                >
                    {output}
                </motion.div>
            </motion.div> 
            <Back/>
        </Styles>
    )
}

export default ShortLabTemplate;