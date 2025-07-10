import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Home() {

    const [mapName, setMapName] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_Arknights_URL + '/api/maps/get_all_ids')
            .then(response => response.json())
            .then(data => {
                setMapName(data);
                console.log('Home data:', data);
            })
            .catch(error => {
                console.error('Error fetching home data:', error);
            });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Welcome to Arknights</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mapName.map((map, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-xl font-semibold">{map}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
