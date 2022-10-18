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

const TotalCalculator = () => { 
    const checkID = 'check-input'
    const tipID = 'tip-input'
    const taxID = 'tax-input'
    const [output, setOutput] = useState("")
    const handleCalculate = (e) =>{
        e.preventDefault()
        const check = parseFloat(document.getElementById(checkID).value)
        const tip = parseFloat(document.getElementById(tipID).value)
        const tax = parseFloat(document.getElementById(taxID).value)
        const tipTotal = (1 * (tip/100))
        const taxTotal = (1 * (tax/100))
        const total = (tipTotal + taxTotal) * check + check
        setOutput(`Your total should be $${Math.round(total*100)/100}`)  
    }
    return (
        <Styles>
            <Head>
                <title>Total Calculator</title>
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
                <div className='flex flex-row items-center align-center m-5'>
                    <p>Tax percentage</p>
                    <TextField sx={{marginLeft: 5}} type='number' label='Tax Percent %' id='tax-input'></TextField>
                </div>
                <Button onClick={handleCalculate} variant='outlined' className='w-fit -translate-x-1/2 left-1/2'>Calculate</Button>
                <p className='w-full text-center mt-5'>{output}</p>
            </div>
            <Back />
        </Styles>
    )
}

export default TotalCalculator;