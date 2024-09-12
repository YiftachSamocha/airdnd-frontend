import GoogleMapReact from 'google-map-react';

export function GoogleMap({ center, zoom , children, onMapChange}) {
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
        <div className="map"> 
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyDtYR9s32CUO3Bh1-xX2DZgEDySdtVjPZg",
                    libraries: ['places']
                }}
                center={mapCenter}
                zoom={mapZoom}
                onChange={onMapChange} 
            >
                {children}
            </GoogleMapReact>
        </div>
    )
}