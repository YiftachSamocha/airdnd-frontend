import { useNavigate } from "react-router"
import { logout } from "../store/actions/user.actions"
import languageImg from "../assets/imgs/language.png"
import hamburgerImg from "../assets/imgs/hamburger.png"
import profileImg from "../assets/imgs/profile.png"
import { OutsideClick } from "./OutsideClick"
import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


export function UserInfoBtn({ setLoginSignup }) {
    const currUser = useSelector(state => state.userModule.currUser)
    const [isInfoOpen, setIsInfoOpen] = useState(false)
    const navigate = useNavigate()
    const userInfoRef= useRef(null)

    return <div className="user-header" >
        {currUser && <p onClick={() => navigate(`/become-a-host`)}>Airdnd your home</p>}
        <Link><img src={languageImg} /></Link>
        <div className="user-profile" onClick={() => setIsInfoOpen(prev => !prev)}>
            <img src={hamburgerImg} />
            <div className="profile"> {!currUser ? <img src={profileImg} /> : <img src={currUser.imgUrl} />}</div>
        </div>
        <OutsideClick onOutsideClick={() => setIsInfoOpen(false)}>
            {isInfoOpen && <div className="user-modal" ref={userInfoRef} >
                {currUser ? <div>
                    <Link to={'/trip'}><p className="bolder">Trips</p></Link>
                    {currUser.host ? (
                        <Link to={`/host`}><p className="bolder">Host</p></Link>
                    ) : (
                        <p className="bolder" onClick={() => navigate(`/become-a-host`)}>Become a Host</p>
                    )}
                    <Link to="/stay"><p onClick={() => logout()} >Log Out</p></Link>
                </div>
                    :
                    <div>
                        <p onClick={() => setLoginSignup('login')} >Log in</p>
                        <p onClick={() => setLoginSignup('signup')}>Sign up</p>
                    </div>
                }
            </div>}
        </OutsideClick>

    </div>

}
