import { format } from "date-fns"
import { useEffect, useState } from "react"
import searchImg from "../assets/imgs/search.png";
import { useSelector } from "react-redux";

export function MainFilterFolded() {
    const filterBy = useSelector(state => state.stayModule.filterBy)
    const [filterValues, setFilterValues] = useState({ where: 'anywhere', when: 'any week', who: 'add guests' })

    useEffect(() => {
        if (filterBy) {
            const where = filterBy.where.city === '' ? 'anywhere' : filterBy.where.city
            let when
            if (filterBy.when.startDate && filterBy.when.endDate) {
                when = format(filterBy.when.startDate, 'MMMM d') + ' - ' + format(filterBy.when.endDate, 'MMMM d')
            } else when = 'any week'
            let who = filterBy.who.adults + filterBy.who.children + filterBy.who.infants
            who = who === 0 ? 'add guests' : who + ' guests'
            const newFilter = {
                where,
                when,
                who
            }

            setFilterValues(newFilter)
        }
    }, [filterBy])
    return <section className='main-filter-folded' >
        <div>{filterValues.where}</div>
        <div>{filterValues.when}</div>
        <div>{filterValues.who}
            <button > <img src={searchImg} /></button>
        </div>
    </section >
}