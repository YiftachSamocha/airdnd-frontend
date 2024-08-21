import { useState } from "react";
import searchImg from "../assets/imgs/search.png";
import flexibleImg from '../assets/imgs/labels/flexible.jpg';
import europeImg from '../assets/imgs/labels/europe.jpeg';
import italyImg from '../assets/imgs/labels/italy.jpeg';
import unitedStatesImg from '../assets/imgs/labels/united-states.jpg';
import greeceImg from '../assets/imgs/labels/greece.jpg';
import southAmericaImg from '../assets/imgs/labels/south-america.jpg';
export function MainFilter() {
    const [openType, setOpenType] = useState('')
    const optionalAreas = [
        { txt: 'Im flexible', img: flexibleImg },
        { txt: 'Europe', img: europeImg },
        { txt: 'Italy', img: italyImg },
        { txt: 'United States', img: unitedStatesImg },
        { txt: 'Greece', img: greeceImg },
        { txt: 'South America', img: southAmericaImg }
    ]

    return <section className="main-filter" >
        <div onClick={() => setOpenType('where')}>
            <label htmlFor="">Where</label>
            <input type="text" placeholder="Search destinations" />

            {openType === 'where' && <div className="where">
                <h3>Search by region</h3>
                <div >
                    {optionalAreas.map(area => {
                        return <div>
                            <img src={area.img} alt="" />
                            <h4>{area.txt}</h4>
                        </div>
                    })}
                </div>

            </div>}
        </div>

        
        <hr />
        <div onClick={() => setOpenType('when')}>
            <label htmlFor="">Cheak in</label>
            <input type="text" placeholder="Add dated" />
        </div>
        <hr />
        <div onClick={() => setOpenType('when')}>
            <label htmlFor="">Cheak out</label>
            <input type="text" placeholder="Add dated" />
        </div>
        <hr />
        <div onClick={() => setOpenType('who')}>
            <label htmlFor="">Who</label>
            <input type="text" placeholder="Add guests" />

        </div>
        <button> <img src={searchImg} /></button>

        {openType === 'when' && <div>when</div>}
        {openType === 'who' && <div>who</div>}



    </section>

}