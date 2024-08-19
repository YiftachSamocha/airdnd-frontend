import {StayPreview} from "./StayPreview.jsx"

export function StayList({ stays }) {
    return <section>
        <ul className="stay-list">
            {stays.map(stay =>
                <li className="stay-preview" key={stay._id}>
                    <StayPreview stay={stay} />
                </li>)}
        </ul>
    </section>
}