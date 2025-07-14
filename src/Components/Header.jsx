import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    return (
        <div>
            <div className='flex items-center p-1  bg-gradient-to-r from-white to-blue-200'>
                <img src="/arknights_logo.svg" alt="" className='w-[60px]' onClick={()=>navigate("/")}/>
            </div>
        
        </div>

        
    )
}