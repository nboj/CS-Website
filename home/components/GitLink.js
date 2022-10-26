import styled from 'styled-components'
import Link from 'next/link'

const Styles = styled.div`
    & {
        position: absolute;
        top: 0;
        right: 0;
        color: ${props => props.theme == 'light'?'black':'white'};
        margin: 10px;
        backdrop-filter: blur(10px);
        text-decoration: underline;
        font-weight: 400;
        transform: translateY(${props => props.topOffset}px);
    }
`;

const GitLink = ({href='https://github.com/nboj/CS-Website/tree/main/home', topOffset=0, text='View the source code here', theme='light'}) => {
    return (
        <Styles theme={theme} topOffset={topOffset}>
            <a href={href} target="_blank" rel='noreferrer'>{text}</a>
        </Styles>
    )
}

export default GitLink;