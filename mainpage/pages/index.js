import styled from 'styled-components';
import Image from 'next/image'; 
import {motion, useInView} from 'framer-motion'; 
import { forwardRef, useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import {Skeleton} from '@mui/material';

// assets
import background from '/public/page-backdrop.jpg';
import C from '/public/C.png';
import S from '/public/S.png';

const Styles = styled.div`
  & {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url(${props => props.readyToLoad?background.src:''});
    width: 100vw;
    height: 100vh;
    background-size: cover;
  } 
  & .green-ring {  
    width: 100%;
    overflow: visible;
    stroke: #3a86ff;
    stroke-width: 6;
    stroke-linejoin: round;
    stroke-linecap: round; 
  }
`;

const StartButton = styled.button`
  & { 
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 27.4px;
    gap: 27.4px; 
    width: 185px;
    height: 151px;
    background: radial-gradient(49.64% 49.64% at 50.36% 50.36%, #2674B3 0%, rgba(55, 111, 156, 0.6) 0.01%, rgba(11, 64, 106, 0.58) 51.56%, rgba(40, 91, 133, 0.68) 100%);
    border: 2px solid #83ACFF;
    border-radius: 59px;
  }
`;

const NameText = styled.h1`
 & {
  font-family: 'Koulen';
  font-style: normal;
  font-weight: 400;
  font-size: 60px;
  line-height: 108px;
  letter-spacing: 0.19em; 
  color: #FFFFFF;
 }
`;

const Home = () => {  
  const [readyToLoad, setReadyToLoad] = useState(false);
  const letterVariants = {
    initial: i => ({
      x: 90*i,   
      opacity: 0,
    }),
    visible: {
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        duration: 0.7,
        stiffness: 90,
        damping: 20,
        mass: 1,
        bounce: 0.25
      }
    },
  } 
  const titleVariants = {
    initial: {
      // y: -100,
      opacity: 0,
      scale: 1.2
    },
    visible: {
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        type: 'spring', 
        duration: 0.7,
        stiffness: 70,
        damping: 30,
        mass: 1,
        bounce: 0
      }
    }, 
  }
  const buttonVariants = {
    initial: { 
      opacity: 0,
      scale: 0.8
    },
    visible: {  
      opacity: 1,
      scale: 1,
      transition: { 
        type: 'spring', 
        duration: 0.7,
        stiffness: 100,
        damping: 30,
        mass: 0.2,
        bounce: 0
      }
    }, 
    hover: {
      opacity: 1,
      scale: 1.1,
      transition: { 
        type: 'spring', 
        duration: 0.7,
        stiffness: 100,
        damping: 10,
        mass: 0.2,
        bounce: 0
      }
    }
  }
  const greenRingVariants = {
    initial: {
      pathLength: 0,  
      opacity: 0,
      rotate: 180,
      transition: { 
        type: 'spring',  
        stiffness: 70,
        damping: 60,
        mass: 1,
        bounce: 0
      }
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      rotate: -90,
      transition: { 
        type: 'spring',  
        stiffness: 40,
        damping: 10,
        mass: 1,
        bounce: 0
      }
    }
  } 
  const arrowVariants = {
    initial: {
      x: 0,
      opacity: 1, 
    },
    start: { 
      x: 5,
      opacity: 0.8,   
      transition: { 
        repeat: Infinity,
        repeatType: 'reverse',
        type: 'spring',  
        stiffness: 90,
        damping: 20,
        mass: 0.1,
        bounce: 0
      }
    }
  }
  const [playRingAnim, setPlayRingAnim] = useState(false);
  const handleButtonClick = (e) => {
    e.preventDefault();
    location.href = 'https://kent.christianauman.com';
  } 
  return (
    <Styles readyToLoad={readyToLoad}> 
      <Head>
        <title>CS 10051</title>
      </Head>
      {!readyToLoad?<div><Skeleton variant='rectangular' width='100%' height='100%' className='absolute' />
      <img src={background.src} className='hidden' onLoad={setReadyToLoad(true)}/></div>:null}
      <motion.div variants={titleVariants} initial='initial' whileInView='visible' viewport={{once: true}}><NameText>Christian Auman</NameText></motion.div>
      <div className="w-full flex justify-center gap-x-36 items-center">
        <motion.div variants={letterVariants} custom={-1} initial='initial' whileInView='visible' viewport={{once: true}}><Image src={C.src} width={428} height={428} /></motion.div>
        <motion.div onClick={handleButtonClick} onHoverStart={() => {setPlayRingAnim(true)}} onHoverEnd={() => {setPlayRingAnim(false)}} variants={buttonVariants} initial='initial' animate={playRingAnim?'hover':'visible'}>
          <StartButton>
            <svg width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M48.5 94.75C74.0432 94.75 94.75 74.0432 94.75 48.5C94.75 22.9568 74.0432 2.25 48.5 2.25C22.9568 2.25 2.25 22.9568 2.25 48.5C2.25 74.0432 22.9568 94.75 48.5 94.75Z" stroke="#F5F5F5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            <motion.svg variants={arrowVariants} animate={playRingAnim?'start':'initial'} className='absolute' width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.5 39L39 20.5M39 20.5L20.5 2M39 20.5H2" stroke="#F5F5F5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>

            <motion.svg className='absolute' width="103" height="103" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path className='green-ring' variants={greenRingVariants} initial='initial' animate={playRingAnim?'visible':'initial'} d="M51.5 100.25C78.4239 100.25 100.25 78.4239 100.25 51.5C100.25 24.5761 78.4239 2.75 51.5 2.75C24.5761 2.75 2.75 24.5761 2.75 51.5C2.75 78.4239 24.5761 100.25 51.5 100.25Z" stroke="#67F29F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>

          </StartButton>
        </motion.div>
        <motion.div variants={letterVariants} custom={1} initial='initial' whileInView='visible' viewport={{once: true}}><Image src={S.src} width={428} height={428} /></motion.div>
      </div>
    </Styles>
  )
}

export default Home;