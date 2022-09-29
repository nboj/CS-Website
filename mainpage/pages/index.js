import styled from 'styled-components';
import Image from 'next/image';

// assets
import background from '../assets/page-backdrop.jpg';
import C from '../assets/C.png';
import S from '../assets/S.png';

const Styles = styled.div`
  & {
    @import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap');
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url(${background.src});
    width: 100vw;
    height: 100vh;
    background-size: cover;
  }
`;

const StartButton = styled.button`
  & { 
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 27.4px;
    gap: 27.4px; 
    width: 185px;
    height: 151px;
    background: radial-gradient(49.64% 49.64% at 50.36% 50.36%, #2674B3 0%, rgba(55, 111, 156, 0.6) 0.01%, rgba(11, 64, 106, 0.58) 51.56%, rgba(40, 91, 133, 0.68) 100%);
    border: 2px solid #83ACFF;
    border-radius: 59px;
  }
`;

const NameText = styled.h1`
 & {
  font-family: 'Koulen';
  font-style: normal;
  font-weight: 400;
  font-size: 60px;
  line-height: 108px;
  letter-spacing: 0.19em; 
  color: #FFFFFF;
 }
`;

const Home = () => {
  return (
    <Styles> 
      <NameText>Christian Auman</NameText>
      <div className="w-full flex justify-center gap-x-36 items-center">
        <Image src={C.src} width={428} height={428} />
        <StartButton>
          <svg width="99" height="99" viewBox="0 0 99 99" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M49.4999 68.3333L68.3333 49.5M68.3333 49.5L49.4999 30.6667M68.3333 49.5L30.6666 49.5M96.5833 49.5C96.5833 75.5034 75.5034 96.5833 49.5 96.5833C23.4966 96.5833 2.41663 75.5034 2.41663 49.5C2.41663 23.4966 23.4966 2.41666 49.5 2.41666C75.5034 2.41666 96.5833 23.4966 96.5833 49.5Z" stroke="#FCFDFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg> 
        </StartButton>
        <Image src={S.src} width={428} height={428} />
      </div>
    </Styles>
  )
}

export default Home;