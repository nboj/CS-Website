// next/react components
import { useEffect, useState } from 'react'; 
import Head from 'next/head';

// 3rd party components
import styled from 'styled-components';
import useInterval from '../../components/useInterval';
import {motion} from 'framer-motion';

// my components
import ShortLabTemplate from '../../components/ShortLabTemplate';
import ShortLabContainer from '../../components/ShortLabContainer';

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
    const [disabled, setDisabled] = useState(false);
    const [inputId, setInputId] = useState(null);
 

    const disableInputs = () => {
        setDisabled(true);
    }

    const enableInputs = () => {
        setDisabled(false);
    } 

    const handleSubmit = (e, id) => { 
        const input = document.getElementById(id).value;
        if (input)
            setOutput(input);
        else
            setOutput("Type your heart away...")
        if (!changeLayout)
            setChangeLayout(true);
        if (!inputId)
            setInputId(id);
    }

    const handleAlert = () => { 
        alert(output); 
        setChangeLayout(false);
    }

    const handleOnChange = (e, id) => { 
        if (changeLayout)
            handleSubmit(e, inputId);  
        else {
            setOutput(document.getElementById(id).value);
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
                <title>Lab - 7</title>
            </Head>
            <ShortLabTemplate output={output} changeLayout={changeLayout}>
                <motion.div variants={variants} initial='initial' whileInView='visible' viewport={{once: true}}> 
                    <ShortLabContainer 
                        title={"Enter a Word"} 
                        subtitle={<span>Can be anything...</span>} 
                        description={<span>This section will <span style={{color: '#0F73E8', fontWeight: 400}}>update</span> the dom with whatever text you enter.</span>}
                        buttonText={'Continue'}
                        inputText={'Enter a word'}
                        onSubmit={handleSubmit}
                        onChange={handleOnChange}
                        useOtherButton={true}
                        onOtherButtonClick={handleAlert}
                        otherButtonText={'Alert'}
                        id='lab-6'
                        disableSubmit={disabled}
                        disableInput={disabled}
                        />
                </motion.div>
            </ShortLabTemplate>
        </Styles>
    );
}

export default Lab6;