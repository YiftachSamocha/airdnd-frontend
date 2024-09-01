import React from 'react'
import { Routes, Route } from 'react-router'
import { StayIndex } from './pages/StayIndex.jsx'
import { StayDetails } from './pages/StayDetails'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { StayOrder } from './pages/StayOrder.jsx'
import { Reservations } from './pages/Reservations.jsx'
// import { UserMsg } from './cmps/UserMsg.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
            {/* <UserMsg /> */}
            <main>
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="stay" element={<StayIndex />} />
                    <Route path="stay/:stayId" element={<StayDetails />} />
                    <Route path="book/stay/:stayId" element={<StayOrder />} />
                    <Route path="reservation/:hostId" element={<Reservations />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


