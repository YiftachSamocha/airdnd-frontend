import { useSelector } from 'react-redux'
import { StayList } from '../cmps/StayList.jsx'
import { useEffect } from 'react'
import { loadStays } from '../store/actions/stay.actions.js'

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)

    useEffect(() => {
        loadStays()
    }, [])

    return <section>
        <h2>Hello!</h2>
        <StayList stays={stays}/>
    </section>

}