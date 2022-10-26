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
    }
`;

const GitLink = ({href='https://github.com/nboj/CS-Website/tree/main/home', theme='light'}) => {
    return (
        <Styles theme={theme}>
            <a href={href} target="_blank">View the source code here</a>
        </Styles>
    )
}

export default GitLink;