// 3rd party imports
import styled, { ThemeProvider } from 'styled-components';
import TextField from '@mui/material/TextField'; 
import { useRef } from 'react';

const Styles = styled.div`
    & {
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%; 
    } 
    & h1 {
        font-family: 'Heebo';
        font-style: normal;
        font-weight: 400;
        font-size: 31px;
        line-height: 46px;
    }
    & h4 {
        font-family: 'Heebo';
        font-style: normal;
        font-weight: 300;
        font-size: 19px;
        line-height: 28px; 
        width: 80%; 
        margin: 10px 0;
    }  
    & .submit-button {
        padding: 10px;
        margin-top: 40px; 
        padding: 10.2px 35px;
        background: #0F73E8;
        border-radius: 5.09963px;
        color: white;
    } 
    & .submit-button:disabled {
        background: gray;
    }
    & .other-button { 
        margin-top: 40px;  
        padding: 0 10px;
        background: #ff595e;
        border-radius: 5.09963px;
        color: white;
    }
`;

const ShortLabContainer = ({title, subtitle, description, buttonText, inputText, id, useOtherButton, otherButtonText, disableInput=false, disableSubmit=false, ...props}) => { 
    const ref = useRef(null);
    if (disableInput) {
        document.getElementById("input" + id).value = '';
    }
    return (
        <Styles> 
            <h1>{title}</h1>
            <h4 className='text-center'>{subtitle}</h4>
            <TextField 
                id={`input${id}`} 
                type='search' 
                label={inputText} 
                variant='outlined' 
                sx={{width: '80%', margin: '10px 0 30px 0'}}
                ref={ref}
                onChange={(e) => {props.onChange(e, `input${id}`)}}
                disabled={disableInput}
            />
            <h4 className='text-left'>{description}</h4>  
            <div className='flex w-full justify-around'>
                {
                    useOtherButton
                    ?<button onClick={(e) => {props.onOtherButtonClick(e, `input${id}`)}} className='other-button'>{otherButtonText}</button> 
                    :null
                }
                <button onClick={(e) => {props.onSubmit(e, `input${id}`)}} className='submit-button' disabled={disableSubmit}>{buttonText}</button> 
            </div>
        </Styles>
    )
}

export default ShortLabContainer;