import React, { useState } from 'react';
import AdjustIcon from '@mui/icons-material/Adjust';
import PropTypes from 'prop-types';
import GooglePlacesAutoComplete from 'react-google-places-autocomplete';
import { useMap } from './MapContext';
import { Box, IconButton } from '@mui/material';

function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const { updateMarkerPosition } = useMap();
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const getLatAndLong = (place) => {
    if (window.google && window.google.maps) {
      const placeId = place.value.place_id;
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      service.getDetails({ placeId }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place.geometry && place.geometry.location) {
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          updateMarkerPosition(location);  // Update position in context
        }
      });
    } else {
      console.error('Google Maps API not loaded correctly.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: '8px',
        backgroundColor: 'grey.200',
        borderRadius: '8px',
        marginTop: '12px',
        border: '2px solid transparent',
        transition: 'all 0.3s ease-in-out',
        '&:focus-within': {
          borderColor: 'black',
          boxShadow: 3,
        },
      }}
    >
      <IconButton sx={{ color: 'black' }} disableRipple>
        <AdjustIcon />
      </IconButton>
      <GooglePlacesAutoComplete 
        apiKey={apiKey}
        selectProps={{
          value,
          onChange: (place) => { getLatAndLong(place); setValue(place); },
          placeholder: type === 'source' ? 'Pickup Location' : 'Dropoff Location',
          isClearable: true,
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              width: '100%',
            }),
            input: (provided) => ({
              ...provided,
              color: 'black',
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'black',
            }),
          },
          components: {
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          },
        }}
      />
    </Box>
  );
}

InputItem.propTypes = {
  type: PropTypes.oneOf(['source', 'destination']).isRequired,
};

export default InputItem;