import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logo() {
    const navigate = useNavigate();

    return (
        <div>
            <div className='flex items-center p-1 text-xl font-bold cursor-pointer'>
                <Icon icon="game-icons:tower-fall" />
                ARKNIGHT
            </div>
        
        </div>
        
    )
}