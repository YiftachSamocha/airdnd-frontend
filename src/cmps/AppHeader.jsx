import { Link, useLocation, useNavigate } from "react-router-dom"
import bigLogoImg from "../assets/imgs/logo.svg"
import smallLogoImg from "../assets/imgs/small-icon.png"
import filterImg from "../assets/imgs/filter.png"
import smallFilterImg from "../assets/imgs/filter-small.svg"
import searchMobileImg from "../assets/imgs/search-mobile.svg"
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
import { format } from "date-fns"
import { debounce } from "lodash"

export function AppHeader() {
    const [isFolded, setIsFolded] = useState(false)
    const [isExtraVisible, setIsExtraVisible] = useState(false)
    const [isTop, setIsTop] = useState(true)
    const [isExtraBtnShown, setIsExtraBtnShown] = useState(false)
    const [logoImg, setLogoImg] = useState(bigLogoImg)
    const [loginSignup, setLoginSignup] = useState(null)
    const [isNarrow, setIsNarrow] = useState(window.innerWidth < 743)
    const mainFilterRef = useRef(null)
    const labelsFilterRef = useRef(null)
    const userInitiatedOpen = useRef(false)
    const location = useLocation()
    const filterBy = useSelector(state => state.stayModule.filterBy)
    const isStayPage = location.pathname.startsWith('/stay') || location.pathname === '/'
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            setIsNarrow(window.innerWidth < 743)
            if (isNarrow) setIsFolded(true)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        const handleScroll = debounce(() => {
            if (window.scrollY === 0) {
                if (!isTop) setIsTop(true)
                if (isFolded && !userInitiatedOpen.current) setIsFolded(false)
            } else {
                if (isTop) setIsTop(false)
                if (!isFolded && !userInitiatedOpen.current) setIsFolded(true)
            }
        }, 100)
    
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        };
    }, [isFolded, isTop])

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
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [logoImg])

    function createMobileString(type) {
        if (type === 'who') {
            const sum = filterBy.who.adults + filterBy.who.children + filterBy.who.infants
            if (sum < 1) return ''
            return sum + ' guests'
        } else if (type === 'when') {
            if (!filterBy.when.startDate || !filterBy.when.endDate) return ''
            return format(filterBy.when.startDate, 'MMM d') + ' - ' + format(filterBy.when.endDate, 'MMM d')
        }
    }


    return (
        <>
            <section className="app-header">
                {!isNarrow && <div className="main-header">
                    <Link to={'/stay'}
                        onClick={() => store.dispatch({ type: SET_FILTER_BY, filterBy: stayService.getDefaultFilter() })}
                        className="logo"><img src={logoImg} /></Link>
                    {isFolded && (
                        <div onClick={handleMainFilterFoldedClick} style={isStayPage ? {} : { display: "none" }}>
                            <MainFilterFolded />
                        </div>
                    )}
                    <UserInfoBtn setLoginSignup={setLoginSignup} />
                </div >}

                {!isFolded && isStayPage && !isNarrow && (
                    <div ref={mainFilterRef}>
                        <MainFilter />
                    </div>
                )}
                <div className="mobile-filter-cont">{isNarrow && isStayPage && <div onClick={() => navigate('/stay/filter-mobile')} className="mobile-filter">
                    <img src={searchMobileImg} />
                    <div>
                        <input type="text" value={filterBy.where.country} placeholder="Where to?" readOnly />
                        <div>
                            <input type="text" value={createMobileString('when')} placeholder="Any week" readOnly
                                style={filterBy.when.startDate && filterBy.when.endDate && { width: '100px' }} />
                            <span>·</span>
                            <input type="text" value={createMobileString('who')} placeholder="Add guests" readOnly />
                        </div>
                    </div>
                </div>}
                    {isExtraBtnShown && isNarrow && isStayPage && <button onClick={() => setIsExtraVisible(prev => !prev)} className="extra-button small">
                        <img src={smallFilterImg} />
                    </button>}
                </div>
                <hr className="main-hr" />
                <div ref={labelsFilterRef} className="labels-wrap"
                    style={location.pathname === '/stay' || location.pathname === '/' ? {} : { display: "none" }}>
                    <LabelsFilter />
                    {isExtraBtnShown && !isNarrow && <button onClick={() => setIsExtraVisible(prev => !prev)} className="extra-button">
                        <img src={filterImg} alt="" />
                        Filters
                    </button>}
                </div>
                {(location.pathname === '/' || location.pathname === '/stay') && <hr className="main-hr" />}
                {isExtraVisible && <> <div className="layout"> </div>
                    <OutsideClick onOutsideClick={() => setIsExtraVisible(prev => !prev)} className="extra-outside">
                        <ExtraFilter closeExtra={() => setIsExtraVisible(prev => !prev)} />
                    </OutsideClick>
                </>}


                {loginSignup && <div className="layout">
                    <OutsideClick onOutsideClick={() => setLoginSignup(null)}>
                        <LoginSignup closeLoginsignup={() => setLoginSignup(null)} initalType={loginSignup} />
                    </OutsideClick>
                </div>}
            </section>
            {(!isFolded && !isTop) && <div className="layout-main"
                style={{ top: location.pathname.startsWith('/stay/') && '182px' }}></div>}
        </>
    )
}
