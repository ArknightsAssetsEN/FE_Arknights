import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Home() {

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
            <p className="text-lg text-gray-700">This is the starting point of your application.</p>
        </div>
    );
}
