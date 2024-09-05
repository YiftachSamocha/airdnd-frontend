import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMap({ center, zoom , children}) {
        
    // const CustomMarker = ({ imgSrc, text }) => (
    //     <div className="custom-marker">
    //         <img src={imgSrc} alt={text} style={{ width: '100px', height: '100px' }} />
    //         {text && <div>{text}</div>}
    //     </div>
    // )
    
    const defaultProps = {
        center: {
            lat: 40.712776,  // Default to New York City coordinates
            lng: -74.005974
        },
        zoom: 11
    };

    const mapCenter = center.lat && center.lng ? center : defaultProps.center;
    const mapZoom = zoom || defaultProps.zoom;


    return (
        // Important! Always set the container height explicitly
        <div className="map" style={{ height: '70vh', width: '60vw' }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyDtYR9s32CUO3Bh1-xX2DZgEDySdtVjPZg",
                    libraries: ['places']
                }}
                center={mapCenter}
                zoom={mapZoom}
            >
         {/* <CustomMarker
                    lat={mapCenter.lat}
                    lng={mapCenter.lng}
                    imgSrc={mapIcon}  // Replace with your image URL
                /> */}
                {children}
            </GoogleMapReact>
        </div>
    );
}