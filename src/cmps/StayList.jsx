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

    useEffect(() => {
        loadStays(filterBy)
    }, [filterBy])

    useEffect(() => {
        constructLinkUrl()
    }, [filterBy])


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

        // Remove trailing '&' if present
          urlStr = urlStr.endsWith('&') ? urlStr.slice(0, -1) : urlStr;
        setFilterUrl(urlStr)
    }

    return (<>
         <section className="stay-main-list">
            {/* <div>{filterBy.where.country}</div> */}
            <ul className="stay-list">
                {stays.map(stay => {
                    return (
                        <Link to={`/stay/${stay._id}${filterUrl}`} key={stay._id}>
                            <li>
                                <StayPreview stay={stay} />
                            </li>
                        </Link>
                    )
                })}
            </ul>
         </section></>
    )
}