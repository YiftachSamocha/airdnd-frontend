import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { StayIndex } from './pages/StayIndex.jsx'
import { StayDetails } from './pages/StayDetails'
import { StayOrder } from './pages/StayOrder.jsx'
import { Reservations } from './pages/Reservations.jsx'
import { BecomeHost } from './pages/BecomeHost.jsx'

import { Trips } from './pages/Trips.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

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
        location.pathname.startsWith('/reservation') ||
        location.pathname.startsWith('/trip')

    return (
        <div className="main-container">
            {/* {showHeader && <AppHeader />} */}
            <main>
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="stay" element={<StayIndex />} />
                    <Route path="stay/:stayId" element={<StayDetails />} />
                    <Route path="book/stay/:stayId" element={<StayOrder />} />
                    <Route path="reservation" element={<Reservations />} />
                    <Route path="trip" element={<Trips />} />
                    <Route path="become-a-host/:guestId" element={<BecomeHost />} />

                </Routes>
            </main>
            {showFooter && isFooter && <AppFooter />}
        </div>
    )
}
