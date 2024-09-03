// import logoBlack from '../assets/imgs/icons/logo-black.svg'

export function AboutYourPlace() {
    const videoSrc = 'https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high'

    return <div className="step-1">
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
}