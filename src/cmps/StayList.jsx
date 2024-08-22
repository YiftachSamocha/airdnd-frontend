import { Link } from "react-router-dom";
import { StayPreview } from "./StayPreview.jsx"

export function StayList({ stays }) {
    return <section className="stay-main-list">
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

