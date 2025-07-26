import { AdvancedMarker, InfoWindow, Pin, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

// Deps
import { getLatLng } from '~/utils';
import './Marker.scss';

const DraggableMarker = ({ place, reversePlace, onDragEnd }) => {
   const [position, setPosition] = useState(() => getLatLng(place.geometry.location));
   const [infoOpen, setInfoOpen] = useState(false);
   const [markerRef, marker] = useAdvancedMarkerRef();

   const handleDragEnd = (e) => {
      const location = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setPosition(location);
      onDragEnd(location);
   };

   useEffect(() => {
      setPosition(getLatLng(place.geometry.location));
      setInfoOpen(true);
   }, [place]);

   return (
      <>
         <AdvancedMarker
            ref={markerRef}
            draggable={true}
            zIndex={2}
            position={position}
            onDragEnd={handleDragEnd}
            onClick={() => setInfoOpen((prev) => !prev)}
         >
            <Pin />
         </AdvancedMarker>

         {infoOpen && marker && (
            <InfoWindow
               anchor={marker}
               onCloseClick={() => setInfoOpen(false)}
               headerContent={<h4>{reversePlace?.formatted_address}</h4>}
            >
               <div className="info-location">
                  {position.lat}, {position.lng}
               </div>
            </InfoWindow>
         )}
      </>
   );
};

export default DraggableMarker;
