import locationImg from '../../assets/imgs/location.png'
import { getData } from '../../services/stay.data';

export function Where({ input, setInput }) {
    const locations = getData('locations')
    const countryLocations= locations.filter(location=> location.img)


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

            <div >
                <h3>Search by region</h3>
                <div >
                    {countryLocations.map(location => {
                        return <div key={location.img} onClick={() => setInput(location)}>
                            <img src={location.img} alt="" />
                            <p>{location.country}</p>
                        </div>
                    })}
                </div>
            </div>
            :
            <ul>
                {getOptionalLocs(input).map(location => {
                    return <li key={location.lat} onClick={() => setInput(location)}>
                        <img src={locationImg} alt="" />
                        <p><span>{location.city}</span>, <span>{location.country}</span></p>
                    </li>
                })}
            </ul>

        }

    </section>


}