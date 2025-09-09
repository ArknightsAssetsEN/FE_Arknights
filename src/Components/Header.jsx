import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Theme from './Theme';
import Logo from './Logo';

export default function Header() {

    return (
        <div>
            <div className='flex justify-around items-center p-1 text-xl font-bold cursor-pointer'>
                <div className='flex justify-center items-center'>
                    <Logo size="text-xl" color="text-blue-600 dark:text-blue-400"/>
                </div>
                <div>
                    <Theme/>
                </div>
                
            </div>
        
        </div>
        
    )
}