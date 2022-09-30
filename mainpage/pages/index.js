import styled from 'styled-components';
import Image from 'next/image'; 
import {motion} from 'framer-motion'; 
import { forwardRef, useState } from 'react';

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
    background: url(${background.src});
    width: 100vw;
    height: 100vh;
    background-size: cover;
  } 
  & .green-ring {  
    width: 100%;
    overflow: visible;
    stroke: #80ed99;
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
  }
  const greenRingVariants = {
    initial: {
      pathLength: 0,  
      opacity: 0,
      rotate: 300,
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
      opacity: [0,1,1,1],
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
  const [playRingAnim, setPlayRingAnim] = useState(false);
  return (
    <Styles> 
      <motion.div variants={titleVariants} initial='initial' whileInView='visible' viewport={{once: true}}><NameText>Christian Auman</NameText></motion.div>
      <div className="w-full flex justify-center gap-x-36 items-center">
        <motion.div variants={letterVariants} custom={-1} initial='initial' whileInView='visible' viewport={{once: true}}><Image src={C.src} width={428} height={428} /></motion.div>
        <motion.div onHoverStart={() => {setPlayRingAnim(true)}} onHoverEnd={() => {setPlayRingAnim(false)}} variants={buttonVariants} initial='initial' whileInView='visible' viewport={{once: true}}>
          <StartButton >
            <svg width="99" height="99" viewBox="0 0 99 99" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M49.4999 68.3333L68.3333 49.5M68.3333 49.5L49.4999 30.6667M68.3333 49.5L30.6666 49.5M96.5833 49.5C96.5833 75.5034 75.5034 96.5833 49.5 96.5833C23.4966 96.5833 2.41663 75.5034 2.41663 49.5C2.41663 23.4966 23.4966 2.41666 49.5 2.41666C75.5034 2.41666 96.5833 23.4966 96.5833 49.5Z" stroke="#FCFDFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> 

            <motion.svg className='absolute' width="103" height="103" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path className='green-ring' variants={greenRingVariants} initial='initial' animate={playRingAnim?'visible':'initial'} d="M51.5 100.25C78.4239 100.25 100.25 78.4239 100.25 51.5C100.25 24.5761 78.4239 2.75 51.5 2.75C24.5761 2.75 2.75 24.5761 2.75 51.5C2.75 78.4239 24.5761 100.25 51.5 100.25Z" stroke="#67F29F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </motion.svg>

          </StartButton>
        </motion.div>
        <motion.div variants={letterVariants} custom={1} initial='initial' whileInView='visible' viewport={{once: true}}><Image src={S.src} width={428} height={428} /></motion.div>
      </div>
    </Styles>
  )
}

export default Home;