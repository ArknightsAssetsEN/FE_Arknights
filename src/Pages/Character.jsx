import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Character() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex items-center bg-gray-100 p-1">
                {/* <h1 className="text-4xl font-bold">Map: </h1> */}
                <img src="/arknights_logo.svg" alt="" className='w-[60px]' onClick={()=>navigate("/")}/>
            </div>

            <div className="flex justify-center items-center mt-4" >
                <img src="./../assets/data/battle/char_002_amiya/char_002_amiya.png" alt="" className='w-[60px]'/>
            </div>
        </div>
    );
}
