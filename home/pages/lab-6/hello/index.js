// native components
import { useEffect, useState } from "react"
import Head from 'next/head'

// third party components
import { motion, AnimatePresence } from 'framer-motion'

// custom components
import Back from '../../../components/Back'
import GitLink from "../../../components/GitLink"

const variants = { 
    initial: { 
        opacity: 0,
        transform: 'rotate3d(1, 0, 0, 60deg) translate3d(0, -40px, 0)', 
    }, 
    shown: { 
        opacity: 1,
        transform: 'rotate3d(0, 0, 0, 0deg) translate3d(0, 0px, 0)', 
    },
    exit: {
        opacity: 0,
        transform: 'rotate3d(1, 0, 0, -60deg) translate3d(0, 40px, 0)', 
    },
}

const hoverVariants = {
    initial: {
        color: '#000814'
    }, 
    hover: {
        color: '#e63946'
    }
}

const transition = {
    type: 'spring',
    stiffness: 100,
    damping: 10,
    mass: 0.5
}


const Hello = () => {
    const [index, setIndex] = useState(0)
    const arr = [
        'Hello, World',
        'Woah',
    ] 

    const [text, setText] = useState(<motion.p variants={variants} transition={transition} initial='initial' animate='shown' exit='exit' key={index} className='absolute w-full'>{arr[0]}</motion.p>);
    const [hover, setHover] = useState(false)

    useEffect(() => {
        setText(<motion.p variants={variants} transition={transition} initial='initial' animate='shown' exit='exit' key={index} className='absolute w-full'>{arr[index%2]}</motion.p>)
    }, [index])


    const handleClick = (e) => {
        e.preventDefault() 
        setIndex(index => index + 1); 
        
    }

    const handleMouseOver = (e) => {
        e.preventDefault()
        setHover(true)   
    }

    const handleMouseLeave = (e) => {
        e.preventDefault()
        setHover(false)
    }

    
    return (
        <div style={{perspective: '1000px'}}>
            <Head>
                <title>Hello</title>
            </Head> 
            <div className="flex flex-col justify-center items-center w-full h-screen"> 
                <div className='relative h-fit w-full mb-20 text-center'> 
                    <motion.div variants={hoverVariants} initial='initial' animate={hover?'hover':'initial'} transition={transition} className='relative w-full text-center block'>
                        <AnimatePresence initial={false} className='relative'>  
                            {text}  
                        </AnimatePresence>
                    </motion.div>   
                   
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <button onClick={handleClick}>click me</button>
                    <button onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver}>hover me</button>
                </div>
            </div>
            <GitLink href='https://github.com/nboj/CS-Website/blob/main/home/pages/lab-6/hello/index.js' />
            <Back />
        </div>
    )
}

export default Hello;