import { useNavigate, useParams } from 'react-router';
import logoBlack from '../../assets/imgs/icons/logo-black.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addStay } from '../../store/actions/stay.actions';
import { addHostInfoToUser, addStayToHost } from '../../store/actions/user.actions';


export function BecomeHost() {
    const videoSrc = 'https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high'
    const navigate = useNavigate()
    const { userId } = useParams()
    const dispatch = useDispatch()

    const loggedinUser = useSelector((state) => state.userModule.currUser)
    const hostToAdd = { ...loggedinUser.host, fullname: loggedinUser.fullname, _id: loggedinUser._id, imgUrl: loggedinUser.imgUrl }
    const stay = {
        name: '',
        imgs: [],
        sleep: { bedroom: '', bathrooms: '', beds: '', maxCapacity: '' },
        description: `You'll always remember your time at this unique place to stay.`,
        highlights: '',
        price: { night: 128, cleaning: 5 },
        type: '',
        amenities: [],
        labels: [],
        reservedDates: [],
        host: hostToAdd,
        location: { country: '', city: '', lat: '', lng: '' },
        reviews: [],
        thingsToKnow: {},
        status: 'draft',
    }

    async function handleNext() {
        try {
            if (!loggedinUser.host) addHostInfoToUser(loggedinUser) // No need to recreate hostDetails, just use the function

            const savedStay = await addStay(stay)
            await addStayToHost(savedStay._id)
            navigate(`/become-a-host/${userId}/about-your-place/${savedStay._id}`)

        } catch (err) {
            console.error('Error during Next flow:', err)
        }
    }

    return <section className="become-host">
        <header>
            <img src={logoBlack}></img>
        </header>
        <div className='main'>
            <div className="step-1">

                <div className='info'>
                    <span>step 1</span>
                    <h1>Tell us about <span> your place</span></h1>
                    <p>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.
                    </p>
                </div>
                <div className='video-container'>
                    <video
                        data-testid="video-player"
                        className="v6iu1id dir dir-ltr"
                        autoPlay
                        crossOrigin="anonymous"
                        muted
                        playsInline
                        preload="auto"
                        src={videoSrc}
                        controls
                    >
                    </video>
                </div>

            </div>
        </div>

        <footer>
            <button className='btn-link'>Back</button>
            <button className='black' onClick={handleNext}>Next</button>
        </footer>

    </section>
}