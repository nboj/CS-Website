import {useMemo, useRef, useState} from "react"
import {GoogleMap, MarkerF, useLoadScript} from "@react-google-maps/api"
import styled from 'styled-components'
import {Box, CircularProgress, Popover} from "@mui/material"
import Image from 'next/image'
import path from 'path'
import {promises as fs} from 'fs'
import styles from '../../../styles/lab-9.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import {motion} from 'framer-motion'
import Head from "next/head"
import Back from '../../../components/Back'
import GitLink from '../../../components/GitLink'

const PopoverStyles = styled.div`
  --radius: 8px;

  & {
    position: relative;
    font-family: "Segoe UI", sans-serif;
    font-size: 0.8rem;
    display: grid;
    place-content: center;
    height: 100%;
    width: 100%;
    padding: 10px;
    gap: 10px;
  }

  & .img-container {
    position: relative;
    width: 100%;
    height: 100px;

    &, img {
      //border-top-left-radius: var(--radius);
      //border-top-right-radius: var(--radius);
      border-radius: var(--radius);
    }

    --shadow-color: 0deg 0% 63%;
    --shadow-elevation-high: 0px 0.2px 0.2px hsl(var(--shadow-color) / 0.3),
    -0.1px 0.6px 0.6px -0.5px hsl(var(--shadow-color) / 0.28),
    -0.1px 1.1px 1.1px -1px hsl(var(--shadow-color) / 0.25),
    -0.2px 1.9px 1.8px -1.5px hsl(var(--shadow-color) / 0.23),
    -0.3px 3.3px 3.2px -2.1px hsl(var(--shadow-color) / 0.21),
    -0.5px 5.5px 5.3px -2.6px hsl(var(--shadow-color) / 0.18),
    -0.8px 8.7px 8.4px -3.1px hsl(var(--shadow-color) / 0.16),
    -1.1px 13.1px 12.6px -3.6px hsl(var(--shadow-color) / 0.14);
    box-shadow: var(--shadow-elevation-high);
  }

  & p {
    color: #343a40;
    font-weight: 500;
  }

  & a {
    color: #0077b6;
    position: relative;
    display: block;
    width: fit-content;
    font-weight: 400;
  }

  @keyframes anim {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  & a:hover::after {
    content: '';
    display: block;
    position: absolute;
    height: 1px;
    background-color: #0077b6;
    animation: anim 0.1s ease-out forwards;
  }

  //& >* {
  //margin: 5px 20px;
  //}

  & h1 {
    font-weight: 700;
    font-size: 1rem;
    line-height: 120%;
  }

  & .close-icon {
    display: block;
    transform-origin: center;
    top: 0;
    right: 0;
    font-size: 1rem;
  }

  & .close-container {
    --shadow-color: 0deg 0% 57%;
    --shadow-elevation-high: 0px 0px 0px hsl(var(--shadow-color) / 0),
    -0.1px 1.3px 2px hsl(var(--shadow-color) / 0.7),
    -0.2px 4.1px 6.2px hsl(var(--shadow-color) / 1);
    display: block;
    position: absolute;
    box-shadow: var(--shadow-elevation-high);
    //border: 1px solid black;
    border-radius: 100% var(--radius) 100% 100%;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
    z-index: 20;
    cursor: pointer;
    transform-origin: center;
    top: 0;
    right: 0;
    font-size: 1rem;
    padding: 5px;
  }

  & .popover-image {
    object-fit: cover;
    object-position: center;
  }
`;

const GitStyles = styled.div`
  --shadow-color: 0deg 0% 0%;
  --shadow-elevation-high:
          0px 0px 0px hsl(var(--shadow-color) / 0.05),
          0px 0.6px 0.8px -0.5px hsl(var(--shadow-color) / 0.1),
          -0.1px 2px 2.7px -1px hsl(var(--shadow-color) / 0.16);

  & .git-link {
    background: white;
    box-shadow: var(--shadow-elevation-high);
	color: black;
    text-decoration: none;
  }
`

const BackStyles = styled.div`
  --shadow-color: 0deg 0% 0%;
  --shadow-elevation-high:
          0px 0px 0px hsl(var(--shadow-color) / 0.05),
          0px 0.6px 0.8px -0.5px hsl(var(--shadow-color) / 0.1),
          -0.1px 2px 2.7px -1px hsl(var(--shadow-color) / 0.16);
  & .back {
	box-shadow: var(--shadow-elevation-high);
    background: white;
    padding: 10px 15px;

  }
`

const GoogleMaps = (props) => {
	const [loaded, setLoaded] = useState(false)
	const {isLoaded} = useLoadScript({
		// googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
		googleMapsApiKey: 'AIzaSyAHFjv8_S4Nx_MF5q0eypFXhjEy0sLrY0k'
	});
	if (isLoaded)
		setTimeout(() => {
			setLoaded(true)
		}, 1000)
	return (
		<div>
			<Head>
				<title>Google API</title>
			</Head>
			<GitStyles>
				<GitLink href='https://github.com/nboj/CS-Website/blob/main/home/pages/lab-9/google-api/index.js' className='git-link' theme='light' rightOffset={50} links={[
					{href: 'https://github.com/nboj/CS-Website/blob/main/home/pages/lab-9/google-api/index.js', text: 'Source code'},
				]}/>
			</GitStyles>
			{
				!loaded
					? <Box sx={{width: '100%', height: '100vh', display: 'grid', placeContent: 'center'}}>
						<CircularProgress/>
					</Box>
					: <Map {...props}/>
			}
			<BackStyles>
				<Back className='back'/>
			</BackStyles>
		</div>
	
	)
}


function Map(props) {
	const center = useMemo(() => ({lat: 41.149090, lng: -81.342712}), []);
	const [popOpen, setPopOpen] = useState(false)
	const [anchorEl, setAnchorEl] = useState()
	const popRef = useRef(null)
	const [currentData, setCurrentData] = useState(props.markers[0])
	const closeVariants = {
		initial: {
			// rotate: '0deg',
			scale: 1,
		},
		1: {
			color: '#ef233c',
			scale: 1.3,
			// rotate: '90deg',
		},
	}
	
	const handleMarkerClick = (e, index) => {
		// console.log(e)
		setCurrentData(props.markers[index])
		setAnchorEl(e.domEvent.path[0])
		setPopOpen(true)
	}
	
	const handleClose = () => {
		setPopOpen(false)
	}
	
	return (
		<GoogleMap zoom={10} ref={popRef} center={center} mapContainerClassName={styles.mapContainer}>
			<Popover
				open={popOpen}
				onClose={handleClose}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				classes={{
					paper: styles.popover
				}}
			>
				<PopoverStyles>
					<motion.div
						variants={closeVariants}
						initial='initial'
						className='close-container'
						onClick={handleClose}
						whileHover={'1'}
						transition={{
							type: 'spring',
							stiffness: 600,
							damping: 10,
							mass: 1,
						}}
					>
						<CloseIcon className='close-icon'/>
					</motion.div>
					<div className='img-container'>
						{currentData.imgSrc ? <Image alt={currentData.imgAlt} layout='fill' className='popover-image'
													 src={currentData.imgSrc}/> : ''}
					</div>
					<h1 dangerouslySetInnerHTML={{__html: currentData.name}}/>
					<p dangerouslySetInnerHTML={{__html: currentData.description}}/>
				</PopoverStyles>
			</Popover>
			{
				props.markers.map((item, index) => (
					<MarkerF
						key={`marker${index}`}
						position={item.latLng}
						onClick={(e) => handleMarkerClick(e, index)}
						title={item.name}
					/>
				))
			}
		</GoogleMap>
	);
}

export async function getStaticProps() {
	const filePath = path.join(process.cwd(), 'data', 'marker-data.json');
	const jsonData = await fs.readFile(filePath)
	let data = JSON.parse(jsonData)
	if (data)
		data = data.markers
	// const data = JSON.parse(jsonData)
	// console.log(data)
	return {
		props: {
			markers: data
		}
	}
}

export default GoogleMaps;
