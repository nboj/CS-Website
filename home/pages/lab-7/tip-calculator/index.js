import styled from 'styled-components'
import Head from 'next/head' 
import { TextField, Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Back from '../../../components/Back';

const Styles = styled.div`
    & {
        display: flex;
        width: 100%;
        height: 100vh;
        justify-content: center;
        align-items: center;
    }
`;

const TipCalculator = () => { 
    const checkID = 'check-input'
    const tipID = 'tip-input'
    const taxID = 'tax-input'
    const [output, setOutput] = useState("")
    const handleCalculate = (e) =>{
        e.preventDefault()
        const check = parseFloat(document.getElementById(checkID).value)
        const tip = parseFloat(document.getElementById(tipID).value) 
        const tipTotal = (1 * (tip/100))  
        setOutput(`You should tip $${tipTotal * check}`)  
    }
    return (
        <Styles>
            <Head>
                <title>Tip Calculator</title>
            </Head> 
            <div className='flex flex-col w-fit justify-center align-center border rounded-2xl border-gray-300 py-10'>
                <div className='flex flex-row items-center align-center m-5'>
                    <p>Enter your check amount</p>
                    <TextField sx={{marginLeft: 5}} type='number' label='Check amount' id='check-input'></TextField>
                </div>
                <div className='flex flex-row items-center align-center m-5'>
                    <p>Tip percentage</p>
                    <TextField sx={{marginLeft: 5}} type='number' label='Tip Percent %' id='tip-input'></TextField>
                </div> 
                <Button onClick={handleCalculate} variant='outlined' className='w-fit -translate-x-1/2 left-1/2'>Calculate</Button>
                <p className='w-full text-center mt-5'>{output}</p>
            </div>
            <Back />
        </Styles>
    )
}

export default TipCalculator;