import { useEffect, useState } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import perfectResponse from './perfectResponse.json'
import DrawRectangle, {
  DrawStyles
} from "mapbox-gl-draw-rectangle-restrict-area";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import DrawControl from "react-mapbox-draw-rectangle";

import { loadLocation } from './utils.js';
import './style.scss';


let color = 'rgba(64, 145, 220, 1)';
function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
  var R = 6378.137; // Radius of earth in KM
  var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
  var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
  Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d * 1000; // meters
}

let day = 108;
const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZW1pbmd1eWVuIiwiYSI6ImNrOGI2ZjRyODA1aHEzZG93cmFxaHR5d2IifQ.x8v_uFbdBanYgRtoKCGIOw',
  animationOptions: {
    essential: true
  },
  pitchWithRotate: false
});

let ourDraw = null;
let newCurrentPlot = null;
// CENTER LAT AND CENTER LNG are actual lat long btw
let objects = {};
const MapComponent = (props) => {
  const height = (props.sideBarPage !== 'map') ? '70vh' : '95vh';
  const bottom = (props.sideBarPage !== 'map') ? '11vh' : '0vh';
  const bottomtwo = (props.sideBarPage !== 'map') ? '0vh' : '0vh';
  const radius = (props.sideBarPage !== 'map') ? '6px' : '0';
  const left = (props.sideBarPage !== 'map') ? '6vw' : '5vw';
  const width = (props.sideBarPage !== 'map') ? '45vw' : '100vw';
  const right = (props.sideBarPage !== 'map') ? '-25vw' : '0vw';

  const [center, setCenter] = useState([-92.0717042, 42.0434796]);
  const [zoom, setZoom] = useState([13]);

  useEffect(() => {
    day = props.day;
  }, [props.day])

  const onMapLoad = (map) => {
    window.map = map;
  };

  const setObjects = (id, newObjects) => {
    objects[id] = newObjects;
    props.setNewObjects(obj => objects);
  }

  const onMapClick = async   (map, e) => {
    Object.values(objects).forEach(async(value) => {
      console.log(value);
      if (e.lngLat.lng < value.maxLat && e.lngLat.lat < value.maxLng && e.lngLat.lat > value.minLng && e.lngLat.lng > value.minLat) {
        const newNewCurrentPlot = {...value.currentPlot};
        newNewCurrentPlot.sqFt = Math.floor((value.width * value.length) / 3.2808);
        props.setCurrentPlot(
          newNewCurrentPlot
        );

       

        const data = perfectResponse;
        console.log(data);
        if (!data) throw new Error('Empty response from server');
        if (data.error) throw new Error(data.error.message);

        const environment = data.environment;
        const location = data.location;
        let grade = 'A';
        if (environment.environmentGrade < 2) {
          grade = 'F';
        } else if (environment.environmentGrade < 5) {
          grade = 'D'
        } else if (environment.environmentGrade < 7) {
          grade = 'C'
        } else if (environment.environmentGrade < 9) {
          grade = 'B'
        }
        let grade2 = 'A';
        if (location.locationGrade < 2) {
          grade2 = 'F';
        } else if (location.locationGrade < 5) {
          grade2 = 'D'
        } else if (location.locationGrade < 7) {
          grade2 = 'C'
        } else if (location.locationGrade < 9) {
          grade2 = 'B'
        }
        props.setEnvironmentDescription(environment.environmentDescription);
        props.setEnvironmentScore(grade);
        props.setLocationDescription(location.locationDescription);
        props.setLocationScore(grade2);

        const insights = data.insights;

        let soilTemp = null;
        let soilMoisture = null;
        const soil = insights.soilLatest.data;
        if (soil.length > 0) {
          soilTemp = Math.floor(soil[0]['soil_temperature'] * 1.8000 + 32.00);
          soilMoisture = soil[0]['soil_moisture'];
        }

        const fire = insights.fireLatest.data;
        let fireStatus = null;
        if (fire.length > 0) {
          if (fire[0].confidence === 'low') {
            fireStatus = 'Low';
          } else if (fire[0].confidence === 'nominal') {
            fireStatus = 'Medium';
          } else {
            fireStatus = 'High';
          }
        }

        let pollenStatus = null;
        const pollen = insights.pollenForecast.data;
        if (pollen.length > 0) {
          pollenStatus = pollen[0]['Risk']['grass_pollen'];
        }

        let airQualityStatus = null;
        const airQuality = insights.airQuality.stations;
        if (airQuality.length > 0) {
          airQualityStatus = airQuality[0];
        }

        props.setAnalysis({
          fire: fireStatus,
          pollen: pollenStatus,
          soilTemp: soilTemp,
          soilMoisture: soilMoisture,
          waterVapor: '51%',
          airQuality: airQualityStatus
        })
      }
    })
  }

  const onMouseMove = (map, e) => {
    let cursor = 'default';
    Object.values(objects).forEach((value) => {
      if (e.lngLat.lng < value.maxLat && e.lngLat.lat < value.maxLng && e.lngLat.lat > value.minLng && e.lngLat.lng > value.minLat) {
        value.model.scale.x = 1.02;
        value.model.scale.z = 1.02;
        cursor = 'pointer';
      } else {
        value.model.scale.x = 1;
        value.model.scale.z = 1;
      }
    })
    document.body.style.cursor = cursor;
  }

  useEffect(() => {
    newCurrentPlot = props.currentPlot;
    if (props.currentPlot && props.currentPlot.type === 'crop') { 
      if (props.currentPlot.state === 'Spring' || props.currentPlot.state === 'Summer') {
        color = 'rgba(39, 174, 96, 1)';
      } else {
        color = 'rgba(237, 193, 81, 1)';
      }
    } else {
      color = 'rgba(64, 145, 220, 1)';
    }
  }, [props.currentPlot]);

  const onDrawCreate = ({ features }) => {
    console.log(features);
    if (features.length >= 1) {
      let maxLat = -1;
      let maxLng = -1;
      let minLat = 1000;
      let minLng = 1000;
      for (let i = 0; i < features[0].geometry.coordinates[0].length; i++) {
        maxLat = Math.max(Math.abs(features[0].geometry.coordinates[0][i][0]), maxLat);
        maxLng = Math.max(Math.abs(features[0].geometry.coordinates[0][i][1]), maxLng);
        minLat = Math.min(Math.abs(features[0].geometry.coordinates[0][i][0]), minLat);
        minLng = Math.min(Math.abs(features[0].geometry.coordinates[0][i][1]), minLng);
      }
      const width = measure(0, maxLat, 0, minLat);
      const length = measure(maxLng, 0, minLng, 0);

      let centerLat = (maxLat + minLat) / 2;
      let centerLng = (maxLng + minLng) / 2;
      if (features[0].geometry.coordinates[0][0][0] < 0) {
        centerLat = -centerLat;
        const newMinLat = -maxLat;
        maxLat = -minLat;
        minLat = newMinLat;
      }
      if (features[0].geometry.coordinates[0][0][1] < 0) {
        centerLng = -centerLng;
        const newMinLng = -maxLng;
        maxLng = -minLng;
        minLng = newMinLng;
      }
      
      if (window.map && newCurrentPlot) {
        console.log(features[0].id);
        loadLocation(window.map, centerLat, centerLng, features[0].id, width, length, color, minLat, maxLat, minLng, maxLng, newCurrentPlot, day, setObjects)
      }

      if (ourDraw && features[0].id) {
        const currentId = features[0].id;
        setTimeout(() => {
          ourDraw.draw.delete(currentId)
        }, 1000);
      }
    }
  };

  const onDrawUpdate = ({ features }) => {
    console.log(features);
  };

  return (
    <div style={{
      position: 'absolute',
      left: left,
      height: height,
      transition: '1s',
      overflow: 'hidden',
      width: width,
      bottom: bottom,
      borderRadius: radius,
    }}>
    <Map
      antialias={false}
      containerStyle={{
        borderRadius: radius,
        bottom: bottomtwo,
        height: '92vh',
        right: right,
        overflow: 'hidden',
        position: 'absolute',
        transition: '1s',
        width: '100vw',
      }}
      center={center}
      flyToOptions={{
        speed: 0
      }}
      onClick={onMapClick}
      onStyleLoad={onMapLoad}
      onMouseMove={onMouseMove}
      pitch = {[50]}
      // eslint-disable-next-line
      style="mapbox://styles/mapbox/satellite-v9"
      zoom = {zoom}
    >
      <DrawControl
        userProperties={true}
        position={'top-right'}
        displayControlsDefault={false}
        modes={{
          draw_rectangle: DrawRectangle,
        }}
        modesConfig={{
          draw_rectangle: {
            areaLimit: 50 * 1_000_000, // 50+ km2, optional
            escapeKeyStopsDrawing: true, // default true
            allowCreateExceeded: false, // default false
            exceedCallsOnEachMove: false, // default false - calls exceedCallback on each mouse move
            title: "Rectangle tool (p)"
          }
        }}
        ref={(drawControl) => {
          props.setDraw(drawControl);
          ourDraw = drawControl;
         }}
        styles={DrawStyles}
        onDrawCreate={onDrawCreate}
      ></DrawControl>
    </Map>
    </div>
  );
}

export default MapComponent;