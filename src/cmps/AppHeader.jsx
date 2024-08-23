import { Link } from "react-router-dom";
import logoImg from "../assets/imgs/logo.png";
import languageImg from "../assets/imgs/language.png";
import hamburgerImg from "../assets/imgs/hamburger.png";
import profileImg from "../assets/imgs/profile.png";
import { MainFilter } from "./MainFilter";
import { LabelsFilter } from "./LabelsFilter";


export function AppHeader() {
	return (
		<section className="app-header">
			<div className="main-header">
				<Link><img src={logoImg} alt="" /></Link>

				<div className="user-header">
					<Link>Airdnd your home</Link>
					<Link><img src={languageImg} /></Link>
					<div>
						<img src={hamburgerImg} />
						<Link className="profile"><img src={profileImg} /></Link>
					</div>

				</div>
			</div>
			<MainFilter />
			<LabelsFilter />


		</section>
	)
}
