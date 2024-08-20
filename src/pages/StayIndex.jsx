import { StayList } from '../cmps/StayList.jsx'

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