import tripsImg from '../assets/imgs/footer/trips.svg';
import hostImg from '../assets/imgs/footer/host.svg';
import exploreImg from '../assets/imgs/footer/explore.svg';
import tripsRedImg from '../assets/imgs/footer/tripsRed.svg';
import hostRedImg from '../assets/imgs/footer/hostRed.svg';
import exploreRedImg from '../assets/imgs/footer/exploreRed.svg';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { OutsideClick } from './OutsideClick';
import { LoginSignup } from './LoginSignup';

export function AppFooter() {
	const [selected, setSelected] = useState('explore')
	const currUser = useSelector(state => state.userModule.currUser)
	const [loginSignup, setLoginSignup] = useState(false)
	const location = useLocation()

	useEffect(() => {
		setSelected('explore')
	}, [currUser])

	useEffect(() => {
		if (location.pathname === '/host') setSelected('host')
		else if (location.pathname === '/trip') setSelected('trips')
		else setSelected('explore')
	}, [location])

	return (
		<footer className="app-footer">
			<Link to='/stay' onClick={() => setSelected('explore')}
				className={selected === 'explore' ? 'selected' : ''}>
				<img src={selected === 'explore' ? exploreRedImg : exploreImg} />
				<p>Explore</p>
			</Link>

			{currUser ? <><Link to={'/trip'} onClick={() => setSelected('trips')}
				className={selected === 'trips' ? 'selected' : ''}>
				<img src={selected === 'trips' ? tripsRedImg : tripsImg} />
				<p>Trips</p>
			</Link>

				<Link to={'/host'} onClick={() => setSelected('host')}
					className={selected === 'host' ? 'selected' : ''}>
					<img src={selected === 'host' ? hostRedImg : hostImg} />
					<p>Host</p>
				</Link>
			</>
				:
				<a onClick={() => { setSelected('login'); setLoginSignup('login') }}>
					<img src={hostImg} />
					<p>Log in</p>
				</a>}
			{loginSignup && <div className="layout">
				<OutsideClick onOutsideClick={() => setLoginSignup(null)}>
					<LoginSignup closeLoginsignup={() => setLoginSignup(null)} initalType={loginSignup} />
				</OutsideClick>
			</div>}
		</footer>
	)
}