import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns';

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
  const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
  const [monthsAmount, setMonthsAmount] = useState(2);

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  useEffect(() => {
    // Any side effect or actions that should occur when isModalOpen changes
    if (isModalOpen) {
        // Modal opened, apply necessary styles or logic
        console.log('Modal is now open')
    } else {
        // Modal closed, apply necessary styles or logic
        console.log('Modal is now closed')
    }
}, [isModalOpen])

  useEffect(() => {
    // Initialize dates and guests from search params
    const startDate = searchParams.get('start_date') ? new Date(searchParams.get('start_date')) : null
    const endDate = searchParams.get('end_date') ? new Date(searchParams.get('end_date')) : null
    const cityParam = searchParams.get('city') || ''

    setDates({ startDate, endDate })
    setCity(cityParam)

  }, [searchParams])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // Handling `monthsAmount` for both regular flow and payment
      setMonthsAmount(prev => ({
        regular: width <= 1200 ? 1 : 2,    // Set monthsAmount for regular flow based on 1200px
        payment: width <= 743 ? 12 : 2    // Set monthsAmount for payment based on 743px
      }));
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  function toggleModal(type) {
    setModalType(type)
    setIsModalOpen(prevState => !prevState)
    // setModalContent(type === 'description' ? stay.description : stay.amenities)
  }
  
  function onSetDates(newDates) {
    console.log(newDates)
    // debugger
    setDates(newDates)

    const params = new URLSearchParams(searchParams)

    if (newDates.startDate) {
      const formattedStartDate = format(newDates.startDate, 'yyyy-MM-dd')
      params.set('start_date', formattedStartDate)
    } else {
      params.delete('start_date')
    }

    if (newDates.endDate) {
      const formattedEndDate = format(newDates.endDate, 'yyyy-MM-dd')
      params.set('end_date', formattedEndDate)
    } else {
      params.delete('end_date')
    }

    setSearchParams(params)
  }

  function groupItemsByType(items) {
    console.log(items)
            return items.reduce((acc, item) => {
                const type = item.type || 'Other'
                if (!acc[type]) acc[type] = []
                acc[type].push(item)
                return acc
            }, {})
        }
    
        // Render grouped amenities
        function renderGroupedAmenities(items) {
          console.log(items, 'items')
            const groupedItems = groupItemsByType(items)
    
            return Object.keys(groupedItems).map((type, index) => (
                <div key={index} className="modal-group">
                    <h3>{type}</h3>
                    {groupedItems[type].map((item, i) => (
                        <div key={i} className={`item ${i}`}>
                            <div>
                                {item.imgUrl && (
                                    <img src={item.imgUrl} alt={item.name || 'Image'} className="modal-details-icon" />
                                )}
                                <span>{item.name || item.text || item.toString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ))
        }

  if (!stay) return <div>Loading...</div>
  return (
    <section className="stay-details">
      <AppHeader />
      <div className="main-content">
        <h1>{stay.name}</h1>
        {stay.imgs && <StayImage stay={stay} />}
        <div className="details-container">
          <div className="content">
            <StayMainInfo stay={stay} toggleModal={toggleModal} isModalOpen={isModalOpen} />
            {stay.sleep && <StayRooms stay={stay} />}
            {stay.amenities && (
              <StayAmenities stay={stay} toggleModal={toggleModal} isModalOpen={isModalOpen} />
            )}
            <WhenDetails 
            dates={dates} 
            onSetDates={onSetDates} 
            stay={stay} 
            breakpoint={1200}
            monthsAmount={monthsAmount.regular}
            type="regular"
             />
          </div>

          <div className="payment-container">
            <StayPayment 
            stay={stay} 
            onSetDates={onSetDates} 
            dates={dates}
            monthsAmount={monthsAmount.payment}
            />
          </div>
        </div>

        <div className="more-content">
          {stay.reviews && <StayReview stay={stay}/>}
          {stay.location && <StayLocation stay={stay} />}
          {stay.host && <StayHost stay={stay}/>}
          {stay.thingsToKnow && <StayToKnow stay={stay} />}
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
                  {renderGroupedAmenities(stay.amenities)}
                </div>
              </div>
            )}
          </ModalCmp>
        )}
      </div>

    </section>
  )
}