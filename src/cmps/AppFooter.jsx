import tripsImg from '../assets/imgs/footer/trips.svg';
import hostImg from '../assets/imgs/footer/host.svg';
import exploreImg from '../assets/imgs/footer/explore.svg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { OutsideClick } from './OutsideClick';
import { LoginSignup } from './LoginSignup';

export function AppFooter() {
	const [selected, setSelected] = useState('explore')
	const currUser = useSelector(state => state.userModule.currUser)
	const [loginSignup, setLoginSignup] = useState(false)

	useEffect(() => {
		setSelected('explore')
	}, [currUser])

	return (
		<footer className="app-footer">
			<Link to='/stay' onClick={() => setSelected('explore')}
				className={selected === 'explore' ? 'selected' : ''}>
				<img src={exploreImg} />
				<p>Explore</p>
			</Link>

			{currUser ? <><Link to={'/trip'} onClick={() => setSelected('trips')}
				className={selected === 'trips' ? 'selected' : ''}>
				<img src={tripsImg} />
				<p>Trips</p>
			</Link>

				<Link to={'/host'} onClick={() => setSelected('host')}
					className={selected === 'host' ? 'selected' : ''}>
					<img src={hostImg} />
					<p>Host</p>
				</Link>
			</>
				:
				<div to={'/host'} onClick={() => { setSelected('login'); setLoginSignup('login') }}
					className={selected === 'login' ? 'selected' : ''}>
					<img src={hostImg} />
					<p>Log in</p>
				</div>}
				{loginSignup && <div className="layout">
                <OutsideClick onOutsideClick={() => setLoginSignup(null)}>
                    <LoginSignup closeLoginsignup={() => setLoginSignup(null)} initalType={loginSignup} />
                </OutsideClick>
            </div>}
		</footer>
	)
}