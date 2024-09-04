import { useNavigate, useParams } from 'react-router';
// import logoBlack from '../assets/imgs/icons/logo-black.svg';


export function BecomeHost() {
    const videoSrc = 'https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high'
    const navigate= useNavigate()
    const {userId} = useParams()

    function handleNext() {
        navigate(`/become-a-host/${userId}/about-your-place`); // Correct navigation
    }

    return <section className="add-listing">
        <header>
            {/* <img src={logoBlack}></img> */}
        </header>
        <div className='main'>
            <div className="step-1">
                <div className='info'>
                    <span>step 1</span>
                    <h1>Tell us about <span> your place</span></h1>
                    <p>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.
                    </p>
                </div>
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

        <footer>
            <button className='btn-link'>Back</button>
            <button className='black' onClick={handleNext}>Next</button>
        </footer>

    </section>
}