import { APIProvider } from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import GoogleMap from '~/components/GoogleMap';
import SearchBox from '~/components/SearchBox';

// Deps
import './App.scss';

function App() {
   const [autocompletePlace, setAutocompletePlace] = useState(null);
   const [reversePlace, setReversePlace] = useState(null);

   const handleSearchPlace = async ({ lat, lng }) => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reverse-geocode`, {
         params: { lat, lng },
      });

      if (res.data && res.data.results) {
         const nearestPlace = res.data.results?.find((place) => !place.plus_code);
         setReversePlace(nearestPlace);
      }
   };

   const handleDragEnd = (location) => {
      handleSearchPlace(location);
   };
   // Reset reverse place
   useEffect(() => {
      if (autocompletePlace) {
         setReversePlace(autocompletePlace);
      }
   }, [autocompletePlace]);

   return (
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
         <div className="App">
            <SearchBox onSelectAutocompletePlace={setAutocompletePlace} />

            <GoogleMap
               autocompletePlace={autocompletePlace}
               reversePlace={reversePlace}
               onDragEnd={handleDragEnd}
            />
         </div>
      </APIProvider>
   );
}

export default App;
