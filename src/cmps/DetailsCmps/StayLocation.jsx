import { useState } from "react";
import { GoogleMap } from "../GoogleMap";
import { GoogleMapMarker } from "../GoogleMapMarker";

export function StayLocation({ stay }) {
    const [zoomLevel, setZoomLevel] = useState(13);
    const [outerCircleSize, setOuterCircleSize] = useState(75); // Initial size for the outer circle   

    const stayLocationSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
    <style type="text/css">
      .st0 {
        fill: white;
        stroke: white;
        stroke-width: 2;
        stroke-miterlimit: 10;
      }
    </style>
    <g>
      <path class="st0" d="M29,82h13V63.1c0-1.7,1.3-3,3-3h10.3c1.7,0,3,1.3,3,3V82H71c1.7,0,3-1.3,3-3V43.2c0-0.8-0.3-1.6-0.9-2.1l-21-21c-1.2-1.2-3.1-1.2-4.2,0l-21,21c-0.6,0.6-0.9,1.3-0.9,2.1V79C26,80.7,27.3,82,29,82z"/>
    </g>
  </svg>
`
    const stayLocation = {
        lat: stay.location.lat,
        lng: stay.location.lng
    }

    // Use the onChange callback to capture changes in zoom or center
    function calculateCircleSize(zoomLevel) {
        const baseSize = 75; // Smaller starting size for the circle
        const scaleFactor = Math.pow(1.7, zoomLevel - 12); // Adjust scaling sensitivity
        const calculatedSize = baseSize * scaleFactor;

        // Ensure the circle doesn't go below 48px
        return Math.max(48, calculatedSize);    }

    function handleMapChange({ zoom }) {
        setZoomLevel(zoom);

        // Dynamically calculate and update the outer circle size based on zoom
        const newOuterCircleSize = calculateCircleSize(zoom);
        setOuterCircleSize(newOuterCircleSize);

    }

    return <section className="stay-location">
        <div className="details">
            <h2>Where you’ll be</h2>
            <p>{stay.location.city}, {stay.location.country}</p>
        </div>
        <GoogleMap center={stayLocation} zoom={zoomLevel}
           onMapChange={handleMapChange}
        >

            <GoogleMapMarker
                lat={stayLocation.lat}
                lng={stayLocation.lng}
                svg={stayLocationSVG}  // Pass the SVG here
                // zoom={zoomLevel}
                outerCircleSize={outerCircleSize} // Pass the dynamic size of the outer circle
            />
            {/* </div> */}
        </GoogleMap>
    </section>

}