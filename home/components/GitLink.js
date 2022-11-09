import styled from 'styled-components'
import {useRef, useState} from "react";
import {Divider, Popover} from "@mui/material";
import {motion} from 'framer-motion'

const Styles = styled.div`
    & {
        position: absolute;
        top: 0;
        right: 0;
        color: white;
        margin: 10px;
        z-index: 50;
        transform: translate3d(${props => -props.rightOffset}px, ${props => props.topOffset}px, 0);
        background-color: #1f1f1f;
        border-radius: 3px;
        font-weight: 500;
    }
    
    & .btn {
        padding: 10px;
    }
`;
const StyledPopover = styled((props) => (
    <Popover
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))((props) => ({
    '& .MuiPaper-root': {
        background: props.theme==='dark'?'#1f1f1f':'#fff',
        marginTop: -3,
        padding: 10,
        right: 10 + props.rightOffset,
        color: props.theme==='dark'?'white':'black',
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        minWidth: 200,
        boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .link:hover': {
            background: props.theme==='dark'?'#5d5d5d':'#d0d0d0'
        },
        '& .link': {
            padding: 5,
        }
    },
}));

const styles = {
    color: 'white'
}
const GitLink = ({href='https://github.com/nboj/CS-Website/tree/main/home', links=['https://github.com/nboj/CS-Website/tree/main/home'], className, topOffset=0, rightOffset=0, text='View the source code here', theme='dark'}) => {
    const [open, setOpen] = useState(false)
    const ref = useRef()
    const handleClick = (e) => {
        setOpen(open => !open)
    }
    const variants = {
        initial: {
            opacity: 0
        },
        animate: (i) => ({
            opacity: 1,
            transition: {
                type: 'spring',
                mass: 2.8,
                stiffness: 177,
                damping: 24,
                delay: i*0.07+0.1
            }
        })
        
    }
    return (
        <Styles ref={ref} className={className} theme={theme} topOffset={topOffset} rightOffset={rightOffset}>
            <button className='btn' onClick={handleClick}>View source code</button>
            <StyledPopover
                open={open}
                onClose={handleClick}
                anchorEl={ref.current}
                rightOffset={rightOffset}
                theme={theme}
            >
                <div className='flex flex-col'>
                    {links.map((item, index) => (
                        <motion.a variants={variants} custom={index} initial='initial' animate='animate' href={item.href} onClick={handleClick} key={`gitlinks${index}`} className={`link ${index < links.length-1?'border-b-2 border-zinc-700':''}`} target="_blank" rel='noreferrer'>{item.text}</motion.a>
                    ))}
                </div>
            </StyledPopover>
        </Styles>
    )
}

export default GitLink;
