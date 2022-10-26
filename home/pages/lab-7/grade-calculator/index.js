// built in imports
import Head from 'next/head'
import React, { useState, useEffect } from 'react';

// 3rd party imports
import styled from 'styled-components'
import { Input, Button } from '@mui/material';

// custom imports
import Back from '../../../components/Back';
import FlipCard from '../../../components/FlipCard'
import GitLink from '../../../components/GitLink';

const Styles = styled.div`
    & .outer-container {
        position: relative;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    & .inner-container {
        width: 40vw;
        height: 60vh; 
    }
`;

const OuterWrapper = styled.div`
    & { 
        & > div { 
            display: flex;
            justify-content: center;
            align-items: center;
        }
        width: 100%;
        height: 100%;  
        transform-style: preserve-3d;  
    }
    & .front, .back { 
        display: flex;  
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: white;
        border: 1px solid #CECECE;
        border-radius: 18px;  
    }   
    & .front {
        flex-direction: column;   
        height: fit-content;
        padding: 100px 10px;  
        & .front-table-container {
            display: flex;
            justify-content: center;
            align-items: space-between; 
            width: 80%; 
            height: 100%;
            height: fit-content !important;
            & table {
                height: 100%; 
                font-size: 1.2rem; 
                margin: 0;
                padding: 0;
            }
            flex-basis: 70%;
            & .front-left-table {
                flex-basis: 50%; 
                text-align: center;  
            }
            & .front-right-table { 
                flex-basis: 50%;
                text-align: center;  
                border-left: 1px solid black;
                padding: 0 0 0 20px; 
            }
        } 
    }
    & td,th {
        text-align: left;
    }
    & th,td {
        padding: 0 10px;
    }
    & .button {
        padding-top: 50px;
    }
`
const data = [
    {
        name: 'Homework',
        weight: '15%',
        weightNum: 15
    },
    {
        name: 'Labs',
        weight: '20%',
        weightNum: 20
    },
    {
        name: 'Midterms',
        weight: '20%',
        weightNum: 20
    },
    {
        name: 'Final',
        weight: '10%',
        weightNum: 10
    },
    {
        name: 'Project',
        weight: '30%',
        weightNum: 30
    },
    {
        name: 'Attendance',
        weight: '5%',
        weightNum: 5
    }
]


const GradeCalculator = () => {
    const [flipped, setFlipped] = useState(false);
    const [grade, setGrade] = useState(0) 

    const handleCalculate = (e) => {
        e.preventDefault()
        let totalGrade = 0
        for (let i = 0; i < data.length; i++) {
            const el = document.getElementById(`grade${i}`)
            const weight = data[i].weightNum 
            totalGrade += el.value * (weight/100)
        }
        setGrade(Math.round(totalGrade*100)/100) 
        setFlipped(flipped => !flipped) 
    }
    
    return ( 
        <Styles>
            <Head>
                <title>Grade Calculation</title>
            </Head>
            <div className='outer-container'>
                <div className='inner-container'>
                    <FlipCard OuterWrapper={OuterWrapper} flipped={flipped}>{/**onClick={() => {setFlipped(flipped => !flipped)}} */}
                        <div className='front'>
                            <div className='front-table-container'>
                                <div className='front-left-table'>
                                    <table className='w-full'>
                                        <tbody>
                                            <tr>                
                                                <th>Section</th>
                                                <th className='text-center'>Weight</th> 
                                            </tr>
                                            {data.map((item, index) => {
                                                return (
                                                    <tr key={`grade-calculator1${index}`}>
                                                        <td>{item.name}</td>
                                                        <td className='text-center'>{item.weight}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div> 
                                <div className='front-right-table'>
                                    <table className='w-full'>
                                        <tbody>
                                        <tr>
                                            <th>Section</th>
                                            <th>Grade</th> 
                                        </tr> 
                                        {data.map((item, index) => {
                                            return (
                                                <tr key={`grade-calculator${index}`}>
                                                    <td>{item.name}</td>
                                                    <td className='w-5'>
                                                        <Input id={`grade${index}`} type='number'/>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='button mt-5'>
                                <Button onClick={handleCalculate} variant='outlined'>Calculate Grade</Button>
                            </div>
                        </div>
                        <div className='back cursor-pointer' onClick={() => setFlipped(flipped => !flipped)}>
                            <p>{`Your grade is ${grade}%`}</p>
                        </div>
                    </FlipCard>
                </div>
            </div>
            <GitLink href='https://github.com/nboj/CS-Website/blob/main/home/pages/lab-7/grade-calculator/index.js' />
            <Back />
        </Styles>
    )
}

export default GradeCalculator;