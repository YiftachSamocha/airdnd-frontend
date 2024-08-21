import {StayPreview} from "./StayPreview.jsx"

export function StayList({ stays }) {
    return <section className="stay-main-list">
        <ul className="stay-list">
            {stays.map(stay =>
                <li key={stay._id}>
                    <StayPreview stay={stay} />
                </li>)}
        </ul>
    </section>
}

