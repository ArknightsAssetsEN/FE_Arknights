import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

export default function Home() {

    const [mapName, setMapName] = useState([]);

    useEffect(() => {
        console.log("Base URL:", import.meta.env.VITE_Arknights_URL);
        fetch(import.meta.env.VITE_Arknights_URL + '/api/maps/get_all_ids')
            .then(response => response.json())
            .then(data => {
                setMapName(data);
                for (const item in data) {

                }
                console.log('Home data:', data);
            })
            .catch(error => {
                console.error('Error fetching home data:', error);
            });
    }, []);

    return (
        <div>
            {/* <Header /> */}
            <div className="flex items-center bg-gray-100 p-1">
                <h1 className="text-4xl font-bold">Map: </h1>
                <select className="p-2 border rounded">
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
        </div>
    );
}
