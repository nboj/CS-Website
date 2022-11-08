// next/react components
import {useEffect, useState} from 'react';

//other components
import styled from 'styled-components';
import useInterval from '../components/useInterval';
import CircularProgress from '@mui/material/CircularProgress';
import {AnimatePresence, LayoutGroup, motion} from 'framer-motion'

// assets
import background from '/public/background.jpg';

// my components
import useTypewriter from '../components/useTypewriter'

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
    background: #12E2C2;
    text-decoration: none;
    color: #212529;
    font-weight: 400;
    border-radius: 5px;
    width: fit-content;
    height: fit-content;
    padding: 10px 15px;
    cursor: pointer;
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 500ms;
  }

  & .link-button:hover {
    background: #12E2C2;
    transform: scale(1.1);
  }

  & .link-button:active {
    background: #12E2C2;
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

  & .list-gap-10 > * {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  & header {
    width: 100%;
    height: 100vh;
  }

  & .inner-header > * {
    margin: 10px 0;
  }

  & .inner-header {
    background-color: #38a3a588;
    padding: 10px 50px;
    backdrop-filter: blur(20px);
    border-radius: 30px;
    height: fit-content;
  }
  & .name {
    color: #12E2C2;
	font-weight: 700;
  }

`;

const words = [
	"pet lover...",
	"game developer...",
	"web developer...",
	"gamer...",
	"varsity soccer player...",
	"coffee addict...",
	"pizza lover...",
	"motivated, determined...",
	"hard worker...",
	"creative...",
	"photographer...",
	"videographer...",
	"adventurous...",
	"graphic designer...",
	"adaptable..."
]

const DisplayLinks = ({links, homeLink, ...props}) => {
	const [formattedDate, setFormattedDate] = useState(null);
	const [formattedTime, setFormattedTime] = useState(null);
	const [word, setWord] = useState('')
	const value = useTypewriter({words: words, initiate: true})
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
	useEffect(() => {
		value.then((res) => {
			setWord(res.word)
		})
	}, [value])
	const variants = {
		initial: {
			opacity: 0,
			color: '#12E2C2',
			scaleY: 0,
			scaleX: 0.8,
			transformOrigin: 'right',
			x: 3,
			y: 5,
		},
		anim: {
			opacity: 1,
			scaleX: 1,
			scaleY: 1,
			x: 0,
			y: 0,
		}
	}
	return (
		<Styles>
			<header className="w-full h-full flex flex-col justify-center items-center m-0 night-background">
				<div className="inner-header flex flex-col w-fit">
					<div className="flex flex-col w-full">
						<h1 className="title">My cs10051 Lab Work</h1>
						<h2 className='text-2xl name'>Christian Auman</h2>
						<LayoutGroup>
							
							<h2 key='typewriter-container' className='text-xl'>
								19 years old, computer scientist,&nbsp;
								<span>{Array.from(word).map((item, index) => (
									item === ' '
									? <span key={`typewriter${index}`}>&nbsp;</span>
									: <motion.div
										className='inline-block'
										key={`typewriter${index}`}
										variants={variants}
										initial='initial'
										animate='anim'
										transition={{
											type: 'spring',
											mass: 1,
											stiffness: 100,
											damping: 12,
											bounce: 0,
											opacity: {
												type: 'spring',
												mass: 1,
												stiffness: 280,
												damping: 120
											}
										}}
									>
										{item}
									</motion.div>
								))}
								<motion.div
									className='inline-block'
									layout={'position'}
									transition={{
										type: 'spring',
										mass: 0.1,
										stiffness: 216,
										damping: 14
									}}
								>
									❚
								</motion.div>
							</span>
							</h2>
						</LayoutGroup>
					</div>
					<div>
						<motion.a onClickCapture={(e) => homeLink && homeLink.isLink ? props.onHomeClick(e, homeLink.href) : props.onHomeClick(e)}
						   href={homeLink && homeLink.isLink ? homeLink.href : ''}><p
							className="link-button">{homeLink ? homeLink.title : ''}</p></motion.a>
					</div>
					<h3>This webpage contains access to folders that will contain html files I create in my cs10051 labs</h3>
					<ul key='link-container' className="list-style-none gap-10 flex flex-col flex-wrap w-fit" style={{height: 170}}>
						<AnimatePresence mode='wait' initial={false}>
							{
								links.map((item, index) => {
									return (
										<motion.li
											initial={{
												opacity: 0,
												x: 100
											}}
											animate={{
												opacity: 1,
												x: 0
											}}
											exit={{
												opacity: 0,
												x: -20
											}}
											key={`${item.href}/${index}`}
											className='w-fit'
											transition={{
												type: 'spring',
												mass: 0.1,
												stiffness: 449,
												damping: 31,
											}}
										>
											<div onClickCapture={(e) => props.onClick(e, links, index)}><span
												id={index}
												style={item.current ? {
													backgroundColor: '#ffca3a',
													color: 'white',
													fontWeight: 500,
													border: '1px solid yellow'
												} : {}}
												className='link-button'>{item.title}</span>
											</div>
										</motion.li>
									)
								})
							}
						</AnimatePresence>
					</ul>
					<div>
						{
							formattedDate && formattedTime
								? <div><p><b>Date:&nbsp;&nbsp;</b>{formattedDate}</p><p>
									<b>Time:&nbsp;&nbsp;</b>{formattedTime}</p></div>
								: <CircularProgress sx={{color: '#cad2c5'}}/>
						}
					</div>
				</div>
			</header>
		</Styles>
	);
}

export default DisplayLinks;
