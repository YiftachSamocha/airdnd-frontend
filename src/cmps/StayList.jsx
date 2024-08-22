import { Link } from "react-router-dom";
import { StayPreview } from "./StayPreview.jsx"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { loadStays } from "../store/actions/stay.actions.js";

export function StayList() {
    const stays = useSelector(state => state.stayModule.stays)
    const filterBy = useSelector(state => state.stayModule.filterBy)
    
    useEffect(() => {
        loadStays()
    }, [filterBy])

    return <section className="stay-main-list">
        <div>{filterBy.where.country}</div>
        <ul className="stay-list">
            {stays.map(stay => (
                <Link to={`/stay/${stay._id}`} key={stay._id}>
                    <li>
                        <StayPreview stay={stay} />
                    </li>
                </Link>
            ))}
        </ul>
    </section>
}

