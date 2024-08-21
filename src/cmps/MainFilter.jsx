import { Where } from "./MainFilterCmps/Where";
import { When } from "./MainFilterCmps/When";
import { Who } from "./MainFilterCmps/Who";
import { useState } from "react";
import searchImg from "../assets/imgs/search.png";
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export function MainFilter() {
    const [openType, setOpenType] = useState('')
    const [dates, setDates] = useState({
        startDate: null,
        endDate: null,
    })

    return <section className="main-filter" >
        <div onClick={() => setOpenType('where')} className="where-input">
            <label htmlFor="">Where</label>
            <input type="text" placeholder="Search destinations" />
            {openType === 'where' && <Where />}
        </div>

        <hr />


        <div className="when-input">
            <div onClick={() => setOpenType('when')} >
                <label htmlFor="">Cheak in</label>
                <input type="text" placeholder="Add dates"
                    value={dates.startDate ? format(dates.startDate, 'MMM dd') : ''} />
            </div>
            <hr />
            <div onClick={() => setOpenType('when')}>
                <label htmlFor="">Cheak out</label>
                <input type="text" placeholder="Add dates"
                    value={dates.endDate ? format(dates.endDate, 'MMM dd') : ''} />
            </div>
            {openType === 'when' && <When dates={dates} setDates={setDates} />}
        </div>

        <hr />

        <div onClick={() => setOpenType('who')} className="who-input">
            <div>
                <label htmlFor="">Who</label>
                <input type="text" placeholder="Add guests" />
            </div>
            {openType === 'who' && <Who />}
            <button> <img src={searchImg} /></button>
        </div>
    </section >

}