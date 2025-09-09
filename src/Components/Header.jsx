import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Theme from './Theme';

export default function Logo() {
    const navigate = useNavigate();

    return (
        <div>
            <div className='flex justify-around items-center p-1 text-xl font-bold cursor-pointer'>
                <div className='flex justify-center items-center'>
                    <Icon icon="game-icons:tower-fall" />
                    ARKNIGHT
                </div>
                <div>
                    <Theme/>
                </div>
                
            </div>
        
        </div>
        
    )
}