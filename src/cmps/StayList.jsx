import { Link, useSearchParams } from "react-router-dom";
import { StayPreview } from "./StayPreview.jsx"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadStays } from "../store/actions/stay.actions.js";
import { StaySlider } from "./StaySlider.jsx";
import { format } from "date-fns";
import { formatDate } from "date-fns";

export function StayList() {
    const stays = useSelector(state => state.stayModule.stays)
    const filterBy = useSelector(state => state.stayModule.filterBy)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterUrl, setFilterUrl] = useState('')
    const [currStays, setCurrStays] = useState([])
    const [isFilterWhen, setFilterWhen] = useState(false)


    useEffect(() => {
        loadStays(filterBy)
            .then(stays => {
                const newState = stays.slice(0, 29)
                setCurrStays(newState)
            })
    }, [filterBy])

    useEffect(() => {
        constructLinkUrl()
        changeStayDates()
    }, [filterBy])


    function changeStayDates() {
        if (filterBy.when.startDate && filterBy.when.endDate) {
            setFilterWhen(true)
        } else setFilterWhen(false)
    }

    function constructLinkUrl() {
        let urlStr = '?'
        if (filterBy.who.adults) {
            urlStr += `adults=${filterBy.who.adults}&`;
        }
        if (filterBy.who.children) urlStr += `children=${filterBy.who.children}&`;
        if (filterBy.who.infants) urlStr += `infants=${filterBy.who.infants}&`;
        if (filterBy.who.pets) urlStr += `pets=${filterBy.who.pets}&`;

        if (filterBy.when.startDate) urlStr += `start_date=${format(filterBy.when.startDate, 'yyyy-MM-dd')}&`;
        if (filterBy.when.endDate) urlStr += `end_date=${format(filterBy.when.endDate, 'yyyy-MM-dd')}&`;

        urlStr = urlStr.endsWith('&') ? urlStr.slice(0, -1) : urlStr;
        setFilterUrl(urlStr)
    }

    const publishedStays = currStays.filter(stay => stay.status === 'published');
    return (<>
        <section className="stay-main-list">
            <ul className="stay-list">
                {publishedStays.map(stay => {
                    return (
                        <li key={stay._id}>
                            <Link to={`/stay/${stay._id}${filterUrl}`} >
                                <StayPreview stay={stay} isFilterWhen={isFilterWhen} />
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </section></>
    )
}