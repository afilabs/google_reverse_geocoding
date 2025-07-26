import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

// Components
import Icon from '~/components/Icon';

// Deps
import { getLatLng } from '~/utils';
import './Marker.scss';

const LocationMarker = ({ place }) => {
   const [position, setPosition] = useState(() => getLatLng(place.geometry.location));

   return (
      <AdvancedMarker draggable={false} zIndex={1} position={getLatLng(place.geometry.location)}>
         <Icon type="marker" />
      </AdvancedMarker>
   );
};

export default LocationMarker;
