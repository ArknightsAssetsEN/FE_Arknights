import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logo({size, color}) {
    const navigate = useNavigate();

    return (
        <div>
            <div className={`flex items-center p-1 font-bold cursor-pointer ${size}`}>
                <Icon icon="game-icons:tower-fall" className={`${color}`} />
                <div className={`${color}`} onClick={()=>navigate("/")}>ARKNIGHTS</div>
                
            </div>
        
        </div>
        
    )
}