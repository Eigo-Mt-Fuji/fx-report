import React, {useEffect,useState, useRef} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, {NavigationControl, Source, Layer, WebMercatorViewport} from 'react-map-gl';

import {MyPlaygroundMapProps} from '../../types';

import bbox from '@turf/bbox';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
let geocoder: any|null = null;

const MyPlaygroundMap: (props: MyPlaygroundMapProps) => any = (props: MyPlaygroundMapProps) => {
    // https://reactjs.org/docs/hooks-reference.html#useref
    const mapRef = useRef(null);
    //https://reactjs.org/docs/hooks-reference.html#usestate
    const [geocoderResults, setGeocoderResults] = useState(null);
    const [poiGeoJson, setPoiGeoJson] = useState(null);
    const [viewport, setViewport] = useState({
      zoom: props.zoom, // 12
      width: props.width, // 400
      height: props.height, // 400
      latitude: props.latitude,  // 35.643448
      longitude: props.longitude, // 139.646750
      source: 'mapbox://styles/mapbox/streets-v11',
    });
    
    // https://reactjs.org/docs/hooks-reference.html#useeffect
    useEffect(() => {
        console.log('useEffect begin;');
        if (mapRef != null && geocoder === null && props.geocoder === true)  {

            geocoder = new MapboxGeocoder({
                accessToken: process.env.GATSBY_MAPBOX_API_ACCESS_TOKEN,
                placeholder: 'SEARCH',
                // No mapboxgl detected in options. Map markers are disabled. Please set options.mapboxgl.  
                // https://github.com/mapbox/mapbox-gl-geocoder/issues/252
                marker: false
            });
        
            geocoder.on('results', (results) => {
                console.log(results);
                setGeocoderResults({results, viewport});
            });

            geocoder.addTo(mapRef.current.getMap());
        }
        console.log('useEffect end;');
    }, [mapRef, props.geocoder, viewport]);
    
    useEffect( () => {
        if (geocoderResults) {

            const geojson = {
                type: 'FeatureCollection',
                features: geocoderResults.results.features.map( (feature) => { 
                  return {
                    'type': feature.type, 
                    'geometry': feature.geometry,
                    'properties': feature.properties
                  }
                })
              };
    
            // bbox取得
            const [minLng, minLat, maxLng, maxLat] = bbox(geojson);
      
            // bboxに合わせてviewport再計算
            const wmViewport  = new WebMercatorViewport(geocoderResults.viewport);
    
            const {longitude, latitude, zoom} = wmViewport.fitBounds([[minLng, minLat], [maxLng, maxLat]], {
              padding: 40
            });
            console.log(geojson);
            setPoiGeoJson({...geojson});
            setViewport({
                ...wmViewport,
                longitude,
                latitude,
                zoom,
                transitionDuration: 400
            });
        }
    }, [geocoderResults]); 
    const renderPoiGeoJson = (poiGeoJson) => {

        // type:https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#type
        const geojsonDataLayerProps = {
          id: 'points',
          type: 'symbol',
          layout: {
            // get the icon name from the source's "icon" property
            // concatenate the name to get an icon from the style's sprite sheet
            'icon-image': ['concat', 'ice-cream', '-15'],
            // get the title name from the source's "title" property
            'text-field': ['get', 'address'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top'
          }
        };

        if (poiGeoJson) {
            return (
                <Source type="geojson" data={poiGeoJson}>
                    <Layer {...geojsonDataLayerProps} />
                </Source>
            );
        }
        return null;
    };
    const handleViewportChange = (vp) => {
        setViewport(vp);
    };
    // workaround for latest react-map-gl 6.x and mapbox-gl 2.x works only on `gastby develop`  (display map is failed on gastby build & serve) ->  use react-map-gl 5.3.8 https://github.com/visgl/react-map-gl/blob/v5.3.8/package.json and mapbox-gl 1.13.1. https://github.com/mapbox/mapbox-gl-js/tree/v1.13.1
    // https://visgl.github.io/react-map-gl/docs/api-reference/interactive-map
    return (
        <div style={{margin:'0 auto', width: '100%'}}>
            <h1>{props.children}</h1>
            <ReactMapGL style={{margin:'0 auto'}} ref={mapRef} 
                mapboxApiAccessToken={process.env.GATSBY_MAPBOX_API_ACCESS_TOKEN}
                onViewportChange={(vp) => handleViewportChange(vp) } 
                {...viewport}>
            {renderPoiGeoJson(poiGeoJson)}
            <NavigationControl></NavigationControl> 
            </ReactMapGL>
        </div>

    );
};
export default MyPlaygroundMap;
