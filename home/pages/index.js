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
`;

const defaultLinks = [
  {title: 'Lab #6', class: Lab6},
  {title: 'Lab #7', class: Lab7},
  {title: 'Lab #8', class: Lab8},
  {title: 'Lab #9', class: Lab9, current: true},
  {href: '/random-test', title: 'Random Test', link: true}
]

const Home = () => {  
  const [links, setLinks] = useState([])
  const [homeLink, setHomeLink] = useState() 

  const reset = () => {
    setLinks(defaultLinks)
    setHomeLink({
      href: 'https://web.cs.kent.edu/~cauman/',
      title: 'My Homepage',
      isLink: true
    })
    
  }

  useEffect(() => {
    reset()
  }, [])

  const handleLink = async (e, links, index) => {
    e.preventDefault() 
    const link = links[index]
    if (link.link) {
      await Router.push(`${links[index].href}`)
    } else {
      setLinks(links[index].class.GetLinks())  
      setHomeLink({
        href: '/',
        title: 'Home'
      })
    }
  }


  const handleHomeLink = async (e, href) => {
    e.preventDefault()  
    if (href) {
      await Router.push(href)
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
      <GitLink theme='dark' href='https://github.com/nboj/CS-Website/blob/main/home/components/useTypewriter.js' rightOffset={200} blur={true} text='View custom typwriter effect src code' />
    </Styles>
  );
}

export default Home;
