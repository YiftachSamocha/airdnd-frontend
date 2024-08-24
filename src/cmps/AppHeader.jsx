import { Link } from "react-router-dom";
import logoImg from "../assets/imgs/logo.png";
import languageImg from "../assets/imgs/language.png";
import hamburgerImg from "../assets/imgs/hamburger.png";
import profileImg from "../assets/imgs/profile.png";
import { MainFilter } from "./MainFilter";
import { useEffect, useState } from "react";
import { LabelsFilter } from "./LabelsFilter";
import { MainFilterFolded } from "./MainFilterFolded";

export function AppHeader() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [window.scrollY])


	return (
		<section className="app-header">
			<div className="main-header">
				<Link className="logo"><img src={logoImg} /></Link>

				{ <MainFilterFolded filterBy={filterBy}/>}
				<div className="user-header">
					<Link>Airdnd your home</Link>
					<Link><img src={languageImg} /></Link>
					<div>
						<img src={hamburgerImg} />
						<Link className="profile"><img src={profileImg} /></Link>
					</div>

				</div>
			</div>

			{<MainFilter filterBy={filterBy} setFilterBy={setFilterBy} />}
			<hr />
			<LabelsFilter filterBy={filterBy} setFilterBy={setFilterBy} />

		</section>
	)
}
