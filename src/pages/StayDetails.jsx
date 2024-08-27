import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
import { StayAmenities } from '../cmps/DetailsCmps/stayAmenities'


export function StayDetails() {

  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  if (!stay) return <div>Loading...</div>
  return (
    <section className="stay-details">
      <AppHeader />
      <h1>{stay.name}</h1>
      <StayImage stay={stay} />
      <StayMainInfo stay={stay} />
      <StayAmenities stay={stay} />
      <StayDate />
      <StayReview />
      <StayLocation />
      <StayHost />
      <StayToKnow />
    </section>
  )
}