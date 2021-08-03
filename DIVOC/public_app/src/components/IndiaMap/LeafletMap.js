import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, LayerGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./IndiaMap.css";
import geoStates from "./india_geo.json";
import districts from "./districts.json";

export default function LeafletMap({
    setSelectedState,
    selectedState,
    setSelectedDistrict,
    selectedDistrict,
    districtList,
    setDistrictList,
    stateList,
    setStateList,
    stateWiseCertificateData,
    districtWiseCertificateData
}) {
    const [states, setStates] = useState(geoStates);
    const [stateClicked, setStateClicked] = useState(false);
    const [mapDistrictData,setMapDistrictData] = useState([])

    useEffect(()=>{
        filterStateList();
    },[])

    useEffect((x)=> {
    if (Object.keys(stateWiseCertificateData).length>0)
    {
        let features = [...geoStates.features]
        features = features.map(s => {
            if (stateWiseCertificateData[s.properties['st_nm']] !== undefined) {
                s.properties['count'] = stateWiseCertificateData[s.properties['st_nm']];
            }
            return s;
        });
        setStates({features});

    }


    }, [stateWiseCertificateData]);

    useEffect(() => {
        filterDistrictList();
    }, [selectedState]);

    useEffect(()=>{
        filterDistricts();
    },[mapDistrictData])

    function getColor(d) {
        console.log(d);
        if (d === undefined)
            return '#ffffaf';

        return d > 1000 ? '#800026' :
          d > 500  ? '#BD0026' :
            d > 200  ? '#E31A1C' :
              d > 100  ? '#FC4E2A' :
                d > 50   ? '#FD8D3C' :
                  d > 20   ? '#FEB24C' :
                    d > 10   ? '#FED976' :
                    d > 0   ? '#FFEDA0' :
                      '#0000f0';
    }

    const mapStyle = (feature) => {
        let color = getColor(feature.properties['count'])
        return {
            fillColor: color,
            weight: 3,
            color: "white",
            fillOpacity: 1, //feature.properties['count']===undefined?0:1,
        };
    };
    

    const filterStateList = () => {
        let newStateList = []
        states.features.map( state => newStateList.push(state.properties.ST_NM))
        setStateList(newStateList);
    };

    const filterDistricts = () => {
        let newDistrictList = [];
        
        if(mapDistrictData.length>1 && mapDistrictData[0]){
            mapDistrictData.map( district => newDistrictList.push(district.properties.district));
            setDistrictList(newDistrictList);
        }
        
    };

    
    const filterDistrictList = () => {
        
        let newDistrictFeatureList = [];
        newDistrictFeatureList = districts.features.filter(
            (data) => data.properties.st_nm === selectedState.name
        );
        setMapDistrictData(newDistrictFeatureList);
    };

    const onMouseIn = (event) => {
        event.target.setStyle({
            // fillColor: "#4E67D1",
            fillOpacity: 0.7,
        });
    };

    const onMouseOut = (event) => {
        event.target.setStyle({
            // fillColor: "#CEE5FF",
            fillOpacity: 1,
        });
    };

    const handleClick = (event,stateName) => {
        setSelectedState({ name: stateName, count: 0 });
        setStateClicked(!stateClicked);
    };


    const onEachState = (state, layer) => {
        const stateName = state.properties.ST_NM;
        const count = stateWiseCertificateData[stateName] ? stateWiseCertificateData[stateName] : 0;
        layer.bindTooltip(`<b>State : ${stateName}</b> <br/> certificates Issued : ${count}`);
        layer.on({
            mouseover: onMouseIn,
            mouseout: onMouseOut,
            click: (event) => handleClick(event,stateName),
        });
    };

    const onEachDistrict = (district, layer) => {
        const districtName = district.properties.district;
        const count = districtWiseCertificateData[districtName] ? districtWiseCertificateData[districtName] : 0;
        layer.bindTooltip(`District : ${districtName}</b> <br/> certificates Issued : ${count}`);
        layer.on({
            mouseover: (event) => {
                event.target.setStyle({
                    fillColor: "#4E67D1",
                });
                setSelectedDistrict({ name: districtName, count: 0 })
            },
            mouseout: onMouseOut,
        });
    };
    return (
        <div id="mapid">
            <MapContainer className="map-container" center={[22, 82]} zoom={5} minZoom={4} maxZoom={6}>
                <GeoJSON
                    key="india"
                    style={mapStyle}
                    data={states}
                    onEachFeature={onEachState}
                />
                {stateClicked ? (
                    <LayerGroup>
                    <GeoJSON
                        key={new Date().getTime()}
                        style={mapStyle}
                        data={mapDistrictData}
                        onEachFeature={onEachDistrict}
                    />
                </LayerGroup>
                ) : (
                    ""
                )}
            </MapContainer>
        </div>
    );
}
