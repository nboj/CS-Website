import styled from 'styled-components'
import Link from 'next/link'

const Styles = styled.div`
    & {
        position: absolute;
        top: 0;
        right: 0;
        color: white;
        margin: 10px;
    }
`;

const GitLink = ({href='/404'}) => {
    return (
        <Styles>
            <a href={href} target="_blank">View the code here</a>
        </Styles>
    )
}

export default GitLink;