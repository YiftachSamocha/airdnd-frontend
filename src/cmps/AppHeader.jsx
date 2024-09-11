import { Link, useLocation } from "react-router-dom"
import bigLogoImg from "../assets/imgs/logo.svg"
import smallLogoImg from "../assets/imgs/small-icon.png"
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
import { LoginSignup } from "./LoginSignup"
import { UserInfoBtn } from "./UserInfoBtn"

export function AppHeader() {
    const [isFolded, setIsFolded] = useState(false)
    const [isExtaVisible, setIsExtraVisible] = useState(false)
    const [isTop, setIsTop] = useState(true)
    const [isExtraBtnShown, setIsExtraBtnShown] = useState(false)
    const [logoImg, setLogoImg] = useState(bigLogoImg)
    const [loginSignup, setLoginSignup] = useState(null)
    const mainFilterRef = useRef(null)
    const labelsFilterRef = useRef(null)
    const userInitiatedOpen = useRef(false)
    const location = useLocation()
    const filterBy = useSelector(state => state.stayModule.filterBy)
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
                <UserInfoBtn setLoginSignup={setLoginSignup} />
            </div >

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
