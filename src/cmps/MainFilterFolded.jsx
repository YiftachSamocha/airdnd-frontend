import { format } from "date-fns"
import { useEffect, useState } from "react"
import searchImg from "../assets/imgs/search.png";

export function MainFilterFolded({ filterBy }) {
    const [filterValues, setFilterValues] = useState({ where: 'anywhere', when: 'any week', who: 'add guests' })

    useEffect(() => {
        if (filterBy && filterBy.where && filterBy.when && filterBy.who) {
            const newFilter = {
                where: filterBy.where.city,
                // when: format(filterBy.when.startDate, 'MMMM d') - format(filterBy.when.endDate, 'MMMM d'),
                who: filterBy.who.adults + filterBy.who.children + filterBy.who.infants,
                when: 'bulbul'
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