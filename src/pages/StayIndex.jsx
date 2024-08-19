import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays } from '../store/actions/stay.actions'
import { StayList } from '../cmps/StayList'

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    // const filterBy = useSelector(storeState => storeState.toyModule.filterBy)



    // useEffect(() => {
    //     loadStays(filterBy)
    // }, [filterBy])

    return (
        <StayList stays={stays} />
    )
}