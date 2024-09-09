import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { loadStay } from '../store/actions/stay.actions'
import { StayImage } from '../cmps/DetailsCmps/StayImage'
import { StayMainInfo } from '../cmps/DetailsCmps/StayMainInfo'
import { StayLocation } from '../cmps/DetailsCmps/StayLocation'
import { StayReview } from '../cmps/DetailsCmps/StayReview'
import { StayDate } from '../cmps/DetailsCmps/StayDate'
import { StayHost } from '../cmps/DetailsCmps/StayHost'
import { StayToKnow } from '../cmps/DetailsCmps/StayToKnow'
import { StayPayment } from '../cmps/DetailsCmps/StayPayment'
import { AppHeader } from '../cmps/AppHeader'
import { StayAmenities } from '../cmps/DetailsCmps/StayAmenities'
import { StayRooms } from '../cmps/DetailsCmps/stayRooms'
import { ModalCmp } from '../cmps/ModalCmp'
import { WhenDetails } from '../cmps/MainFilterCmps/WhenDetails'


export function StayDetails() {
  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [dates, setDates] = useState({ startDate: null, endDate: null })
  const [city, setCity] = useState('');

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  useEffect(() => {
    // Initialize dates and guests from search params
    const startDate = searchParams.get('start_date') ? new Date(searchParams.get('start_date')) : null;
    const endDate = searchParams.get('end_date') ? new Date(searchParams.get('end_date')) : null;
    const cityParam = searchParams.get('city') || ''

    setDates({ startDate, endDate })
    setCity(cityParam)

  }, [searchParams])

  function toggleModal(type) {
    setModalType(type)
    setIsModalOpen(prevState => !prevState)
    // setModalContent(type === 'description' ? stay.description : stay.amenities)
  }

  if (!stay) return <div>Loading...</div>
  return (
    <section className="stay-details">
      <AppHeader />
      <div className="main-content">
        <h1>{stay.name}</h1>
        <StayImage stay={stay} />
        <div className="details-container">
          <div className="content">
            <StayMainInfo stay={stay} toggleModal={toggleModal} isModalOpen={isModalOpen} />
            <StayRooms stay={stay} />
            <StayAmenities stay={stay} toggleModal={toggleModal} isModalOpen={isModalOpen} />
            <WhenDetails dates={dates} setDates={setDates} stay={stay} breakpoint={1200} />
          </div>

          <div className="payment-container">
            <StayPayment stay={stay} />
          </div>
        </div>

        <div className="more-content">
          <StayReview />
          <StayLocation />
          {/* <StayHost stay={stay} /> */}
          <StayToKnow stay={stay} />
        </div>

        {isModalOpen && (
          <ModalCmp onClose={() => toggleModal(null)} modalType={modalType} stay={stay}>
            {modalType === 'description' && (
              <div>
                <h2>About this place</h2>
                <p>{stay.description}</p>
              </div>
            )}
            {modalType === 'amenities' && (
              <div>
                <h2>What this place offers</h2>
                <div className="amenities-list">
                  {stay.amenities.map((amenity, index) => (
                    <div key={index}>{amenity}</div>
                  ))}
                </div>
              </div>
            )}
          </ModalCmp>
        )}
      </div>

    </section>
  )
}