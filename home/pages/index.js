// next/react components
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';

//other components
import styled from 'styled-components'; 
import useInterval from '../components/useInterval';
import CircularProgress from '@mui/material/CircularProgress';

// assets
import background from '/public/background.jpg'; 
import DisplayLinks from '../components/DisplayLinks';

import Lab7 from '../components/Lab7';
import Lab6 from '../components/Lab6';

const Styles = styled.div`
  & {
    color: white;
  }

  & .night-background {
    background-image: url(${background.src});
    background-size: cover;
    background-position: center;
    height: 100vh;
  } 
  & .title {
    font-weight: 700; 
    font-size: 32px;
    width: 100%;  
    margin: 21px 0;
  }

  & .link-button { 
      display: block;
      background-color: #80ed99;
      text-decoration: none;
      color: #212529;
      font-weight: 300;
      border-radius: 5px; 
      width: fit-content;
      height: fit-content;
      padding: 10px 15px;
      cursor: pointer;
      transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 500ms;
  }

  & .link-button:hover {
      background: #5fc978;
      transform: scale(1.1);
  }

  & .link-button:active {
      background: #5fc977c9;
      transform: scale(1); 
      transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 100ms;
  }

  & .list-style-none {
      list-style: none;
  }

  & .display-block {
      display: block;
  }

  & .gap-10 {
      gap: 10px;
  } 

  & .list-gap-10>* {
      margin-top: 10px;
      margin-bottom: 10px;
  }
 
  & header {
    width: 100%;
    height: 100vh;
  }

  & .inner-header >* {
    margin: 10px 0;
  }

  & .inner-header {
      background-color: #38a3a588;
      padding: 10px 50px;
      backdrop-filter: blur(20px);
      border-radius: 30px; 
      height: 50%;
  }
  
`;

const Home = () => { 
  const [formattedDate, setFormattedDate] = useState(null);
  const [formattedTime, setFormattedTime] = useState(null);
  const [links, setLinks] = useState([])
  const [homeLink, setHomeLink] = useState({})
  useInterval(() => {
    let current = new Date();
    let fullHours = current.getHours()
    let hours = fullHours;
    let suffix; 
    if (fullHours > 13) {
      hours = fullHours - 12;
      suffix = 'pm';
    } else if (fullHours < 1) {
      hours = 12;
      suffix = 'am';
    } else {
      suffix = 'am';
    }
    let seconds = current.getSeconds().toString().padStart(2, '0');
    let minutes = current.getMinutes().toString().padStart(2, '0');
    setFormattedDate(`${current.toDateString()}`)
    setFormattedTime(`${hours}:${minutes}:${seconds + suffix}`);
  }, 1000)

  const reset = () => {
    setLinks([
      {href: 'lab-6', title: 'Lab #6', class: Lab6},
      {href: 'lab-7', title: 'Lab #7', class: Lab7},
    ])
    setHomeLink({
      href: 'https://web.cs.kent.edu/~cauman/',
      title: 'My Homepage'
    })
    
  }

  useEffect(() => {
    reset()
  }, [])

  const handleLink = (e, links, index) => {
    e.preventDefault() 
    const link = links[index]
    if (link.link) {
      Router.push(`${links[index].href}`)
    } else {
      setLinks(links[index].class.GetLinks())  
      setHomeLink({
        href: '/',
        title: 'Home'
      })
    }
  }


  const handleHomeLink = (e) => { 
    e.preventDefault()
    reset()
  }

  return (
    <Styles>
      <Head>
        <title>CS 10051</title>
      </Head>
      <DisplayLinks 
        onClick={handleLink}
        onHomeClick={handleHomeLink}
        links={links} 
        homeLink={homeLink}
      />
    </Styles>
  );
}

export default Home;