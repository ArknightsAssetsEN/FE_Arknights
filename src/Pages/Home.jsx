import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Map from '../Components/Map';

export default function Home() {
    const navigate = useNavigate();
    const [mapName, setMapName] = useState([]);
    const [mapSelect, setMapSelect] = useState("");
    const [map, setMap] = useState({});

    useEffect(() => {
        fetch(import.meta.env.VITE_Arknights_URL + '/api/maps/get_all_ids')
            .then(response => response.json())
            .then(data => {
                setMapName(data);
                setMapSelect(data[0].id); // Set default map selection to the first map
            })
            .catch(error => {
                console.error('Error fetching home data:', error);
            });
    }, []);

    useEffect(() => {
        if (mapSelect !== "") {
            drawMapName(mapSelect);
        }
        
    }, [mapSelect]);

    const drawMapName = (id) => {
        fetch(import.meta.env.VITE_Arknights_URL + '/api/maps/' + id)
            .then(response => response.json())
            .then(data => {
                setMap(data);
  
                console.log('Map data:', data);
            })
            .catch(error => {
                console.error('Error fetching home data:', error);
            });
    }


    return (
        <div>
            {/* <Header /> */}
            <div className="flex items-center bg-gray-100 p-1">
                {/* <h1 className="text-4xl font-bold">Map: </h1> */}
                <img src="/arknights_logo.svg" alt="" className='w-[60px]' onClick={()=>navigate("/")}/>
                <select className="p-2 border rounded" onChange={(e) => setMapSelect(e.target.value)}>
                    {mapName.map((map, index) => {
                        // const code = map.id.split('_');
                        // const code = map.id.replaceAll('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                        const code = map.id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                        return (
                            <option key={index} value={map.id || map}>
                                {code}
                            </option>
                        )
                    })}
                </select>
            </div>

            <div className="flex justify-center items-center mt-4">
                {map.mapData ?
                    <Map mapData={map.mapData} />
                    :
                    <div className="text-red-500">No map data available</div>
                }
            </div>
        </div>
    );
}
