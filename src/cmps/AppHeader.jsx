import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import bigLogoImg from "../assets/imgs/logo.svg"
import smallLogoImg from "../assets/imgs/small-icon.png"
import languageImg from "../assets/imgs/language.png"
import hamburgerImg from "../assets/imgs/hamburger.png"
import profileImg from "../assets/imgs/profile.png"
import filterImg from "../assets/imgs/filter.png"
import { MainFilter } from "./MainFilter"
import { useEffect, useState, useRef } from "react"
import { LabelsFilter } from "./LabelsFilter"
import { MainFilterFolded } from "./MainFilterFolded"
import { stayService } from "../services/stay"
import { ExtraFilter } from "./ExtraFilter"
import { OutsideClick } from "./OutsideClick"
import { store } from "../store/store"
import { SET_FILTER_BY } from "../store/reducers/stay.reducer"
import { useSelector } from "react-redux"
import { userService } from "../services/user"
import { LoginSignup } from "./LoginSignup"
import { addHostInfoToUser, logout } from "../store/actions/user.actions"

export function AppHeader() {
    const [isFolded, setIsFolded] = useState(false)
    const [isExtaVisible, setIsExtraVisible] = useState(false)
    const [isTop, setIsTop] = useState(true)
    const [isExtraBtnShown, setIsExtraBtnShown] = useState(false)
    const [logoImg, setLogoImg] = useState(bigLogoImg)
    const [isUserInfoOpen, setIsUserInfoOpen] = useState(false)
    const [loginSignup, setLoginSignup] = useState(null)
    const mainFilterRef = useRef(null)
    const labelsFilterRef = useRef(null)
    const userInitiatedOpen = useRef(false)
    const userInfoRef = useRef(null)
    const location = useLocation()
    const navigate = useNavigate()
    const filterBy = useSelector(state => state.stayModule.filterBy)
    const currUser = useSelector(state => state.userModule.currUser)
    const isStayPage = location.pathname.startsWith('/stay') || location.pathname === '/'

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setIsTop(true)
            } else {
                setIsTop(false)
                if (!isFolded && !userInitiatedOpen.current) {
                    setIsFolded(true)
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [isFolded])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isTop) return

            if (
                mainFilterRef.current &&
                !mainFilterRef.current.contains(event.target) &&
                labelsFilterRef.current &&
                !labelsFilterRef.current.contains(event.target)
            ) {
                setIsFolded(true)
            }
        }

        if (!isFolded) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isFolded, isTop])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                userInfoRef.current && !userInfoRef.current.contains(event.target)) {
                setIsUserInfoOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)


        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isUserInfoOpen])

    useEffect(() => {
        if (filterBy.where.city || filterBy.where.country || filterBy.when.startDate || filterBy.endDate || (filterBy.label && filterBy.label.label !== 'icons')
            || filterBy.who.infants > 0 || filterBy.who.adults > 0 || filterBy.infants > 0) {
            setIsExtraBtnShown(true)
        }
        else {
            setIsExtraBtnShown(false)
        }
    }, [filterBy])

    const handleMainFilterFoldedClick = () => {
        setIsFolded(false)
        userInitiatedOpen.current = true
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1130 && logoImg !== bigLogoImg) {
                setLogoImg(bigLogoImg)
            } else if (window.innerWidth <= 1130 && logoImg !== smallLogoImg) {
                setLogoImg(smallLogoImg)
            }
        };

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [logoImg])

    const handleHostLinkClick = async () => {
        if (!currUser.host) {
            navigate(`/become-a-host/${currUser._id}`);
        } else {
            // Navigate to the host's add listing page
            navigate(`/become-a-host/host`);
        }
    }

    return (
        <section className="app-header">
            <div className="main-header">
                <Link to={'/stay'} onClick={() => store.dispatch({ type: SET_FILTER_BY, filterBy: stayService.getDefaultFilter() })}
                    className="logo"><img src={logoImg} /></Link>
                {isFolded && (
                    <div onClick={handleMainFilterFoldedClick} style={isStayPage ? {} : { display: "none" }}>
                        <MainFilterFolded filterBy={filterBy} />
                    </div>
                )}

                <div className="user-header" >
                    {currUser && <p onClick={handleHostLinkClick}>Airdnd your home</p>}
                    <Link><img src={languageImg} /></Link>
                    <div className="user-profile" onClick={() => setIsUserInfoOpen(prev => !prev)}>
                        <img src={hamburgerImg} />
                        <div className="profile"> {!currUser ? <img src={profileImg} /> : <img src={currUser.imgUrl} />}</div>
                    </div>
                    {isUserInfoOpen &&
                        <div className="user-modal" ref={userInfoRef} >
                            {currUser ? <div>
                                <Link to={'/trip'}><p className="bolder">Trips</p></Link>
                                {currUser.host ? (
                                    <Link to={`/host`}><p className="bolder">Host</p></Link>
                                ) : (
                                    <p className="bolder" onClick={handleHostLinkClick}>Become a Host</p>
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

                </div>
            </div>

            {!isFolded && isStayPage && (
                <div ref={mainFilterRef}>
                    <MainFilter />
                </div>
            )}
            <hr className="main-hr" />
            <div ref={labelsFilterRef} className="labels-wrap"
                style={location.pathname === '/stay' || location.pathname === '/' ? {} : { display: "none" }}>
                <LabelsFilter />
                {isExtraBtnShown && <button onClick={() => setIsExtraVisible(prev => !prev)} className="extra-button">
                    <img src={filterImg} alt="" />
                    Filters

                </button>}
            </div>
            {isExtaVisible && <div className="layout">
                <OutsideClick onOutsideClick={() => setIsExtraVisible(prev => !prev)} >
                    <ExtraFilter closeExtra={() => setIsExtraVisible(prev => !prev)} />
                </OutsideClick>
            </div>}
            {(!isFolded && !isTop) && <div className="layout-main"></div>}

            {loginSignup && <div className="layout">
                <OutsideClick onOutsideClick={() => setLoginSignup(null)}>
                    <LoginSignup closeLoginsignup={() => setLoginSignup(null)} initalType={loginSignup} />
                </OutsideClick>
            </div>}


        </section>
    )
}
