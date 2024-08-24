import { Link } from "react-router-dom"
import logoImg from "../assets/imgs/logo.png"
import languageImg from "../assets/imgs/language.png"
import hamburgerImg from "../assets/imgs/hamburger.png"
import profileImg from "../assets/imgs/profile.png"
import { MainFilter } from "./MainFilter"
import { useEffect, useState, useRef } from "react"
import { LabelsFilter } from "./LabelsFilter"
import { MainFilterFolded } from "./MainFilterFolded"
import { stayService } from "../services/stay"

export function AppHeader() {
    const [isFolded, setIsFolded] = useState(false)
    const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())
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
                <div onClick={() => setFilterBy(stayService.getDefaultFilter())} className="logo">
                    <img src={logoImg} />
                </div>

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
            <div ref={labelsFilterRef}>
                <LabelsFilter filterBy={filterBy} setFilterBy={setFilterBy} />
            </div>
        </section>
    )
}
