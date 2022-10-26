// next/react components
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';

//other components
import styled from 'styled-components'; 
import useInterval from '../components/useInterval'; 

// assets
import background from '/public/background.jpg'; 
import DisplayLinks from '../components/DisplayLinks';

// my custom utility scripts
import utils from '../components/helper-classes/utils';
import Lab6 from '../components/helper-classes/Lab6';
import Lab7 from '../components/helper-classes/Lab7';
import Lab8 from '../components/helper-classes/Lab8';
import Lab9 from '../components/helper-classes/Lab9';
import GitLink from '../components/GitLink';

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

const defaultLinks = [
  {title: 'Lab #6', class: Lab6},
  {title: 'Lab #7', class: Lab7},
  {title: 'Lab #8', class: Lab8},
  {title: 'Lab #9', class: Lab9}
]

const Home = () => {  
  const [links, setLinks] = useState([])
  const [homeLink, setHomeLink] = useState() 

  const reset = (currentLab) => { 
    defaultLinks.map(item => {
      if (item.title == currentLab) { 
        item.current = true
      }
    })
    setLinks(defaultLinks)
    setHomeLink({
      href: 'https://web.cs.kent.edu/~cauman/',
      title: 'My Homepage',
      isLink: true
    })
    
  }

  useEffect(() => {
    reset('Lab #8') 
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


  const handleHomeLink = (e, href) => {  
    e.preventDefault()  
    if (href) {
      Router.push(href)
    } else {
      reset()
    }
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
      <GitLink theme='dark' href='https://github.com/nboj/CS-Website/blob/main/home/pages/index.js' />
    </Styles>
  );
}

export default Home;