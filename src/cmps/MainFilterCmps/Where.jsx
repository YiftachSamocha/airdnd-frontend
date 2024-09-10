import locationImg from '../../assets/imgs/location.png'
import flexibleImg from '../../assets/imgs/countries/flexible.jpg';
import { getData } from '../../services/data/stay.data';

export function Where({ input, setInput }) {
    const locations = getData('locations')
    const countryLocations = locations.filter(location => location.img)
    countryLocations.unshift({ country: 'Im flexible', city: '', lat: 0, lng: 0, img: flexibleImg })


    function getOptionalLocs(value) {
        return locations.filter(location =>
            location.country.toLowerCase().includes(value.toLowerCase()) ||
            location.city.toLowerCase().includes(value.toLowerCase()) ||
            (location.city + ', ' + location.country).toLowerCase().includes(value.toLowerCase())
        )
    }

    return <section className='where'>
        {input === ''
            ?
            <div className='where-areas' >
                <h5>Search by region</h5>
                <div >
                    {countryLocations.map(location => {
                        return <div key={location.img} onClick={() => setInput(location)} className='area-item'>
                            <img src={location.img} alt="" />
                            <p>{location.country}</p>
                        </div>
                    })}
                </div>
            </div>
            :
            <ul className='where-cities'>
                {getOptionalLocs(input).map(location => {
                    return <li key={location.lat} onClick={() => setInput(location)}>
                        <div><img src={locationImg} alt="" /></div>
                        <p>
                            {location.country !== 'Im flexible' && <span>{location.city}, </span>}
                            <span>{location.country}</span>
                        </p>
                    </li>
                })}
            </ul>

        }

    </section>


}