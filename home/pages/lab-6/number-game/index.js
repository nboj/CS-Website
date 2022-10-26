// next/react components
import { useEffect, useState } from 'react'; 
import Head from 'next/head';

// 3rd party components
import styled from 'styled-components';
import useInterval from '../../../components/useInterval';
import {motion} from 'framer-motion';

// my components
import ShortLabTemplate from '../../../components/ShortLabTemplate';
import ShortLabContainer from '../../../components/ShortLabContainer';
import GitLink from '../../../components/GitLink';

const Styles = styled.div`
    & .back-button {
        cursor: pointer;
        transform: scale(0.8);
        transition: all ease-out 0.2s;
        
        &:hover {
            transform: scale(0.9);
        }

        &:active {
            transform: scale(0.6);
            transition: all ease-out 0.1s;            
        }
    }
`;
  
let prevInput;
let prevTime;
let usingTimer = false;
const max = 10;
const min = 1
const numberRegex = new RegExp(/^\d+$/);

const Lab6 = () => {
    const [changeLayout, setChangeLayout] = useState(false);
    const [output, setOutput] = useState(''); 
    const [randomNumber, setRandomNumber] = useState(null);
    const [inputId, setInputId] = useState(null); 
    const [outputMessage, setOutputMessage] = useState(null); 
    const [disabled, setDisabled] = useState(false);

    useEffect(() => { 
        const jsxOutput = () => { 
            return (
                <div className='text-center'>
                    <h1>Your Guess: {prevInput}</h1> 
                    {outputMessage}
                </div>
            ) 
        }  
        setOutput(jsxOutput);
    }, [outputMessage]);

    const generateNewNumber = () => {
        prevInput = null;
        usingTimer = false;
        setOutput('Enter your guess...')
        enableInputs();
        setRandomNumber(Math.round(Math.random()* (max-1)+min));
        setChangeLayout(false); 
    }

    const disableInputs = () => {
        setDisabled(true);
    }

    const enableInputs = () => {
        setDisabled(false);
    }

    useInterval(() => {
        const message = 'Enter your guess...';
        if (usingTimer && output != message && changeLayout) {
            if (prevTime && Date.now() - prevTime > 4500) {
                setOutput(message); 
                prevTime = Date.now();
            } else if (!prevTime  && usingTimer) 
                prevTime = Date.now(); 
        }
    }, 5000);

    useEffect(() => {
        if (!randomNumber) {
            generateNewNumber(); 
        }
    }, [generateNewNumber])

    const handleSubmit = (e, id) => {
        e.preventDefault();
        const input = document.getElementById(id).value; 
        if (!input && !changeLayout) { 
            return;
        }
        if (input && input.length > 20) {
            input = input.substring(0, 19);
        }
        prevTime = Date.now();
        if (!usingTimer) {
            usingTimer = true;
        }
        if (!inputId)
        setInputId(id); 
        if (!prevInput) {
            prevInput = input;
        }
        if (!input && !outputMessage) {
            setOutputMessage('Enter your guess.');
        } else {
            prevInput = input; 
        }  
        if (input && numberRegex.test(prevInput)) {
            if (prevInput > 10 || prevInput < 1) {
                setOutputMessage('Your number is out of range.');
            } else if (prevInput == randomNumber) {
                disableInputs();
                usingTimer = false;
                setOutputMessage('Good Job! You guessed it!');
            } else if (prevInput > randomNumber) {
                setOutputMessage(<span>Sorry wrong guess...<br/>Try something <p className='inline text-blue-600 font-semibold'>smaller?</p></span>)
            } else {
                setOutputMessage(<span>Sorry wrong guess...<br/>Try something <p className='inline text-blue-600 font-semibold'>bigger?</p></span>)
            } 
        } else if (input && !numberRegex.test(prevInput)) {
            setOutputMessage(<span>Wrong Input!</span>)
        } 
        if (!changeLayout)
            setChangeLayout(true); 
    }

    const handleOnChange = (e) => {
        if (inputId && changeLayout) {
            handleSubmit(e, inputId);
        }
    }
    const variants = {
        initial: {
            opacity: 0,
            scale: 0.8,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',

            }
        }
    }
    return (
        <Styles> 
            <Head>
                <title>Lab - 6</title>
            </Head>
            <ShortLabTemplate output={output} changeLayout={changeLayout}>
                <motion.div variants={variants} initial='initial' whileInView='visible' viewport={{once: true}}> 
                    <ShortLabContainer 
                        title={"Let's play a game!"} 
                        subtitle={<span>Can you guess the number, <br/>between 1-10, that I am thinking of</span>} 
                        description={<span><span style={{color: '#0F73E8', fontWeight: 400}}>Click</span> the Check Your Guess button after you enter your guess in the box</span>}
                        buttonText={'Check'}
                        inputText={'Enter Your Guess'}
                        onSubmit={handleSubmit}
                        onChange={handleOnChange}
                        useOtherButton={true}
                        onOtherButtonClick={generateNewNumber}
                        otherButtonText={'Regenerate'}
                        id='lab-6'
                        disableSubmit={disabled}
                        disableInput={disabled}
                        />
                </motion.div>
                <GitLink/>
            </ShortLabTemplate>
        </Styles>
    );
}

export default Lab6;