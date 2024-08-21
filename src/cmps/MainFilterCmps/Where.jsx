import flexibleImg from '../../assets/imgs/labels/flexible.jpg'
import europeImg from '../../assets/imgs/labels/europe.jpeg';
import italyImg from '../../assets/imgs/labels/italy.jpeg';
import unitedStatesImg from '../../assets/imgs/labels/united-states.jpg';
import greeceImg from '../../assets/imgs/labels/greece.jpg';
import southAmericaImg from '../../assets/imgs/labels/south-america.jpg';

export function Where() {
    const optionalAreas = [
        { txt: 'Im flexible', img: flexibleImg },
        { txt: 'Europe', img: europeImg },
        { txt: 'Italy', img: italyImg },
        { txt: 'United States', img: unitedStatesImg },
        { txt: 'Greece', img: greeceImg },
        { txt: 'South America', img: southAmericaImg }
    ]

    return <div className="where">
        <h3>Search by region</h3>
        <div >
            {optionalAreas.map(area => {
                return <div>
                    <img src={area.img} alt="" />
                    <p>{area.txt}</p>
                </div>
            })}
        </div>

    </div>

}