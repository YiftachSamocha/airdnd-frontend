import { Link } from "react-router-dom"
import logoImg from "../assets/imgs/logo.png"
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

export function AppHeader() {
    const [isFolded, setIsFolded] = useState(false)
    const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())
    const [isExtaVisible, setIsExtraVisible] = useState(false)
    const mainFilterRef = useRef(null)
    const labelsFilterRef = useRef(null)
    const userInitiatedOpen = useRef(false)

    useEffect(() => {
        const handleScroll = () => {
            if (!isFolded && !userInitiatedOpen.current) {
                setIsFolded(true)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [isFolded])

    useEffect(() => {
        const handleClickOutside = (event) => {
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
    }, [isFolded])

    const handleMainFilterFoldedClick = () => {
        setIsFolded(false)
        userInitiatedOpen.current = true
    }

    return (
        <section className="app-header">
            <div className="main-header">
                <Link to={'/stay'} onClick={() => setFilterBy(stayService.getDefaultFilter())} className="logo"><img src={logoImg} /></Link>

                {isFolded && (
                    <div onClick={handleMainFilterFoldedClick}>
                        <MainFilterFolded filterBy={filterBy} />
                    </div>
                )}

                <div className="user-header">
                    <Link>Airdnd your home</Link>
                    <Link><img src={languageImg} /></Link>
                    <div>
                        <img src={hamburgerImg} />
                        <Link className="profile"><img src={profileImg} /></Link>
                    </div>
                </div>
            </div>

            {!isFolded && (
                <div ref={mainFilterRef}>
                    <MainFilter filterBy={filterBy} setFilterBy={setFilterBy} />
                </div>
            )}
            <hr />
            <div ref={labelsFilterRef} className="labels-container">
                <LabelsFilter filterBy={filterBy} setFilterBy={setFilterBy} />
                <button onClick={() => setIsExtraVisible(prev => !prev)} className="extra-button">
                    <img src={filterImg} alt="" />
                    Filters

                </button>
            </div>
            {isExtaVisible && <div className="layout">
                <ExtraFilter filterBy={filterBy} setFilterBy={setFilterBy} />
            </div>}

        </section>
    )
}
