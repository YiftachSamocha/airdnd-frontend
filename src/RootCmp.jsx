import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { StayIndex } from './pages/StayIndex.jsx'
import { StayDetails } from './pages/StayDetails'
import { StayOrder } from './pages/StayOrder.jsx'
import { BecomeHost } from './pages/hostPages/BecomeHost.jsx'
import { AboutYourPlace } from './pages/hostPages/AboutYourPlace.jsx'
import { Trips } from './pages/Trips.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Host } from './pages/Host.jsx'
import { MainFilterMobile } from './pages/MainFilterMobile.jsx'

export function RootCmp() {
    const location = useLocation()
    const [isFooter, setIsFooter] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 743 && isFooter) {
                setIsFooter(false)
            } else if (window.innerWidth <= 743 && !isFooter) {
                setIsFooter(true)
            }
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [isFooter])

    const showFooter =
        location.pathname === '/' ||
        location.pathname === '/stay' ||
        location.pathname.startsWith('/host') ||
        location.pathname.startsWith('/trip')

    return (
        <div className="main-container">
            <main>
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="stay" element={<StayIndex />} />
                    <Route path="stay/:stayId" element={<StayDetails />} />
                    <Route path="book/stay/:stayId" element={<StayOrder />} />
                    <Route path="host" element={<Host />} />
                    <Route path="trip" element={<Trips />} />
                    <Route path="become-a-host/" element={<BecomeHost />} />
                    <Route path="/become-a-host/:userId/about-your-place/:stayId" element={<AboutYourPlace />} />
                    <Route path='/stay/filter-mobile' element={<MainFilterMobile />} />
                </Routes>
            </main>
            {showFooter && isFooter && <AppFooter />}
        </div>
    )
}
