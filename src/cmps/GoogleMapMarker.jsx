
export function GoogleMapMarker({ lat, lng, svg, outerCircleSize }) {

    return (
        <div className="google-map-marker">
            {/* Outer Circle */}
            <div
                className="outer-circle"
                style={{
                    width: `${outerCircleSize}px`,
                    height: `${outerCircleSize}px`
                }}
            >
                {/* Inner Circle */}
                <div className="inner-circle">
                    {/* SVG Icon */}
                    <div
                        className="marker-icon"
                        dangerouslySetInnerHTML={{ __html: svg }}
                    />
                </div>
            </div>

            {/* Optional Text Below Marker */}
            {/* {text && <div className="marker-text">{text}</div>} */}
        </div>
    );
}