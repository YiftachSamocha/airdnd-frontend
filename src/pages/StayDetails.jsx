import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { loadStay } from '../store/actions/stay.actions'
import { StayAmeneties } from '../cmps/DetailsCmps/StayAmeneties'
import { StayImage } from '../cmps/DetailsCmps/StayImage'
import { StayMainInfo } from '../cmps/DetailsCmps/StayMainInfo'
import { StayLocation } from '../cmps/DetailsCmps/StayLocation'
import { StayReview } from '../cmps/DetailsCmps/StayReview'
import { StayDate } from '../cmps/DetailsCmps/StayDate'
import { StayHost } from '../cmps/DetailsCmps/StayHost'
import { StayToKnow } from '../cmps/DetailsCmps/StayToKnow'


export function StayDetails() {

  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  if (!stay) return <div>Loading...</div>
  return (
    <section className="stay-details">
      <h1>{stay.name}</h1>
      <StayImage stay={stay}/>
      <StayMainInfo stay={stay}/>
      <StayAmeneties />
      <StayDate />
      <StayReview />
      <StayLocation />
      <StayHost />
      <StayToKnow />
    </section>
  )
}