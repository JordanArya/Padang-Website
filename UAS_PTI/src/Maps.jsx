import {useState, useEffect} from 'react'
import viteLogo from '/vite.svg'
import './Map.css'
import "leaflet/dist/leaflet.css"
import Loader from './Loader.jsx'


import LeafletRouting from "./LeafletRouting.jsx";
import {MapContainer, TileLayer, Popup, Marker, useMap} from "react-leaflet";
  
    function fetchMapsData() {
        const [loading, setLoading] = useState([]);
        const [data, setData] = useState([]);
       
        const location = "Summarecon Mall Serpong";
       
    
        const apiUrl = `https://nominatim.openstreetmap.org/search?q=${location}&format=json&polygon_kml=1&addressdetails=1`;
    
    
        useEffect(() =>{
          setLoading(true);
          fetch(apiUrl)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            setData(responseJson);
            setLoading(false)
          })
          .catch(err => console.error(err));
        }, []);
       return {loading, data};
    }


function Maps() {
  
    const {loading, data} = fetchMapsData();

    if(loading){
        return <Loader></Loader>
      }

    console.log(data[0]);
    // const position = [0,0];
    const position = [data[0].lat, data[0].lon];

  
  return (
    <>


    <div className='MapCointainer'>
        <MapContainer center={position} zoom={10} markerZoomAnimation={true}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LeafletRouting position={position}/>
              
        </MapContainer>
    </div>
        
   
    </>
  )
}

export default Maps



