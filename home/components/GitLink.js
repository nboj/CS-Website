import styled from 'styled-components'
import Link from 'next/link'

const Styles = styled.div`
    & {
        position: absolute;
        top: 0;
        right: 0;
        color: ${props => props.theme == 'light'?'black':'white'};
        margin: 10px;
        z-index: 50;
        ${props => props.blur?'backdrop-filter: blur(10px);':''}
        text-decoration: underline;
        font-weight: 400;
        transform: translate3d(${props => -props.rightOffset}px, ${props => props.topOffset}px, 0);
    }
`;

const GitLink = ({href='https://github.com/nboj/CS-Website/tree/main/home', className, blur=true, topOffset=0, rightOffset=0, text='View the source code here', theme='light'}) => {
    return (
        <Styles className={className} blur={blur} theme={theme} topOffset={topOffset} rightOffset={rightOffset}>
            <a href={href} target="_blank" rel='noreferrer'>{text}</a>
        </Styles>
    )
}

export default GitLink;
