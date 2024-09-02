import tripsImg from '../assets/imgs/footer/trips.svg';
import reservationsImg from '../assets/imgs/footer/reservations.svg';
import exploreImg from '../assets/imgs/footer/explore.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function AppFooter() {
	const [selected, setSelected] = useState('explore')
	const id = 'xhRANH'

	return (
		<footer className="app-footer">
			<Link to='/stay' onClick={() => setSelected('explore')}
				className={selected === 'explore' ? 'selected' : ''}>
				<img src={exploreImg} />
				<p>Explore</p>
			</Link>

			<Link to={'/trips/' + id} onClick={() => setSelected('trips')}
				className={selected === 'trips' ? 'selected' : ''}>
				<img src={tripsImg} />
				<p>Trips</p>
			</Link>

			<Link to={'/reservation/' + id} onClick={() => setSelected('reservations')}
				className={selected === 'reservations' ? 'selected' : ''}>
				<img src={reservationsImg} />
				<p>Reservations</p>
			</Link>

		</footer>
	)
}